from flask import Flask, request, jsonify
from flask_mail import Mail
from flask_cors import CORS, cross_origin
from church import church
import metricas
import http.client
import json
import os
import requests
import db_manage
import time
import tldextract
from urllib.parse import parse_qs
from bson import json_util
import re

HUBSPOT_API_KEY = os.environ.get('HUBSPOT_API_KEY')
APIFY_TOKEN = "apify_api_iAg7arHnPeftRg9PVFbS1w3bhPwb1d2lxtPH"

app = Flask(__name__)
mail = Mail(app)
CORS(app)
volume_search_last_month = 0

def post_hubspot_data(church_obj):
    # check if contact already exists, if not create new contact
    contact_id = get_existing_hubspot_contact(church_obj.email)
    if contact_id is None:
        contact_id = add_hubspot_contact(church_obj)
        print("New contact id: ", contact_id)
    else:
        update_hubspot_contact(church_obj, contact_id)
        print("Updated existing contact id: ", contact_id)

    # check if company already exists, if not create new company
    company_id = get_existing_hubspot_company(church_obj)
    if company_id is None:
        company_id = add_hubspot_company(church_obj)
        print("New company id: ", company_id)
    else:
        update_hubspot_company(church_obj, company_id)
        print("Updated existing company id: ", company_id)

    # associate contact with company
    add_hubspot_association(contact_id, company_id)

    # create note for contact
    dataUrl = f"https://digitalhealth.visitorreach.com/data/{church_obj.id}"
    noteContent = f'<div><p>{church_obj.first_name} {church_obj.last_name} submitted a Digital Health Assessment:</p><p><a href="{dataUrl}" title="Data Analysis" target="_blank">Digital Health Analysis</a></p></div>'
    add_hubspot_note(contact_id, company_id, noteContent)
    return {contact_id: contact_id, company_id: company_id}

def get_existing_hubspot_contact(email):
    headers = {
        'User-Agent': 'Apidog/1.0.0 (https://apidog.com)',
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {HUBSPOT_API_KEY}'
    }
    conn = http.client.HTTPSConnection("api.hubapi.com")
    conn.request("GET", f"/crm/v3/objects/contacts/{email}?idProperty=email", {}, headers)
    res = conn.getresponse()
    existingData = res.read()
    if res.status == 404:
        return None
    else:
        existing = json.loads(existingData)
        return existing.get("id")
        
def get_existing_hubspot_company(church_obj):
    extracted = tldextract.extract(church_obj.webpage)
    root_domain_name = "{}.{}".format(extracted.domain, extracted.suffix)
    payload = json.dumps({
        "limit": 1,
        "sorts": [
            {
                "propertyName": "createdate",
                "direction": "DESCENDING"
            }
        ],
        "properties": [
            "name"
        ],
        "filterGroups": [
            {
                "filters": [
                    {
                        "propertyName": "domain",
                        "operator": "EQ",
                        "value":root_domain_name
                    }
                ]
            }
        ]
    })
    headers = {
        'User-Agent': 'Apidog/1.0.0 (https://apidog.com)',
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {HUBSPOT_API_KEY}'
    }
    conn = http.client.HTTPSConnection("api.hubapi.com")
    conn.request("POST", f"/crm/v3/objects/companies/search", payload, headers)
    res = conn.getresponse()
    existingCompanyData = res.read()
    existingData = json.loads(existingCompanyData)
    if existingData.get("total") == 0:
        return None
    else:
        return existingData.get("results")[0].get("id")

def add_hubspot_contact(church_obj):
    query_dict = {k: v[0] for k, v in parse_qs(church_obj.search_params).items()}
    print(query_dict)
    payload = json.dumps({
        "properties": {
            "email": church_obj.email,
            "firstname": church_obj.first_name,
            "lastname": church_obj.last_name,
            "phone": church_obj.mobile_phone,
            "company": church_obj.name,
            "hs_marketable_status": "Marketing contact",
            "role": church_obj.contact_role,
            "digital_health_assessment": True,
            "utm_source": query_dict.get("utm_source"),
            "utm_medium": query_dict.get("utm_medium"),
            "utm_campaign": query_dict.get("utm_campaign"),
            "utm_content": query_dict.get("utm_content"),
        }
    })
    headers = {
        'User-Agent': 'Apidog/1.0.0 (https://apidog.com)',
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {HUBSPOT_API_KEY}'
    }
    conn = http.client.HTTPSConnection("api.hubapi.com")
    conn.request("POST", f"/crm/v3/objects/contacts", payload, headers)
    res = conn.getresponse()
    if res.status != 201:
        print("Error creating contact")
        print(res.read())
        return None
    else:
        data = res.read()
        contact_id = json.loads(data).get("id")
        return contact_id

def update_hubspot_contact(church_obj, contact_id):
    payload = json.dumps({
        "properties": {
            "digital_health_assessment": True
        }
    })
    headers = {
        'User-Agent': 'Apidog/1.0.0 (https://apidog.com)',
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {HUBSPOT_API_KEY}'
    }
    conn = http.client.HTTPSConnection("api.hubapi.com")
    conn.request("PATCH", f"/crm/v3/objects/contacts/{contact_id}", payload, headers)
    res = conn.getresponse()
    if res.status != 200:
        print("Error updating contact")
        print(res.read())
        return None
    else:
        data = res.read()
        return None

def update_hubspot_company(church_obj, company_id):
    payload = json.dumps({
        "properties": {
            "phone": church_obj.phone,
            "address": church_obj.address,
            "city": church_obj.city,
            "state": church_obj.state,
            "zip": church_obj.zipcode,
        }
    })
    headers = {
        'User-Agent': 'Apidog/1.0.0 (https://apidog.com)',
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {HUBSPOT_API_KEY}'
    }
    conn = http.client.HTTPSConnection("api.hubapi.com")
    conn.request("PATCH", f"/crm/v3/objects/companies/{company_id}", payload, headers)
    res = conn.getresponse()
    if res.status != 200:
        print("Error updating company")
        print(res.read())
        return None
    else:
        data = res.read()
        return None

def add_hubspot_company(church_obj):
    extracted = tldextract.extract(church_obj.webpage)
    root_domain_name = "{}.{}".format(extracted.domain, extracted.suffix)
    payload = json.dumps({
        "properties": {
            "name": church_obj.name,
            "church_size": church_obj.size,
            "phone": church_obj.phone,
            "address": church_obj.address,
            "city": church_obj.city,
            "state": church_obj.state,
            "zip": church_obj.zipcode,
            "country": "United States",
        }
    })
    if is_valid_domain(root_domain_name):
        payload = json.dumps({
            "properties": {
                "name": church_obj.name,
                "domain": root_domain_name,
                "church_size": church_obj.size,
                "phone": church_obj.phone,
                "address": church_obj.address,
                "city": church_obj.city,
                "state": church_obj.state,
                "zip": church_obj.zipcode,
                "country": "United States",
            }
        })
    headers = {
        'User-Agent': 'Apidog/1.0.0 (https://apidog.com)',
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {HUBSPOT_API_KEY}'
    }
    conn = http.client.HTTPSConnection("api.hubapi.com")
    conn.request("POST", f"/crm/v3/objects/companies", payload, headers)
    res = conn.getresponse()
    if res.status != 201:
        print("Error creating company")
        print(res.read())
        return None
    else:
        data = res.read()
        company_id = json.loads(data).get("id")
        return company_id

def add_hubspot_association(contact_id, company_id):
    payload = json.dumps({
        "inputs":[
            {
                "from": {
                "id": contact_id,
                "type": "contact"
                },
                "to": {
                    "id": company_id,
                    "type": "company"
                },
                "type": "contact_to_company"
            }
        ]
    })
    headers = {
        'User-Agent': 'Apidog/1.0.0 (https://apidog.com)',
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {HUBSPOT_API_KEY}'
    }
    conn = http.client.HTTPSConnection("api.hubapi.com")
    conn.request("POST", f"/crm/v3/associations/contact/company/batch/create", payload, headers)
    associationRes = conn.getresponse()
    if associationRes.status == 201:
        print("Contact to Company Association created")
    else:
        print("Error creating Contact to Company Association")
    return associationRes.status

def add_hubspot_note(contact_id, company_id, content):
    payload = json.dumps({
        "properties": {
            "hs_timestamp": int(time.time() * 1000),
            "hs_note_body": content
        },
        "associations": [
            {
                "to": {
                    "id": contact_id
                },
                "types": [
                    {
                        "associationCategory": "HUBSPOT_DEFINED",
                        "associationTypeId": 202
                    }
                ]
            },
            {
                "to": {
                    "id": company_id
                },
                "types": [
                    {
                        "associationCategory": "HUBSPOT_DEFINED",
                        "associationTypeId": 190
                    }
                ]
            }
        ]
    })
    # print(payload)
    headers = {
        'User-Agent': 'Apidog/1.0.0 (https://apidog.com)',
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {HUBSPOT_API_KEY}'
    }
    conn = http.client.HTTPSConnection("api.hubapi.com")
    conn.request("POST", f"/crm/v3/objects/notes", payload, headers)
    noteRes = conn.getresponse()
    if noteRes.status == 201:
        print("Note created")
    else:
        print("Error creating note")
        print(noteRes.read())
    return noteRes.status


@app.route('/submit-form', methods=['POST'])
@cross_origin()
def handle_form_submission():
    # try:
    church_obj = church()
    json_data = request.get_json()
    church_obj.form_submission = json_data
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
    church_obj.facebook_profile = json_data.get("churchFacebook").replace("@", "")
    church_obj.instagram_profile = json_data.get("churchInstagram").replace("@", "")
    church_obj.contact_role = json_data.get("role")
    church_obj.search_params = json_data.get("searchParams")
    church_obj.social_clarity_score = 0
    church_obj.pdf_sent = 1

    global volume_search_last_month
    try:
        volume_search_last_month = metricas.start_historical(church_obj.city, church_obj.state)
    except:
        pass
    church_obj.volume_search_last_month = volume_search_last_month

    church_obj.get_digital_search_assesment_score()

    church_obj.get_map_image()
    church_obj.write_object_to_json()
    church_obj.created_at = int(time.time())

    data = {key: value for key, value in church_obj.__dict__.items()
                if not callable(value)}
    object_id = db_manage.insert_User(data)
    id = str(object_id)

    try:
        contact_id, company_id = post_hubspot_data(church_obj)
        db_manage.update_contact_company(id, contact_id, company_id)
    except Exception as error:
        print("Error: ", error)

    return jsonify({"id": str(id)})


@app.route('/api/fetch-data/<id>', methods=['GET'])
def fetch_data(id):
    try:
        info = db_manage.retrieve_User_complete_report(id)
        response_json = {
            'church_name': info.get('name'),
            'digitalVoice': info.get('voice_score'),
            'appleMaps': info.get('apple_maps_score'),
            'googleMaps': info.get('google_maps_score'),
            'socialClarity': info.get('social_clarity_score'),
            'websiteAuthority': info.get('domain_trust_score'),
            'last_month_searches': info.get('volume_search_last_month'),
            'loc_address': info.get('address'),
            'loc_zipcode': info.get('zipcode'),
            'loc_city': info.get('city'),
            'loc_state': info.get('state'),
            'website': info.get('webpage'),
            'keywords': info.get('domain_organic_keywords'),
            'map_image': info.get('map_image'),
            'data_file': info.get('data_file'),
            'pdf_file': info.get('pdf_file'),
            'created_at': info.get('created_at'),
            'vrVoice': 225,
            'vrMaps': 235,
            'vrSocial': 195,
            'vrWebsite': 205,
        }

        return jsonify(response_json)
    except Exception as error_msg:
        print("Error: ", error_msg)
        return jsonify({'message': 'Error getting data for id ' + id}), 400


@app.route('/api/fetch-data/<id>/json', methods=['GET'])
def fetch_data_json(id):
    try:
        info = db_manage.retrieve_User_complete_report(id)
        return json_util.dumps(info)
    except Exception as error_msg:
        print("Error: ", error_msg)
        return jsonify({'message': 'Error getting data for id ' + str(id)}), 400


@app.route('/api/fetch-runs', methods=['GET'])
def fetch_runs():
    try:
        page = request.args.get('page') or 1
        page_size = request.args.get('page_size') or 10
        data = []
        runs = db_manage.retrieve_runs(int(page), int(page_size))
        for run in runs:
            data.append({
                'id': str(run.get("_id")),
                'church_name': run.get("name"),
                'email': run.get("email"),
                'first_name': run.get("first_name"),
                'last_name': run.get("last_name"),
                'created_at': run.get("created_at")
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

def is_valid_domain(domain):
    # Regular expression to validate domain name
    regex = r'^(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$'
    return re.match(regex, domain) is not None

if __name__ == '__main__':
    from waitress import serve
    serve(app, host='0.0.0.0', port=8080)
