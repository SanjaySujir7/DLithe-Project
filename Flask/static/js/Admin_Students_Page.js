const Header = document.querySelector('.header'),
    Side_Nav = document.querySelector('.side-nav'),
    Side_Nav_Button = document.getElementById('Side-Nav-Button');

const Export_Modal_button = document.getElementById('Export-Dialog-button'),
      Export_Dialog_Spinner = document.getElementById('Loading-button-Export');

const Import_btn = document.getElementById('import-modal-button'),
      Import_Form = document.getElementById('Import_Form');

const Table_Body = document.getElementById('Table-Body');

const Collage_Filter = document.getElementById('Collage-filter'),
      Course_Filter = document.getElementById('Course-filter'),
      Date_Filter_From = document.getElementById('Date-filter-From'),
      Date_Filter_To= document.getElementById('Date-filter-To'),
      Payment_Filter = document.getElementById('Payment_Filter'),
      Mode_Filter = document.getElementById('Mode_Filter'),
      Apply_Filter_btn = document.getElementById('Apply-Filter-btn'),
      Remove_Filter_btn = document.getElementById('Remove-Filter-btn'),
      Batch_Filter = document.getElementById('Batch-Filter');

const Export_File_Format = document.getElementById('Export-File-Format'),
      All_Export_btn = document.getElementById('All-checkbox'),
      Export_Check_Box = document.querySelectorAll('.export-check');

const Table = document.getElementById('Table'),
      Striped_Rows = document.getElementById('striped-rows'),
      Hover_Rows = document.getElementById('hover-rows'),
      Table_Border = document.getElementById('table-border'),
      Apply_Settings = document.getElementById('Apply-settings-btn');

const Result_Modal_Text = document.getElementById('Result-modal-text'),
      Result_Modal_Icon = document.getElementById('Result-modal-i');

const Working_Indicator = document.getElementById('working-indicator');

let  Filter_List = ['All', 'All', 'yyyy-MM-dd','yyyy-MM-dd','All','All',"Aug-Sep-2023"]

let Export_List = []

let RN = 1;

function Apply_Filter (){

    if(Date_Filter_From.value =="" || Date_Filter_To.value == ""){
        Filter_List = [Collage_Filter.value,Course_Filter.value,'yyyy-MM-dd','yyyy-MM-dd',Payment_Filter.value,Mode_Filter.value,Batch_Filter.value]
    }

    else{
        Filter_List = [Collage_Filter.value,Course_Filter.value,Date_Filter_From.value,Date_Filter_To.value,Payment_Filter.value,Mode_Filter.value,Batch_Filter.value]
    }

    Table_Body.innerHTML = "";
    $('#FilterModal').modal('hide')
    Result_Popup("Filter Applied .",true,1500);

    Fetch_Data();
    Working_Indicator.innerHTML = `Working on : ${Batch_Filter.value}`;
};



function Remove_Filter (){
    Filter_List = ['All', 'All', 'yyyy-MM-dd','yyyy-MM-dd','All','All','Aug-Sep-2023']

    Collage_Filter.value = "All";
    Course_Filter.value = "All";
    Date_Filter_From.value = "";
    Date_Filter_To.value = "";
    Payment_Filter.value = "All";
    Mode_Filter.value = "All";
    Batch_Filter.value = "Aug-Sep-2023";
};

let Existing_Filter = [];
function Create_Filter (collage , course){
    if(!Existing_Filter.includes(collage)){
        let collage_f = document.createElement('option');
        collage_f.innerText = collage;

        Collage_Filter.appendChild(collage_f);
        Existing_Filter.push(collage);
    }

    if(!Existing_Filter.includes(course)){
        let course_f = document.createElement('option');
        course_f.innerText = course;

        Course_Filter.appendChild(course_f);
        Existing_Filter.push(course);
    }
};


function Result_Popup(text , condition , Time){
    Result_Modal_Text.innerText = text;

    if(condition){
        Result_Modal_Icon.className = "fi fi-rr-check-circle";
        Result_Modal_Icon.style.color = "green";
    }

    else{
        Result_Modal_Icon.className = "fi fi-rr-circle-xmark";
        Result_Modal_Icon.style.color = "red";
    }

    setTimeout(function(){
        $("#ResultModal").modal("show");
    },200)

    setTimeout(function(){
        $('#ResultModal').modal('hide');
    },Time)

};


All_Export_btn.addEventListener('click',function(){
    for(let i = 0;i < Export_Check_Box.length ; i++){
        Export_Check_Box[i].checked = true;
    }
})

for(let i = 0;i < Export_Check_Box.length ; i++){
    Export_Check_Box[i].addEventListener('change',function(){
        let Non_Checked = false;

        for(let i = 0;i < Export_Check_Box.length ; i++){
            if(!Export_Check_Box[i].checked){
                Non_Checked = true;
                break;
            }

        }
        if(Non_Checked){
            All_Export_btn.checked = false;
        }
        else{
            All_Export_btn.checked = true;
        }
    })
}



Remove_Filter_btn.addEventListener('click',Remove_Filter);

Apply_Filter_btn.addEventListener('click',Apply_Filter);

let Side_Nav_State = true;
Side_Nav_Button.addEventListener('click',function(){
    if(Side_Nav_State){
        Side_Nav.style.left = "-230px";
        Header.style.marginLeft = "0px";
        document.body.style.marginLeft = "0px";
        Side_Nav_State = false;
    }
    else{
        Side_Nav.style.left = "0px";
        Header.style.marginLeft = "230px";
        document.body.style.marginLeft = "230px";
        Side_Nav_State = true;
    }
});

Import_btn.addEventListener('click',function(){
    $('#ImportModal').modal('hide');
    $('#SpinnerModal').modal('show');
    Import_Form.submit();
})

const Export_Download_Link = document.getElementById('Export-Download-Link'),
      Export_Download_Btn = document.getElementById('Export-Download-btn');



Export_Modal_button.addEventListener('click',function(){
    Export_Modal_button.style.display = 'none';
    Export_Dialog_Spinner.style.display = 'block';

    let Export_Limit_List = [];

    for(let i = 0;i < Export_Check_Box.length ; i++){
        if(Export_Check_Box[i].checked){
            Export_Limit_List.push(i);
        }
    }

    fetch('/export-list',{
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({'Export_List' : Export_List,'Export_Limit' : Export_Limit_List,'Export_Format' : Export_File_Format.value})
    })

    .then(response => response.blob())
    .then(file => {
        const file_url = URL.createObjectURL(file);
        Export_Download_Link.href = file_url;
        Export_Download_Link.download = "Students_Info.csv"
        Export_Download_Btn.removeAttribute('disabled');
    })

    Export_Dialog_Spinner.style.display = 'none';
    Export_Modal_button.style.display = 'block';
});


function Create_Table (First , Last , Phone , Email ,Register , Inst , Course , Mode , Entry, Total, Payment ){
    let Table_row = document.createElement('tr');

    Table_row.onclick = function(){
        Edit_STudents_Dialog_Popup(this.children)
    }

    let Row_no = document.createElement('th');
    Row_no.scope = 'row';
    Row_no.innerText = RN;
    Table_row.appendChild(Row_no);

    let Tr1 = document.createElement('td');
    Tr1.innerText = First;
    Table_row.appendChild(Tr1);

    let Tr2 = document.createElement('td');
    Tr2.innerText = Last;
    Table_row.appendChild(Tr2);

    let Tr3 = document.createElement('td');
    Tr3.innerText = Phone;
    Table_row.appendChild(Tr3);

    let Tr4 = document.createElement('td');
    Tr4.innerText = Email;
    Table_row.appendChild(Tr4);

    let Tr5 = document.createElement('td');
    Tr5.innerText = Register;
    Table_row.appendChild(Tr5);

    let Tr6 = document.createElement('td');
    Tr6.innerText = Inst;
    Table_row.appendChild(Tr6);

    let Tr7 = document.createElement('td');
    Tr7.innerText = Course;
    Table_row.appendChild(Tr7);

    let Tr8 = document.createElement('td');
    Tr8.innerText = Mode;
    Table_row.appendChild(Tr8);

    let Tr9 = document.createElement('td');
    Tr9.innerText = Entry;
    Table_row.appendChild(Tr9);

    let Tr10 = document.createElement('td');
    Tr10.innerText = Total;
    Table_row.appendChild(Tr10);

    let Tr11 = document.createElement('td');
    Tr11.innerText = Payment;

    if(Payment == "Paid"){
        Tr11.className = "bg-success";
        Tr11.style.color = "white";
    }

    else if (Payment == "Not paid"){
        Tr11.className = "bg-danger";
        Tr11.style.color = "white";
    }

    Table_row.appendChild(Tr11);

    Table_Body.appendChild(Table_row);
    RN++;
};

function Table_Settings (){ 
    localStorage.clear();
    if(Striped_Rows.checked){
        Table.classList.add('table-striped');
        localStorage.setItem('table-striped',true);
    }
    else{
        Table.classList.remove('table-striped');
        localStorage.setItem('table-striped',false);
    }

    if(Hover_Rows.checked){
        Table.classList.add('table-hover');
        localStorage.setItem('table-hover',true);
    }

    else{
        Table.classList.remove('table-hover');
        localStorage.setItem('table-hover',false);
    }

    if(Table_Border.value == "Borderd"){
        Table.classList.add('table-bordered');
        Table.classList.remove('table-borderless');
        localStorage.setItem('table-borderd',true);
        localStorage.setItem('table-default',false);
        localStorage.setItem('table-borderless',false);
    }

    else if (Table_Border.value == "Default"){
        Table.classList.remove('table-bordered')
        Table.classList.remove('table-borderless')
        localStorage.setItem('table-borderd',false);
        localStorage.setItem('table-default',true);
        localStorage.setItem('table-borderless',false);
    }

    else{
        Table.classList.add('table-borderless');
        Table.classList.remove('table-bordered');
        localStorage.setItem('table-borderd',false);
        localStorage.setItem('table-default',false);
        localStorage.setItem('table-borderless',true);
    }

    $("#SettingsModal").modal('hide');
    Result_Popup('New Settings Applied',true,1700);
}

function Default_Settings (){
    let Table_str = localStorage.getItem('table-striped'),
        Table_hover = localStorage.getItem('table-hover');

        if(localStorage.getItem('table-borderd') == "true"){
            Table.classList.add('table-bordered');
            Table_Border.value = 'Borderd';
        }

        else if (localStorage.getItem('table-borderless') == "true"){
            Table.classList.add('table-borderless');
            Table_Border.value = 'No Border';
        }

        else{
            Table_Border.value = 'Default';
        }

        if(Table_str == "true") {
            Table.classList.add('table-striped');
            Striped_Rows.checked = true;
        }

        if(Table_hover == "true"){
            Table.classList.add('table-hover');
            Hover_Rows.checked = true;
        }
}

Default_Settings();
Apply_Settings.addEventListener('click',Table_Settings);

function Fetch_Data (){
    RN = 1;
    fetch('/get-data-csv',{
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(Filter_List)
    })
        .then(response => response.json())
    
        .then(Each_User => {

            Export_List = Each_User;
    
        for(let i = 0 ; i < Each_User.length ; i++){
    
    
            let Name = Each_User[i]['First_Name'],
                Last = Each_User[i]['Last_Name'],
                Phone = Each_User[i]['Phone'],
                Email = Each_User[i]['Email'],
                Register_Number= Each_User[i]['Register_Number'],
                Institution_Name = Each_User[i]['Institution_Name'], 
                Mode = Each_User[i]["Mode"],
                Course_Name = Each_User[i]['Course_Name'],
                Total = Each_User[i]['Total'],
                Entry_Date = Each_User[i]['Entry_Date'].split(" "),
                Payment_Status = Each_User[i]['Payment_Status'],
                Inst_Key = Each_User[i]['Inst_Key'];

                Entry_Date = Entry_Date[0] + " " + Entry_Date[1] + " " +  Entry_Date[2] + " " + Entry_Date[3]
    
            Create_Table(Name,Last,Phone,Email,Register_Number,Institution_Name,Course_Name,Mode,Entry_Date,Total,Payment_Status);
            Create_Filter(Inst_Key,Course_Name);
        }
        
    })

}

Fetch_Data();

let Search_Indicator = false;

const Search_Div_Parent = document.getElementById('SearchReusltdiv'),
      Serach_Button = document.getElementById('Search_btn');


function Search (word){
    Table_Body.innerHTML = "";
    RN = 1;
    for(let i =0 ; i < Export_List.length ; i ++){

        if(Export_List[i]['First_Name'].toLowerCase().startsWith(word)){
            
            let Name = Export_List[i]['First_Name'],
                Last = Export_List[i]['Last_Name'],
                Phone = Export_List[i]['Phone'],
                Email = Export_List[i]['Email'],
                Register_Number= Export_List[i]['Register_Number'],
                Institution_Name = Export_List[i]['Institution_Name'], 
                Mode = Export_List[i]["Mode"],
                Course_Name = Export_List[i]['Course_Name'],
                Total = Export_List[i]['Total'],
                Entry_Date = Export_List[i]['Entry_Date'].split(" "),
                Payment_Status = Export_List[i]['Payment_Status'];

                Entry_Date = Entry_Date[0] + " " + Entry_Date[1] + " " +  Entry_Date[2] + " " + Entry_Date[3]
    
            Create_Table(Name,Last,Phone,Email,Register_Number,Institution_Name,Course_Name,Mode,Entry_Date,Total,Payment_Status);
        }
    }
}

Serach_Button.addEventListener('click',function(){

    if(!Search_Input.value){
        Table_Body.innerHTML = "";
        RN = 1;
        for(let i =0 ; i < Export_List.length ; i ++){
                
            let Name = Export_List[i]['First_Name'],
                Last = Export_List[i]['Last_Name'],
                Phone = Export_List[i]['Phone'],
                Email = Export_List[i]['Email'],
                Register_Number= Export_List[i]['Register_Number'],
                Institution_Name = Export_List[i]['Institution_Name'], 
                Mode = Export_List[i]["Mode"],
                Course_Name = Export_List[i]['Course_Name'],
                Total = Export_List[i]['Total'],
                Entry_Date = Export_List[i]['Entry_Date'].split(" "),
                Payment_Status = Export_List[i]['Payment_Status'];

                Entry_Date = Entry_Date[0] + " " + Entry_Date[1] + " " +  Entry_Date[2] + " " + Entry_Date[3]
    
            Create_Table(Name,Last,Phone,Email,Register_Number,Institution_Name,Course_Name,Mode,Entry_Date,Total,Payment_Status);
        }
    }

    else{
        Search_Div_Parent.innerHTML = "";
        Search_Div_Parent.style.display = 'none';
        Search(Search_Input.value.toLowerCase());
    }
})

function Search_Text_Apend (text){
    Search_Input.value = text;
    Search_Div_Parent.innerHTML = "";
    Search_Div_Parent.style.display = 'none';
    Search(text);
}



function Create_Search_Div(Name,text){
    let div = document.createElement('div');
        div.className = "search-result-child";
        div.addEventListener('click',function(){Search_Text_Apend(this.innerText)})

    let h6 = document.createElement('h6');
        let updatedText = Name.replace(new RegExp(text, "gi"), match => `<strong>${match}</strong>`);

        h6.innerHTML = updatedText;
        div.appendChild(h6)

    Search_Div_Parent.append(div);
};


const Search_Input = document.getElementById('Search-Input');


function Search_process (){
    Search_Div_Parent.innerHTML = "";
    RN = 1;
    let Search_Limit = 0;

    if(Search_Input.value){
        let got = false;
        Search_Div_Parent.style.display = 'block';

        for(let i = 0 ; i < Export_List.length; i++){

            if(Export_List[i]['First_Name'].toLowerCase().startsWith(Search_Input.value.toLowerCase())){
                got = true;
                Create_Search_Div(Export_List[i]['First_Name'].toLowerCase(),Search_Input.value.toLowerCase());
                Search_Limit ++;
            }

            if(Search_Limit >= 10){
                break;
            }
        }

        if(!got){
            Search_Div_Parent.style.display = 'none';
        }
    }
    else{
        Search_Div_Parent.style.display = "none";
    }
}



Search_Input.addEventListener('input',Search_process);


const End_Date_Button = document.getElementById('End_Date_btn'),
      End_date_Modal_Title = document.getElementById('End_date_modal_Title');

End_Date_Button.addEventListener('click',function(){
    End_date_Modal_Title.innerHTML = Batch_Filter.value;
})


const End_date_Set_Btn = document.getElementById('End-Date-Set-btn'),
      End_date_set_input = document.getElementById('End_Date_Set_Input');

    
End_date_Set_Btn.addEventListener('click',function(){
    if(End_date_set_input.value && Batch_Filter.value != 'All'){
        $("#EndDateModal").modal('hide');

        let send_data = {
            for : 'End_Date',
            data : {
                Batch : Batch_Filter.value,
                Date : End_date_set_input.value,
            }
        }

        try {
        
            fetch('/bulk-action',{
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(send_data)
            })
                .then(response => response.json())
                .then(data => {
                    if(data['res']){
                        Result_Popup(`End Date Changed for ${Batch_Filter.value}`,true,1500)
                    }
                    else{
                        Result_Popup("Something Went Wrong!. Try again.",false,1500)
                    }
                })
        } catch (error) {
            Result_Popup("Something Went Wrong!. Try again.",false,1500);
        }
    }
    else{
        End_date_set_input.style.border = "2px solid red";

        if(Batch_Filter.value == "All"){
            alert("You can't set End Date for all")
        }
    }
})

const Start_Date_btn = document.getElementById('Start_Date_btn'),
      Start_Date_Modal_Title = document.getElementById('Start_date_modal_Title'),
      Start_Date_Set_Btn = document.getElementById('Start_date_Set_btn'),
      Start_Date_Input = document.getElementById('Start_Date_Set_Input');

Start_Date_btn.addEventListener('click',function(){
    Start_Date_Modal_Title.innerHTML = Batch_Filter.value;
})



Start_Date_Set_Btn.addEventListener('click',function(){
    if(Start_Date_Input.value && Batch_Filter.value != 'All'){
        $("#StartDateModal").modal('hide');

        let send_data = {
            for : 'Start_Date',
            data : {
                Batch : Batch_Filter.value,
                Date : Start_Date_Input.value,
            }
        }

        try {
        
            fetch('/bulk-action',{
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(send_data)
            })
                .then(response => response.json())
                .then(data => {
        
                    if(data['res']){
                        Result_Popup(`Start Date Changed for ${Batch_Filter.value}`,true,1500)
                    }
                    else{
                        Result_Popup("Something Went Wrong!. Try again.",false,1500)
                    }
                })
        } catch (error) {
            Result_Popup("Something Went Worng !. Try again.",false,1500);
        }
    }
    else{
        End_date_set_input.style.border = "2px solid red";

        if(Batch_Filter.value == "All"){
            alert("You can't set Start Date for all")
        }
    }
})


const Log_Out_Form = document.getElementById('log-out-form'),
      Log_out_Btn = document.getElementById('Log-out-list');


Log_out_Btn.addEventListener('click',function(){
    if(confirm("Do You Want to log out ?")){
        Log_Out_Form.submit();
    }
})


const Edit_Input = document.querySelectorAll('.edit-input'),
      Edit_Save_Btn = document.getElementById('Edit_Save_Btn');

let Change_Table = null;    

function Edit_STudents_Dialog_Popup (details){

    Change_Table = details;

    let Phone = details[3].innerHTML,
        Email = details[4].innerHTML,
        Inst = details[6].innerHTML,
        Course = details[7].innerHTML,
        Mode  = details[8].innerHTML,
        Total = details[10].innerHTML,
        Payment_Status = details[11].innerHTML;

        $("#EditStudentModal").modal('show')
        
    Edit_Input[1].value =  Phone;
    Edit_Input[2].value =  Email;
    Edit_Input[3].value =  Inst;
    Edit_Input[4].value =  Course;
    Edit_Input[5].value =  Total;
    Edit_Input[6].value =  Mode;

    if(Payment_Status == "Paid"){
        Edit_Input[7].checked = true
    }
    else{
        Edit_Input[8].checked = true;
    }
   
    if(Edit_Input[4].value.trim().length === 0){

       let course_op = document.createElement('option');
       course_op.innerText = Course;
       Edit_Input[4].appendChild(course_op);
       Edit_Input[4].value = Course;
    }
}

Edit_Save_Btn.addEventListener('click',function(){

    Update_Object = {
        First : Change_Table[1].innerHTML,
        Last : Change_Table[2].innerHTML,
        Reg : Change_Table[5].innerHTML,
        Phone : Edit_Input[1].value,
        Email : Edit_Input[2].value,
        Inst : Edit_Input[3].value,
        Course : Edit_Input[4].value,
        Total : Edit_Input[5].value,
        Mode : Edit_Input[6].value,
        Payment : Edit_Input[7].checked ? "Paid" : "Not paid"
    }

    $("#EditStudentModal").modal('hide');

    fetch("/update-student-data",{
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(Update_Object)
    })

    .then(response => {
        if(response.ok){
            return response.json();
        }
        else{
            Result_Popup("Something went Wrong!",false,3000);
        }
    })

    .then(data => {
    
        if(data['res']){
            Result_Popup("Changes Saved.",true,2000);
            Change_Table[3].innerHTML = Update_Object.Phone;
            Change_Table[4].innerHTML = Update_Object.Email;
            Change_Table[6].innerHTML = Update_Object.Inst;
            Change_Table[7].innerHTML = Update_Object.Course;
            Change_Table[10].innerHTML = Update_Object.Total;
            Change_Table[8].innerHTML = Update_Object.Mode;
            Change_Table[11].innerHTML = Update_Object.Payment

            if(Update_Object.Payment == "Paid"){
                Change_Table[11].style.color = "white";
                Change_Table[11].className = "bg-success";
            }
            else{
                Change_Table[11].style.color = "white";
                Change_Table[11].className = "bg-danger";
            }

        }
        else{
            Result_Popup("Something went Wrong!",false,3000);
        }
    })
})
