
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


class Pdf_Certificate :
    
    def __init__(self,Name,Usn,Collage,Date_From,Date_To,Certificate_Id):
        self.Name = Name
        self.Usn = Usn
        self.Collage = Collage
        self.Date_From = Date_Time(Date_From).Re_Format()
        self.Date_Two = Date_Time(Date_To).Re_Format()
        self.Certificate_Id = Certificate_Id
        
        
    def Print (self):
        Input_Pdf = "Certificate_Input.pdf"
        Out_Put_File = "output.pdf"
        
        self.Qr_Code(self.Certificate_Id,file_name="Qr_Certificate.png",)
        
        with open(Input_Pdf,'rb') as file:
        
            Reader = PdfReader(file)
            
            Out_Put = PdfWriter()
            
            Packet = io.BytesIO()
            
            Can = canvas.Canvas(Packet,pagesize=A4)
            
            my_Style=ParagraphStyle('My Para style',
            fontName='Times-Roman',
            fontSize=12,
            leading=35,
            alignment=4,
            )
            
            p1=Paragraph(f"This is to certify &nbsp<b>{self.Name}</b>&nbsp , bearing USN No:  <b>{self.Usn}</b>  from  <b>{self.Collage}</b>   has successfully completed one-month internship starting from  &nbsp<b>{str(self.Date_From).split()[0]} Start date Add</b>&nbsp  to  &nbsp<b>{str(self.Date_Two).split()[0]}</b>&nbsp   under the mentorship of DLithe's development team. <b>{self.Name}</b> has worked on Cybersecurity domain, performed password cracking, exploiting Metasploit, network scanning, SQL injection and malware attack task.",my_Style)
            
            p1.wrapOn(Can,450,300)
            p1.drawOn(Can,71,445)
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
        
        
Pdf_Certificate('Test Test','1tt12345678',"Test Test","2023-8-12 00:00:00",'2023-9-12 00:00:00',"sep2023web23456").Print()