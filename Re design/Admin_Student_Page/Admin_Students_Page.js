const Header = document.querySelector('.header'),
    Side_Nav = document.querySelector('.side-nav'),
    Side_Nav_Button = document.getElementById('Side-Nav-Button');

const Export_Modal_button = document.getElementById('Export-Dialog-button'),
      Export_Dialog_Spinner = document.getElementById('Loading-button-Export');

const Import_btn = document.getElementById('import-modal-button');

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

function Apply_Filter (){
    console.log(Date_Filter_From.value);
    if(Date_Filter_From.value =="" || Date_Filter_To.value == ""){
        Filter_List = [Collage_Filter.value,Course_Filter.value,'yyyy-MM-dd','yyyy-MM-dd',Payment_Filter.value,Mode_Filter.value]
    }

    else{
        Filter_List = [Collage_Filter.value,Course_Filter.value,Date_Filter_From.value,Date_Filter_To.value,Payment_Filter.value,Mode_Filter.value]
    }
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


function Result_Popup(text , condition){
    Result_Modal_Text.innerText = text;

    if(condition){
        Result_Modal_Icon.className = "fi fi-rr-check-circle";
        Result_Modal_Icon.style.color = "green";
    }

    else{
        Result_Modal_Icon.className = "fi fi-rr-circle-xmark";
        Result_Modal_Icon.style.color = "red";
    }

    $("#ResultModal").modal("show");
    setTimeout(function(){
        $('#ResultModal').modal('hide');
    },1500)

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
            if(Export_Check_Box[i].checked == false){
                Non_Checked = true;
            }

            if(Non_Checked){
                All_Export_btn.checked = false;
            }
            else{
                All_Export_btn.checked = true;
            }
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
})

Export_Modal_button.addEventListener('click',function(){
    Export_Modal_button.style.display = 'none';
    Export_Dialog_Spinner.style.display = 'block';

    let Export_Limit_List = [];

    for(let i = 0;i < Export_Check_Box.length ; i++){
        if(Export_Check_Box[i].checked){
            Export_Limit_List.push(i);
        }
    }

    // << == Fetch == >> 

    console.log(Export_Limit_List);
    Export_Dialog_Spinner.style.display = 'none';
    Export_Modal_button.style.display = 'block';
});


function Create_Table ( RN, First , Last , Phone , Email ,Register , Inst , Course , Mode , Entry, Total, Payment ){
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

    else if (Payment == "Not Paid"){
        Tr11.className = "bg-danger";
        Tr11.style.color = "white";
    }

    Table_row.appendChild(Tr11);

    Table_Body.appendChild(Table_row);
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
    Result_Popup('New Settings Applied',true);
}

function Default_Settings (){
    let Table_str = localStorage.getItem('table-striped'),
        Table_hover = localStorage.getItem('table-hover');

        if(localStorage.getItem('table-bordered') == "true"){
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
