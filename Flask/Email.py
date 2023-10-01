from email.message import EmailMessage
import ssl
import smtplib

Sender_Email = "pythoncoding777@gmail.com"
Reciver_Email = "pythoneercoding@gmail.com"
Password = "rcxr fiwp prow enex"

Subject = "Hi Sanjay!"

Body = "Yes! My Code Worked."

Email = EmailMessage()

Email['From'] = Sender_Email
Email['To'] = Reciver_Email
Email['Subject'] = Subject

Email.set_content(Body)

file_path = "output.pdf" 
with open(file_path, "rb") as file:
    file_data = file.read()
    Email.add_attachment(file_data, filename="DLithe_Certificate.pdf", maintype="application", subtype="octet-stream")


context = ssl.create_default_context()


with smtplib.SMTP_SSL("smtp.gmail.com",465,context=context) as smtp:
    smtp.login(Sender_Email,Password)
    smtp.sendmail(Sender_Email,Reciver_Email,Email.as_string())