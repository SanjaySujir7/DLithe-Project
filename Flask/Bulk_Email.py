# from Email import Certificate_Email
# import csv
from openpyxl import load_workbook
from time import sleep

Students_Data = []
index = 0
Data_Len = None

# with open("iotonlineoctnovDLithe.csv", "r") as file:
#     File = csv.DictReader(file)

#     for row in File:
#         Students_Data.append(row)

Book = load_workbook('NitteIot2024.xlsx')
Sheet = Book.active

Rows = Sheet.rows

Headers = [cell.value for cell in next(Rows)]

for rows in Rows:
    Temp_data = {}
    
    for title,cell in zip(Headers,rows):
        Temp_data[title] = cell.value
        
    Students_Data.append(Temp_data)
    
        
Data_Len = len(Students_Data)

while index < Data_Len:
    Temp_List = []

    for i in range(50):
        if index < Data_Len:
            Temp_List.append(Students_Data[index])
            index += 1

    # Certificate_Email(Temp_List).Send()
    print(Temp_List)
    
    if index < Data_Len:
        print("................Batch Sleep (20 minutes).......................")
        sleep(60 * 20)