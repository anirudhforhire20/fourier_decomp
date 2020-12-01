"""This script contains all functions to read and write data to the db

-> There's no error handling of any sort because it's assumed API is accessed through the extension
    meaning there's no scope for db errors"""

import json
from db import db, dbcursor, _DB

def db_routine(query_list, perms, auth_field, offset):
    """This method adds data to db according to appropriate query_code
        query_list contains list of objects that contain query code and list of ref data


        query_list = [
            {
                "query_code": <code>,
                "ref-data": [LIST OF REF DATA OBJECTS]
            },
            ...
        ]
    """


    status_report = {
        "append": [],
        "edit": [],
        "delete": [],
        "read": [],
        "offset": offset
    }

    with open('DB_CONFIG.json') as f:
        DB_CONFIG = json.load(f)
    for query in query_list:
        for TABLE in DB_CONFIG:
            for ACTION in TABLE["actions"]:
                if ACTION["query_code"] == query["query_code"]:
                    if perms in ACTION["perms"]:
                        if ACTION["name"] == "append":
                            for data_set in query["ref_data"]:
                                data_tuple = []
                                query_col_string = " ("
                                query_placeholder_string = " ("
                                new_data_set = []
                                for i in range(len(data_set)):
                                    if data_set[i] is not None:
                                        new_data_set.append({
                                            "index": i,
                                            "data": data_set[i]
                                        })
                                for data in new_data_set:
                                    if data == new_data_set[-1]:
                                        query_col_string += str(TABLE["params"][data["index"]]) + " "
                                        query_placeholder_string += "%s "
                                    else:
                                        query_col_string += str(TABLE["params"][data["index"]]) + ", "
                                        query_placeholder_string += "%s, "
                                    data_tuple.append(data["data"])
                                query_col_string += ") "
                                query_placeholder_string += ") "
                                query_string = "INSERT INTO " + TABLE["name"] +  query_col_string + "VALUES" + query_placeholder_string
                                dbcursor.execute(query_string, tuple(data_tuple))
                                print(query_string, tuple(data_tuple))
                                break

                        elif ACTION["name"] == "edit":
                            for data_set in query["ref_data"]:
                                query_col_string = " "
                                data_tuple = []
                                new_data_set = []
                                for i in range(len(data_set) - 1):
                                    if data_set[i] is not None:
                                        new_data_set.append({
                                            "index": i,
                                            "data": data_set[i]
                                        })
                                if key_backtrack(TABLE["name"],TABLE["params"][new_data_set[0]["index"]] ,new_data_set[0]["data"], auth_field) or (perms in ["ADMIN", "STAFF"]):
                                    for data in new_data_set:
                                        if data == new_data_set[-1]:
                                            query_col_string += str(TABLE["params"][data["index"]]) + " = %s "
                                        else:
                                            query_col_string += str(TABLE["params"][data["index"]]) + " = %s, "
                                        data_tuple.append(data["data"])
                                    data_tuple.append(data_set[-1])
                                    query_string = "UPDATE " + TABLE["name"] + " SET" + query_col_string + " WHERE " + TABLE["params"][0] + " = %s"
                                    dbcursor.execute(query_string, tuple(data_tuple))
                                    status_report["edit"].append({
                                        "status": "success"
                                    })
                                    break
                                else:
                                    status_report = {
                                        "error": "ypu don't have permission to access this field"
                                    }
                                    break

                        elif ACTION["name"] == "delete":
                            for data_set in query["ref_data"]:
                                if key_backtrack(TABLE["name"], TABLE["params"][0],
                                                 data_set[0], auth_field) or (perms in ["ADMIN", "STAFF"]):
                                    query_string = "DELETE FROM " + TABLE["name"] + " WHERE " + TABLE["params"][0] + " = %s"
                                    dbcursor.execute(query_string, tuple([data_set[0]]))
                                    status_report["delete"].append({
                                        "status": "success"
                                    })
                                    break
                                else:
                                    status_report = {
                                        "error": "ypu don't have permission to access this field"
                                    }
                                    break

                        elif ACTION["name"] == "read":
                            for data_set in query["ref_data"]:
                                new_data_set = []
                                for i in range(len(data_set)):
                                    if data_set[i] is not None:
                                        new_data_set.append({
                                            "index": i,
                                            "data": data_set[i]
                                        })
                                if new_data_set == []:
                                    query_string = "SELECT * FROM " + TABLE["name"] + " LIMIT 30 OFFSET " + str(offset)
                                    dbcursor.execute(query_string)
                                    dbres = dbcursor.fetchall()
                                    data_list = []
                                    for data in dbres:
                                        if (key_backtrack(TABLE["name"], TABLE["params"][0], data[0], auth_field)) or (perms in ["ADMIN", "STAFF"]):
                                            data_list.append(list(data))
                                    status_report["read"].append({
                                        "status": "success",
                                        "data": data_list
                                    })
                                    status_report["offset"] += 30
                                else:
                                    query_col_string = " "
                                    data_tuple = []
                                    for data in new_data_set:
                                        if data == new_data_set[-1]:
                                            query_col_string += TABLE["params"][data["index"]] + " = %s "
                                        else:
                                            query_col_string += TABLE["params"][data["index"]] + " = %s AND "
                                        data_tuple.append(data["data"])
                                    query_string = "SELECT * FROM " + TABLE["name"] + " WHERE" + query_col_string + "LIMIT 30 OFFSET " + str(offset)
                                    dbcursor.execute(query_string, tuple(data_tuple))
                                    dbres = dbcursor.fetchall()
                                    data_list = []
                                    for data in dbres:
                                        if (key_backtrack(TABLE["name"], TABLE["params"][0], data[0], auth_field)) or (
                                                perms in ["ADMIN", "STAFF"]):
                                            data_list.append(list(data))
                                    status_report["read"].append({
                                        "status": "success",
                                        "data": data_list

                                    })
                                    status_report["offset"] += 30
                    else:
                        status_report = {
                            "error": "you don't have the permission to perform this action"
                        }

    db.commit()
    return status_report


def key_backtrack(tab_name ,key, value, auth_field):
    """This method return backtraced foreign kry and values from db"""

    dbcursor.execute("SELECT _id FROM user WHERE email = %s OR uname = %s", (auth_field, auth_field))
    dbres = dbcursor.fetchone()
    user_id = dbres[0]

    def recursive(tab_name ,key, value):
        dbcursor.execute("""SELECT referenced_table_name, referenced_column_name, column_name
                            FROM information_schema.key_column_usage where table_name = %s
                            AND table_schema = %s""", (tab_name, _DB))
        dbres = dbcursor.fetchall()
        #print(dbres)
        if dbres:
            res = dbres[-1]
            if res[0] == "user":
                dbcursor.execute("SELECT " + res[2] + " FROM " + tab_name + " WHERE " + key + " = %s", (value,))
                dbr = dbcursor.fetchone()
                if dbr[0] == user_id:
                    return True
                else:
                    return False
            else:
                dbcursor.execute("SELECT " + res[2] + " FROM " + tab_name + " WHERE " + key + " = %s", (value,))
                dbres2 = dbcursor.fetchone()
                if not dbres2:
                    return None
                else:
                    return recursive(res[0], res[1], dbres2[0])
        else:
            return None
    is_key = recursive(tab_name, key, value)
    return is_key