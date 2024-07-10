from flask import Flask, request, render_template
from apscheduler.schedulers.background import BackgroundScheduler

from flask_mail import Mail, Message
import db_manage
import pdf_gen
import os
import re
import shutil
import boto3
import uuid
from back import add_hubspot_note


app = Flask(__name__)
mail = Mail(app)

app.config['MAIL_SERVER'] = "smtp.gmail.com"
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = os.environ.get('GOOGLE_MAIL_USER')
app.config['MAIL_PASSWORD'] = os.environ.get('GOOGLE_MAIL_PASS')
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
app.config['WTF_CSRF_ENABLED'] = False
mail = Mail(app)
procesando = False

def send_email_with_pdf(recipient_email, pdf_bytes, church_name, first_name):
    church_name = church_name.lower().replace(" ", "_")
    church_name = re.sub(r'[^\w\s]', '', church_name)
    msg = Message(
        "Check your Digital Health Assessment report for your church: " + church_name,
        sender='digitalhealth@visitorreach.com',
        recipients=[recipient_email, "digitalhealth@visitorreach.com"]
    )
    with app.open_resource("reports/" + church_name + "/" + church_name + ".pdf") as pdf_file:
        msg.attach(f"{church_name}.pdf", "application/pdf", pdf_file.read())
    msg.html = render_template("email.html", first_name=first_name)
    mail.send(msg)


def check_and_send_emails(app):
    global procesando
    if procesando == False:
        procesando = True
        users = db_manage.retrieve_email_missing_pdf()

        for user in users:
            id = str(user['_id'])
            email = user['email']
            church_name = user['name']
            first_name = user['first_name']
            hubspot_contact_id = user.get('hubspot_contact_id')
            hubspot_company_id = user.get('hubspot_company_id')

            church_name = church_name.lower().replace(" ", "_")
            church_name = re.sub(r'[^\w\s]', '', church_name)
            pdf_bytes = pdf_gen.generate(church_name, id)
            with app.app_context():
                send_email_with_pdf(email, pdf_bytes, church_name, first_name)

            file_name = str(uuid.uuid4()) + '.pdf'
            s3 = boto3.client('s3')
            bucket_name = 'vr-digital-health-files'
            key = 'pdf/' + file_name
            s3.upload_file("reports/" + church_name + "/" + church_name + ".pdf", bucket_name, key, ExtraArgs={'ContentType': 'application/pdf'})
            print(f'PDF file uploaded to /{bucket_name}/{key}')

            db_manage.update_sent_pdf(id, file_name)
            pdfUrl = f"https://vr-digital-health-files.s3.amazonaws.com/pdf/{file_name}"
            noteContent = f'<div><p>A Digital Health Assessment report PDF file was generated and sent:</p><p><a href="{pdfUrl}" title="Digital Health Assessment Report" target="_blank">Digital Health Assessment Report PDF</a></p></div>'
            add_hubspot_note(hubspot_contact_id, hubspot_company_id, noteContent)
            shutil.rmtree('reports/' + church_name)
        procesando = False


# Initialize the scheduler
scheduler = BackgroundScheduler()

# Schedule the send_email function to run every 2 minutes
scheduler.add_job(check_and_send_emails, 'interval', minutes=1, args=[app])

# Start the scheduler
scheduler.start()


@app.route('/')
def index():
    return "<h1>Background function to send email is running!</h1>"


if __name__ == '__main__':
    from waitress import serve
    serve(app, host='0.0.0.0', port=8090)
