from flask import Flask, request, jsonify, redirect, url_for, render_template
from apscheduler.schedulers.background import BackgroundScheduler

from flask_mail import Mail, Message
import sqlite3
import time
import threading
import pdf_gen
import os


# Configure Flask-Mail (replace with your app instance)
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


def init_connection():
    connection = sqlite3.connect("info/digital_assessment.db")
    cur = connection.cursor()
    return cur, connection


def close_connection(cur, connection):
    cur.close()
    connection.close()


def retrieve_email_missing_pdf():
    cur, connection = init_connection()
    cur.execute(f""" 
                    SELECT email, name, first_name, pdf_sent FROM Users WHERE pdf_sent <> 1 
                """)
    try:
        results = cur.fetchall()
        connection.commit()
        close_connection(cur, connection)
        return results
    except Exception as error:
        return None


def update_sent_pdf(email):
    cur, connection = init_connection()
    cur.execute(f""" 
                    UPDATE Users
                    SET
                            pdf_sent = 1
                    WHERE
                            email = '{email}'
                """)
    try:
        results = cur.fetchall()
        connection.commit()
        close_connection(cur, connection)
        print("Update success email {email}")
    except Exception as error:
        print("Update failed")


def send_email_with_pdf(recipient_email, pdf_bytes, church_name, first_name):
    church_name = (church_name).replace(" ", "_").lower()
    msg = Message(
        "Check your Digital Health Assessment report for your church: " + church_name,
        sender='digitalhealth@visitorreach.com',
        recipients=[recipient_email]
    )
    with app.open_resource("reports\\" + church_name + ".pdf") as pdf_file:
        msg.attach(f"{church_name}.pdf", "application/pdf", pdf_file.read())
    msg.html = render_template("email.html", first_name=first_name)
    mail.send(msg)


def check_and_send_emails(app):
    """Checks for users with zero in pdf_sent, generates PDFs, and sends emails."""
    global procesando
    if procesando == False:
        procesando = True
        users = retrieve_email_missing_pdf()

        for user in users:
            print(user)

            email, church_name, first_name, pdf_sent = user
            pdf_bytes = pdf_gen.generate(church_name, email)
            with app.app_context():
                send_email_with_pdf(email, pdf_bytes, church_name, first_name)

            update_sent_pdf(email)
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
    app.run(debug=True, port=8090)
