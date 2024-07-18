from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from bson import ObjectId

uri = "mongodb+srv://vr-aws:ax4wqbl9Ux1Q03GI@vr-dev.simi1.mongodb.net/?appName=vr-dev"
client = MongoClient(uri, server_api=ServerApi('1'))
db = client.digitalhealth

def insert_User(data):
    result = db.user_runs.insert_one(data)
    id = result.inserted_id
    return id

def update_User(id, data):
    db.user_runs.update_one({"_id": ObjectId(id)}, {"$set":data})
    data = db.user_runs.find_one({"_id": ObjectId(id)})
    return data


def retrieve_User_complete_report(id):
    try:
        result = db.user_runs.find_one({"_id": ObjectId(id)})
        return result
    except Exception as error:
        print(error)
        return None


def retrieve_runs(page, page_size):
    try:
        data = [d for d in db.user_runs.find({}).skip(page_size * (page - 1)).limit(page_size).sort("created_at", -1)]
        return data
    except Exception as error:
        print(error)
        return None

def get_status(id):
    try:
        result = db.user_runs.find_one({"_id": ObjectId(id)}, {"process_status": 1, "process_status_message": 1, "_id": 0})
        return result
    except Exception as error:
        print(error)
        return None
    
def get_total_runs():
    try:
        count = db.user_runs.count_documents({})
        return count
    except Exception as error:
        print(error)
        return None
    

def update_contact_company(id, contact_id, company_id):
    db.user_runs.update_one({"_id": ObjectId(id)}, {"$set": {"hubspot_contact_id": contact_id, "hubspot_company_id": company_id, "pdf_sent": 0}})
    data = db.user_runs.find_one({"_id": ObjectId(id)})
    return data


def retrieve_email_missing_pdf():
    try:
        results = db.user_runs.find({"pdf_sent": 0})
        return results
    except Exception as error:
        print(error)
        return None
    

def update_sent_pdf(id, file_name):
    try:
        db.user_runs.update_one({"_id": ObjectId(id)}, {"$set": {"pdf_sent": 1, "pdf_file": file_name}})
        print(f"Updated run pdf_sent = 1, pdf_file = {file_name}")
    except Exception as error:
        print("Update pdf_sent=1 failed")
        print(error)

def update_process_status(id, status, message):
    try:
        result = db.user_runs.find_one({"_id": ObjectId(id)})
        oldStatus = result.get("process_status")
        status += oldStatus
        db.user_runs.update_one({"_id": ObjectId(id)}, {"$set": {"process_status": status, "process_status_message": message}})
        print(f"Updated run process_status = {status}, message = {message}")
    except Exception as error:
        print("Update process_status failed")
        print(error)