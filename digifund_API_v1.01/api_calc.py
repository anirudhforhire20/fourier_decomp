"""This script contains all methods for calculating appropriate results table fields"""

from db import db, dbcursor
import datetime
from decimal import Decimal


def is_business_date(date, country):
    if datetime.date.fromisoformat(date).weekday() >= 5:
        return False
    else:
        dbcursor.execute("SELECT * FROM holidays WHERE country = %s AND date = %s", (country, date))
        dbres = dbcursor.fetchall()
        if dbres:
            return False
        else:
            return True


def prev_business_date(date, country, lookback):
    if lookback == 0:
        day = 0
        while True:
            _new_date = datetime.date.fromisoformat(date) - datetime.timedelta(days=day)
            if is_business_date(_new_date.isoformat(), country):
                return _new_date.isoformat()
            day += 1
    else:
        i = 1
        day = 1
        while i <= lookback:
            _new_date = datetime.date.fromisoformat(date) - datetime.timedelta(days=day)
            if is_business_date(_new_date.isoformat(), country):
                i += 1
            day += 1
        return _new_date.isoformat()


def get_benchmark(date, country, lookback, int_period_id):
    prev_date = prev_business_date(date, country, lookback)
    dbcursor.execute("SELECT tranche_id FROM int_period WHERE _id = %s", (int_period_id,))
    dbres = dbcursor.fetchone()
    dbcursor.execute("SELECT instrument_id FROM tranche WHERE _id = %s",
                        (dbres[0],))
    dbres1 = dbcursor.fetchone()
    dbcursor.execute("SELECT symbol FROM instrument WHERE _id = %s", (dbres1[0],))
    dbres2 = dbcursor.fetchone()
    dbcursor.execute("SELECT rate FROM base_rate WHERE symbol = %s AND date = %s", (dbres2[0], prev_date))
    dbres3 = dbcursor.fetchone()
    if dbres3:
        return prev_date
    else:
        return get_benchmark(date, country, lookback + 1, int_period_id)



def result_calc(int_period_id):
    dbcursor.execute("SELECT tranche_id, start_date, end_date, cas, margin, floor, cap FROM int_period WHERE _id = %s", (int_period_id, ))
    dbres1 = dbcursor.fetchone()
    dbcursor.execute("SELECT instrument_id, amount FROM tranche WHERE _id = %s", (dbres1[0], ))
    dbres2 = dbcursor.fetchone()
    dbcursor.execute("SELECT int_method, day_count, lookback, obs_shift, rounding, symbol, holiday_cal, cas, margin, floor, cap, fixed_baserate FROM instrument WHERE _id = %s", (dbres2[0], ))
    dbres3 = dbcursor.fetchone()
    INT_METHOD = dbres3[0]
    HOLIDAY_CAL = dbres3[6]
    SYMBOL = dbres3[5]
    PRINCIPAL_AMOUNT = dbres2[1]
    LOOKBACK = dbres3[2]
    OBS_SHIFT = dbres3[3]
    ROUNDING = dbres3[4]
    DAY_COUNT = dbres3[1]
    CAS = dbres1[3]
    CAP = dbres1[6]
    MARGIN = dbres1[4]
    FLOOR = dbres1[5]
    FIXED_BASERATE = dbres3[11]
    if FIXED_BASERATE is not None:
        success = result_calc_fixed(int_period_id)
        return success

    if INT_METHOD.lower() == "compound":
        START_DATE = dbres1[1]
        END_DATE = dbres1[2]
        sub_period = []
        _days = END_DATE - START_DATE
        for i in range(_days.days + 1):
            new_date = START_DATE + datetime.timedelta(days=i)
            if is_business_date(new_date.isoformat(), HOLIDAY_CAL):
                sub_period.append(new_date)

        CUM_DAYS_INT = 0
        comp_factor = 1
        prev_un_comp_rfr = 0
        CUM_DAYS_OBS = 0
        CUM_TOTAL_INT = 0
        for i in range(len(sub_period) - 1):
            start_date = sub_period[i]
            end_date = sub_period[i + 1]
            cal_obj = end_date - start_date
            CAL_DAYS_INT = cal_obj.days
            CUM_DAYS_INT += CAL_DAYS_INT
            BENCHMARK_DATE = get_benchmark(start_date.isoformat(), HOLIDAY_CAL, LOOKBACK, int_period_id)
            dbcursor.execute("SELECT tranche_id FROM int_period WHERE _id = %s", (int_period_id, ))
            dbres1 = dbcursor.fetchone()
            dbcursor.execute("SELECT amount FROM transactions WHERE date = %s AND tranche_id = %s", (start_date, dbres1[0]))
            dbres2 = dbcursor.fetchall()
            if dbres2:
                for res in dbres2:
                    PRINCIPAL_AMOUNT += res[0] 
            dbcursor.execute("SELECT rate FROM base_rate WHERE date = %s AND symbol = %s", (BENCHMARK_DATE, SYMBOL))
            res = dbcursor.fetchone()
            BASE_RATE = res[0]
            if BASE_RATE + CAS >= FLOOR and BASE_RATE + CAS <= CAP:
                FLOOR_RATE = BASE_RATE
            else:
                if BASE_RATE + CAS <= FLOOR:
                    FLOOR_RATE = FLOOR - CAS
                elif BASE_RATE + CAS >= CAP:
                    FLOOR_RATE = CAP - CAS

            if OBS_SHIFT.upper() == "WITHOUT":
                eff_rfr = Decimal(FLOOR_RATE)*Decimal(CAL_DAYS_INT)/Decimal(DAY_COUNT*100)
                comp_factor *= (1 + eff_rfr)
                comp_rfr = round(Decimal(comp_factor - 1)*Decimal((DAY_COUNT*100)/CUM_DAYS_INT), ROUNDING)
                new_un_comp_rfr = comp_rfr*Decimal(CUM_DAYS_INT/(DAY_COUNT*100))
                non_cum_rfr = Decimal(new_un_comp_rfr - prev_un_comp_rfr)*Decimal(DAY_COUNT/CAL_DAYS_INT)*Decimal(100)
                prev_un_comp_rfr = new_un_comp_rfr
                daily_rate = non_cum_rfr + CAS + MARGIN
                earn_base_rate_int = PRINCIPAL_AMOUNT*non_cum_rfr*Decimal(CAL_DAYS_INT/(DAY_COUNT*100))
                earn_cas_int = PRINCIPAL_AMOUNT*CAS*Decimal(CAL_DAYS_INT/(DAY_COUNT*100))
                earn_margin_int = PRINCIPAL_AMOUNT*MARGIN*Decimal(CAL_DAYS_INT/(DAY_COUNT*100))
                earn_int_total = earn_base_rate_int + earn_cas_int + earn_margin_int
                CUM_TOTAL_INT += earn_int_total
                dbcursor.execute(
                    "INSERT INTO results (`index`, `int_period_id`, `principal_bal`, `benchmark_date`, `start_date`, `end_date`, `cal_days`, `cum_int_days`, `base_rate`, `cas`, `cap`, `floor`, `margin`, `eff_rfr`, `comp_factor`, `comp_rfr`, `non_cum_rfr`, `earn_base_int`, `earn_cas_int`, `earn_margin_int`, `earn_total_int`, `un_comp_rfr`, `adj_base_rate`, `daily_all-in_rate`, `cum_int_total`) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)",
                    (
                    i + 1, int_period_id, PRINCIPAL_AMOUNT, BENCHMARK_DATE, sub_period[i],
                    sub_period[i + 1], CAL_DAYS_INT, CUM_DAYS_INT,
                    BASE_RATE, CAS, CAP, FLOOR, MARGIN, eff_rfr, comp_factor,
                    comp_rfr, non_cum_rfr, earn_base_rate_int, earn_cas_int, earn_margin_int, earn_int_total, new_un_comp_rfr, FLOOR_RATE, daily_rate, CUM_TOTAL_INT))

            elif OBS_SHIFT.upper() == "WITH":
                START_DATE_OBS = prev_business_date(start_date.isoformat(), HOLIDAY_CAL, LOOKBACK)
                END_DATE_OBS = prev_business_date(start_date.isoformat(), HOLIDAY_CAL, LOOKBACK - 1)
                obs_obj = datetime.date.fromisoformat(END_DATE_OBS) - datetime.date.fromisoformat(START_DATE_OBS)
                CAL_DAYS_OBS = obs_obj.days
                CUM_DAYS_OBS += CAL_DAYS_OBS
                eff_rfr = Decimal(FLOOR_RATE) * Decimal(CAL_DAYS_OBS) / Decimal(DAY_COUNT * 100)
                comp_factor *= (1 + eff_rfr)
                comp_rfr = round(Decimal(comp_factor - 1) * Decimal((DAY_COUNT * 100) / CUM_DAYS_OBS), ROUNDING)
                new_un_comp_rfr = comp_rfr * Decimal(CUM_DAYS_INT / (DAY_COUNT * 100))
                non_cum_rfr = Decimal(new_un_comp_rfr - prev_un_comp_rfr) * Decimal(
                    DAY_COUNT / CAL_DAYS_INT) * Decimal(100)
                prev_un_comp_rfr = new_un_comp_rfr
                daily_rate = non_cum_rfr + CAS + MARGIN
                earn_base_rate_int = PRINCIPAL_AMOUNT * non_cum_rfr * Decimal(CAL_DAYS_INT / (DAY_COUNT*100))
                earn_cas_int = PRINCIPAL_AMOUNT * CAS * Decimal(CAL_DAYS_INT / (DAY_COUNT*100))
                earn_margin_int = PRINCIPAL_AMOUNT * MARGIN * Decimal(CAL_DAYS_INT / (DAY_COUNT*100))
                earn_int_total = earn_base_rate_int + earn_cas_int + earn_margin_int
                CUM_TOTAL_INT += earn_int_total
                dbcursor.execute(
                    "INSERT INTO results (`index`, `int_period_id`, `principal_bal`, `benchmark_date`, `start_date`, `end_date`, `cal_days`, `cum_int_days`, `cal_days_obs`, `obs_start_date`, `obs_end_date`, `base_rate`, `cas`, `cap`, `floor`, `margin`, `eff_rfr`, `comp_factor`, `comp_rfr`, `non_cum_rfr`, `earn_base_int`, `earn_cas_int`, `earn_margin_int`, `earn_total_int`, `un_comp_rfr`, `adj_base_rate`, `daily_all-in_rate`, `cum_obs_days`, `cum_int_total`) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)",
                    (
                    i + 1, int_period_id, PRINCIPAL_AMOUNT, BENCHMARK_DATE, sub_period[i],
                    sub_period[i + 1], CAL_DAYS_INT, CUM_DAYS_INT, CAL_DAYS_OBS, START_DATE_OBS, END_DATE_OBS,
                    BASE_RATE, CAS, CAP, FLOOR, MARGIN, eff_rfr, comp_factor,
                    comp_rfr, non_cum_rfr, earn_base_rate_int, earn_cas_int, earn_margin_int, earn_int_total, new_un_comp_rfr, FLOOR_RATE, daily_rate, CUM_DAYS_OBS, CUM_TOTAL_INT))


    elif INT_METHOD.lower() == "simple":
        START_DATE = dbres1[1]
        END_DATE = dbres1[2]
        sub_period = []
        _days = END_DATE - START_DATE
        for i in range(_days.days + 1):
            new_date = START_DATE + datetime.timedelta(days=i)
            if is_business_date(new_date.isoformat(), HOLIDAY_CAL):
                sub_period.append(new_date)

        CUM_DAYS_INT = 0
        comp_factor = 1
        prev_un_comp_rfr = 0
        CUM_DAYS_OBS = 0
        CUM_TOTAL_INT = 0
        for i in range(len(sub_period) - 1):
            start_date = sub_period[i]
            end_date = sub_period[i + 1]
            cal_obj = end_date - start_date
            CAL_DAYS_INT = cal_obj.days
            CUM_DAYS_INT += CAL_DAYS_INT
            dbcursor.execute("SELECT tranche_id FROM int_period WHERE _id = %s", (int_period_id, ))
            dbres1 = dbcursor.fetchone()
            dbcursor.execute("SELECT amount FROM transactions WHERE date = %s AND tranche_id = %s", (start_date, dbres1[0]))
            dbres2 = dbcursor.fetchall()
            if dbres2:
                for res in dbres2:
                    PRINCIPAL_AMOUNT += res[0]
            BENCHMARK_DATE = get_benchmark(start_date.isoformat(), HOLIDAY_CAL, LOOKBACK, int_period_id)
            dbcursor.execute("SELECT rate FROM base_rate WHERE date = %s AND symbol = %s", (BENCHMARK_DATE, SYMBOL))
            res = dbcursor.fetchone()
            BASE_RATE = res[0]
            if BASE_RATE + CAS >= FLOOR and BASE_RATE + CAS <= CAP:
                FLOOR_RATE = BASE_RATE
            else:
                if FLOOR != 0:
                    FLOOR_RATE = FLOOR - CAS
                else:
                    FLOOR_RATE = CAP - CAS

            if OBS_SHIFT.upper() == "WITHOUT":
                daily_rate = FLOOR_RATE + CAS + MARGIN
                earn_base_rate_int = PRINCIPAL_AMOUNT*FLOOR_RATE*Decimal(CAL_DAYS_INT/(DAY_COUNT*100))
                earn_cas_int = PRINCIPAL_AMOUNT*CAS*Decimal(CAL_DAYS_INT/(DAY_COUNT*100))
                earn_margin_int = PRINCIPAL_AMOUNT*MARGIN*Decimal(CAL_DAYS_INT/(DAY_COUNT*100))
                earn_int_total = earn_base_rate_int + earn_cas_int + earn_margin_int
                CUM_TOTAL_INT += earn_int_total
                dbcursor.execute(
                    "INSERT INTO results (`index`, `int_period_id`, `principal_bal`, `benchmark_date`, `start_date`, `end_date`, `cal_days`, `cum_int_days`, `base_rate`, `cas`, `cap`, `floor`, `margin`, `earn_base_int`, `earn_cas_int`, `earn_margin_int`, `earn_total_int`,`adj_base_rate`, `daily_all-in_rate`, `cum_int_total`) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)",
                    (
                    i + 1, int_period_id, PRINCIPAL_AMOUNT, BENCHMARK_DATE, sub_period[i],
                    sub_period[i + 1], CAL_DAYS_INT, CUM_DAYS_INT,
                    BASE_RATE, CAS, CAP, FLOOR, MARGIN, earn_base_rate_int, earn_cas_int, earn_margin_int, earn_int_total, FLOOR_RATE, daily_rate, CUM_TOTAL_INT))

            elif OBS_SHIFT.upper() == "WITH":
                START_DATE_OBS = prev_business_date(start_date.isoformat(), HOLIDAY_CAL, LOOKBACK)
                END_DATE_OBS = prev_business_date(start_date.isoformat(), HOLIDAY_CAL, LOOKBACK - 1)
                obs_obj = datetime.date.fromisoformat(END_DATE_OBS) - datetime.date.fromisoformat(START_DATE_OBS)
                CAL_DAYS_OBS = obs_obj.days
                CUM_DAYS_OBS += CAL_DAYS_OBS
                daily_rate = FLOOR_RATE + CAS + MARGIN
                earn_base_rate_int = PRINCIPAL_AMOUNT * FLOOR_RATE * Decimal(CAL_DAYS_OBS / (DAY_COUNT*100))
                earn_cas_int = PRINCIPAL_AMOUNT * CAS * Decimal(CAL_DAYS_OBS / (DAY_COUNT*100))
                earn_margin_int = PRINCIPAL_AMOUNT * MARGIN * Decimal(CAL_DAYS_OBS / (DAY_COUNT*100))
                earn_int_total = earn_base_rate_int + earn_cas_int + earn_margin_int
                CUM_TOTAL_INT += earn_int_total
                dbcursor.execute(
                    "INSERT INTO results (`index`, `int_period_id`, `principal_bal`, `benchmark_date`, `start_date`, `end_date`, `cal_days`, `cum_int_days`, `cal_days_obs`, `obs_start_date`, `obs_end_date`, `base_rate`, `cas`, `cap`, `floor`, `margin`, `earn_base_int`, `earn_cas_int`, `earn_margin_int`, `earn_total_int`, `adj_base_rate`, `daily_all-in_rate`, `cum_obs_days`, `cum_int_total`) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)",
                    (
                    i + 1, int_period_id, PRINCIPAL_AMOUNT, BENCHMARK_DATE, sub_period[i],
                    sub_period[i + 1], CAL_DAYS_INT, CUM_DAYS_INT, CAL_DAYS_OBS, START_DATE_OBS, END_DATE_OBS,
                    BASE_RATE, CAS, CAP, FLOOR, MARGIN, earn_base_rate_int, earn_cas_int, earn_margin_int, earn_int_total, FLOOR_RATE, daily_rate, CUM_DAYS_OBS, CUM_TOTAL_INT))

    db.commit()
    return "success"


def result_calc_fixed(int_period_id):
    dbcursor.execute("SELECT tranche_id, start_date, end_date, cas, margin, floor, cap FROM int_period WHERE _id = %s", (int_period_id, ))
    dbres1 = dbcursor.fetchone()
    dbcursor.execute("SELECT instrument_id, amount FROM tranche WHERE _id = %s", (dbres1[0], ))
    dbres2 = dbcursor.fetchone()
    dbcursor.execute("SELECT int_method, day_count, lookback, obs_shift, rounding, symbol, holiday_cal, cas, margin, floor, cap FROM instrument WHERE _id = %s", (dbres2[0], ))
    dbres3 = dbcursor.fetchone()
    SYMBOL = dbres3[5]
    PRINCIPAL_AMOUNT = dbres2[1]
    DAY_COUNT = dbres3[1]
    MARGIN = dbres1[4]
    START_DATE = dbres1[1]
    END_DATE = dbres1[2]
    sub_period = [START_DATE, PRINCIPAL_AMOUNT]
    _days = END_DATE - START_DATE
    dbcursor.execute("SELECT amount, date FROM transactions WHERE date >= %s AND date <= %s AND tranche_id = %s", (START_DATE, END_DATE, dbres1[0]))
    dbres2 = dbcursor.fetchall()
    if dbres2:
        for res in dbres2:
            PRINCIPAL_AMOUNT += res[0] 
            sub_period.append([res[1], PRINCIPAL_AMOUNT])
    else:
        sub_period.append([END_DATE, PRINCIPAL_AMOUNT])

    CUM_DAYS_INT = 0 
    CUM_TOTAL_INT = 0
    for i in range(len(sub_period) - 1):
        start_date = datetime.date.fromisoformat(sub_period[i][0])
        end_date = datetime.date.fromisoformat(sub_period[i + 1][0])
        principal_amount = sub_period[i][1]
        benchmark_date = get_benchmark(start_date.isoformat(), dbres3[6], 0, int_period_id)
        dbcursor.execute("SELECT rate FROM base_rate WHERE date = %s AND symbol = %s", (benchmark_date, SYMBOL))
        base_rate = res[0]
        cal_days_obj = end_date - start_date
        cal_days_int = cal_days_obj.days
        CUM_DAYS_INT += cal_days_int
        non_cum_rfr = base_rate*principal_amount*Decimal(cal_days_int*10/DAY_COUNT)
        earn_margin_int = MARGIN*principal_amount*Decimal(cal_days_int*10/DAY_COUNT)
        earn_int_total = non_cum_rfr + earn_margin_int
        CUM_TOTAL_INT += earn_int_total
        daily_rate = base_rate + MARGIN
        dbcursor.execute(
            "INSERT INTO results (`index`, `int_period_id`, `principal_bal`, `start_date`, `end_date`, `cal_days`, `cum_int_days`, `base_rate`, `margin`, `earn_margin_int`, `earn_total_int`, `daily_all-in_rate`, `cum_int_total`) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)",
            (
            i + 1, int_period_id, principal_amount, sub_period[i][0],
            sub_period[i + 1][0], cal_days_int, CUM_DAYS_INT,
            base_rate, MARGIN, earn_margin_int, earn_int_total, daily_rate, CUM_TOTAL_INT))
    db.commit()
    return "success"


