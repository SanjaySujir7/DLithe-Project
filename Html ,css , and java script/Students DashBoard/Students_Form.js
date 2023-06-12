let Students_Add_Name = document.getElementById('person-add-text-Name'),
Students_Add_Last= document.getElementById('person-add-text-Last'),
Students_Add_Phone = document.getElementById('person-add-text-Phone'),
Students_Add_Email = document.getElementById('person-add-text-Email'),
Students_Add_Reg = document.getElementById('person-add-text-Reg'),
Students_Add_Inst= document.getElementById('person-add-text-Inst');

let Add_Students_Button = document.getElementById("Person-add-Dialog-Add-Button"),
Students_Error_Label = document.querySelectorAll('.Input-Error-Display-Students-Add');

let Student_Add_Dropbox_Course = document.getElementById('Add-Student-Dropbox-Id'),
Total_Input_FIeld_Student_add = document.getElementById('Select-Course-name-Add-Student-Text-Box'),
Student_Add_Payment_Status = document.querySelectorAll('.student-add-radio-online');

let Check_All_List = [[Students_Add_Name,false],[Students_Add_Last,false],[Students_Add_Phone,false],[Students_Add_Email,false],
[Students_Add_Reg,false],[Students_Add_Inst,false]]




function Student_Add_Name_Check (){


    if(Students_Add_Name.value){


        if (isNaN(Students_Add_Name.value)){
            Students_Add_Name.style.outline= 'none';
            Check_All_List[0][1] = true;

            if(Students_Error_Label[0].style.display == 'block'){

                Students_Error_Label[0].style.display = 'none';
                Students_Error_Label[0].textContent = "None";
            }
        }
        else{
            Students_Add_Name.style.outline = '1px solid red';
            Students_Error_Label[0].style.display = 'block';
            Students_Error_Label[0].textContent = "Name must be String Not intiger";
            Check_All_List[0][1] = false;
        }
    }

    else{
            Check_All_List[0][1] = false;
            Students_Add_Name.style.outline = '1px solid red';
            Students_Error_Label[0].style.display = 'block';
            Students_Error_Label[0].textContent = "Please Enter Student Name";
    }
}

function Student_Add_Last_Check (){

    if(Students_Add_Last.value){


        if (isNaN(Students_Add_Last.value)){
            Students_Add_Last.style.outline= 'none';
            Check_All_List[1][1] = true;

            if(Students_Error_Label[1].style.display == 'block'){

                Students_Error_Label[1].style.display = 'none';
                Students_Error_Label[1].textContent = "None";
            }
        }
        else{
            Check_All_List[1][1] = false;
            Students_Add_Last.style.outline = '1px solid red';
            Students_Error_Label[1].style.display = 'block';
            Students_Error_Label[1].textContent = "Last Name must be String Not intiger";
        }
    }

    else{
            Check_All_List[1][1] = false;
            Students_Add_Last.style.outline = '1px solid red';
            Students_Error_Label[1].style.display = 'block';
            Students_Error_Label[1].textContent = "Please Enter Student Last Name";
    }
}

function Student_Add_Phone_Check (){

    if(Students_Add_Phone.value){


        if (isNaN(Students_Add_Phone.value)){
            Check_All_List[2][1] = false;
            Students_Add_Phone.style.outline = '1px solid red';
            Students_Error_Label[2].style.display = 'block';
            Students_Error_Label[2].textContent = "Phone must intiger Not String";
        }
        else{
            Check_All_List[2][1] = true;
            Students_Add_Phone.style.outline= 'none';
    
            if(Students_Error_Label[2].style.display == 'block'){

                Students_Error_Label[2].style.display = 'none';
                Students_Error_Label[2].textContent = "None";
            }
        }
    }

    else{
            Check_All_List[2][1] = false;
            Students_Add_Phone.style.outline = '1px solid red';
            Students_Error_Label[2].style.display = 'block';
            Students_Error_Label[2].textContent = "Please Enter Student Phone Number";
    }
}


function Student_Add_Email_Check (){

    if(Students_Add_Email.value){
        if(Students_Add_Email.value.includes('@') && Students_Add_Email.value.includes('.com')){
            Students_Add_Email.style.outline = 'none';
            Check_All_List[3][1] = true;
            if(Students_Error_Label[3].style.display == 'block'){

                Students_Error_Label[3].style.display = 'none';
                Students_Error_Label[3].textContent = "None";
            }
        }
        else{
            Check_All_List[3][1] = false;
            Students_Add_Email.style.outline = '1px solid red';
            Students_Error_Label[3].style.display = 'block';
            Students_Error_Label[3].textContent = "It Does't looks like an email";
        }
    }

    else{
            Check_All_List[3][1] = false;
            Students_Add_Email.style.outline = '1px solid red';
            Students_Error_Label[3].style.display = 'block';
            Students_Error_Label[3].textContent = "Please Enter Student Email";
    }
}

function Student_Add_Reg_Check (){
    if(!Students_Add_Reg.value){
        Check_All_List[4][1] = false;
        Students_Add_Reg.style.outline = '1px solid red';
        Students_Error_Label[4].style.display = 'block';
        Students_Error_Label[4].textContent = "Please Enter Student Register Number";
    }
    else{
        Check_All_List[4][1] = true;
        if(Students_Error_Label[4].style.display == 'block'){
            Students_Add_Reg.style.outline = 'none';
            Students_Error_Label[4].style.display = 'none';
            Students_Error_Label[4].textContent = "None";
        }
    }
}


function Student_Add_Inst_Check (){
    if(!Students_Add_Inst.value){
        Check_All_List[5][1] = false;
        Students_Add_Inst.style.outline = '1px solid red';
        Students_Error_Label[5].style.display = 'block';
        Students_Error_Label[5].textContent = "Please Enter Student Institute Name";
    }
    else{
        Check_All_List[5][1] = true;
        if(Students_Error_Label[5].style.display == 'block'){
            Students_Add_Inst.style.outline = 'none';
            Students_Error_Label[5].style.display = 'none';
            Students_Error_Label[5].textContent = "None";
        }
    }
}

function Students_Add_Form_Validation (){
    if(Students_Add_Name.value && Students_Add_Last.value && Students_Add_Phone.value && Students_Add_Email.value && Students_Add_Reg.value && Students_Add_Inst.value
       && Student_Add_Dropbox_Course.value != 'Select'){

    
    }
    
    else{
        alert("Please fill All fields Before Enter")
        let i = 0;

        Check_All_List.forEach(item =>{
            if (!item[1]){
                item[0].style.outline = '1px solid red';
                Students_Error_Label[i].style.display = 'block';
            }
            i++;
            
            if(Student_Add_Dropbox_Course.value == "Select"){
                Student_Add_Dropbox_Course.style.border = "1px solid red";
            }
        }) 
    }
}

let Total_Price_According = [
    ['Web Development','5000'],
    ['Web Development | 3 weeks','3000'],
    ['Iot','5000'],
    ['Cyber Security l0','6000'],
    ['Cyber Security l1','5000']
]

Student_Add_Dropbox_Course.addEventListener('change',function(){
    if(Student_Add_Dropbox_Course.value == "Select"){
        Student_Add_Dropbox_Course.style.border = "1px solid red"
    }
    else{
        Student_Add_Dropbox_Course.style.border = '1px solid gray';

        Total_Price_According.forEach(item => {
            if(Student_Add_Dropbox_Course.value == item[0]){
                Total_Input_FIeld_Student_add.value = item[1]
            }
        })
    }
});

Student_Add_Payment_Status[0].checked = true;


Add_Students_Button.addEventListener('click',Students_Add_Form_Validation);
Students_Add_Name.addEventListener('input',Student_Add_Name_Check);
Students_Add_Last.addEventListener('input',Student_Add_Last_Check);
Students_Add_Phone.addEventListener('input',Student_Add_Phone_Check);
Students_Add_Email.addEventListener('input',Student_Add_Email_Check);
Students_Add_Reg.addEventListener('input',Student_Add_Reg_Check);
Students_Add_Inst.addEventListener('input',Student_Add_Inst_Check);
