
from reportlab.lib.pagesizes import A4
from reportlab.lib import utils
from reportlab.pdfgen import canvas
from PyPDF2 import PdfReader,PdfWriter
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Paragraph
import io
import qrcode
import os
from Process import Date_Time
from datetime import datetime



class Pdf_Certificate :
    
    def __init__(self,Name,Usn,Collage,Date_From,Date_To,Certificate_Id,Course_Name):
        self.Name = Name
        self.Usn = Usn
        self.Collage = Collage
        self.Date_From = Date_Time(Date_From).Re_Format()
        self.Date_Two = Date_Time(Date_To).Re_Format()
        self.Certificate_Id = Certificate_Id
        self.Course_Name = Course_Name
        
    def Print (self):
        Input_Pdf = "Certificate_Input.pdf"
        Out_Put_File = "output.pdf"
        
        self.Qr_Code(self.Certificate_Id,file_name="Qr_Certificate.png",)
        
        with open(Input_Pdf,'rb') as file:
        
            Reader = PdfReader(file)
            
            Out_Put = PdfWriter()
            
            Packet = io.BytesIO()
            
            Can = canvas.Canvas(Packet,pagesize=A4)
            
            Course_Paragraph = self.Certificate_Course_Input()
            
            my_Style=ParagraphStyle('My Para style',
            fontName='Times-Roman',
            fontSize=12,
            leading=35,
            alignment=4,
            )
           
            p1=Paragraph(f"This is to certify <b>{self.Name}</b>, bearing USN No:  <b>{self.Usn}</b>  from  <b>{self.Collage}</b>   has successfully completed one-month internship starting from  <b>{str(self.Date_From).split()[0]}</b>  to  <b>{str(self.Date_Two).split()[0]}</b> under the mentorship of DLithe's development team. <b>{self.Name}</b> {Course_Paragraph[0]} {Course_Paragraph[2]}The domain & agile development process exposure was given along with usage of GitHub tool. During the internship, <b>{self.Name}</b> demonstrated good coding skills with good design thoughts.<br></br>We wish all the best for future endeavours!  ",my_Style)
            
            p1.wrapOn(Can,450,120)
            p1.drawOn(Can,71,Course_Paragraph[1])
            
            font_name = "Times-Italic"
            font_size = 12
            Can.setFont(font_name, font_size)
            Can.drawString(380,157, self.Certificate_Id)
            
            font_name = "Times-Roman"
            font_size = 14
            Can.setFont(font_name, font_size)
            current_date = datetime.now()
            formatted_date = current_date.strftime("%d %B %Y")
            Can.drawString(450,730, formatted_date)
            
            img = utils.ImageReader("Qr_Certificate.png")
            Can.drawImage(img, 350, 180, 100, 100)
            Can.save()
            
            Packet.seek(0)
            
            New_Pdf = PdfReader(Packet)
            
            page = Reader.pages[0]
            page.merge_page(New_Pdf.pages[0])
            
            Out_Put.add_page(page)
            
            with open(Out_Put_File,'wb') as Out_Put_File_Write :
                Out_Put.write(Out_Put_File_Write)
                
            os.remove("QR_Certificate.png")
            
            
                
    def Qr_Code(self,data, file_name, version=1, error_correction=qrcode.constants.ERROR_CORRECT_L, box_size=10, border=4):
  
        qr = qrcode.QRCode(
            version=version,
            error_correction=error_correction,
            box_size=box_size,
            border=border,
        )
        
        qr.add_data(data)
        qr.make(fit=True)

        img = qr.make_image(fill_color="black", back_color="white")
        img.save(file_name)
        
    def Certificate_Course_Input (self):
        Course_Pargraph = {
            'cyber security' : ["has worked on Cybersecurity domain, exploiting Metasploit, Network scanning, SQL injection and Malware attack task.",310,"<br></br>"],
            'aiml' : ["has worked on Data analytics for various types of data sets using Machine Learning models and Neural Networks for classification.",310,"<br></br>"],
            'embedded systems and iot - advanced' : ["has worked on various microcontrollers, SoC, sensors, actuators with real time web server development  activities  using  C,  C++  programming. Exposure  on  various  communication protocols TWI, SPI and UART was also provided.",300,""],
            'web development' : ["has worked on HTML, CSS, JavaScript, React JS, Server side Scripting and Deployment.",340,"<br></br>"],
            'iot' : ["has worked on various microcontrollers, SoC, sensors, actuators with real time web server development  activities  using  C,  C++  programming. Exposure  on  various  communication protocols TWI, SPI and UART was also provided.",300,""],
            'data science' : ["has worked on Data analytics for various types of data sets using Machine Learning models and Neural Networks for classification.",310,"<br></br>"] 
        }
        
        Para = Course_Pargraph.get(self.Course_Name.lower())
        
        if Course_Pargraph:
            return Para
        
        else:
            raise KeyError(f"Key is not found for {self.Course_Name}")
        
   
if __name__ =="__main__":
    Pdf_Certificate('Sanjay sujir','1tt12345678',"Dhavala university collage, moodubidiri","2023-8-12 00:00:00",'2023-9-12 00:00:00',"sep2023web23456","DATA SCIENCE").Print()