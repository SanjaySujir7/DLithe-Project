import fitz

def add_paragraph_to_pdf(input_pdf_path, output_pdf_path, paragraph):
    # Open the existing PDF
    pdf = fitz.open(input_pdf_path)

    for page_num in range(pdf.page_count):
        # Get the page
        page = pdf.load_page(page_num)

        # Create a text box annotation
        textbox = fitz.Rect(70,240, 550,500)
        page.insert_textbox(textbox, paragraph, fontsize=12, color=(0, 0, 0))

    # Save the modified PDF to a new file
    pdf.save(output_pdf_path)
    pdf.close()

add_paragraph_to_pdf('Certificate_Input.pdf','output.pdf', "This is to certify Name , bearing USN No: USN from College has successfully completed one-month internship starting from From date to To Date, under the mentorship of DLithe’s development team. Name has worked on Cybersecurity domain, performed password cracking, exploiting Metasploit, network scanning, SQL injection and malware attack task. ")