from flask import Flask, render_template
from flask_mail import Mail, Message 
   
app = Flask(__name__) 
mail = Mail(app) # instantiate the mail class 
   
# configuration of mail 
app.config['MAIL_SERVER']='smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = 'jrivero.jesus@gmail.com'
app.config['MAIL_PASSWORD'] = 'jrgr pagf uawe cohs'
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
mail = Mail(app) 
first_name = "Jesus"

   
# message object mapped to a particular URL ‘/’ 
@app.route("/") 
def index(): 
   msg = Message( 
                'Hello', 
                sender ='jrivero.jesus@gmail.com', 
                recipients = ['jesus.rivero@arandinni.com'] 
               ) 
   msg.html = render_template("email.html", first_name = first_name)
   mail.send(msg) 
   return 'Sent'
   
if __name__ == '__main__': 
   app.run(debug = True, port=5000) 