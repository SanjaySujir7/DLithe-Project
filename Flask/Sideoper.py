import bcrypt

    
class Hash_Password :
    
    def __init__ (self,Password):
        self.Password = Password
        
        
    def Convert(self):
        salt = bcrypt.gensalt()

        hashed_password = bcrypt.hashpw(self.Password.encode('utf-8'), salt)

        return hashed_password.decode('utf-8')
    
    
    def Validate(self,Hash):
        
        return bcrypt.checkpw(self.Password.encode('utf-8'), Hash.encode('utf-8'))


class Clean_Data :
    
    def __init__(self,data):
        self.data = str(data)
        
    def Phone_Num_Clean(self):
        
        phone = ""
        for chr in self.data:
            
            if not chr == '(' and not chr == ')' and not chr == "-":
                phone += chr
                
        return phone
    
    
    def Course_Clean (self):
        
        course = ""
        
        for chr in self.data:
            if chr == "|":
                return course
            
            else:
                course += chr
                
        return course
