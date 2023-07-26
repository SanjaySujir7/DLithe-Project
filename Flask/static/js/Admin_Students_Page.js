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
      Remove_Filter_btn = document.getElementById('Remove-Filter-btn');

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

let  Filter_List = ['All', 'All', 'yyyy-MM-dd','yyyy-MM-dd','All','All']

let Export_List = []

let RN = 1;

function Apply_Filter (){

    if(Date_Filter_From.value =="" || Date_Filter_To.value == ""){
        Filter_List = [Collage_Filter.value,Course_Filter.value,'yyyy-MM-dd','yyyy-MM-dd',Payment_Filter.value,Mode_Filter.value]
    }

    else{
        Filter_List = [Collage_Filter.value,Course_Filter.value,Date_Filter_From.value,Date_Filter_To.value,Payment_Filter.value,Mode_Filter.value]
    }

    Table_Body.innerHTML = "";
    $('#FilterModal').modal('hide')
    Result_Popup("Filter Applied .",true,1500);

    Fetch_Data();
};



function Remove_Filter (){
    Filter_List = ['All', 'All', 'yyyy-MM-dd','yyyy-MM-dd','All','All']

    Collage_Filter.value = "All";
    Course_Filter.value = "All";
    Date_Filter_From.value = "";
    Date_Filter_To.value = "";
    Payment_Filter.value = "All";
    Mode_Filter.value = "All";
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
    console.log(localStorage.getItem('table-borderd'));
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
                Entry_Date = Each_User[i]['Entry_Date'],
                Payment_Status = Each_User[i]['Payment_Status'],
                Inst_Key = Each_User[i]['Inst_Key'];
    
            Create_Table(Name,Last,Phone,Email,Register_Number,Institution_Name,Course_Name,Mode,Entry_Date,Total,Payment_Status);
            Create_Filter(Inst_Key,Course_Name);
        }
        
    })

}

Fetch_Data();
