from random import choice,randint
from datetime import datetime


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
    
    
    def End_Date_Process(self):
        
        Date = self.Date_Time.split()
        Add = Date[0].split('-')
        
        if int(Add[1]) == 12 :
             Month = 1
        else:
             Month = int(Add[1]) + 1
        
        return f"{Add[0]}-{Month}-{Add[2]}"
    

    

class Inst_Process:
    def __init__ (self,reg,inst,key_dictionary):
        self.reg = reg 
        self.inst = inst
        self.key_dictionary = key_dictionary
        
    def Process (self): 
        
        if not self.reg.strip() == "":
            
            new_reg = self.reg[1] + self.reg[2]
            new_reg = new_reg.lower()
            keys_got = None
            
        else:
            
            new_reg = None
            keys_got = None
            for keys in self.key_dictionary:
                
                if "Not defined" in keys:
                     return {'got' : True , 'keys' : ("Not defined","Not defined"), 'inst_key' : "Not defined"}
                 
                else:
                    return {'got' : False , 'keys' : ("Not defined","Not defined") , 'inst_key' : "Not defined"}
                
        
        for keys in self.key_dictionary:
            if new_reg in keys:
                keys_got = (keys[0],keys[1])
                break
            
        if keys_got == None:
            temp_keys = (new_reg,self.inst)
            
            return {'got' : False , 'keys' : temp_keys , 'inst_key' : self.inst}
        
        else:
            return {'got' : True , 'keys' : keys_got, 'inst_key' : keys_got[1]}
        
        

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
        
        
class Certificat_Number_Generator:
    
    def __init__(self,Course,End_Date):
        self.course = Course
        self.End_Date = End_Date
        
        
    def Generate(self):
        
        Course_Code = {
            'internet of things (iot)' : "iot",
            'web development' : 'web',
            'artificial inteligence & data science' : 'aiml',
            'cyber security' : 'cybs'
        }
        
        date_obj = datetime.strptime(str(self.End_Date).split()[0], '%Y-%m-%d')
    
        formatted_date_str = date_obj.strftime('%B')
        Month = formatted_date_str[:3] + str(self.End_Date).split('-')[0]
        Course = Course_Code.get(self.course.lower())
        
        if Course == None:
            Course = self.course.lower()[0 : 3]
        
        Random_Number = ""
        
        for _ in range(7):
            Random_Number = f"{Random_Number}{randint(1,9)}"
            
        return Month + Course + Random_Number
        


class Icon_Process :
    
    course_icon = {
        'internet of things (iot)' : "fi fi-rr-microchip",
        'web development' : 'fi fi-rr-display-code',
        'artificial inteligence & data science' : 'fi fi-rr-brain-circuit',
        'cyber security' : 'fi fi-rr-shield-virus'
    }
    
    Payment_icon = {
        'paid' : [
            'fi fi-rr-check-circle',
            'green'
        ],
        'not paid': [
            'fi fi-rr-circle-xmark',
            'red'
        ]
    }
    
    def Process(self,course : str,Payment_status : str):
        
        Payment_status = Payment_status.lower()
        course = course.lower()
        
        Course_Icon = self.course_icon[course]
        Payment_Icon = self.Payment_icon[Payment_status]
        
        return {'course' : Course_Icon , 'pay' : Payment_Icon}
    
    
class Date_Time :
    
    def __init__(self,DateTime):
        self.DateTime = DateTime
        
    def Re_Format (self):
        
        original_datetime = datetime.strptime(str(self.DateTime), "%Y-%m-%d %H:%M:%S")
        
        formatted_datetime_str = original_datetime.strftime("%d-%m-%Y %H:%M:%S")
        
        return formatted_datetime_str
    
    
    def Reformat_Only_Date (self):
        
        original_datetime = datetime.strptime(str(self.DateTime), "%Y-%m-%d")
        
        formatted_datetime_str = original_datetime.strftime("%d-%m-%Y")
        
        return formatted_datetime_str
        