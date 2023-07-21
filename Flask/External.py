
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from PyPDF2 import PdfReader,PdfWriter
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Paragraph
import io


class Pdf_Certificate :
    
    def __init__(self,Name,Usn,Collage,Date_From,Date_Two):
        self.Name = Name
        self.Usn = Usn
        self.Collage = Collage
        self.Date_From = Date_From
        self.Date_Two = Date_Two
        
    def Print (self):
        Input_Pdf = "Certificate_Input.pdf"
        Out_Put_File = "output.pdf"
        
        with open(Input_Pdf,'rb') as file:
        
            Reader = PdfReader(file)
            
            Out_Put = PdfWriter()
            
            Packet = io.BytesIO()
            
            Can = canvas.Canvas(Packet,pagesize=A4)
            
            my_Style=ParagraphStyle('My Para style',
            fontName='Times-Roman',
            fontSize=12,
            leading=35,
            alignment=0,
            )
            
            p1=Paragraph(f"This is to certify   <b>{self.Name}</b> , bearing USN No:  <b>{self.Usn}</b>  from  <b>{self.Collage}</b>   has successfully completed one-month internship starting from   <b>{self.Date_From}</b>  to  <b>{self.Date_Two}</b>   under the mentorship of DLithe's development team. <b>{self.Name}</b> has worked onCybersecurity domain, performed password cracking, exploiting Metasploit, network scanning, SQL injection and malware attack task.",my_Style)
            
            p1.wrapOn(Can,450,300)
            p1.drawOn(Can,70,460)
            Can.save()
            
            Packet.seek(0)
            
            New_Pdf = PdfReader(Packet)
            
            page = Reader.pages[0]
            page.merge_page(New_Pdf.pages[0])
            
            Out_Put.add_page(page)
            
            with open(Out_Put_File,'wb') as Out_Put_File_Write :
                Out_Put.write(Out_Put_File_Write)
                
Pdf_Certificate("First Name","Register Number",'Institution Name','Date From','Date To').Print()