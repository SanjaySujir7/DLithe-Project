import fitz


class Pdf_Certificate :
    
    def __init__(self,Input,Output,data):
        self.Input = Input
        self.Output = Output
        self.data = data
        
        
    def Print(self):
        Name = self.data['Name']
        Usn = self.data['Usn']
        Collage = self.data['Inst']
        
        Paragraph = f"This is to certify {Name}, bearing USN No: {Usn} from {Collage} has successfully completed one-month internship starting from From date to To Date, under the mentorship of DLithe's development team.Name has worked on Cybersecurity domain, performed password cracking, exploiting Metasploit, network scanning, SQL injection and malware attack task."
        
        pdf = fitz.open(self.Input)
        page = pdf.load_page(0)

        textbox = fitz.Rect(70,240,530,500)
        page.insert_textbox(textbox,Paragraph, fontsize=11, color=(0, 0, 0))
        pdf.save(self.Output)
        pdf.close()
    
    
        
if __name__ == '__main__':
    
    data = {
        'Name':"FakeName",
        'Usn' : "1t526278",
        "Inst" : "Fake"
    }
    Test = Pdf_Certificate('Certificate_Input.pdf',"output.pdf",data=data)
    Test.Print()
