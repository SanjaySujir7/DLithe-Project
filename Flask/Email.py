from email.message import EmailMessage
import ssl
import smtplib
from time import sleep
from External import Pdf_Certificate
from datetime import datetime

    
class Certificate_Email:
    
    def __init__(self,User_List):
        self.Data = User_List
        
    def Send (self):
        count = 1
        Sender_Email = "pythoncoding777@gmail.com"
        Password = "rcxr fiwp prow enex"
        
        context = ssl.create_default_context()
        
        with smtplib.SMTP_SSL("smtp.gmail.com",465,context=context) as smtp:
            smtp.login(Sender_Email,Password)
            
            
            for datas in self.Data:
                try:
                    Name = datas[0] + " " + datas[1]
                    Register = datas[2]
                    Collage = datas[3]
                    Start = datas[4]
                    End = datas[5]
                    Certificate_Id = datas[6]
                    Course_Name = datas[7]
                    User_Email = datas[8]
                    
                    Email = EmailMessage()
                    Email['From'] = Sender_Email
                    Email['To'] = User_Email
                    Email['Subject'] = "Your Certificate!"
                    Email.set_content("Here is your Certificate for course aiml") 
                    Pdf_Certificate(Name,Register,Collage,Start,End,Certificate_Id,Course_Name).Print()
                    
                    
                    file_path = "output.pdf" 
                    with open(file_path, "rb") as file:
                        file_data = file.read()
                        Email.add_attachment(file_data, filename=f"DLithe_{Certificate_Id}.pdf", maintype="application", subtype="octet-stream")


                    smtp.sendmail(Sender_Email,User_Email,Email.as_string())
                    
                    with open("Email_output.txt","a") as file:
                        file.write(f"{count} Email sent to {User_Email} successfully!")
                        
                    count+=1
                    sleep(60)
                    
                    
                except Exception as e:
                    with open('Email_Errors.txt','a') as file:
                        file.write(str(e))
            