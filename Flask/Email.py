from email.message import EmailMessage
import ssl
import smtplib
from random import choice
from time import sleep


Sender_Email = "pythoncoding777@gmail.com"
Reciver_Email = "pythoneercoding@gmail.com"
Password = "rcxr fiwp prow enex"

Subject = ['Hi Sanjay!','Hello From Python!','Test_Email!']
Body = [
    "Hi there! I hope this message finds you in good spirits. It's a pleasure to connect with you today, and I look forward to our continued collaboration. Have a wonderful day!",
    "Good morning! As the sun rises, may your day be filled with positivity and success. Your dedication inspires us all. Let's make today count!",
    "Hello! Just a quick note to say how much I appreciate your hard work and dedication. Your contributions make a significant impact, and I'm grateful for your presence on the team."
]


# file_path = "output.pdf" 
# with open(file_path, "rb") as file:
#     file_data = file.read()
#     Email.add_attachment(file_data, filename="DLithe_Certificate.pdf", maintype="application", subtype="octet-stream")


context = ssl.create_default_context()



with smtplib.SMTP_SSL("smtp.gmail.com",465,context=context) as smtp:
    smtp.login(Sender_Email,Password)
    
    for i in range(1,51):
        Email = EmailMessage()
        print(f"Email sending ! {i} times.")
        Email['From'] = Sender_Email
        Email['To'] = Reciver_Email
        
        Email['Subject'] = choice(Subject)

        Email.set_content(choice(Body))
        smtp.sendmail(Sender_Email,Reciver_Email,Email.as_string())
        sleep(30)
    