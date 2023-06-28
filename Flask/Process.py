import inst_Name 
from random import choice,randint


class DateTimeProcess:
    def __init__(self,Date_Time):
        self.Date_Time = Date_Time
        
    def Get(self):
        Date_Time = self.Date_Time
        
        Split = Date_Time.split()
        
        Date = Split[0]
        TIme = Split[1]
        
        Date_Split = Date.split('-')
        
        return f"{Date_Split[2]}-{Date_Split[1]}-{Date_Split[0]} {TIme}"
    


class Inst_Process:
    def __init__ (self,reg,inst):
        self.reg = reg 
        self.inst = inst
        
        
    def Process (self):  
        Reg_Num = self.reg
        
        New_reg = ""
        
        for all in Reg_Num:
            
            if not all.isdigit():
                if New_reg =="":
                    New_reg = all
                else:
                    New_reg = f"{New_reg}{all}"
            
        if New_reg == "":
            return "undefined"
        
        
        if not New_reg in inst_Name.Students_Inst_Names:

            dict = inst_Name.Students_Inst_Names
            
            dict[New_reg] = self.inst
            
            with open("inst_Name.py",'w') as file:
                file.write(f'Students_Inst_Names = {dict}')
                
            return self.inst
        
        else:
            return inst_Name.Students_Inst_Names[New_reg]
        

class Random_Password:
    
    def __init__ (self,length):
        self.length = int(length)
        
        assert  str(length).isdigit(),"length must be intiger not string"
        
        
    def Generate(self):
        if self.length <= 0:
            
            raise Exception("length must be greater than 0")
        
        else:
            Random_Strings = "abcdefghijklmnopqrstuvwxyz1234567890"
            
            Password_List = [choice(Random_Strings) for _ in range(self.length)]
            Password_List = "".join(Password_List)
            
            return Password_List
        
class Random_Cirtificate_Number:
    
    def Generate (self):
        Strings = "abcdefghijklmnopqrstuvwxyz"
        Number_Range = [0,9]
        str_int = [1,0,1,1,0]
        
        Serial_Number = None
        
        for _ in range(7):
            if choice(str_int) == 0:
                if Serial_Number == None:
                    Serial_Number = choice(Strings)
                    
                else:
                    Serial_Number = f"{Serial_Number}{choice(Strings)}"
                    
            else:
                if Serial_Number == None:
                    Serial_Number = randint(Number_Range[0],Number_Range[1])
                    
                else:
                    Serial_Number = f"{Serial_Number}{randint(Number_Range[0],Number_Range[1])}" 
                    
        return Serial_Number



class Icon_Process :
    
    course_icon = {
        'iot' : "fi fi-sr-microchip",
        'web development' : 'fi fi-sr-globe',
        'machine learning' : 'fi fi-ss-brain-circuit',
        'cyber security' : 'fi fi-sr-shield-virus'
    }
    
    Payment_icon = {
        'paid' : [
            'fi fi-sr-badge-check',
            'green'
        ],
        'not paid': [
            'fi fi-sr-circle-xmark',
            'red'
        ]
    }
    
    def Process(self,course : str,Payment_status : str):
        
        Payment_status = Payment_status.lower()
        course = course.lower()
        
        Course_Icon = self.course_icon[course]
        Payment_Icon = self.Payment_icon[Payment_status]
        
        return {'course' : Course_Icon , 'pay' : Payment_Icon}
    
    
