"""This script contains all methods that involve communication with db"""

import mysql.connector
from flaskapp import bcrypt

USER = "root"
PASS = "rougeami"
_DB = "rfr_calc"

db = mysql.connector.connect(host="localhost", user=USER, password=PASS, database=_DB)

dbcursor = db.cursor(buffered=True)

def signup(creds):
    password_hash = bcrypt.generate_password_hash(password=creds["password"]).decode('utf-8')
    dbcursor.execute("INSERT INTO user (fname, lname, email, uname, password) VALUES (%s, %s, %s, %s, %s)", (creds["fname"], creds["lname"], creds["email"], creds["uname"], password_hash))
    db.commit()
    return 200

def login(creds):
    dbcursor.execute("SELECT password FROM user WHERE uname = %s OR email = %s", (creds["uname"], creds["uname"],))
    dbresult = dbcursor.fetchone()

    if dbresult:
        if bcrypt.check_password_hash(dbresult[0], creds["password"]):
            return 200
        else:
            return 401
    else:
        return 404

def is_user(creds):
    """This method checks for existing usernames or emails"""
    res = {}
    dbcursor.execute("SELECT * from user WHERE email = %s", (creds["email"],))
    dbresult = dbcursor.fetchone()
    if (dbresult):
        res["email"] = True
    else:
        res["email"] = False

    dbcursor.execute("SELECT * from user WHERE uname = %s", (creds["uname"],))
    dbresult = dbcursor.fetchone()
    if (dbresult):
        res["uname"] = True
    else:
        res["uname"] = False

    return res