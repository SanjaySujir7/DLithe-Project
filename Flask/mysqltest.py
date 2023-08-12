
import mysql.connector

mydb = mysql.connector.connect(
      host="localhost",
      user='root',
      password="admin",
      database = "sis"
)

c = mydb.cursor()

# c.execute("""CREATE TABLE students (First_Name varchar(50), Last_Name varchar(50), Phone varchar(50),
#           Email varchar(100) , Register_Number varchar(80) , Institution_Name varchar(300),Mode varchar(70), Course_Name varchar(200),
#           Total varchar(70), Entry_Date DATETIME,Payment_Status varchar(100), Inst_Key varchar(200), Password varchar(50), Certificate_Number varchar(80),
#           End_Date DATETIME,Payment_Date DATETIME, Batch varchar(100), Start_Date DATETIME, Department varchar(120));
#           """)


      
# c.execute("CREATE TABLE admin (First_Name varchar(50), Last_Name varchar(50), Email varchar(70), Password varchar(100))")

# c.execute("INSERT INTO admin (First_Name, Last_Name, Email, Password) VALUES (%s,%s,%s,%s);",('sanjay','sujir','sujirsanjay@gmail.com','admin777'))

# c.execute("DELETE FROM students")

# c.execute("DELETE FROM Key_Dictionary")

# c.execute("DROP TABLE students;")

# c.execute("DELETE FROM students WHERE First_Name = 'fake' ;")

# c.execute("CREATE TABLE Key_Dictionary ( Reg_key  varchar(50), Inst varchar(100))")

# c.execute("CREATE TABLE Certificate_Error (First_Name varchar(50), Last_Name varchar(50), Phone char(20),Email varchar(100), Error varchar(300), Batch varchar(100), Usn varchar(100), Course_Name varchar(100));")
# c.execute("INSERT INTO Certificate_Error(First_Name , Last_Name , Phone , Email , Error , Batch, Usn , Course_Name) VALUES(%s ,%s , %s, %s , %s ,%s, %s,%s)",("test",'test','1234567890','testtest@test.com','email is not found. try with other email','Aug-Sep-2023','1tt7654456789','Web Development'))

# mydb.commit()

c.execute("SELECT * FROM students;")
# c.execute("SELECT * FROM sis.admin")
data = c.fetchall()

print(data)
c.close()
mydb.close()



# Have To change 

# Batch
# Entry date
# Payment date
#  Mode
