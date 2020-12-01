from db_config import dbcursor, db
from flaskapp import bcrypt
import datetime

def db_signup(form_data):
    hashed_pass = bcrypt.generate_password_hash(form_data["password"]).decode('utf-8')
    data_tuple = (form_data["fname"], form_data["lname"], form_data["email"], form_data["uname"], hashed_pass)
    dbcursor.execute("INSERT INTO users (fname, lname, email, uname, password) values (%s, %s, %s, %s, %s)", data_tuple)
    db.commit()
    return dbcursor.lastrowid

def db_login(form_data):
    dbcursor.execute("SELECT password FROM users WHERE email = %s OR uname = %s", (form_data["form_field"], form_data["form_field"]))
    dbres = dbcursor.fetchone()
    if dbres and bcrypt.check_password_hash(dbres[0], form_data["password"]):
        return True
    else:
        return False

def place_deal(form_data, dealer_id):
    data_tuple = (form_data["name"], form_data["description"], form_data["symbol"], form_data["number"], form_data["amount"], dealer_id, "DEAL")
    dbcursor.execute("INSERT INTO deals (name, description, symbol, symbol_amount, total_amount, dealer_id, deal_type) VALUES (%s, %s, %s, %s, %s, %s, %s)", data_tuple)
    db.commit()

def feed_tracker_data(data, user_id):
    data_tuple = (data["symbol"], data["amount"], user_id)
    dbcursor.execute("INSERT INTO stock_tracker (symbol, amount, user_id) VALUES (%s, %s, %s)", data_tuple)
    db.commit()

def value_tracker(ticker_name):
    now = datetime.datetime.now()
    start = now.replace(hour=0, minute=0, second=0, microsecond=1)
    sum = 0
    num = 0
    avg = None
    data_tuple = (start, now, ticker_name)
    dbcursor.execute("SELECT * FROM stock_transactions WHERE date >= %s AND date <= %s AND give = %s", data_tuple)
    dbres = dbcursor.fetchall()
    if dbres:
        for res in dbres:
            if res[8] == "DEAL":
                if res[4] == "money":
                    num += res[3]
                    sum += num*res[5]
        avg = sum/num
    return avg
        