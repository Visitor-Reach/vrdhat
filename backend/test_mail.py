from flask import Flask, render_template
from flask_mail import Mail, Message
import os

app = Flask(__name__)
mail = Mail(app)  # instantiate the mail class

# configuration of mail
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = os.environ.get('GOOGLE_MAIL_USER')
app.config['MAIL_PASSWORD'] = os.environ.get('GOOGLE_MAIL_PASS')
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
mail = Mail(app)
first_name = "Dude"


# message object mapped to a particular URL ‘/’
@app.route("/")
def index():
    msg = Message(
        'Hello',
        sender=os.environ.get('GOOGLE_MAIL_USER'),
        recipients=['glenn@visitorreach.com']
    )
    msg.html = render_template("email.html", first_name=first_name)
    mail.send(msg)
    return 'Sent'


if __name__ == '__main__':
    app.run(debug=True, port=5000)
