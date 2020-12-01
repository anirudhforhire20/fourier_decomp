from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import DataRequired, Email, EqualTo, Length, ValidationError
from db_config import dbcursor

class SignupForm(FlaskForm):
    fname = StringField('First name', validators=[DataRequired(), Length(min=1, max=10)])
    lname = StringField('Last name', validators=[DataRequired(), Length(min=1, max=10)])
    email = StringField('Email address', validators=[DataRequired(), Email()])
    uname = StringField('User name', validators=[Length(min=1, max=10), DataRequired()])
    password = PasswordField('Password', validators=[DataRequired(), Length(min=8, max=20)])
    confirm_password = PasswordField('Confirm password', validators=[DataRequired(), EqualTo('password')])
    submit = SubmitField('Signup')

    def validate_email(self, email):
        dbcursor.execute("SELECT email FROM users WHERE email = %s", (email.data,))
        dbres = dbcursor.fetchone()
        if dbres:
            raise ValidationError("This email is already taken")

    def validate_uname(self, uname):
        dbcursor.execute("SELECT uname FROM users WHERE uname = %s", (uname.data,))
        dbres = dbcursor.fetchone()
        if dbres and dbres[0] is not None:
            raise ValidationError('This username is already taken')

class LoginForm(FlaskForm):
    form_field = StringField('Email or username', validators=[DataRequired()])
    password = PasswordField('Password', validators=[DataRequired(), Length(min=8, max=20)])
    submit = SubmitField('Login') 

