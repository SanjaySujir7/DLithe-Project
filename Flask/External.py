from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from PyPDF2 import PdfReader,PdfWriter
import io


class Pdf_Certificate :
    
    def __init__(self,Name):
        self.text = Name
        
    def Print (self):
        Input_Pdf = "Certificate_Input.pdf"
        Out_Put_File = "output.pdf"
        
        X_pos = 525
        Y_pos = 490
        
        if len(self.text) > 6:
            
            pixle_move = len(self.text) - 6 
            pixle_move = pixle_move * 3
            
            if not pixle_move <= 0:
                X_pos = X_pos - pixle_move
                
                print(X_pos)
                
        else :
            X_pos = 550
        
        with open(Input_Pdf,'rb') as file:
        
            Reader = PdfReader(file)
            
            Out_Put = PdfWriter()
            
            Packet = io.BytesIO()
            
            Can = canvas.Canvas(Packet,pagesize=(1200,864))
            
            
            Can.setFont("Helvetica-Bold", 32)
            Can.drawString(X_pos,Y_pos, self.text)
            Can.save()
    
            
            Packet.seek(0)
            
            New_Pdf = PdfReader(Packet)
            
            page = Reader.pages[0]
            page.merge_page(New_Pdf.pages[0])
            
            Out_Put.add_page(page)
            
            with open(Out_Put_File,'wb') as Out_Put_File_Write :
                Out_Put.write(Out_Put_File_Write)
                
                
if __name__ == '__main__' :
    test_ = Pdf_Certificate(Name="Test")
    
    test_.Print() 
            