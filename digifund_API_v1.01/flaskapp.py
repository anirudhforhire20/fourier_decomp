import decimal

from flask import Flask
from flask_bcrypt import Bcrypt
from flask.json import JSONEncoder
from datetime import date
from decimal import Decimal

class CustomJSONEncoder(JSONEncoder):
    def default(self, obj):
        if isinstance(obj, decimal.Decimal):
            # wanted a simple yield str(o) in the next line,
            # but that would mean a yield on the line with super(...),
            # which wouldn't work (see my comment below), so...
            return (str(obj) for obj in [obj])

        try:
            if isinstance(obj, date):
                return obj.isoformat()
            iterable = iter(obj)
        except TypeError:
            pass
        else:
            return list(iterable)
        return JSONEncoder.default(self, obj)

app = Flask(__name__)
app.json_encoder = CustomJSONEncoder
app.config['SECRET_KEY'] = 'iusdfiuewyrf87ewfnyh'
#Bcrypt for encrypting passwords
bcrypt = Bcrypt(app)