from email.message import EmailMessage
import ssl
import smtplib
from time import sleep
from External import Pdf_Certificate
from datetime import datetime
from Process import Certificat_Number_Generator
    
class Certificate_Email:
    
    def __init__(self,User_List):
        self.Data = User_List
        
    def Send (self):
        
        Body = """

Dear <Name>,

Greetings from DLithe!

I trust this email finds you well. 

We are pleased to share the attached certificate in recognition of your internship with us. We trust that this program has enriched your understanding of the specific domain and opened doors to new opportunities.
 
Should you wish to reach out, please don't hesitate to contact us. We look forward to maintaining our connection in the days ahead.
 
Additionally, we kindly invite you to leave us a Google review and rating at this link: http://shorturl.at/loFQT. Your feedback is valuable to us.
 
Wishing you the very best in your future endeavors. 

​

Thanks & Regards
Dhanya Bangera | HR 
Dlithe Consultancy Services Pvt. Ltd.
Contact: 9980212152
www.dlithe.com
        """
        
        count = 1
        Sender_Email = "dlithehr@gmail.com"
        Password = "rike rchs ttax ydiq"
        
        context = ssl.create_default_context()
        
        with smtplib.SMTP_SSL("smtp.gmail.com",465,context=context) as smtp:
            smtp.login(Sender_Email,Password)
            
            for datas in self.Data:
    
                try:
                    Name = datas['First_Name']
                    Register = datas['Register_Number']
                    Collage = "Mangalore Institute of Technology and Engineering, Moodabidre"
                    Start = "2023-08-21 00:00:00"
                    End = "2023-09-21 00:00:00"
                    Certificate_Id = Certificat_Number_Generator("web development","2023-09-21 00:00:00").Generate()
                    Course_Name = "web development"
                    User_Email = datas['Email']
                    
                    Email = EmailMessage()
                    Email['From'] = Sender_Email
                    Email['To'] = User_Email
                    Email['Subject'] = "DLithe Internship Certificate"
                    Email.set_content(Body.replace("<Name>",Name)) 
                    Pdf_Certificate(Name,Register,Collage,Start,End,Certificate_Id,Course_Name).Print()
                    
                    
                    file_path = "output.pdf" 
                    with open(file_path, "rb") as file:
                        file_data = file.read()
                        Email.add_attachment(file_data, filename=f"{Name.split()[0]}_DLithe_Internship_Certificate.pdf", maintype="application", subtype="octet-stream")


                    smtp.sendmail(Sender_Email,User_Email,Email.as_string())
                    
                    with open("Email_output_web.txt","a") as file:
                        file.write("\n")
                        file.write(f"{count} Email sent to {User_Email} successfully!")
                    print(f"{count} Email sent to {User_Email} successfully!")
                        
                    with open("Certificate_Id_web.txt",'a') as file:
                        file.write("\n")
                        file.write(f"{Name} = {Certificate_Id}")
                        
                    count+=1
                    
                    
                except Exception as e:
                    print(e)
                    with open('Email_Errors_web.txt','a') as file:
                        file.write('\n')
                        file.write(f"{str(e)} occured to {Name}")
                        
                sleep(60)
         
            
# Certificate_Email([{'First_Name' :'Dhanya Bangera','Register_Number':'UD78399220200202','Email':'dhanyabangera5@gmail.com'}]).Send()