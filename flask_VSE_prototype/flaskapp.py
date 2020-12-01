from flask import Flask
from flask_bcrypt import Bcrypt

app = Flask(__name__)
app.config["SECRET_KEY"] = "wro8gyw49t8yw4ne0g8ygu"
bcrypt = Bcrypt(app)
