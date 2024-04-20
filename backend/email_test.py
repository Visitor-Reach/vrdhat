from flask import Flask, request, jsonify, redirect, url_for, render_template
from apscheduler.schedulers.background import BackgroundScheduler

from flask_mail import Mail, Message
import sqlite3
import threading
import pdf_gen
from datetime import datetime


# Configure Flask-Mail (replace with your app instance)
app = Flask(__name__)
mail = Mail(app)

app.config['MAIL_SERVER'] = "smtp.gmail.com"
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = "jrivero.jesus@gmail.com"
app.config['MAIL_PASSWORD'] = "jrgr pagf uawe cohs"
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
app.config['WTF_CSRF_ENABLED'] = False

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
                    SELECT email, name, first_name FROM Users WHERE pdf_sent <> 1
                """)
    try:
        results = cur.fetchall()
        connection.commit()
        close_connection(cur, connection)
        return results
    except Exception as error:
        return None
    

def update_sent_pdf():
    cur, connection = init_connection()
    cur.execute(f""" 
                    UPDATE Users
                    SET
                            pdf_sent = 1
                    WHERE
                            pdf_sent <> 1
                """)
    try:
        results = cur.fetchall()
        connection.commit()
        close_connection(cur, connection)
        print("Update success")
    except Exception as error:
        print("Update failed")
    
    

def send_email_with_pdf(recipient_email, pdf_bytes, church_name, first_name):
    msg = Message(
            "Check your Digital Health Assessment report for your church: " + church_name,
            sender ='jrivero.jesus@gmail.com',
            recipients = [recipient_email]
            )
    msg.attach(church_name + ".pdf", "application/pdf", pdf_bytes)
    msg.html = render_template("email.html", first_name = first_name)
    mail.send(msg)

def check_and_send_emails():
    print("222222222222222")
    """Checks for users with zero in pdf_sent, generates PDFs, and sends emails."""
    users = retrieve_email_missing_pdf()

    for user in users:
        email, church_name, first_name = user
        print(email)
        pdf_bytes = pdf_gen.generate(church_name, email)
        #with app.app_context():
            #send_email_with_pdf(email, pdf_bytes, church_name, first_name)
    update_sent_pdf()



@app.route('/', methods=['POST'])
def index():
    try: 
        data = request.get_json()
        print("11111111111111")
        check_and_send_emails()
        return jsonify({"Sucess" : 1})
    except Exception as e:
        return jsonify({"Error" : 0})
        


if __name__ == '__main__':
    app.run(debug=True, port=8090)