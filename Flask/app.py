
from flask import Flask, jsonify,render_template,request, send_file,session,redirect,flash
import mysql.connector
import csv
from Process import DateTimeProcess,Inst_Process,Random_Password,Certificat_Number_Generator,Icon_Process
from External import Pdf_Certificate
from time import time
from datetime import datetime,date
from Sideoper import Hash_Password,Clean_Data


app = Flask(__name__)


@app.route('/bulk-action',methods= ['POST'])
def Admin_Bulk_Action ():
    
    data = request.get_json()
    
    if data['for'] == "End_Date":

        Batch = data['data']['Batch']
        Date = data['data']['Date']
        
        if Batch and Date and not 'All' in Batch:
            
            Mydb = mysql.connector.connect(
            host = "localhost",
            user = "root",
            password = "admin",
            database = 'sis'
            
            )
            
            cursor = Mydb.cursor()
            
            cursor.execute("UPDATE students SET End_Date = %s WHERE Batch = %s",(Date,Batch,))
            
            Mydb.commit()
            
            cursor.close()
            Mydb.close()
            
            return jsonify({'res' : True})
        
        else:
            return jsonify({'res' : False})
        
        
    elif data['for'] == "Start_Date":
        Batch = data['data']['Batch']
        Date = data['data']['Date']
        
        if Batch and Date and not 'All' in Batch:
            
            Mydb = mysql.connector.connect(
            host = "localhost",
            user = "root",
            password = "admin",
            database = 'sis'
            
            )
            
            cursor = Mydb.cursor()
            
            cursor.execute("UPDATE students SET Start_Date = %s  WHERE  Batch = %s",(Date,Batch,))
            
            Mydb.commit()
            
            cursor.close()
            Mydb.close()
            
            return jsonify({'res' : True})
        
        else:
            return jsonify({'res' : False})
        
    else:
        return jsonify({'res' : False})
    


@app.route('/bulk-certificate',methods = ['POST'])
def Bulk_Certificate ():
    data = request.get_json()
    
    if data['method'] == "Download":
        
        First_Name = data['First_Name']
        Email = data['Email']
        Register_Number = data['Usn']
        Course_Name = data['Course_Name']
        
        if data['data']:
            Mydb = mysql.connector.connect(
            host = "localhost",
            user = "root",
            password = "admin",
            database = 'sis'
            
            )
            
            cursor = Mydb.cursor()
            
            cursor.execute("SELECT * FROM students WHERE First_Name = %s , Email = %s , Register_Number = %s , Course_Name = %s",(First_Name,Email,Register_Number,Course_Name,))
            data = cursor.fetchall()
            
            if data:
                if data['Error'] is None or data['Error '] == False:
                    pass
                
                else:
                    pass
    
    
@app.route('/admin-certificate-fetch-data',methods =['POST'])
def Admin_Certificate_Fetch_Data ():
    
    data = request.get_json()
    
    
    if data['pass'] == "!#@1234q:{)324++@9926xcvbn":
        
        Mydb = mysql.connector.connect(
        host = "localhost",
        user = "root",
        password = "admin",
        database = 'sis'
        
        )
        
        cursor = Mydb.cursor()
        Send_List = []
        value = data['value']
        Batch = data['batch']
        
        
        if value == "generat-selec":
            
            cursor.execute("SELECT First_Name, Last_Name, Phone, Email, Certificate_Number,Register_Number,Course_Name  FROM students WHERE Certificate_Number IS NOT NULL AND Batch = %s;",(Batch,))
            data = cursor.fetchall()
            if data:
                for cred in data:
                    send_data = {
                        'First_Name' : cred[0],
                        'Last_Name' : cred[1],
                        'Phone' : cred[2],
                        'Email' : cred[3],
                        'Certi_Number' : cred[4],
                        'Usn' : cred[5],
                        'Certi_Status' : "True",
                        'Course_Name' : cred[6]
                    }
                    
                    Send_List.append(send_data)
                    
                    cursor.close()
                    Mydb.close()
            
                return jsonify({'exists' : True , 'data' : Send_List})
                
            else:
                cursor.close()
                Mydb.close()
                return jsonify({'exists' : False})
            
            
        elif value == "nongener-selec":
            
            cursor.execute("SELECT First_Name, Last_Name, Phone, Email, Certificate_Number, Register_Number,Course_Name  FROM students WHERE Certificate_Number is NULL AND Batch = %s;",(Batch,))
            data = cursor.fetchall()
    
            if data:
                for cred in data:
                    send_data = {
                        'First_Name' : cred[0],
                        'Last_Name' : cred[1],
                        'Phone' : cred[2],
                        'Email' : cred[3],
                        'Certi_Number' : cred[4],
                        'Usn' : cred[5],
                        'Certi_Status' : "False",
                        'Course_Name' : cred[6]
                    }
                    
                    Send_List.append(send_data)
                    
                cursor.close()
                Mydb.close()
                return jsonify({'exists' : True , 'data' : Send_List})
                
            else:
                cursor.close()
                Mydb.close()
                return jsonify({'exists' : False})
            
        elif value == "errror-selec":
            cursor.execute("SELECT First_Name, Last_Name, Phone, Email, Error, Usn,Course_Name FROM  Certificate_Error WHERE  Batch = %s;",(Batch,))
            data = cursor.fetchall()
    
            if data:
                for cred in data:
                    send_data = {
                        'First_Name' : cred[0],
                        'Last_Name' : cred[1],
                        'Phone' : cred[2],
                        'Email' : cred[3],
                        'Error' : cred[4],
                        'Usn' : cred[5],
                        'Course_Name' : cred[6]
                    }
                    
                    Send_List.append(send_data)
                    
                cursor.close()
                Mydb.close()

                return jsonify({'exists' : True , 'data' : Send_List})
                
            else:
                cursor.close()
                Mydb.close()
                return jsonify({'exists' : False})
            
        else:
            cursor.close()
            Mydb.close()
            return jsonify({'exists' : False})
            
    else:
        return jsonify({'error' : "access denied!"})
        


@app.route('/admin-certificate')
def Admin_Certificate_Page ():
    
    if 'Name' in session and 'Email' in session:
        Name = session['Name']
        Email = session['Email']
        Password = session['Password']
        
        Mydb = mysql.connector.connect(
        host = "localhost",
        user = "root",
        password = "admin",
        database = 'sis'
        
        )
        
        cursor = Mydb.cursor()
        
        cursor.execute('SELECT First_Name FROM admin WHERE First_Name = %s AND Email = %s AND Password = %s',(Name,Email,Password))
        data = cursor.fetchall()
        
        if data:
            
            cursor.close()
            Mydb.close()
            return render_template("Admin_Certificate_Page.html")
        
        else:
            cursor.close()
            Mydb.close()
            return redirect('/login')
         
    else:
        return redirect('/login')
          

@app.route('/Student-Account-check',methods=["POST"])
def Check_Account_Exists ():
    data = request.get_json()
    
    if data:
        Phone = data["Phone"]
        Email = data['Email']
        Name = data['Name'].lower()
        Last = data['Last'].lower()
        
        mydb = mysql.connector.connect(
                host = 'localhost',
                user = 'root',
                password = 'admin',
                database = 'sis'
            )
            
        cursor = mydb.cursor()
        
        cursor.execute("SELECT First_Name FROM students WHERE Phone = %s AND Email = %s AND First_Name = %s AND Last_Name = %s;",(Phone,Email,Name,Last))
        data = cursor.fetchall()
        
        cursor.close()
        mydb.close()
        
        if data:
            return jsonify({"res" : True})
        else:
            return jsonify({"res" : False})
    
    else:
        return jsonify({"res" : False})
    


@app.route('/certificate-verify',methods=['POST'])
def Verify_Certificate ():
    Data = request.get_json()
    
    Certificate_Id = Data['data']
    
    if Certificate_Id:
        mydb = mysql.connector.connect(
            host = 'localhost',
            user = 'root',
            password = 'admin',
            database = 'sis'
        )
        
        cursor = mydb.cursor()
        
        cursor.execute("SELECT  First_Name,Email FROM students WHERE Certificate_Number = %s",
                        (Certificate_Id,))
        
        data = cursor.fetchall()
        
        cursor.close()
        mydb.close()
        
        if data:
            
            return jsonify({'result':True,'title' : "Certificate is Authorized"})
        
        else:
            return jsonify({'result':False,'title' : "Certificate is Unauthorized"})
        
    else:
        return jsonify({'result':False,'title' : "Invalid Input!"})


@app.route('/')
def Landing_Page ():
    
    if 'Student_First_Name' in session and "Student_Last_Name" in session:
        return redirect('/student')
    
    else:
        return render_template('Landing_Page.html')



@app.route('/certificate-generate',methods=['POST'])
def Generate_Certificate ():

    Pass = request.get_json()
    
    if 'Student_First_Name' in session and "Student_Password" in session:
    
        if Pass['pass']== "bDr*^1t4t_@fj<lDda24Cz9*BM)I@u":
            
            mydb = mysql.connector.connect(
                host = "localhost",
                user = "root",
                password = "admin",
                database = "sis"
            )
            
            Name =  session["Student_First_Name"]
            Last = session["Student_Last_Name"]
            Email = session['Student_Email']
            Phone =  session['Student_Phone']
            
            cursor = mydb.cursor()
            
            cursor.execute("SELECT * FROM Students WHERE First_Name = %s AND Email = %s AND Phone = %s;",(Name,Email,Phone,))
            
            data = cursor.fetchall()
           
           
            if data :
                Certificate_Number = data[0][13]

                if Certificate_Number == None:
    
                    Certificate_Number = Certificat_Number_Generator(data[0][7],data[0][14]).Generate()
                    
                    cursor.execute("UPDATE students SET Certificate_Number = %s WHERE First_Name = %s AND Email = %s AND Phone = %s;",
                                   (Certificate_Number,Name,Email,Phone))
                    
                    mydb.commit()
                    
                else:
                    pass
                
                cursor.close()
                mydb.close()
    
            
                Certificate = Pdf_Certificate(data[0][0] + " " + data[0][1],data[0][4], data[0][5],data[0][9],data[0][14],Certificate_Number)
                Certificate.Print()
                
                Output_File = "output.pdf"

                return send_file(Output_File,as_attachment=True)
            
            else:
                return "something went wrong",400
    
    else:

        return redirect('/student-login')


@app.route('/certificate')
def Certificate ():
    if 'Student_First_Name' in session and "Student_Password" in session:
    
        return render_template('Certificate.html')
    
    else:
        return redirect('/student-login')
    
    

@app.route('/student-page-logout',methods=['POST'])
def Students_Page_Log_out():
    session.clear()
    
    return redirect('/')
    

@app.route('/student',methods = ['POST',"GET"])
def Students_Info_Dashboard ():

    if request.method == "GET":
        Course = None
    
    else:
        Course = request.get_json()
        
        
    if not 'Student_First_Name' in session and not "Student_Password" in session:
    
        return redirect('/student-login')
    
    else:
        First_Name = session["Student_First_Name"]
        Phone = session['Student_Phone']
        Email = session['Student_Email']
        Password = session['Student_Password']
        
        Mydb = mysql.connector.connect(
            host = "localhost",
            user = "root",
            password = "admin",
            database = 'sis'
        )
        
        cursor = Mydb.cursor()
        
        cursor.execute("SELECT * FROM students WHERE First_Name = %s AND Phone =  %s AND Email = %s AND Password = %s ;",(First_Name,Phone,Email,Password,))
        Credential = cursor.fetchall()
            
        
        if Credential:
            data = {
                'Name' : Credential[0][0],
                'Last' : Credential[0][1],
                'Phone' : Credential[0][2],
                'Email' : Credential[0][3],
                'Reg' : Credential[0][4],
                'Inst' : Credential[0][5],
                'Mode' :  Credential[0][6],
                'Course' : Credential[0][7],
                'Total' : Credential[0][8],
                'Entry' : str(Credential[0][9]).split()[0].split('-'),
                'End' : str(Credential[0][14]).split()[0].split('-'),
                'Payment' : Credential[0][10],
                'Days' : None,
                'Days_Left' : None
            }
            
            start = [str(i) for i in data['Entry']]
            end = data['End']
            
            start = [int(i) for i in start]
            end = [int(i) for i in end]

            start = date(start[0],start[1],start[2])
            end = date(end[0],end[1],end[2])
            
            Days = end - start
            
            Total_Days = Days.days
            
            Today = str(datetime.now()).split()[0]
            Today = Today.split('-')
            Today = [int(i) for i in Today]
            Today = date(Today[0],Today[1],Today[2])
            
            Days = end - Today
            print(Days.days)
            if Days.days <= 0:
                data['Days'] = 0
                
            else:
                data['Days'] = Days.days
                
            percentage = Total_Days - Days.days
            percentage = percentage / Total_Days * 100
        
            if percentage >= 100:
                data['Days_Left'] = 100
                
            else:
                data['Days_Left'] = round(percentage)
                
            print(data['Days_Left'])
            
            Icon = Icon_Process().Process(data['Course'],data['Payment'])
            
            cursor.close()
            Mydb.close()
            
            return render_template('Students_Page.html',data = data,Icon = Icon)
        
        else:
            return redirect('/student-login')
    
    

@app.route('/student-login-data',methods=['POST'])
def Student_Login_Data_Handle ():
    Name_Email = request.form['Name_Email']
    Password = request.form['Password']

    if Name_Email and Password :
        
        Name_Email_Password_Found = False
        
        Mydb = mysql.connector.connect(
            host = "localhost",
            user = "root",
            password = "admin",
            database = 'sis'
        )
        
        cursor = Mydb.cursor()
        
        if '@' in Name_Email:
            
            if ".in" in Name_Email or ".com" in Name_Email:

                cursor.execute("SELECT Password, Phone,Email,First_Name, Last_Name  FROM students WHERE Email = %s",(Name_Email,))
                data = cursor.fetchall()
                cursor.close()
                Mydb.close()
                
                if data:
                    if Password == data[0][0]:
                        Name_Email_Password_Found = True
                        
                    else:
                        flash("Invalid Password",'error')
                        return redirect('/student-login')
                else:
                    flash("Account Does not Exists For This Email",'error')
                    return redirect('/student-login')
            else:
                flash("Invalid Email!",'error')
                return redirect('/student-login')
            
        else:

            cursor.execute("SELECT Password, Phone,Email, First_Name,Last_Name  FROM students WHERE First_Name = %s;",(Name_Email,))
            data = cursor.fetchall()
            
            cursor.close()
            Mydb.close()
            
            if data:
                if Password == data[0][0]:
                    Name_Email_Password_Found = True
                    
                else:
                    flash("Invalid Password",'error')
                    return redirect('/student-login')
            else:
                flash("Account Does not Exists For This Name",'error')
                return redirect('/student-login')
            
        
        if Name_Email_Password_Found == True :
            session.clear()
            session.permanent = True
            session['Student_Password'] = data[0][0]
            session['Student_Phone'] = data[0][1]
            session['Student_Email'] = data[0][2]
            session['Student_First_Name'] = data[0][3]
            session['Student_Last_Name'] = data[0][4]
            
            return redirect('/student')
        
    else:
        flash("Data is Not valid!. seems like javascript is manuplated !",'error')
        return redirect('/student-login')


@app.route('/student-login')
def Studets_Login ():
    return render_template('Students_Login.html')



@app.route('/add-student',methods = ['POST'])
def Add_Student ():
    data = request.get_json()
    
    if data :
    
        Name = data['Name'].lower()
        Last = data['Last'].lower()
        Phone = data['Phone']
        Email = data['Email']
        Register_Number= data['Reg']
        Institution_Name = data['Inst']
        Course_Name = data['Course']
        Total = data['Total']
        Payment_Status = data['Payment'].lower()
        Mode = data['Mode']
        Entry_Date = data['Entry_Date']

        Final = True
        
        if Name and Last and Phone and Email and Register_Number and Institution_Name and Course_Name and Total and Payment_Status and Mode:
            if "@" in Email:
                if not ".com" in Email and not ".in" in  Email:
                    Final = False
                
            if not len(Phone) >= 10 :
                Final = False
                
        if Final:
            
            
            Mydb = mysql.connector.connect(
            host = "localhost",
            user = "root",
            password = "admin",
            database = 'sis'
            
            )
            
            cursor = Mydb.cursor()
            
            cursor.execute('SELECT * FROM key_Dictionary')
            Key_List = cursor.fetchall()
            
            Key_Process = Inst_Process(Register_Number,Institution_Name,Key_List).Process()
                    
            Inst_Key = Key_Process['inst_key']
                    
            if not Key_Process['got']:
                 cursor.execute("INSERT INTO Key_Dictionary (Reg_key, Inst) VALUES (%s , %s)",Key_Process['keys'])
                        
            
            cursor.execute("SELECT Entry_Date , Inst_Key FROM students WHERE Phone = %s AND Register_Number = %s AND Course_Name = %s;",(Phone,Register_Number,Course_Name,))
            if_data_exist = cursor.fetchall()
        
            if if_data_exist :
                
                return jsonify({'res' : True,'date' : if_data_exist[0][0],'Inst' : if_data_exist[0][1]})
            
            else:
                Batch = "Aug-Sep-2023"
                Password = Random_Password(10).Generate()
                Payment_date = datetime.now()
                
                cursor.execute("""INSERT INTO students (First_Name, Last_Name, Phone,
                            Email , Register_Number, Institution_Name, Mode,Course_Name,
                            Total, Entry_Date,Payment_Status,Inst_Key,Password,Batch,Payment_Date) VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);""",(Name,Last,Phone,Email,Register_Number,Institution_Name,
                            Mode,Course_Name,Total,Entry_Date,Payment_Status,Inst_Key,Password,Batch,Payment_date))
            
                
                Mydb.commit()
                
                cursor.execute('SELECT Entry_Date, Inst_Key FROM students WHERE Phone = %s AND Register_Number = %s ;',(Phone,Register_Number,))
                data = cursor.fetchall()
                
                cursor.close()
                Mydb.close()
                
            
                return jsonify({'res' : True,'date' : data[0][0],'Inst' : data[0][1]})
        
        else:
            
            return jsonify({'res' : False})
        
    else:
        return jsonify({'res' : False})


@app.route('/export-list',methods = ['POST'])
def Export_Data ():
    
    Data = request.get_json()
    
    Export_List = Data['Export_List']
    Export_Limit = Data['Export_Limit']
    Export_Format = Data['Export_Format']
    
    if 'Csv' in Export_Format:
        Headings = ['First_Name', 'Last_Name', 'Phone', 'Email','Register_Number', 'Institution_Name','Mode','Course_Name','Total','Entry_Date',
                    'Payment_Status','Inst_Key','Password','Certificate','End_Date','Payment_Date']
        
        New_Heading = []
        New_Export_List = []
        
        for i in range(17):
            if i in Export_Limit:
                New_Heading.append(Headings[i])
        
        
                
        for all in Export_List:
            temp_list = []
            
            for all_heding in New_Heading:
                temp_list.append(all[all_heding])
            
            New_Export_List.append(temp_list)
            
            
        filename = 'Students_info.csv'
        
        with open(filename,'w',newline='') as file:
            csv_write = csv.writer(file)
            
            csv_write.writerow(New_Heading)
            csv_write.writerows(New_Export_List)
                    
        return send_file(filename,as_attachment=True)
        

@app.route('/log-out / <Pass>',methods = ['POST'])
def Log_out (Pass):
    
    if Pass == "bDr*^1t4t_@fj<lDda24Cz9*BM)I@u":
        session.clear()
    
        return redirect('/login')
    
    else:
        return "<h3>Access Denied !</h3>"

    

@app.route('/get-data-csv',methods=['GET','POST'])
def Get_Csv_Data ():

    filters = request.get_json()    
    College = filters[0]
    Course  = filters[1]
    Year_From  = filters[2]
    Year_To = filters[3]
    Payment  = filters[4]
    Mode = filters[5]
    Batch = filters[6]
    
    
    Mydb = mysql.connector.connect(
        host = "localhost",
        user = "root",
        password = "admin",
        database = 'sis'
        )
        
    cursor = Mydb.cursor()
    
    query = "SELECT * FROM students"
    First = True
    
    if not "All" in College :
        if First:
            query = f"{query} WHERE Inst_Key = '{College}'"
            First = False
        else:
            query = f"{query} AND Inst_Key = '{College}'"
            
            
    if not "All" in Course :
        if First:
            query = f"{query} WHERE Course_Name = '{Course}'"
            First = False
            
        else:
            query = f"{query} AND Course_Name = '{Course}'"
            
            
    if not "All" in Payment:
        if First:
            query = f"{query} WHERE  Payment_Status = '{Payment}'"
            First = False
        else:
            query = f"{query} AND Payment_Status = '{Payment}'"
            
    if not 'yyyy-MM-dd' in Year_From and not 'yyyy-MM-dd' in Year_To:
        if First:
            query = f"{query} WHERE DATE(Entry_Date) BETWEEN '{Year_From}' AND '{Year_To}'"
            
        else:
            query = f"{query} AND DATE(Entry_Date) BETWEEN '{Year_From}' AND '{Year_To}'"
              
    if not "All" in Mode:
        if First:
            query = f"{query} WHERE Mode = '{Mode}'"
            First = False
        else:
            query = f"{query} AND Mode = '{Mode}'"
            
    if not "All" in Batch:
        
        if First:
            query = f"{query} WHERE Batch = '{Batch}'"
            
        else:
            query = f"{query} AND Batch = '{Batch}'"
            
    query = f"{query};"

    cursor.execute(query) 
    
    data = cursor.fetchall()
    
    if data:
        Students = []
        for Each_User in data:
            
            Name = Each_User[0]
            Last = Each_User[1]
            Phone = Each_User[2]
            Email = Each_User[3]
            Register_Number= Each_User[4]
            Institution_Name = Each_User[5]
            Mode = Each_User[6]
            Course_Name = Each_User[7]
            Total = Each_User[8]
            Entry_Date = Each_User[9]
            Payment_Status = Each_User[10]
            Inst_Key = Each_User[11]
            Password = Each_User[12]
            Certificate_Number = Each_User[13]
            End_Date = Each_User[14]
            Payment_Date = Each_User[15]
            
            Students.append(
                {
                    'First_Name' : Name.capitalize(),
                    'Last_Name' : Last,
                    'Phone' :  Phone,   
                    'Email' : Email,
                    'Register_Number' :  Register_Number,
                    'Institution_Name' : Institution_Name,
                    'Mode' : Mode,
                    'Course_Name' :  Course_Name,
                    'Total' :  Total,
                    'Entry_Date' : Entry_Date,
                    'Payment_Status' : Payment_Status.capitalize(),
                    'Inst_Key' : Inst_Key,
                    'Password' : Password,
                    'Certificate' : Certificate_Number,
                    'End_Date' : End_Date,
                    'Payment_Date':Payment_Date
                }
                
            )
            
    else:
        Students = {'exist' : False}

    cursor.close()
    Mydb.close()
    
    return jsonify(Students)



@app.route('/admin-students')
def Students_DashBoard():

    if 'Name' in session and 'Email' in session:

        Name = session['Name']
        Email = session['Email']
        Password = session['Password']
        
        Mydb = mysql.connector.connect(
        host = "localhost",
        user = "root",
        password = "admin",
        database = 'sis'
        
        )
        
        cursor = Mydb.cursor()
        
        cursor.execute('SELECT First_Name FROM admin WHERE First_Name = %s AND Email = %s AND Password = %s',(Name,Email,Password))
        data = cursor.fetchall()
        
        cursor.close()
        Mydb.close()
        
        if data:
            
            return render_template("Admin_Students_Page.html")
        
        else:
            return redirect('/login')
         
    else:
        return redirect('/login')



@app.route('/import-file',methods=['POST'])
def Import_File ():
    filename = request.files["File"]
    
    if '.csv' in filename.filename:
        start_time = time()
        
        file_text = filename.read().decode('utf-8')
        Reader = csv.DictReader(file_text.splitlines())
        
        data = []

        for each_user in Reader:
            data.append(each_user)

        if data:
            
            Mydb = mysql.connector.connect(
            host = "localhost",
            user = "root",
            password = "admin",
            database = 'sis'
            
            )
            
            cursor = Mydb.cursor()
            
            cursor.execute('SELECT * FROM key_Dictionary')
            Key_List = cursor.fetchall()
            
            
            for each_user in data:
                
                if "Last_Name" in each_user:
                    First_Name = each_user['First_Name']
                    Last_Name = each_user['Last_Name']
                    
                else:
                    Name_Split = Clean_Data(each_user['First_Name']).Name_Split()
                    
                    First_Name = Name_Split[0]
                    Last_Name = Name_Split[1]
    
                Phone = Clean_Data(each_user['Phone']).Phone_Num_Clean()
                Email = each_user['Email']
                Register_Number= each_user['Register_Number']
                Institution_Name = each_user['Institution_Name']
                Course_Name = Clean_Data(each_user['Course_Name']).Course_Clean()
                Total = each_user['Total']
                Entry_Date = "2023-08-16 00:00:00"
                Payment_Status = each_user['Payment_Status']
                Mode = ""
                Payment_Date = Entry_Date
                Department = each_user['Department']
                
                # cursor.execute("SELECT First_Name FROM students WHERE Phone = %s AND Register_Number = %s AND Course_Name = %s;",(Phone,Register_Number,Course_Name,))
                # if_data_exist = cursor.fetchall()
                
                # if if_data_exist :
                #     pass
                
                if True:
                    
                    Key_Process = Inst_Process(Register_Number,Institution_Name,Key_List).Process()
            
                    Inst_Key = Key_Process['inst_key']
                    
                    if not Key_Process['got']:
                        cursor.execute("INSERT INTO Key_Dictionary (Reg_key, Inst) VALUES (%s , %s)",Key_Process['keys'])
                        Key_List.append(Key_Process['keys'])
                        
                    
                    # Entry_Date = DateTimeProcess(Entry_Date).Get()
                    # Payment_Date = DateTimeProcess(Payment_Date).Get()
                    Password = Random_Password(10).Generate()
                    Batch = "Aug-Sep-2023"
                    
                    cursor.execute("""INSERT INTO students (First_Name, Last_Name, Phone,
                        Email , Register_Number, Institution_Name, Mode,Course_Name,
                        Total, Entry_Date,Payment_Status,Inst_Key,Password,Payment_Date,Batch,Department) 
                        VALUES(IFNULL(%s,"Not defined"),IFNULL(%s,"Not defined"),IFNULL(%s,"Not defined"),IFNULL(%s,"Not defined"),IFNULL(%s,"Not defined"),IFNULL(%s,"Not defined"),IFNULL(%s,"Not defined"),IFNULL(%s,"Not defined"),IFNULL(%s,"Not defined"),IFNULL(%s,"Not defined"),IFNULL(%s,"Not defined"),IFNULL(%s,"Not defined"),IFNULL(%s,"Not defined"),IFNULL(%s,"Not defined"),IFNULL(%s,"Not defined"),IFNULL(%s,"Not defined"));"""
                        ,(First_Name,Last_Name,Phone,Email,Register_Number,Institution_Name,
                        Mode,Course_Name,Total,Entry_Date,Payment_Status,Inst_Key,Password,Payment_Date,Batch,Department))
            
            
            Mydb.commit()
            cursor.close()
            Mydb.close()
            
            print("end Time : ",time()-start_time)
            return redirect('/admin-students')
        
        else:
            return redirect("/admin-students")
        
    else:
        
        return redirect('/admin-students')
    


@app.route('/admin/<url_Password>')
def Admin_Page (url_Password):
    
    if url_Password == "777":
    
        return redirect('/admin-students')
    
    else:
        return "<h1 style='text-align:center; color:red;'>Access Denied!</h1>"
    

@app.route('/login')
def index ():

    return render_template("Admin_Login.html")


@app.route('/login-data',methods = ['POST'])
def Login_process():
    
    app.config['PERMANENT_SESSION_LIFETIME'] = 1140
    
    Name_Email = request.form['Name_Email']
    Password = request.form['Password']
    
    if Name_Email and Password:
        
        Name_Email_found = False
        session.clear()

        mydb = mysql.connector.connect(
            host = 'localhost',
            user = "root",
            password = 'admin',
            database = 'sis'
        )
        
        cursor = mydb.cursor()
        
        if "@" in Name_Email:
            
            cursor.execute("SELECT Email, Password , First_Name FROM admin WHERE Email = %s",(Name_Email,))
            data = cursor.fetchall()
            cursor.close()
            mydb.close()
            
            if data:
                Hash_P = Hash_Password(Password)
                Email = data[0][0]
                
                if Email == Name_Email and Hash_P.Validate(data[0][1]):
        
                    Name_Email_found = True
                    session['Name'] = data[0][2]
                    session['Email'] = data[0][0]
                    session['Password'] = data[0][1]
                    
                else:
                    flash("Incorrect Password !",'error')
                    return redirect('/login')
            
            else:
              flash("Email does't exists!")
              return redirect('/login')
              
        else:
            cursor.execute("SELECT Email, Password , First_Name FROM admin WHERE First_Name = %s",(Name_Email.lower(),))
            data = cursor.fetchall()
            cursor.close()
            mydb.close()
            
            if data:
                Hash_P = Hash_Password(Password)
                Name = data[0][2]
                
                if Name == Name_Email and Hash_P.Validate(data[0][1]):
        
                    Name_Email_found = True
                    session['Name'] = data[0][2]
                    session['Email'] = data[0][0]
                    session['Password'] = data[0][1]
                    
                else:
                    flash("Incorrect Password !",'error')
                    return redirect('/login')
            
            else:
              flash("Name does't exists!")
              return redirect('/login')
              
        if Name_Email_found:
            return redirect('/admin-students')
        
        else:
            return "Some thing wrong Happend!"
        
    else:
        flash("Invalid Input!",'error')
        return redirect('/login')
       
       
if __name__ == "__main__":
    app.secret_key = "!1@2fdgabb-qmz&*aa:m_+&T%"
    app.run(debug=True)
    