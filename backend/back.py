from flask import Flask, request, jsonify, redirect, url_for, render_template
from flask_mail import Mail, Message
from flask_cors import CORS, cross_origin
from church import church
import metricas
import http.client
import json
import os, sys
import requests
import pdf_gen
import db_manage
 
HUBSPOT_API_KEY = os.environ.get('HUBSPOT_API_KEY')
 
app = Flask(__name__)
mail = Mail(app)
CORS(app)
volume_search_last_month = 0
 
app.config['MAIL_SERVER'] = "smtp.gmail.com"
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = os.environ.get('GOOGLE_MAIL_USER')
app.config['MAIL_PASSWORD'] = os.environ.get('GOOGLE_MAIL_PASS')
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
app.config['WTF_CSRF_ENABLED'] = False
 
mail = Mail(app)
 
 
def post_contact_hubspot(church_obj):
 
    conn = http.client.HTTPSConnection("api.hubapi.com")
    payload = json.dumps({
    "properties": {
        "email": church_obj.email,
        "firstname": church_obj.first_name,
        "lastname": church_obj.last_name,
        "phone":church_obj.mobile_phone,
        "digital_assessment":"Yes",
        "company" : church_obj.name,
        "hs_marketable_status": "Marketing contact"
    }
    })
    headers = {
    'User-Agent': 'Apidog/1.0.0 (https://apidog.com)',
    'Content-Type': 'application/json',
    'Authorization' : f'Bearer {HUBSPOT_API_KEY}'
    }
    conn.request("POST", f"/crm/v3/objects/contacts?{HUBSPOT_API_KEY}", payload, headers)
    res = conn.getresponse()
    data = res.read()
   
    conn = http.client.HTTPSConnection("api.hubapi.com")
    payload = json.dumps({
    "properties": {
        "company": church_obj.name,
        "company_size" : church_obj.size,
        "phone" : church_obj.phone,
        "city" : church_obj.city,
        "country" : "United States",
       
    }
    })
    headers = {
    'User-Agent': 'Apidog/1.0.0 (https://apidog.com)',
    'Content-Type': 'application/json',
    'Authorization' : f'Bearer {HUBSPOT_API_KEY}'
    }
    conn.request("POST", f"/crm/v3/objects/companies?{HUBSPOT_API_KEY}", payload, headers)
    res = conn.getresponse()
    data = res.read()
    return (data.decode("utf-8"))


def send_email(church_obj):
 
    msg = Message(
            "Check your Digital Health Assessment report for your church: " + church_obj.name,
            sender ='jrivero.jesus@gmail.com',
            recipients = [church_obj.email]
            )
    pdf_gen.generate(church_obj.name)
    with app.open_resource("reports\\" + (church_obj.name).replace(" ", "_") + ".pdf") as pdf_file:
        msg.attach(church_obj.name + ".pdf", "application/pdf", pdf_file.read())
    msg.html = render_template("email.html", first_name = church_obj.first_name)
    mail.send(msg)
 

 
@app.route('/submit-form', methods=['POST'])
@cross_origin()
def handle_form_submission():
    # try:
        church_obj = church()
        json_data = request.get_json()
        church_obj.first_name = json_data.get("firstName")
        church_obj.last_name = json_data.get("lastName")
        church_obj.mobile_phone = json_data.get("mobilePhone")
        church_obj.email = json_data.get("email")
        church_obj.name = json_data.get("churchName")
        church_obj.size = json_data.get("churchSize")
        church_obj.address = json_data.get("churchAddress")
        church_obj.city = json_data.get("churchCity")
        church_obj.state = json_data.get("churchState")
        church_obj.zipcode = json_data.get("churchZipCode")
        church_obj.webpage = json_data.get("churchWebsite")
        church_obj.phone = json_data.get("churchPhone")
        church_obj.facebook_profile = json_data.get("churchFacebook")
        church_obj.instagram_profile = json_data.get("churchInstagram")

        global volume_search_last_month
        try:
           volume_search_last_month = metricas.start_historical(church_obj.city, church_obj.state)
        except:
           pass
        church_obj.get_digital_search_assesment_score()        
        post_contact_hubspot(church_obj)
        #send_email(church_obj)
        map_index = db_manage.insert_User( json_data.get("firstName"),
                                json_data.get("lastName"),
                                json_data.get("mobilePhone"),
                                json_data.get("email"),
                                json_data.get("churchName"),
                                json_data.get("churchSize"),
                                json_data.get("churchAddress"),
                                json_data.get("churchState"),
                                json_data.get("churchCity"),
                                json_data.get("churchZipCode"),
                                json_data.get("churchWebsite"),
                                json_data.get("churchPhone"),
                                json_data.get("churchFacebook"),
                                json_data.get("churchInstagram"),
                                church_obj.voice_score,
                                church_obj.google_maps_score,
                                church_obj.apple_maps_score,
                                0,
                                church_obj.domain_trust_score,
                                volume_search_last_month,
                                0,
                                church_obj.domain_organic_keywords
                            )
        if map_index is not None:
            church_obj.get_map_image(map_index)
            print("Map index: ", map_index)
        print("New user created")
        return jsonify({'message': 'Form submission received'}), 200 
    # except Exception as e:
    #     exc_type, exc_obj, exc_tb = sys.exc_info()
    #     fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
    #     print(exc_type, fname, exc_tb.tb_lineno)
        return jsonify({'message': 'Error in submission'}), 400 
 
 
 
 
 
@app.route('/api/fetch-data', methods=['POST'])
def fetch_data():
    data = request.get_json()
    print(data)
    try:
        user_key = data.get("user_key")
        user_info = db_manage.retrieve_User_complete_report(user_key)
        response_json = {
            'church_name': user_info[10],
            'digitalVoice': user_info[1],
            'appleMaps': user_info[3],
            'googleMaps': user_info[2],
            'socialClarity': user_info[4],
            'websiteAuthority': user_info[5],
            'vrVoice': 225,
            'vrMaps': 235,
            'vrSocial': 195,
            'vrWebsite': 205,
            'last_month_searches': user_info[0],
            'loc_address': user_info[11],
            'loc_zipcode': user_info[8],
            'loc_city': user_info[7],
            'loc_state': user_info[6],
            'website' : user_info[9],
            'keywords': user_info[12]
        }

        print("Fetched Data")
        return jsonify(response_json)
    except Exception as error_msg:
        print("Error: ", error_msg)
        return jsonify({'message': 'Error in submission'}), 400
 
@app.route("/test")
def test():
    return jsonify({"message" : "test"})



if __name__ == '__main__':
    app.run(debug=True, port = 8080)


