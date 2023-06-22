
import mysql.connector

mydb = mysql.connector.connect(
      host="localhost",
      user='root',
      password="admin",
      database = "sis"
)

c = mydb.cursor()

# c.execute("""CREATE TABLE students (First_Name varchar(50), Last_Name varchar(50), Phone char(20),
#           Email varchar(100) , Register_Number char(50) , Institution_Name varchar(300),Mode char(30), Course_Name varchar(200),
#           Total char(50), Entry_Date DATETIME,Payment_Status char(20), Inst_Key varchar(200), Password varchar(50), Certificate_Number char(30));
#           """)


# c.execute("""CREATE TABLE Student_info (First_Name varchar(50), Last_Name varchar(50), Phone char(20),
#           Email varchar(100) , Register_Number char(50) , Institution_Name varchar(300),Mode char(30), Course_Name varchar(200),
#           Total char(50), Entry_Date DATETIME,Payment_Status char(20));
#           """)
      
# c.execute("CREATE TABLE admin (First_Name varchar(50), Last_Name varchar(50), Email varchar(70), Password varchar(100))")

# c.execute("INSERT INTO admin (First_Name, Last_Name, Email, Password) VALUES (%s,%s,%s,%s);",('sanjay','sujir','sujirsanjay@gmail.com','admin777'))

# c.execute("DELETE FROM students")

# c.execute("DROP TABLE students;")


# mydb.commit()


c.execute("SELECT * FROM students;")

data = c.fetchall()

print(data)
c.close()
mydb.close()