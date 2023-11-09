from Email import Certificate_Email
import csv

Students_Data = []
with open("web.csv","r") as file:
    File = csv.DictReader(file)
    
    for row in File:
        Students_Data.append(row)

    
    Certificate_Email(Students_Data).Send()