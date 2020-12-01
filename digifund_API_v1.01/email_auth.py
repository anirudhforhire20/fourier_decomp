def email_auth(receiver, auth_code):
    import smtplib
    from email.message import EmailMessage

    sender_add = 'rfrmail@omniwurx.com'
    receiver_add = receiver

    msg = EmailMessage()
    msg['To'] = receiver_add
    msg['From'] = sender_add
    msg['subject'] = "Email auth"
    msg.set_content('The code is ' + str(auth_code))


    smtpObj = smtplib.SMTP('mail.omniwurx.com', 26)
    smtpObj.ehlo()
    smtpObj.starttls()
    smtpObj.ehlo()
    smtpObj.login('rfrmail@omniwurx.com', 'helloSONIA')
    smtpObj.send_message(msg)

