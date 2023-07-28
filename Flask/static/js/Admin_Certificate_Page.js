const Header = document.querySelector('.header'),
    Side_Nav = document.querySelector('.side-nav'),
    Side_Nav_Button = document.getElementById('Side-Nav-Button');


const Table_Spinner = document.getElementById('spinner-table');

const Error_Table = document.getElementById('error-table'),
      Error_Table_Body = document.getElementById('error-table-body');

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


let Generate_List = null;

let Tab_Filter = {
    value : "generat-selec",
    batch : "Aug-Sep-2023",
    pass : "!#@1234q:{)324++@9926xcvbn"
}

function Batch_Process (value){
    Tab_Filter.batch = value;

    Table_Body.innerHTML = "";
    Error_Table_Body.innerHTML = "";
    Error_Table.style.display = "none";
    Table_gener_non_gener.style.display = 'none';
    Table_Spinner.style.display = "flex";
    Empty_Place_Holder.style.display = 'none';

    Certificate_Tab_Filter();
}

const Batch = document.querySelectorAll('.Batch-selection-a');

Batch.forEach(item => {
    item.addEventListener('click',function(){
        Batch_Process(this.innerText);
    });
})


const Empty_Place_Holder = document.getElementById('Empty-Place-Holder');

function Certificate_Tab_Filter (){

    fetch('/admin-certificate-fetch-data',{
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(Tab_Filter)
    })
        .then(response => response.json())

        .then(credential => {
            Row_Number = 1;

            if (credential['exists']){
                if (Tab_Filter.value == "errror-selec"){
                    Error_Table.style.display = "table";
                    
                    credential = credential['data']
                    Generate_List = credential['data']

                    for(let i = 0; i < credential.length ; i++) {
                
                        let First_Name = credential[i]['First_Name'],
                            Last_Name = credential[i]['Last_Name'],
                            Phone = credential[i]['Phone'],
                            Email = credential[i]['Email'],
                            Error = credential[i]['Error'];
    
                        Create_Error_Table(First_Name,Last_Name,Phone,Email,Error);
                    }
    
                    Table_Spinner.style.display = "none";
    
                }
                else{
                    Table_gener_non_gener.style.display = "table";
                    credential = credential['data']
                    Generate_List = credential['data']

                    for(let i = 0; i < credential.length ; i++) {
                
                        let First_Name = credential[i]['First_Name'],
                            Last_Name = credential[i]['Last_Name'],
                            Phone = credential[i]['Phone'],
                            Email = credential[i]['Email'],
                            Certi_Number = credential[i]['Certi_Number'],
                            Certi_Status = credential[i]['Certi_Status'];
    
                        Create_Table(First_Name,Last_Name,Phone,Email,Certi_Number,Certi_Status);
                    }
    
                    Table_Spinner.style.display = "none";
                };
            }

            else{
                Table_Spinner.style.display = "none";
                Empty_Place_Holder.style.display = 'flex';
            }
            
        })
}

const Generate_Module_btn = document.getElementById('generate_Module_btn'),
      Generate_Module_type = document.getElementById('generate_modla_select'),
      Certificate_Download_Link = document.getElementById('Certificate-file-link');

function generate_Certificate_process (){

    $('#Generate_Modal').modal('hide');
    $('#Spinner-Modal').modal('show');

    if(Generate_Module_type.value == "Download"){
        Generate_List.forEach(item => {
            fetch('/bulk-certificate',{
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({method : Generate_Module_type.value, data : item})
            })
                .then(response => response.blob())
                .then(file => {
                    const file_url = URL.createObjectURL(file);
            
                    Certificate_Download_Link.href = file_url;
                    Certificate_Download_Link.download = item['First_Name'] + item['USN'] + '.pdf';
                });
        })
    }

};

Generate_Module_btn.addEventListener('click',generate_Certificate_process);


const Nav_Link = document.querySelectorAll('.nav-link');

let previous_select = "generat-selec";

function Nav_process (id){

    document.getElementById(previous_select).classList.remove('active')
    document.getElementById(id).classList.add('active');
    previous_select = id;

    Tab_Filter.value = id;

    Table_Body.innerHTML = "";
    Error_Table_Body.innerHTML = "";
    Error_Table.style.display = "none";
    Table_gener_non_gener.style.display = 'none';
    Table_Spinner.style.display = "flex";
    Empty_Place_Holder.style.display = 'none';

    Certificate_Tab_Filter();
};


Nav_Link.forEach(item => {
    item.addEventListener('click',function(){
        Nav_process(this.id);
    });
})



const Table_Body = document.getElementById('Table-body'),
       Table_gener_non_gener = document.getElementById('gene-non-genr-table');

let Row_Number = 1;
function Create_Table (First,Last,Phone,Email,CertiNumber,Certistatus){
    let Table_Row = document.createElement('tr');

    let Table_Row_Head = document.createElement('th');
    Table_Row_Head.scope = "row";
    Table_Row_Head.innerHTML=Row_Number;
    Table_Row.appendChild(Table_Row_Head);
    
    let td1 = document.createElement('td');
    td1.innerHTML = First;
    Table_Row.appendChild(td1);

    let td2 = document.createElement('td');
    td2.innerHTML = Last;
    Table_Row.appendChild(td2);

    let td3 = document.createElement('td');
    td3.innerHTML = Phone;
    Table_Row.appendChild(td3);

    let td4 = document.createElement('td');
    td4.innerHTML = Email;
    Table_Row.appendChild(td4);

    let td5 = document.createElement('td');
    td5.innerHTML = CertiNumber;
    Table_Row.appendChild(td5);

    let td6 = document.createElement('td');
    td6.innerHTML = Certistatus;
    if(Certistatus == "True"){
        td6.style.color = "white";
        td6.className = "bg-success";
    }
    
    else if(Certistatus = "False"){
        td6.style.color = "white";
        td6.className = "bg-danger";
    }

    Table_Row.appendChild(td6);

    Table_Body.appendChild(Table_Row);
    Row_Number ++;
};

// for(let i = 0; i < 10; i ++){
//     Create_Table('sanjay','sujir','123456789','sujirsanjay@gmail.com','23456789','False')
// }

function Create_Error_Table (First,Last,Phone,Email,Error){
    let Table_Row = document.createElement('tr');

    let Table_Row_Head = document.createElement('th');
    Table_Row_Head.scope = "row";
    Table_Row_Head.innerHTML=Row_Number;
    Table_Row.appendChild(Table_Row_Head);
    
    let td1 = document.createElement('td');
    td1.innerHTML = First;
    Table_Row.appendChild(td1);

    let td2 = document.createElement('td');
    td2.innerHTML = Last;
    Table_Row.appendChild(td2);

    let td3 = document.createElement('td');
    td3.innerHTML = Phone;
    Table_Row.appendChild(td3);

    let td4 = document.createElement('td');
    td4.innerHTML = Email;
    Table_Row.appendChild(td4);


    let td6 = document.createElement('td');
    td6.innerHTML = Error;
    td6.style.color = "white";
    td6.className = "bg-danger";

    Table_Row.appendChild(td6);

    Error_Table_Body.appendChild(Table_Row);
    Row_Number ++;
};


Certificate_Tab_Filter();