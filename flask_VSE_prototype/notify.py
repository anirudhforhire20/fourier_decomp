import smtplib
from email.message import EmailMessage


def notification(receiver, subject, message):
    sender_add = 'notiybot@gmail.com'
    password = '@1989excaliburE'
    receiver_add = receiver

    msg = EmailMessage()
    msg['To'] = receiver_add
    msg['From'] = sender_add
    msg['subject'] = subject
    msg.set_content(message)


    smtpObj = smtplib.SMTP('smtp.gmail.com', 587)
    smtpObj.ehlo()
    smtpObj.starttls()
    smtpObj.login(sender_add, password)
    smtpObj.send_message(msg)
    smtpObj.close()