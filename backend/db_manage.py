import sqlite3
import time
import uuid
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

uri = "mongodb+srv://vr-aws:ax4wqbl9Ux1Q03GI@vr-test.simi1.mongodb.net/?appName=vr-test"
client = MongoClient(uri, server_api=ServerApi('1'))
db = client.digitalhealth

def get_data():
    data = [d for d in db.user_runs.find({})]
    return data

def init_connection():
    connection = sqlite3.connect("info/digital_assessment.db")
    cur = connection.cursor()
    return cur, connection


def close_connection(cur, connection):
    cur.close()
    connection.close()


def insert_User(first_name, last_name, mobile_phone, email, name, size, address, city, state, zipcode, webpage, phone, facebook_profile, instagram_profile, digital_voice, google_maps, apple_maps, social_clarity, website_authority, last_month_searches, pdf_sent, keywords, map_image, data_file, pdf_file):
    id = str(uuid.uuid4())
    cur, connection = init_connection()
    query = f"""
        INSERT INTO Users (id, first_name, last_name, mobile_phone, email, name, size, address, city, state, zipcode, webpage, phone, facebook_profile, instagram_profile, digital_voice, google_maps, apple_maps, social_clarity, website_authority, last_month_searches, pdf_sent, keywords, map_image, data_file, pdf_file, created_at) 
        VALUES ("{id}", "{first_name}", "{last_name}", "{mobile_phone}", "{email}", "{name}", "{size}", "{address}", "{city}", "{state}", "{zipcode}", "{webpage}", "{phone}", "{facebook_profile}", "{instagram_profile}", {digital_voice}, {google_maps}, {apple_maps}, {social_clarity}, {website_authority}, {last_month_searches}, {pdf_sent}, "{keywords}", "{map_image}", "{data_file}", "{pdf_file}", {int(time.time())})
    """
    cur.execute(query)
    connection.commit()
    close_connection(cur, connection)
    return id


def retrieve_User_complete_report(id):
    cur, connection = init_connection()
    query = f"""
                SELECT last_month_searches, digital_voice, google_maps, apple_maps, social_clarity, website_authority, state, city, zipcode, webpage, name, address, keywords, map_image, data_file, pdf_file, created_at  FROM Users WHERE id = '{id}'
            """
    cur.execute(query)
    try:
        results = cur.fetchall()[0]
        connection.commit()
        close_connection(cur, connection)
        return results
    except Exception as error:
        return None


def retrieve_runs(page, page_size):
    cur, connection = init_connection()
    query = f"""
                SELECT id, name, map_image, data_file, pdf_file, created_at FROM Users ORDER BY created_at DESC LIMIT {page_size} OFFSET {page_size * (page - 1)}
            """
    print(query)
    cur.execute(query)
    try:
        results = cur.fetchall()
        connection.commit()
        close_connection(cur, connection)
        return results
    except Exception as error:
        return None
    
def get_total_runs():
    cur, connection = init_connection()
    query = f"""
                SELECT COUNT(id) FROM Users
            """
    cur.execute(query)
    try:
        results = cur.fetchall()[0][0]
        connection.commit()
        close_connection(cur, connection)
        return results
    except Exception as error:
        return None
    

def update_contact_company(id, contact_id, company_id):
    cur, connection = init_connection()
    cur.execute(f"""
                    UPDATE Users
                    SET
                            hubspot_contact_id = {contact_id},
                            hubspot_company_id = {company_id}
                    WHERE
                            id = "{id}"
                """)
    try:
        results = cur.fetchall()
        connection.commit()
        close_connection(cur, connection)
        print("Update success contact/company")
    except Exception as error:
        print("Update failed")