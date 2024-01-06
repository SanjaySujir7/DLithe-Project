# from Email import Certificate_Email
import csv
from time import sleep

Students_Data = []
index = 0
Data_Len = None

with open("iotonlineoctnovDLithe.csv", "r") as file:
    File = csv.DictReader(file)

    for row in File:
        Students_Data.append(row)
        
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