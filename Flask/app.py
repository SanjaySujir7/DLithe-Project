
from flask import Flask, jsonify,render_template,request, send_file,session,redirect,flash
import mysql.connector
import csv
from Process import DateTimeProcess,Inst_Process,Random_Password
from External import Pdf_Certificate
from time import time
from datetime import datetime


app = Flask(__name__)

@app.route('/certificate-generate',methods=['POST'])
def Generate_Certificate ():

    Pass = request.get_json('pass')
    
    if 'Student_First_Name' in session and "Student_Last_Name" in session:
        
        if Pass == "q#5qJKkaq*%@:+=771":
            
            Name =  session["Student_First_Name"]
            Last = session["Student_Last_Name"]
            
            Certificate = Pdf_Certificate(Name + Last)
            Certificate.Print()
            
            Output_File = "output.pdf"

            return send_file(Output_File,as_attachment=True)
        
    
    else:
        return redirect('/student-login')


@app.route('/certificate')
def Certificate ():
    if 'Student_First_Name' in session and "Student_Last_Name" in session:
    
        return render_template('Certificate.html')
    
    else:
        return redirect('/student-login')
    

@app.route('/student-page-logout',methods=['POST'])
def Students_Page_Log_out():
    session.clear()
    
    return redirect('student-login')
    

@app.route('/')
def Students_Info_Dashboard ():
    
    if 'Student_First_Name' in session and "Student_Last_Name" in session:
    
        return render_template('students_imf_DashBoard.html')
    
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
        
        if "@" in Name_Email and ".com" in Name_Email :
            
            cursor.execute("SELECT * FROM sis.students WHERE Email = %s AND Password = %s",(Name_Email,Password,))
            
            data = cursor.fetchall()
            
            if data:
                if Name_Email == data[0][3] and Password == data[0][-1]:
                    Name_Email_Password_Found = True
            
            else:
                Name_Email_Password_Found = False
        
        else:
            cursor.execute("SELECT * FROM sis.students WHERE First_Name = %s AND Password = %s",(Name_Email,Password,))
            
            data = cursor.fetchall()

            if data:
                if Name_Email == data[0][0] and Password == data[0][12]:
                    Name_Email_Password_Found = True
            
            else:
                Name_Email_Password_Found = False
                
        if Name_Email_Password_Found :
            session.clear()
            
            session.permanent = True
            session["Student_First_Name"] = data[0][0]
            session["Student_Last_Name"] = data[0][1]
            
            return redirect('/')
            
        else:
            flash("Account Does not Exists!",'error')
            
            return redirect('/student-login')
        
    else:
        flash("Data is Not valid!. seems like javascript is manuplated !",'error')
        return redirect('/student-login')


@app.route('/student-login')
def Studets_Login ():
    return render_template('Student_Login_Page.html')



@app.route('/add-student',methods = ['POST'])
def Add_Student ():
    data = request.get_json()
    
    if data :
    
        Name = data['Name']
        Last = data['Last']
        Phone = data['Phone']
        Email = data['Email']
        Register_Number= data['Reg']
        Institution_Name = data['Inst']
        Course_Name = data['Course']
        Total = data['Total']
        Payment_Status = data['Payment'].lower()
        Mode = data['Mode']
    

        Final = True
        
        if Name and Last and Phone and Email and Register_Number and Institution_Name and Course_Name and Total and Payment_Status and Mode:
            if not "@" in Email and ".com" in Email:
                Final = False
                
            if not len(Phone) >= 10 :
                Final = False
                
        if Final:
            Entry_Date = datetime.now()
            Inst_Key = Inst_Process(Register_Number,Institution_Name).Process()
            
            
            Mydb = mysql.connector.connect(
            host = "localhost",
            user = "root",
            password = "admin",
            database = 'sis'
            
            )
            
            cursor = Mydb.cursor()
            
            cursor.execute("SELECT First_Name FROM students WHERE Phone = %s AND Register_Number = %s ;",(Phone,Register_Number,))
            if_data_exist = cursor.fetchall()
                
            if if_data_exist :
                    pass
                
            else:
                Password = Random_Password(10).Generate()
                
                cursor.execute("""INSERT INTO students (First_Name, Last_Name, Phone,
                            Email , Register_Number, Institution_Name, Mode,Course_Name,
                            Total, Entry_Date,Payment_Status,Inst_Key,Password) VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);""",(Name,Last,Phone,Email,Register_Number,Institution_Name,
                            Mode,Course_Name,Total,Entry_Date,Payment_Status,Inst_Key,Password))
            
                
                Mydb.commit()
                
                cursor.execute('SELECT Entry_Date FROM students WHERE Phone = %s AND Register_Number = %s ;',(Phone,Register_Number,))
                data = cursor.fetchall()
                
                cursor.close()
                Mydb.close()
                
            
                return jsonify({'res' : True,'date' : data[0][0]})
        
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



@app.route('/update-students-table',methods=['POST'])
def Update_Students_Data():
    details = request.get_json()

    if details:
        
        new_list = []
        
        for sublist in details:
            if not new_list:
                new_list.append(sublist)
            else:
                got = False
                
                for x in new_list:
                    if x[0] == sublist[0] and x[1] == sublist[1]:
                        got = True
                        
                if not got :
                    new_list.append(sublist)
        
    
        
        Mydb = mysql.connector.connect(
        host = "localhost",
        user = "root",
        password = "admin",
        database = 'sis'
        )
        
        cursor = Mydb.cursor()
        
        for each_user in new_list:
            Phone = each_user[0]
            Email = each_user[1]
            Course = each_user[2]
            Total = each_user[3]
            Payment_Status = each_user[4]
            
            cursor.execute("UPDATE students SET Course_Name = %s , Total = %s , Payment_Status = %s WHERE Phone = %s AND Email = %s;",
                           (Course,Total,Payment_Status,Phone,Email,))
            
        
        Mydb.commit()
        cursor.close()
        Mydb.close()
        
    
        return jsonify({'result':True})
    
    else:
        return jsonify({'result': False})
    

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
                    'First_Name' : Name,
                    'Last_Name' : Last,
                    'Phone' :  Phone,   
                    'Email' : Email,
                    'Register_Number' :  Register_Number,
                    'Institution_Name' : Institution_Name,
                    'Mode' : Mode,
                    'Course_Name' :  Course_Name,
                    'Total' :  Total,
                    'Entry_Date' : Entry_Date,
                    'Payment_Status' : Payment_Status,
                    'Inst_Key' : Inst_Key
                }
                
            )
            
    else:
        Students = {'exist' : False}

    cursor.close()
    Mydb.close()
    
    return jsonify(Students)



@app.route('/students')
def Students_DashBoard():
    
    if 'Name' in session and 'Last' in session: 
             return render_template('Students.html')
         
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
                
                Name = each_user['First_Name']
                Last = each_user['Last_Name']
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
                    
                    cursor.execute("""INSERT INTO students (First_Name, Last_Name, Phone,
                        Email , Register_Number, Institution_Name, Mode,Course_Name,
                        Total, Entry_Date,Payment_Status,Inst_Key,Password) VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);""",(Name,Last,Phone,Email,Register_Number,Institution_Name,
                        Mode,Course_Name,Total,Entry_Date,Payment_Status,Inst_Key,Password))
            
            Mydb.commit()
            cursor.close()
            Mydb.close()
            
            print("end Time : ",time()-start_time)
            return redirect('/students')
        
        else:
            return redirect("/students")
        
    else:
        
        return redirect('/students')


@app.route('/admin')
def Admin_Page ():

        if 'Name' in session and 'Last' in session: 
             return render_template('admin.html')
         
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
    