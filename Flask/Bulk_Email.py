from Email import Certificate_Email
import csv
from Process import Certificat_Number_Generator

Students_Data = []
with open("Students_Data.csv","r") as file:
    File = csv.DictReader(file)
    
    for row in File:
        Students_Data.append(row)

    
    Certificate_Email(Students_Data).Send()