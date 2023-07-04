import csv
import random
import time

start = time.time()

Headings = ['First_Name', 'Last_Name', 'Phone', 'Email','Register_Number', 'Institution_Name','Mode','Course_Name','Total','Entry_Date','Payment_Status']
Body = []


String = 'abcdefghijklmnopqrstuvwxyz'



Email_CHoice = ['yahoo','gmail','outlook']
College_Choice = [
    ['mite','mp'],
    ['nitte','nm'],
    ['sdm','sp'],
    ['alvas','al'],
    ['manipal','m'],
]

Course_Choice = [['Web Development','5000'],
                 ['iot','4000'],
                  ['ai-ml','6000'],
                 ['Cyber Security-l1','5000'],
                 ['Java Full-stack','5500'],
                 ['Cyber Security-l0','4500'],
                 ['Web Development-15weeks','3000']
                 ]


max = 4

st = 0

while  st <= 10:
    
    Name = ''
    Last = ''
    Email = None
    Phone = None
    Reg = None
    Course = None
    Inst = None
    Total = None
    Entry_Date = None
    Mode = None
    Payment = None
    
    for i in range(random.randint(3,8)):
        if Name == '':
            Name = random.choice(String)
            Last = random.choice(String)
            
        else:
            Name = f'{Name}{random.choice(String)}'
            
            if len(Last) <= max:
                Last =  f'{Last}{random.choice(String)}'
                
    Email = f"{Name}{Last}@{random.choice(Email_CHoice)}.com"


    for i in  range(10):
        if Phone == None:
            Phone = f"({random.randint(0,9)}"
            
        else:
            Phone = f"{Phone}{random.randint(0,9)}"
            
            if i == 2:
                Phone = f"{Phone})"
                
            elif i == 5:
                Phone = f"{Phone}-"
            
            elif i == 8:
                Phone = f"{Phone}-"
                
        if Reg == None :
            Reg = random.randint(0,9)
            
        else :
            if i == 1 :
                ch = random.choice(College_Choice)
                Inst = ch[0]
                Reg = f"{Reg}{ch[1]}"
                
            else:     
                Reg = f"{Reg}{random.randint(0,9)}"
                
            
    Co = random.choice(Course_Choice)

    Course = Co[0]
    Total = Co[1]
    Mode = random.choice(['Online','Offline'])
    Payment = random.choice(['paid','not paid'])
    Entry_Date = f"{random.randint(1,28)}-{random.randint(1,12)}-20{random.randint(21,23)} {random.randint(10,17)}:{random.randint(1,59)}:{random.randint(1,50)}"
    
    Body.append([Name,Last,Phone,Email,Reg,Inst,Mode,Course,Total,Entry_Date,Payment])
    st+=1

        
with open('random_data.csv','w',newline='') as file:
    writer = csv.writer(file)
    writer.writerow(Headings)
    writer.writerows(Body)
    
    
print("Execution time : ",time.time()-start)
