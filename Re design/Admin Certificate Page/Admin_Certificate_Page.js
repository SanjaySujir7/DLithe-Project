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
    value : null,
    batch : "Default"
}

function Batch_Process (value){
    Tab_Filter.batch = value;

    console.log(Tab_Filter);
}

const Batch = document.querySelectorAll('.Batch-selection-a');

Batch.forEach(item => {
    item.addEventListener('click',function(){
        Batch_Process(this.innerText);
    });
})


function Fetch_Data (){


}


function Certificate_Tab_Filter (){
    
    Row_Number = 1;
    if (Tab_Filter.value == "errror-selec"){
        Error_Table.style.display = "table";
        Table_Spinner.style.display = "none";
        for(let i = 0; i < 3; i ++){
            Create_Error_Table('sanjay','sujir','123456789','sujirsanjay@gmail.com',"Cannot generate file because end date is not defined")
        }
    }
    else{
        Table_gener_non_gener.style.display = "table";
        Table_Spinner.style.display = "none";
        for(let i = 0; i < 3; i ++){
            Create_Table('sanjay','sujir','123456789','sujirsanjay@gmail.com','23456789','True')
        }
    };

}

const Generate_Module_btn = document.getElementById('generate_Module_btn'),
      Generate_Module_type = document.getElementById('generate_modla_select');

function generate_Certificate_process (){
    let send_data = {
        generate_list : null,
        method : Generate_Module_type.value
    }

    $('#Generate_Modal').modal('hide');
    $('#Spinner-Modal').modal('show');
};

Generate_Module_btn.addEventListener('click',generate_Certificate_process);


const Nav_Link = document.querySelectorAll('.nav-link');

let previous_select = "generat-selec";

function Nav_process (id){

    document.getElementById(previous_select).classList.remove('active')
    document.getElementById(id).classList.add('active');
    previous_select = id;

    Tab_Filter = {
       value : id
    }

    Table_Body.innerHTML = "";
    Error_Table_Body.innerHTML = "";
    Error_Table.style.display = "none";
    Table_gener_non_gener.style.display = 'none';
    Table_Spinner.style.display = "flex";

    setTimeout(Certificate_Tab_Filter,1000);

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