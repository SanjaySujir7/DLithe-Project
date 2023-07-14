from PyPDF2 import PdfReader, PdfWriter
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.platypus import Paragraph


def add_paragraph_to_pdf(input_pdf_path, output_pdf_path, paragraph_text):
    # Open the existing PDF file
    existing_pdf = PdfReader(open(input_pdf_path, 'rb'))

    # Create a new PDF writer
    output_pdf = PdfWriter()

    # Get the number of pages in the existing PDF
    num_pages = len(existing_pdf.pages)
    
    # Create a stylesheet for paragraph formatting
    styles = getSampleStyleSheet()

    # Add the paragraph to each page of the existing PDF
    for page_num in range(num_pages):
        page = existing_pdf.pages[page_num]
        canvas = output_pdf.pages[page_num].canvas
        paragraph = Paragraph(paragraph_text, styles["Normal"])
        paragraph.wrapOn(canvas, 400, 200)# Adjust the width and height as nee
        paragraph.drawOn(canvas, 100, 100)  # Adjust the x and y coordinates as needed
        output_pdf.addPage(page)

    # Save the updated PDF to a new file
    with open(output_pdf_path, 'wb') as output_file:
        output_pdf.write(output_file)

    print("Paragraph added successfully to the PDF.")


add_paragraph_to_pdf("Certificate_Input.pdf",'output.pdf',"This is to certify Name, bearing USN No: USN from College has successfully completed one-month internship starting from From date to To Date, under the mentorship of DLithe’s development team. Name has worked on Cybersecurity domain, performed password cracking, exploiting Metasploit, network scanning, SQL injection and malware attack task. ")
