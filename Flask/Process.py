import inst_Name 
from random import choice

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
        
        
