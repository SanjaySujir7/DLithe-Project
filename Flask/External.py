import fitz
import os

class Pdf_Certificate :
    
    def __init__(self,Input,Output,data):
        self.Input = Input
        self.Output = Output
        self.data = data
        self.replace = None
        
    def Bold (self):
        pdf = fitz.open(self.Output)


        for page in pdf:

            search_results = page.search_for(self.replace)

            for rect in search_results:
                page.add_redact_annot(rect)
                page.apply_redactions()
                
                page.insert_textbox(rect, f" {self.data['Name']}", fontfile="tnr.ttf", fontname = 'times-new-roman',fontsize=12, color=(0, 0, 0))


        pdf.save("output_final.pdf")
        pdf.close()
        
    def Print(self):
        Name = self.data['Name'] + "---"
        self.replace = Name
        Usn = self.data['Usn']
        Collage = self.data['Inst']
        
        Paragraph = f"This is to certify  {Name} , bearing USN No: {Usn} from {Collage} has successfully completed one-month internship starting from From date to To Date.\n\nunder the mentorship of DLithe's development team. {Name} has worked on Cybersecurity domain, performed password cracking, exploiting Metasploit, network scanning, SQL injection and malware attack task."
        
        pdf = fitz.open(self.Input)
        page = pdf.load_page(0)

        textbox = fitz.Rect(70,240,523,500)
        page.insert_textbox(textbox,Paragraph, fontname="Times-Roman", fontsize=12, color=(0, 0, 0))
        pdf.save(self.Output)
        pdf.close()
        self.Bold()
        os.remove("output.pdf")
    
        
if __name__ == '__main__':
    
    data = {
        'Name':"Sanjay S",
        'Usn' : "1t526278",
        "Inst" : "Test Test"
    }
    Test = Pdf_Certificate('Certificate_Input.pdf',"output.pdf",data=data)
    Test.Print()
