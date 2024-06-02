from flask import Flask, request, jsonify, redirect, url_for, render_template
from flask_mail import Mail, Message
from flask_cors import CORS, cross_origin
from church import church
import metricas
import http.client
import json
import os
import sys
import requests
import pdf_gen
import db_manage
import time


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
            "phone": church_obj.mobile_phone,
            "digital_assessment": "Yes",
            "company": church_obj.name,
            "hs_marketable_status": "Marketing contact"
        }
    })
    headers = {
        'User-Agent': 'Apidog/1.0.0 (https://apidog.com)',
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {HUBSPOT_API_KEY}'
    }
    conn.request("POST", f"/crm/v3/objects/contacts", payload, headers)
    res = conn.getresponse()
    data = res.read()
    # print("DATA: ", payload)
    print("New contact: ", data)

    conn = http.client.HTTPSConnection("api.hubapi.com")
    payload = json.dumps({
        "properties": {
            "name": church_obj.name,
            "church_size": church_obj.size,
            "phone": church_obj.phone,
            "city": church_obj.city,
            "state": church_obj.state,
            "country": "United States",

        }
    })
    print("Payload", payload)

    headers = {
        'User-Agent': 'Apidog/1.0.0 (https://apidog.com)',
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {HUBSPOT_API_KEY}'
    }
    conn.request("POST", f"/crm/v3/objects/companies", payload, headers)
    res = conn.getresponse()
    data = res.read()
    # print("COMPANY DATA: ", payload)
    print("New company: ", data)
    # return (data.decode("utf-8"))
    return 0


def send_email(church_obj):

    msg = Message(
        "Check your Digital Health Assessment report for your church: " + church_obj.name,
        sender='digitalhealth@visitorreach.com',
        recipients=[church_obj.email]
    )
    pdf_gen.generate(church_obj.name)
    with app.open_resource("reports/" + (church_obj.name).replace(" ", "_") + ".pdf") as pdf_file:
        msg.attach(church_obj.name + ".pdf",
                   "application/pdf", pdf_file.read())
    msg.html = render_template("email.html", first_name=church_obj.first_name)
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
    church_obj.get_map_image()
    church_obj.write_object_to_json()
    # post_contact_hubspot(church_obj)

    id = db_manage.insert_User(json_data.get("firstName"),
                                      json_data.get("lastName"),
                                      json_data.get("mobilePhone"),
                                      json_data.get("email"),
                                      json_data.get("churchName"),
                                      json_data.get("churchSize"),
                                      json_data.get("churchAddress"),
                                      json_data.get("churchCity"),
                                      json_data.get("churchState"),
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
                                      church_obj.domain_organic_keywords,
                                      church_obj.map_image,
                                      church_obj.data_file,
                                      ''
                                      )

    if id is not None:
        return jsonify({'id': f'{id}'})
    else:
        pass

    return jsonify({'message': 'Error in submission'}), 400


@app.route('/api/fetch-data/<id>', methods=['GET'])
def fetch_data(id):
    try:
        user_info = db_manage.retrieve_User_complete_report(id)
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
            'website': user_info[9],
            'keywords': user_info[12],
            'map_image': user_info[13],
            'data_file': user_info[14],
            'pdf_file': user_info[15]
        }

        return jsonify(response_json)
    except Exception as error_msg:
        print("Error: ", error_msg)
        return jsonify({'message': 'Error getting data for id ' + id}), 400


@app.route('/api/fetch-runs', methods=['GET'])
def fetch_runs():
    try:
        page = request.args.get('page') or 1
        page_size = request.args.get('page_size') or 10
        data = []
        runs = db_manage.retrieve_runs(int(page), int(page_size))
        for run in runs:
            data.append({
                'id': run[0],
                'church_name': run[1],
                # 'map_image': run[2],
                # 'data_file': run[3],
                # 'pdf_file': run[4],
                'created_at': run[5]
            })
        total = db_manage.get_total_runs()
        results = {
            'page': page,
            'page_size': page_size,
            'total': total,
            'has_more': total > int(page) * int(page_size),
            'count': len(data),
            'items': data
        }
        return jsonify(results)
    except Exception as error_msg:
        print("Error: ", error_msg)
        return jsonify({'message': 'Error getting runs'}), 400
    
    
@app.route('/api/fetch-run-data/<jsonFile>', methods=['GET'])
def fetch_run_data(jsonFile):
    try:
        # Fetch the JSON file from the remote URL
        response = requests.get('https://vr-digital-health-files.s3.us-west-2.amazonaws.com/data/' + jsonFile)

        # Check if the request was successful
        if response.status_code == 200:
            # Return the JSON string
            return response.json()
        else:
            return jsonify({'message': 'Error fetching JSON file'}), 400
    except Exception as error_msg:
        print("Error: ", error_msg)
        return jsonify({'message': 'Error getting run data'}), 400

@app.route("/test")
def test():
    return jsonify({"message": "test"})


if __name__ == '__main__':
    from waitress import serve
    serve(app, host='0.0.0.0', port=8080)
