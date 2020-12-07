"""This script api endpoint ans api auth process"""

from flask import request, session, jsonify, send_file
from flaskapp import app
from api_db_functions import db_routine
from api_calc import result_calc
from db import dbcursor, db


@app.route('/api/auth', methods=["POST"])
def api_auth():
    """This method contains API auth process"""

    if "auth_field" in session:
        session["api_auth"] = True
        return send_file("DB_CONFIG.json")

    else:
        #Outer scope auth logic
        return jsonify("error")

@app.route('/api', methods=["GET", "POST"])
def api():
    """This method parses requests and calls appropriate routines"""
    if "api_auth" in session and session["api_auth"] == True:
        query_json = request.get_json()
        res = db_routine(query_json, session["perms"], session["auth_field"], session["offset"])
        if "offset" in res and res["offset"] != 0:
            session["offset"] = res["offset"]
        return jsonify(res)


@app.route('/api/calc', methods=["GET", "POST"])
def api_calc():
    """This method is endpoint for api calc"""
    if "api_auth" in session and session["api_auth"] == True:
        query_json = request.get_json()
        res = result_calc(query_json)
        return jsonify(res)

@app.route('/api/offset', methods=["GET"])
def reset_offset():
    if "api_auth" in session and session["api_auth"] == True:
        session["offset"] = 0
        return jsonify(200)