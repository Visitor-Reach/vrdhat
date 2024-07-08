from flask import Flask, request, jsonify
from bson import json_util
import backend.db_manage as db_manage

app = Flask(__name__)

@app.route('/', methods=['GET'])
def get():
  data = db_manage.retrieve_runs(1, 10)
  count = db_manage.get_total_runs()
  stuff = {
    "count": count,
    "data": data
  }
  return json_util.dumps(stuff)

@app.route('/<id>', methods=['GET'])
def get_one(id):
  data = db_manage.retrieve_User_complete_report(id)
  return json_util.dumps(data)

@app.route('/', methods=['POST'])
def insert():
  id = db_manage.insert_User(request.get_json())
  data = db_manage.retrieve_User_complete_report(id)
  return json_util.dumps(data)

@app.route('/<id>', methods=['PATCH'])
def update(id):
  data = db_manage.update_contact_company(id, 'asdfasdf', '12341234')
  return json_util.dumps(data)

if __name__ == '__main__':
  app.run(host='0.0.0.0', port=8090, debug=True)