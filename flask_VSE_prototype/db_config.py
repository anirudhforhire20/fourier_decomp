import mysql.connector

db = mysql.connector.connect(host='3.138.85.170', user='root', password='rougeami', database='VSE')
dbcursor = db.cursor()