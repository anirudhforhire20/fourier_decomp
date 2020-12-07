from flask import render_template, request, redirect, session, jsonify, url_for
from flaskapp import app
from api_db_functions import db_routine
from api_calc import result_calc
from db import db, dbcursor


"""Trial user endpoints"""

@app.route('/demo')
def demopage():
    session["auth_field"] == "TRIAL_USER"
    return render_template('demopage.html')


@app.route('trial/calc')
def trial():
    if "auth_field" in session and session["auth_field"] == "TRIAL_USER":
        data = request.args
        day_count = 0
        if data['day_count'] == "Act/360":
            day_count = 360
        else:
            day_count = 365
        data_tuple = ("name1", "type1", day_count, data['day_count'], data['int_method'], data['lookback'], data['obs_shift'], data['rounding'], data['cas'], data['margin'], data['floor'], session['deal_id'], data['rfr_symbol'], data['holiday'], "p1", "fb")
        dbcursor.execute("INSERT INTO instrument(name, type, day_count, day_count_basis, int_method, lookback, obs_shift, rounding, cas, margin, floor, cap, payment_freq, deal_id, symbol, holiday_cal, rate_pricing, fixed_baserate) VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)", data_tuple)
        db.commit()
        inst_id = dbcursor.lastrowid
        data_tuple = ("a1", "b1", data['tr_amt1'], "d1", "e1", "f1", inst_id, "g1", "h1")
        dbcursor.execute("INSERT INTO tranche(component, payment_opt, amount, payment_freq, rate_pricing, instrument_id, uni_tranche, do_recalc) VALUES(%s, %s, %s, %s, %s, %s ,%s ,%s )", data_tuple)
        db.commit()
        tr_id = dbcursor.lastrowid
        data_tuple = (tr_id, data['from_date'], data['to_date'], data['cas'], data['margin'], data['floor'], data['cap'])
        ["_id", "tranche_id", "start_date", "end_date", "cas", "margin", "floor", "cap"]
        dbcursor.execute("INSERT INTO int_period(tranche_id, start_date, end_date, cas, margin, floor, cap) VALUES(%s, %s, %s, %s, %s, %s, %s)", data_tuple)
        db.commit()
        int_id = lastrowid
        result_calc(int_id)
        dbcursor.execute("SELECT * FROM results WHERE int_period_id = %s", (inst_id,))
        res = dbcursor.fetchall()
        res_l = []
        for r in res:
            res_l.append(list(r))
        return jsonify(res_l)