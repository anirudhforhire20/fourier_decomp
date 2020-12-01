from flaskapp import app
from flask import request, jsonify, render_template, redirect, url_for, session, flash
from auth import SignupForm, LoginForm
from forms import DealForm, BidForm
from db_methods import db_signup, db_login, place_deal, feed_tracker_data, value_tracker
from db_config import dbcursor, db
import datetime, threading, notify

@app.route('/signup', methods=["GET", "POST"])
def signup():
    form = SignupForm()
    if form.validate_on_submit():
        _id = db_signup(request.form)
        feed_tracker_data({
            "amount": 100000,
            "symbol": "money"
        }, _id)
        session.clear()
        session["auth_field"] = request.form["uname"]
        session['email'] = request.form['email']
        session["_id"] = _id
        notify_tuple = (session['email'], 'Welcome to Virtual stock exchange', 'Hope you enjoy')
        n = threading.Thread(target=notify.notification, args=notify_tuple)
        n.start()
        return redirect(url_for('dashboard'))
    else:
        return render_template('signup.html', form=form)


@app.route('/login', methods=["GET", "POST"])
def login():
    if "auth-field" not in session:
        form = LoginForm()
        if form.validate_on_submit():
            if db_login(request.form):
                session["auth_field"] = request.form["form_field"]
                dbcursor.execute("SELECT _id FROM users WHERE email = %s OR uname = %s", (session["auth_field"], session["auth_field"]))
                dbres = dbcursor.fetchone()
                session["_id"] = dbres[0]
                return redirect(url_for('dashboard'))
            else:
                return render_template('login.html', form=form, auth_error="Incorrect username, email, or password")
        else:
            return render_template('login.html', form=form, auth_error="")
    else:
        return redirect(url_for('dashboard'))

@app.route('/logout', methods=["GET"])
def logout():
    if "auth_field" in session:
        session.clear()
        return redirect(url_for('login'))
    else:
        return redirect(url_for('login'))



@app.route('/dashboard', methods=["GET", "POST"])
def dashboard():
    if "auth_field" in session:
        return render_template('dashboard.html')
    else:
        return redirect(url_for('login'))


@app.route('/', methods=["GET"])
@app.route('/home', methods=["GET"])
def homepage():
    return render_template('index.html')


@app.route('/myaccount', methods=["GET", "POST"])
def my_account():
    if "auth_field" in session:
        dbcursor.execute("SELECT amount FROM stock_tracker WHERE user_id = %s AND symbol = %s", (session['_id'], 'money'))
        dbres = dbcursor.fetchone()
        form = DealForm(user_id=session['_id'])
        if form.validate_on_submit():
            place_deal(request.form, session["_id"])
            dbcursor.execute("UPDATE stock_tracker SET amount = amount - %s WHERE symbol = %s AND user_id = %s", (request.form['number'], request.form['symbol'], session['_id']))
            db.commit()
            flash('Deal placed successfully', 'success')
            return render_template('my.account.html', auth_name=session["auth_field"], funds=dbres[0], form=form)
        else:
            return render_template('my.account.html', auth_name=session["auth_field"], funds=dbres[0], form=form)


@app.route('/company', methods=["GET"])
def company():
    if "auth_field" in session:
        ticker = request.args['ticker']
        dbcursor.execute("SELECT * FROM company WHERE ticker = %s", (ticker,))
        dbres = dbcursor.fetchone()
        value = value_tracker(ticker)
        return render_template('company.info.html', dbres=dbres, value=value)

@app.route('/tickers', methods=["GET"])
def tickers():
    if "auth_field" in session:
        dbcursor.execute("SELECT * FROM company")
        dbres = dbcursor.fetchall()
        return render_template('ticker.list.html', dbres=dbres)

@app.route('/market', methods=["GET"])
def market():
    if "auth_field" in session:
        dbcursor.execute("SELECT * FROM deals")
        dbres = dbcursor.fetchall()
        return render_template('marketplace.html', dbres=dbres)

@app.route('/deal', methods=["GET", "POST"])
def deal():
    if "auth_field" in session:
        form = BidForm(user_id=session['_id'])
        if form.validate_on_submit():
            deal_id = request.args['deal_id']
            acc_id = request.args['acc_id']
            number = request.form['number']
            symbol = request.form['symbol']
            return redirect(url_for('request_bid', deal_id=deal_id, acc_id=acc_id, number=number, symbol=symbol))
        else:
            if 'id' in request.args:
                _id = request.args['id']
                session['deal_id'] = _id
                dbcursor.execute("SELECT * FROM deals WHERE _id = %s", (_id,))
                dbres = dbcursor.fetchone()
                return render_template("deal.room.html", dbres=dbres, form=form, acc_id=session["_id"])
            else:
                dbcursor.execute("SELECT * FROM deals WHERE _id = %s", (session['deal_id'],))
                dbres = dbcursor.fetchone()
                return render_template("deal.room.html", dbres=dbres, form=form, acc_id=session["_id"])

@app.route('/request-deal', methods=["POST"])
def request_deal():
    if "auth_field" in session:
        deal_id = request.args['deal_id']
        acc_id = request.args['acc_id']
        dbcursor.execute("SELECT dealer_id FROM deals WHERE _id = %s", (deal_id,))
        dbres = dbcursor.fetchone()
        dbcursor.execute("SELECT email FROM users WHERE _id = %s", (dbres[0],))
        dbres1 = dbcursor.fetchone()
        if str(acc_id) == str(dbres[0]):
            flash('You cannot bid on your own deal', 'danger')
            return redirect(url_for('deal', id=deal_id))
        dbcursor.execute("SELECT * FROM proposals WHERE proposer_id = %s AND deal_id = %s AND proposal_type = %s", (acc_id, deal_id, "money"))
        dbres = dbcursor.fetchone()
        if not dbres:
            dbcursor.execute("SELECT total_amount FROM deals WHERE _id = %s", (deal_id,))
            dbres = dbcursor.fetchone()
            data_tuple = (acc_id, deal_id, "money", dbres[0])
            dbcursor.execute("INSERT INTO proposals (proposer_id, deal_id, proposal_type, bid_amount) VALUES (%s, %s, %s, %s)", data_tuple)
            db.commit()
            flash('Deal requested successfully', 'success')
            notify_tuple = (dbres1[0], session['auth_field'] + ' made a request for your deal', session['auth_field'] + ' made a request for your deal. Go check it out now!')
            n = threading.Thread(target=notify.notification, args=notify_tuple)
            n.start()
            return redirect(url_for('deal', id=deal_id))
        else:
            return redirect(url_for('deal', id=deal_id))

@app.route('/request-bid', methods=["GET"])
def request_bid():
    if "auth_field" in session:
        deal_id = request.args['deal_id']
        acc_id = request.args['acc_id']
        bid_type = request.args['symbol']
        bid_amount = request.args["number"]
        dbcursor.execute("SELECT dealer_id FROM deals WHERE _id = %s", (deal_id,))
        dbres = dbcursor.fetchone()
        dbcursor.execute("SELECT email FROM users WHERE _id = %s", (dbres[0],))
        dbres1 = dbcursor.fetchone()
        if str(acc_id) == str(dbres[0]):
            flash('You cannot bid on your own deal', 'danger')
            return redirect(url_for('deal', id=deal_id))
        data_tuple = (acc_id, deal_id, bid_type, bid_amount)
        dbcursor.execute("INSERT INTO proposals (proposer_id, deal_id, proposal_type, bid_amount) VALUES (%s, %s, %s, %s)", data_tuple)
        db.commit()
        flash('Bid requested successfully', 'success')
        notify_tuple = (dbres1[0], session['auth_field'] + ' made a bid for your deal', session['auth_field'] + ' made a bid for your deal. Go check it out now!')
        n = threading.Thread(target=notify.notification, args=notify_tuple)
        n.start()
        return redirect(url_for('deal', id=deal_id))

@app.route('/proposals', methods=["GET"])
def list_proposals():
    if "auth_field" in session:
        dbcursor.execute("SELECT _id FROM deals WHERE dealer_id = %s", (session['_id'],))
        dbres = dbcursor.fetchall()
        data_list = []
        for _id in dbres:
            dbcursor.execute("SELECT * FROM proposals WHERE deal_id = %s", (_id[0],))
            dbres = dbcursor.fetchall()
            for data in dbres:
                dbcursor.execute("SELECT uname FROM users WHERE _id = %s", (data[1],))
                dbres = dbcursor.fetchone()
                data_list.append([data, dbres[0]])
        return render_template('proposals.html', data_list=data_list)

@app.route('/proposal', methods=["GET"])
def proposal():
    if "auth_field" in session:
        _id = request.args['id']
        dbcursor.execute("SELECT * FROM proposals WHERE _id = %s", (_id,))
        dbres = dbcursor.fetchone()
        dbcursor.execute("SELECT name, symbol, symbol_amount, total_amount, deal_type FROM deals WHERE _id = %s", (dbres[2],))
        dbres1 = dbcursor.fetchone()
        dbcursor.execute("SELECT uname, _id FROM users WHERE _id = %s", (dbres[1],))
        dbres2 = dbcursor.fetchone()
        return render_template('proposal.html', dbres=dbres, dbres1=dbres1, dbres2=dbres2, proposal_id=_id)

@app.route('/make-deal', methods=["POST"])
def make_deal():
    if "auth_field" in session:
        deal_id = request.args['deal_id']
        user_id = request.args['uid']
        take = request.args['take']
        take_amt = request.args['take_amt']
        give = request.args['give']
        give_amt = request.args['give_amt']
        deal_type = request.args['type']
        deal_date = datetime.datetime.today()
        if deal_type == "IPO":
            dbcursor.execute("SELECT dealer_id FROM deals WHERE _id = %s", (deal_id,))
            dbres = dbcursor.fetchone()
            giver_id = dbres[0]
            data_tuple = (deal_date, give, give_amt, take, take_amt, giver_id, user_id, deal_type)
            dbcursor.execute("INSERT INTO stock_transactions (date, give, give_amount, take, take_amount, giver_id, taker_id, type) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)", data_tuple)
            dbcursor.execute("DELETE FROM deals WHERE _id = %s", (deal_id,))
            dbcursor.execute("UPDATE stock_tracker SET amount = amount - %s WHERE user_id = %s AND symbol = %s", (take_amt, user_id, take))
            
            dbcursor.execute("SELECT symbol FROM stock_tracker WHERE user_id = %s AND symbol = %s", (user_id, give))
            dbres = dbcursor.fetchone()
            if dbres:
                dbcursor.execute("UPDATE stock_tracker SET amount = amount + %s WHERE user_id = %s AND symbol = %s", (give_amt, user_id, give))
            else:
                dbcursor.execute("INSERT INTO stock_tracker (user_id, amount, symbol) VALUES (%s, %s, %s)", (user_id, give_amt, give))
            db.commit()
            flash('Deal made successfully', 'success')
            return redirect(url_for('market'))
        else:
            giver_id = session['_id']
            data_tuple = (deal_date, give, give_amt, take, take_amt, giver_id, user_id, deal_type)
            dbcursor.execute("INSERT INTO stock_transactions (date, give, give_amount, take, take_amount, giver_id, taker_id, type) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)", data_tuple)
            dbcursor.execute("DELETE FROM deals WHERE _id = %s", (deal_id,))
            dbcursor.execute("UPDATE stock_tracker SET amount = amount - %s WHERE user_id = %s AND symbol = %s", (take_amt, user_id, take))
            dbcursor.execute("SELECT symbol FROM stock_tracker WHERE user_id = %s AND symbol = %s", (giver_id, take))
            dbres = dbcursor.fetchone()
            if dbres:
                dbcursor.execute("UPDATE stock_tracker SET amount = amount + %s WHERE user_id = %s AND symbol = %s", (take_amt, giver_id, take))
            else:
                dbcursor.execute("INSERT INTO stock_tracker (user_id, amount, symbol) VALUES (%s, %s, %s)", (giver_id, take_amt, take))
            
            dbcursor.execute("SELECT symbol FROM stock_tracker WHERE user_id = %s AND symbol = %s", (user_id, give))
            dbres = dbcursor.fetchone()
            if dbres:
                dbcursor.execute("UPDATE stock_tracker SET amount = amount + %s WHERE user_id = %s AND symbol = %s", (give_amt, user_id, give))
            else:
                dbcursor.execute("INSERT INTO stock_tracker (user_id, amount, symbol) VALUES (%s, %s, %s)", (user_id, give_amt, give))
            db.commit()
            flash('Deal made successfully', 'success')
            dbcursor.execute("SELECT email FROM users WHERE _id = %s", (user_id,))
            dbres1 = dbcursor.fetchone()
            notify_tuple = (dbres1[0], 'Congratulations! your request was accepted', session['auth_field'] + ' Approved your deal! You now own ' + str(give_amt) + ' stocks of ' + str(give))
            n = threading.Thread(target=notify.notification, args=notify_tuple)
            n.start()
            return redirect(url_for('list_proposals'))


@app.route('/transactions')
def transactions():
    if "auth_field" in session:
        dbcursor.execute("SELECT * FROM stock_transactions WHERE taker_id = %s OR giver_id = %s", (session['_id'], session['_id']))
        dbres = dbcursor.fetchall()
        data_list = []
        if dbres:
            for transaction in dbres:
                dbcursor.execute("SELECT uname FROM users WHERE _id = %s", (transaction[7],))
                dbres1 = dbcursor.fetchone()
                if transaction[8] == "IPO":
                    dbcursor.execute("SELECT name FROM company WHERE _id = %s", (transaction[6],))
                    dbres2 = dbcursor.fetchone()
                else:
                    dbcursor.execute("SELECT uname FROM users WHERE _id = %s", (transaction[6],))
                    dbres2 = dbcursor.fetchone()
                data_list.append([transaction, dbres1[0], dbres2[0]])
            return render_template('transactions.html', data_list=data_list)
        else:
            return render_template('transactions.html', data_list=data_list)        