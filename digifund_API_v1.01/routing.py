from flask import render_template, request, redirect, session, jsonify, url_for
from flaskapp import app
import db, random
from email_auth import email_auth

@app.route('/')
@app.route('/home', methods=["GET"])
def homepage():
    return render_template('index.html')

@app.route('/signup', methods=["GET", "POST"])
def signup():
    if request.method == "POST":
        session["fname"] = request.form.get("fname")
        session["lname"] = request.form.get("lname")
        session["email"] = request.form.get("email")
        session["uname"] = request.form.get("uname")
        session["password"] = request.form.get("password")
        return redirect(url_for("auth"))
    return render_template('signup.html')

@app.route('/authentication', methods=["GET", "POST"])
def auth():
    if "email" in session:
        CODE = str(random.randrange(1000, 9999))
        if request.method == "POST":
            data = request.get_json()
            code = data["auth_code"]
            print(code)
            if code == session["auth-code"]:
                db.signup(session)
                email = session["email"]
                session.clear()
                session["auth_field"] = email
                session["perms"] = "ADMIN"
                return jsonify(url_for("dashboard"))
            else:
                return jsonify(404)
        session["auth-code"] = CODE
        email_auth(session["email"], CODE)
        return render_template('email.auth.html')

@app.route('/checkuser', methods=["POST"])
def is_user():
    print(request.get_json())
    return jsonify(db.is_user(request.get_json()))

@app.route('/login', methods=["GET", "POST"])
def login():
    if request.method == "POST":
        if(request.form):
            creds = request.form
            status_code = db.login(creds)
            if status_code == 200:
                session["auth_field"] = creds["uname"]
                session["perms"] = "ADMIN"
                return redirect(url_for("dashboard"))
            else:
                return jsonify(status_code)
        if(request.get_json()):
            json = request.get_json()
            res = db.login(json)
            return jsonify(res)
    return render_template('login.html')

@app.route('/dashboard', methods=["GET", "POST"])
def dashboard():
    if "auth_field" in session:
        if request.method == "GET":
            return render_template("worksheet.html")

@app.route('/logout', methods=["GET"])
def logout():
    session.clear()
    return render_template('login.html')