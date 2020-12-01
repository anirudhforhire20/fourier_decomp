from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, SubmitField, HiddenField
from wtforms.validators import Length, DataRequired, ValidationError
from db_config import dbcursor

class DealForm(FlaskForm):
    user_id = HiddenField('user_id')
    name = StringField('Deal Name', validators=[DataRequired(), Length(min=1, max=10)])
    description = StringField('Deal description', validators=[Length(max=200)])
    symbol = StringField('Symbol', validators=[DataRequired(), Length(min=1, max=5)])
    number = FloatField('Number of stocks', validators=[DataRequired()])
    amount = FloatField('Amount', validators=[DataRequired()])
    submit = SubmitField('Place deal')

    def validate_number(self, number):
        dbcursor.execute("SELECT amount FROM stock_tracker WHERE symbol = %s AND user_id = %s", (self.symbol.data, self.user_id.data))
        dbres = dbcursor.fetchone()
        if dbres:
            if dbres[0] <= number.data:
                raise ValidationError("You don't own enough stocks for this symbol")
        else:
            raise ValidationError("You don't own enough stocks for this symbol")
    
    def validate_symbol(self, symbol):
        dbcursor.execute("SELECT symbol FROM stock_tracker WHERE symbol = %s AND user_id= %s", (symbol.data, self.user_id.data))
        dbres = dbcursor.fetchone()
        if not dbres:
            raise ValidationError("Symbol doesn't exists")


class BidForm(FlaskForm):
    user_id = HiddenField('user_id')
    symbol = StringField('Symbol', validators=[DataRequired(), Length(min=1, max=5)])
    number = FloatField('Number of stocks', validators=[DataRequired()])
    submit = SubmitField('Place bid')

    def validate_number(self, number):
        dbcursor.execute("SELECT amount FROM stock_tracker WHERE symbol = %s AND user_id = %s", (self.symbol.data, self.user_id.data))
        dbres = dbcursor.fetchone()
        if dbres:
            if dbres[0] >= number.data:
                pass
            else:
                raise ValidationError("You don't own enough stocks for this symbol")
        else:
            raise ValidationError("You don't own enough stocks for this symbol")
    
    def validate_symbol(self, symbol):
        dbcursor.execute("SELECT symbol FROM stock_tracker WHERE symbol = %s AND user_id = %s", (symbol.data, self.user_id.data))
        dbres = dbcursor.fetchone()
        if not dbres:
            raise ValidationError("Symbol doesn't exists")
        