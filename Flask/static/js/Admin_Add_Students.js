const First_Name_Add = document.getElementById('First_Name_Add'),
    Last_Name_Add = document.getElementById('Last_Name_Add'),
    Phone_Add = document.getElementById('Phone_Add'),
    Email_Add = document.getElementById('Email_Add'),
    Reg_Add = document.getElementById('Reg_Add'),
    Inst_Add = document.getElementById('Inst_Add'),
    Total_Add = document.getElementById('Total_Add'),
    payment_radio_add = document.getElementById('payment_radio_add'),
    Course_Add = document.getElementById('Course_Add'),
    Model_Add_btn = document.getElementById('Model_Add_btn'),
    Mode_Add = document.getElementById('Mode_Add'),
    End_Date = document.getElementById('End_Date_Add');


let Add_Validation = [[First_Name_Add,false],[Last_Name_Add,false],[Phone_Add,false],[Email_Add,false],[Reg_Add,false]
,[Inst_Add,false],[Course_Add,false],[Total_Add,false]]

function Account_Check(){
    let Move_Process = true;
    for(let i = 0 ; i < 4 ; i ++){
        if(!Add_Validation[i][1]){
            Move_Process = false;
            break;
        }
    }

    if(Move_Process){
        Check_Things = {
            Phone : Phone_Add.value,
            Name : First_Name_Add.value,
            Email : Email_Add.value,
            Last : Last_Name_Add.value
        }

        fetch('/Student-Account-check',{
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
    
            body : JSON.stringify(Check_Things)
    
        })

        .then(response => response.json())
        .then(data => {
            if(data['res']){
                alert('Account Already Exists!')
            }
        })
    }
};

function First_Name_Add_process (){
    if(First_Name_Add.value){
        if(isNaN(First_Name_Add.value)){
            Add_Validation[0][0].classList.add('is-valid');
            Add_Validation[0][0].classList.remove('is-invalid');
            Add_Validation[0][1] = true;
            Account_Check();
        }
        else{
            Add_Validation[0][0].classList.add('is-invalid');
            Add_Validation[0][0].classList.remove('is-valid');
            Add_Validation[0][1] = false;
        }
    }
    else{
        Add_Validation[0][0].classList.add('is-invalid');
        Add_Validation[0][1] = false;
    }
};

First_Name_Add.addEventListener('input',First_Name_Add_process);

function Last_Name_Add_process (){
    if(Last_Name_Add.value){
        if(isNaN(Last_Name_Add.value)){
            Add_Validation[1][0].classList.add('is-valid');
            Add_Validation[1][0].classList.remove('is-invalid');
            Add_Validation[1][1] = true;
            Account_Check();
        }
        else{
            Add_Validation[1][0].classList.add('is-invalid');
            Add_Validation[1][0].classList.remove('is-valid');
            Add_Validation[1][1] = false;
        }
    }
    else{
        Add_Validation[1][0].classList.add('is-invalid');
        Add_Validation[1][1] = false;
    }
};


Last_Name_Add.addEventListener('input',Last_Name_Add_process);


function Phone_Process (){
    if(Phone_Add.value){
        if(isNaN(Phone_Add.value)){
            Add_Validation[2][0].classList.add('is-invalid');
            Add_Validation[2][0].classList.remove('is-valid');
            Add_Validation[2][1] = false;
            Account_Check();
        }
        else{
            if(Phone_Add.value.length >= 10){
                Add_Validation[2][0].classList.add('is-valid');
                Add_Validation[2][0].classList.remove('is-invalid');
                Add_Validation[2][1] = true;

            }
            else{
                Add_Validation[2][0].classList.add('is-invalid');
                Add_Validation[2][0].classList.remove('is-valid');
                Add_Validation[2][1] = false;
            }
        }
    }
    else{
        Add_Validation[2][0].classList.add('is-invalid');
        Add_Validation[2][1] = false;
    }
};

Phone_Add.addEventListener('input',Phone_Process);

function Email_Process (){
    if(Email_Add.value){
        if(Email_Add.value.includes('@')){

            if(Email_Add.value.includes('.com') || Email_Add.value.includes('.in') ){
                Add_Validation[3][0].classList.add('is-valid');
                Add_Validation[3][0].classList.remove('is-invalid');
                Add_Validation[3][1] = true;
                Account_Check();
            }
            else{
                Add_Validation[3][0].classList.add('is-invalid');
                Add_Validation[3][0].classList.remove('is-valid');
                Add_Validation[3][1] = false;
            }
        }
        else{
        }
    }
    else{
        Add_Validation[3][0].classList.add('is-invalid');
        Add_Validation[3][1] = false;
    }
};

Email_Add.addEventListener('input',Email_Process);

function Register_Process (){
    if(Reg_Add.value){
        Add_Validation[4][0].classList.add('is-valid');
        Add_Validation[4][0].classList.remove('is-invalid');
        Add_Validation[4][1] = true;
    }

    else{
        Add_Validation[4][0].classList.add('is-invalid');
        Add_Validation[4][0].classList.remove('is-valid');
        Add_Validation[4][1] = false;
    }
};

Reg_Add.addEventListener('input',Register_Process);


function Inst_Process (){
    if(Inst_Add.value){
        Add_Validation[5][0].classList.add('is-valid');
        Add_Validation[5][0].classList.remove('is-invalid');
        Add_Validation[5][1] = true;
    }

    else{
        Add_Validation[5][0].classList.add('is-invalid');
        Add_Validation[5][0].classList.remove('is-valid');
        Add_Validation[5][1] = false;
    }
};


Inst_Add.addEventListener('input',Inst_Process);


let Total_Price_According = [
    ['Web Development','2500'],
    ['Internet of Things (IoT)','2500'],
    ['Cyber Security','2500'],
    ['Artificial Inteligence & Data Science','2500']
]

Course_Add.addEventListener('change',function(){
    if(Course_Add.value != "Select"){
        Add_Validation[6][0].classList.add('is-valid');
        Add_Validation[6][0].classList.remove('is-invalid');
        Add_Validation[6][1] = true;

        Total_Price_According.forEach(item =>{
            if(Course_Add.value == item[0]){
                Total_Add.value = item[1]
            }
        })

        Add_Validation[7][0].classList.add('is-valid');
        Add_Validation[7][0].classList.remove('is-invalid');
        Add_Validation[7][1] = true;
    }
    else{
        Add_Validation[6][0].classList.add('is-invalid');
        Add_Validation[6][0].classList.remove('is-valid');
        Add_Validation[6][1] = false;
    }
})

Total_Add.addEventListener('input',function(){
    if(Total_Add.value){
        Add_Validation[7][0].classList.add('is-valid');
        Add_Validation[7][0].classList.remove('is-invalid');
        Add_Validation[7][1] = true;
    }
    else{
        Add_Validation[7][0].classList.add('is-invalid');
        Add_Validation[7][0].classList.remove('is-valid');
        Add_Validation[7][1] = false;
    }
})



function Final_Process (){

   let Final_Move = true;
    
   Add_Validation.forEach(item => {
        if(!item[1]){
            item[0].classList.add('is-invalid');
            Final_Move = false;
        }
   })

   if(End_Date.value == ""){
        Final_Move = false;
        alert('Please Select Entry Date')
   }

   console.log(Final_Move);

   if(Final_Move){
    
        let Pay_radio = false;

        if(payment_radio_add.checked){
            Pay_radio = 'Paid';
        }
        else{

            Pay_radio = 'Not Paid';
        }

        Send_Obj = {
            Name : First_Name_Add.value,
            Last : Last_Name_Add.value,
            Phone : Phone_Add.value,
            Email : Email_Add.value,
            Reg : Reg_Add.value,
            Inst : Inst_Add.value,
            Course : Course_Add.value,
            Total : Total_Add.value,
            Mode : Mode_Add.value,
            Payment : Pay_radio,
            Entry_Date : End_Date.value
        }

        fetch('/add-student',{
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
    
            body : JSON.stringify(Send_Obj)
    
        })

        .then(res => res.json())

        .then(data => {
            if(data['res']){
                Create_Table(Send_Obj.Name,Send_Obj.Last,Send_Obj.Phone,Send_Obj.Email,Send_Obj.Reg,Send_Obj.Inst,Send_Obj.Course
                    ,Send_Obj.Mode,data['date'],Send_Obj.Total,Send_Obj.Payment);

                Create_Filter(data['Inst'],Send_Obj.Course);
                $("#Add-Student-modal").modal('hide')
                Result_Popup("Student data Added.",true,1700);
            }
            else{
                Result_Popup("Something Went Wrong !",false,1700);
            }

            First_Name_Add.value = "";
            Last_Name_Add.value = "";
            Phone_Add.value = "";
            Email_Add.value = "";
            Reg_Add.value = "";
            Inst_Add.value = "";
            Course_Add.value = "Select";
            Mode_Add.value = "Offline";
            Total_Add.value = "";
            payment_radio_add.checked = false;
            document.getElementById('payment_radio_add_Not').checked = true;

            First_Name_Add.classList.remove('is-valid')
            Last_Name_Add.classList.remove('is-valid')
            Phone_Add.classList.remove('is-valid')
            Email_Add.classList.remove('is-valid')
            Reg_Add.classList.remove('is-valid')
            Inst_Add.classList.remove('is-valid')
            Course_Add.classList.remove('is-valid')
            Total_Add.classList.remove('is-valid')

            Add_Validation = [[First_Name_Add,false],[Last_Name_Add,false],[Phone_Add,false],[Email_Add,false],[Reg_Add,false]
,[Inst_Add,false],[Course_Add,false],[Total_Add,false]];
        })

   }

};


Model_Add_btn.addEventListener('click',Final_Process);   