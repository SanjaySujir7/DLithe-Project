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
    
