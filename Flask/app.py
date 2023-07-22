
from flask import Flask, jsonify,render_template,request, send_file,session,redirect,flash
import mysql.connector
import csv
from Process import DateTimeProcess,Inst_Process,Random_Password,Certificat_Number_Generator,Icon_Process
from External import Pdf_Certificate
from time import time
from datetime import datetime,date


app = Flask(__name__)


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
        
        if data:
            return jsonify({"res" : True})
        else:
            return jsonify({"res" : False})
    
    else:
        return jsonify({"res" : False})
    


@app.route('/certificate-verify',methods=['POST'])
def Verify_Certificate ():
    Data = request.get_json()
    
    Certificate_Id = Data['id']
    Name = Data['Name'].lower()
    Email = Data['Email']
    
    is_valid = True
    if Certificate_Id and Name and Email:
        if len(Certificate_Id) == 7:
            if "@" in Email and ".com" in Email:
                pass
        
            else:
                is_valid = False
        
        else:
            is_valid = False
            
            
        if is_valid:
            mydb = mysql.connector.connect(
                host = 'localhost',
                user = 'root',
                password = 'admin',
                database = 'sis'
            )
            
            cursor = mydb.cursor()
            
            cursor.execute("SELECT  First_Name,Email FROM students WHERE Certificate_Number = %s AND First_Name = %s AND Email = %s",
                            (Certificate_Id,Name,Email))
            
            data = cursor.fetchall()
            
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
    
        if Pass['pass']== "q#5qJKkaq*%@:+=771":
            
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
    

@app.route('/student')
def Students_Info_Dashboard ():

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
            Inst_Key = Inst_Process(Register_Number,Institution_Name).Process()
            
            
            Mydb = mysql.connector.connect(
            host = "localhost",
            user = "root",
            password = "admin",
            database = 'sis'
            
            )
            
            cursor = Mydb.cursor()
            
            cursor.execute("SELECT Entry_Date , Inst_Key FROM students WHERE Phone = %s AND Register_Number = %s ;",(Phone,Register_Number,))
            if_data_exist = cursor.fetchall()
        
            if if_data_exist :
                
                return jsonify({'res' : True,'date' : if_data_exist[0][0],'Inst' : if_data_exist[0][1]})
            
            else:
                Password = Random_Password(10).Generate()
                
                End_Date = DateTimeProcess(Entry_Date).End_Date_Process()
                
                cursor.execute("""INSERT INTO students (First_Name, Last_Name, Phone,
                            Email , Register_Number, Institution_Name, Mode,Course_Name,
                            Total, Entry_Date,Payment_Status,Inst_Key,Password,End_Date) VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);""",(Name,Last,Phone,Email,Register_Number,Institution_Name,
                            Mode,Course_Name,Total,Entry_Date,Payment_Status,Inst_Key,Password,End_Date))
            
                
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
        Headings = ['First_Name', 'Last_Name', 'Phone', 'Email','Register_Number', 'Institution_Name','Mode','Course_Name','Total','Entry_Date','Payment_Status']
        
        New_Heading = []
        New_Export_List = []
        
        for i in range(11):
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
        

@app.route('/log-out',methods = ['POST'])
def Log_out ():
    session.clear()
    
    return redirect('/login')

    

@app.route('/get-data-csv',methods=['GET','POST'])
def Get_Csv_Data ():

    filters = request.get_json()    
    College = filters[0]
    Course  = filters[1]
    Year_From  = filters[2]
    Year_To = filters[3]
    Payment  = filters[4]
    Mode = filters[5]
    
    
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
            
            
    query = f"{query};"
    
    print(query)

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
                    'Inst_Key' : Inst_Key
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
            
            for each_user in data:
                
                Name = each_user['First_Name'].lower()
                Last = each_user['Last_Name'].lower()
                Phone = each_user['Phone']
                Email = each_user['Email']
                Register_Number= each_user['Register_Number']
                Institution_Name = each_user['Institution_Name']
                Course_Name = each_user['Course_Name']
                Total = each_user['Total']
                Entry_Date = each_user['Entry_Date']
                Payment_Status = each_user['Payment_Status']
                Mode = each_user['Mode']
                
                cursor.execute("SELECT First_Name FROM students WHERE Phone = %s AND Register_Number = %s ;",(Phone,Register_Number,))
                if_data_exist = cursor.fetchall()
                
                if if_data_exist :
                    pass
                
                else:
                    
                    Entry_Date = DateTimeProcess(Entry_Date).Get()
                    Inst_Key = Inst_Process(Register_Number,Institution_Name).Process()
                    Password = Random_Password(10).Generate()
                    End_Date =  DateTimeProcess(Entry_Date).End_Date_Process()
                    
                    cursor.execute("""INSERT INTO students (First_Name, Last_Name, Phone,
                        Email , Register_Number, Institution_Name, Mode,Course_Name,
                        Total, Entry_Date,Payment_Status,Inst_Key,Password,End_Date) VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);""",(Name,Last,Phone,Email,Register_Number,Institution_Name,
                        Mode,Course_Name,Total,Entry_Date,Payment_Status,Inst_Key,Password,End_Date))
            
            Mydb.commit()
            cursor.close()
            Mydb.close()
            
            print("end Time : ",time()-start_time)
            return redirect('/admin-students')
        
        else:
            return redirect("/admin-students")
        
    else:
        
        return redirect('/admin-students')


@app.route('/admin')
def Admin_Page ():
        
        if 'Name' in session and 'Last' in session: 
             
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
                
                return render_template("Admin.html")
            
            else:
                return redirect('/login')
            
        else:
            return redirect('/login')
            
        
@app.route('/login')
def index ():
    
    try:
        if session["login_error"] == 'none':
            error = 'none'
        
        else:
            error = session['login_error']
            
    except:
        error = 'none'

    return render_template("index.html",error = error)


@app.route('/login-data',methods = ['POST'])
def Login_process():
    
    app.config['PERMANENT_SESSION_LIFETIME'] = 1140
    
    Name_Email = request.form['uname']
    Password = request.form['psw']
    
    if Name_Email and Password:
        Name_Email_found = False

        mydb = mysql.connector.connect(
            host = 'localhost',
            user = "root",
            password = 'admin',
            database = 'sis'
        )
        
        c = mydb.cursor()
        
        if "@" in Name_Email and ".com" in Name_Email:
            
            c.execute("SELECT * FROM sis.admin WHERE Email = %s AND Password = %s;",(Name_Email,Password))
            
            data = c.fetchall()
            
            if data:
                session['Name'] = data[0][0]
                session['Last'] = data[0][1]
                session['Email'] = data[0][2]
                session['Password'] = data[0][3]
                Name_Email_found = True
                
        else:
            
            c.execute("SELECT * FROM sis.admin WHERE First_Name  = %s AND Password = %s;",(Name_Email.lower(),Password))
            data = c.fetchall()
            
            if data :
    
                Name = data[0][0]
                Pass = data[0][3]
                
                if Name == Name_Email.lower() and Pass == Password:
                    session.clear()
                    
                    session['Name'] = data[0][0]
                    session['Last'] = data[0][1]
                    session['Email'] = data[0][2]
                    session['Password'] = data[0][3]
                    Name_Email_found = True
        
        c.close()
        mydb.close()
             
        if Name_Email_found:

            try:
                session['login_error'] = 'none'
            
            except:
                pass
                
            return redirect('/admin')
        
        else:
            session['login_error'] = "Account Does not Exist !"
            
            return redirect('/login')
        
    else:
        session['login_error'] = "Data is invalid !"
        return "Data is invalid"

if __name__ == "__main__":
    app.secret_key = "!1@2fdgabb-qmz&*aa:m_+&T%"
    app.run(debug=True)
    