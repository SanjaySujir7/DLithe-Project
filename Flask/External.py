import fitz
import os
from datetime import date

class Pdf_Certificate :
    
    def __init__(self,Input,Output,data):
        self.Input = Input
        self.Output = Output
        self.data = data
        self.replace = None
        self.replace_usn = None
        self.replace_date_from = None
        self.replace_date_To = None
        self.Today_Date = None
        
    def Bold (self):
        pdf = fitz.open(self.Output)

        for page in pdf:

            search_results = page.search_for(self.replace)
            Usn_Search = page.search_for(self.replace_usn)
            Date_From_Search = page.search_for(self.replace_date_from)
            Date_To_Search = page.search_for(self.replace_date_To)
            Certificate_Date = page.search_for('17 May 2023')

            for rect in search_results:
                page.add_redact_annot(rect)
                page.apply_redactions()
                
                page.insert_textbox(rect, f" {self.data['Name']}", fontfile="tnr.ttf", fontname = 'times-new-roman',fontsize=12, color=(0, 0, 0))

            for rect in Usn_Search:
                page.add_redact_annot(rect)
                page.apply_redactions()
                
                page.insert_textbox(rect,f" {self.data['Usn']}",fontfile="tnr.ttf", fontname = 'times-new-roman',fontsize=12, color=(0, 0, 0))
                

            for rect in Date_From_Search:
                page.add_redact_annot(rect)
                page.apply_redactions()
                
                page.insert_textbox(rect,f" {self.data['Date_From']} ",fontfile="tnr.ttf", fontname = 'times-new-roman',fontsize=12, color=(0, 0, 0))
            
            for rect in Date_To_Search:
                page.add_redact_annot(rect)
                page.apply_redactions()
                
                page.insert_textbox(rect,f" {self.data['Date_To']}",fontfile="tnr.ttf", fontname = 'times-new-roman',fontsize=12, color=(0, 0, 0))
                
            for rect in Certificate_Date:
                page.add_redact_annot(rect)
                page.apply_redactions()
                
                page.insert_textbox(rect,f"{self.Today_Date}" , fontname = 'Times-Roman',fontsize=11, color=(0, 0, 0)) 
             
            
        pdf.save("output_final.pdf")
        pdf.close()
        
    def Print(self):
        
        Today = date.today()
        Formated_Date = Today.strftime('%d %B %Y')
        self.Today_Date = Formated_Date
        
        Name = self.data['Name'] + "----"
        self.replace = Name
        Usn = self.data['Usn'] + "--"
        self.replace_usn  = Usn
        Collage = self.data['Inst']
        Date_From = self.data['Date_From'] + "--"
        self.replace_date_from = Date_From
        Date_To = self.data['Date_To'] + "--"
        self.replace_date_To = Date_To
        font_Size = 12
        
        
        Paragraph = f"This is to certify  {Name}  , bearing USN No: {Usn} from {Collage}\n\nhas successfully completed one-month internship starting from    {Date_From}  to  {Date_To}.\n\nunder the mentorship of DLithe's development team. {Name}  has worked on\n\nCybersecurity domain, performed password cracking, exploiting Metasploit, network scanning, SQL injection and malware attack task."

        pdf = fitz.open(self.Input)
        page = pdf.load_page(0)

        textbox = fitz.Rect(70,200,523,600)
        page.insert_textbox(textbox,Paragraph, fontname="Times-Roman", fontsize=font_Size, color=(0, 0, 0))
        pdf.save(self.Output)
        pdf.close()
        self.Bold()
        os.remove("output.pdf")
        
    
        
if __name__ == '__main__':
    
    data = {
        'Name':"Sanjay sujir",
        'Usn' : "1t526278",
        "Inst" : "Test Collage Name (test)",
        "Date_From" : "20-07-2023",
        "Date_To" : "20-08-2023"
    }
    
    Test = Pdf_Certificate('Certificate_Input.pdf',"output.pdf",data=data)
    Test.Print()

