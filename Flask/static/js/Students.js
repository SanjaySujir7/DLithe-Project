let Nav_bar_Button = document.getElementById("right-nav-toggle-div"),
Nav_Button = document.getElementById("Side-Bar-Span");

let Parent_Div = document.getElementById("students-imformation-div"),
Import_Dialog = document.getElementById("Import-Dialog"),
Import_Button = document.getElementById("Import-Button"),
Dialog_Close = document.getElementById("material-symbols-outlined");

let Dialog_Form = document.getElementById("dialog-import-form"),
Dialog_Import = document.getElementById("Dialog-Import-Button");

let Filter_Dialog_Remove = document.getElementById("Filter-Dialog-Button-Remove"),
Filter_Colleage_Select = document.getElementById("Filter-Dialog-Select-College"),
Filter_Course_Select = document.getElementById("Filter-Dialog-Select-Course"),
Filter_Payment_Select = document.getElementById("Filter-Dialog-Select-Payment");


let Filter_Dailog = document.getElementById("Filter-Dialog"),
Filter_Button = document.getElementById("Filter-Button"),
Filter_CLose = document.getElementById("Filter-Close-Dialog-but"),
Filter_Apply = document.getElementById("Filter-Dialog-Button-Apply"),
Filter_Mode = document.getElementById("Filter-Dialog-Mode"),
Filter_Year_From = document.getElementById("Filter-Dialog-Select-year-From"),
Filter_Year_To = document.getElementById("Filter-Dialog-Select-year-To");


let Select_Colleage_Parent = document.getElementById("Filter-Dialog-Select-College"),
Select_Course_Parent = document.getElementById("Filter-Dialog-Select-Course");

let Export_Button = document.getElementById('Export-Button'),
Export_Dialog = document.getElementById('Export-Dalog'),
Export_Dialog_Close = document.getElementById('export-dialog-close'),
Export_All_Check = document.getElementById('all'),
Export_Select_Div = document.getElementById('export-select-box-div'),
Export_Dialog_Export = document.getElementById('export-dialog-export'),
Export_Download_Link = document.getElementById("download-export-link"),
Export_Download_Button = document.getElementById("export-dialog-download-disabled");

let Student_Add_Dialog = document.getElementById('Student-add-dailog'),
Students_Add_Button = document.getElementById("Add-student-Button"),
Students_Add_CLose_Button= document.getElementById("Add-Students-close-Dialog");

let Dialog_Sucess_Popup = document.getElementById('Dialog-Success-Pop-Up');

let  Filter_List = ['All', 'All', 'yyyy-MM-dd','yyyy-MM-dd','All','All']

let Export_List = [];
let Export_List_limit = []


Nav_bar_Button.addEventListener("click",function(){
    let Nav_bar_Button = document.getElementById("Side-Bar");
    Nav_bar_Button.style.left = "0px";

})

Nav_Button.addEventListener("click",function(){
    let Nav_bar_Button = document.getElementById("Side-Bar");  
    Nav_bar_Button.style.left = "-300px"})


function Filter_Apply_Function (){
    let College_filter = Filter_Colleage_Select.value,
    Course_filter = Filter_Course_Select.value,
    Mode_Filter = Filter_Mode.value,
    Payment_filter = Filter_Payment_Select.value;


    if(Filter_Year_To.value == "" && Filter_Year_From.value == ""){
        Filter_List = [College_filter,Course_filter,'yyyy-MM-dd' ,'yyyy-MM-dd',Payment_filter,Mode_Filter]
    }
    else{
        Filter_List = [College_filter,Course_filter,Filter_Year_From.value ,Filter_Year_To.value,Payment_filter,Mode_Filter]
    }


    console.log(Filter_List)

    Parent_Div.innerHTML = "";

    Fetch_Data();
}

function Filter_Dialog_Remove_Filter (){
    Filter_Colleage_Select.value = 'All';
    Filter_Course_Select.value = 'All';
    Filter_Year_From.value = 'yyyy-MM-dd';
    Filter_Year_To.value = 'yyyy-MM-dd';
    Filter_Payment_Select.value = 'All';
    Filter_Mode.value = "All";
}

let Exist_Filter_Div = []

function Create_Filter_Div (College,Course){
    if(!Exist_Filter_Div.includes(College)){
        let Option_Colleage = document.createElement("option");
        Option_Colleage.innerText = College;
        Select_Colleage_Parent.appendChild(Option_Colleage);
        Exist_Filter_Div.push(College);
    }

    if(!Exist_Filter_Div.includes(Course)){
        let Option_Course= document.createElement("option");
        Option_Course.innerText = Course;
        Select_Course_Parent.appendChild(Option_Course);
        Exist_Filter_Div.push(Course);
    }

    
}

let  random_form_id = 0; random_button_id = 10000000; random_text_id = 1000000000;

function Create_Div(Name,Last,Phone,Email,Usn,Inst,Mode,Course,Total,Entry,Payment,) {
    let Child = document.createElement('div');

    Child.id = random_form_id;
    Child.className = 'students-imformation-body';
    random_form_id++;

    Parent_Div.appendChild(Child);

    let div1 = document.createElement('div'),
    text1 = document.createElement('h3');
    text1.innerHTML = Name
    div1.appendChild(text1);
    Child.appendChild(div1);

    let div2 = document.createElement('div'),
    text2 = document.createElement('h3');
    text2.innerHTML = Last
    div2.appendChild(text2);
    Child.appendChild(div2);

    let div3 = document.createElement('div'),
    text3 = document.createElement('h3');
    text3.innerHTML = Phone;
    text3.id = 'phone';
    div3.appendChild(text3);
    Child.appendChild(div3);

    let div4 = document.createElement('div'),
    text4 = document.createElement('h3');
    text4.innerHTML = Email;
    text4.id = 'email';
    div4.appendChild(text4);
    Child.appendChild(div4);

    let div5 = document.createElement('div'),
    text5 = document.createElement('h3');
    text5.innerHTML = Usn;
    div5.appendChild(text5);
    Child.appendChild(div5);

    let div6 = document.createElement('div'),
    text6 = document.createElement('h3');
    text6.innerHTML = Inst;
    div6.appendChild(text6);
    Child.appendChild(div6);

    let div12= document.createElement('div'),
    text12 = document.createElement('h3');
    text12.innerHTML = Mode;
    div12.appendChild(text12);
    Child.appendChild(div12);

    let div7 = document.createElement('div'),
    text7 = document.createElement('h3');
    text7.innerHTML = Course
    text7.title = "Click to edit"
    text7.contentEditable = 'true';
    text7.id = "course";
    div7.appendChild(text7);
    Child.appendChild(div7);

    let div8 = document.createElement('div'),
    text8 = document.createElement('h3');
    text8.innerHTML = Total
    text8.title = "Click to edit"
    text8.contentEditable = 'true';
    text8.id = "total";
    div8.appendChild(text8);
    Child.appendChild(div8);

    let div9 = document.createElement('div'),
    text9 = document.createElement('h3');
    text9.innerHTML = Entry
    div9.appendChild(text9);
    Child.appendChild(div9);

    let div10 = document.createElement('div'),
    text10 = document.createElement('h3');
    text10.innerHTML = Payment
    text10.title = "Click to edit"
    text10.value = 'pay';
    text10.contentEditable = 'true';
    text10.id = random_text_id;
    text10.setAttribute('oninput','textChange(id)');
    random_text_id ++;

    if(Payment.toLowerCase() == 'paid'){
        text10.style.color = 'green';
    }
    else{
        text10.style.color = 'red';
    }
    div10.appendChild(text10);
    Child.appendChild(div10);

    let div11 = document.createElement('div'),
    button = document.createElement('button');

    button.innerText = "save";
    button.className = "Perticular_div_Button";
    button.id = random_button_id;
    random_button_id ++;
    button.setAttribute('onclick','On_button_Click(id)')
    div11.appendChild(button);
    Child.appendChild(div11);
}

Import_Button.addEventListener("click",function(){
    Import_Dialog.showModal();

})

Dialog_Close.addEventListener("click",function(){
    Import_Dialog.close()})

Dialog_Import.addEventListener('click',function(){
    Dialog_Form.submit()
});


function Fetch_Data (){

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
    
    
            Name = Each_User[i]['First_Name']
            Last = Each_User[i]['Last_Name']
            Phone = Each_User[i]['Phone']
            Email = Each_User[i]['Email']
            Register_Number= Each_User[i]['Register_Number']
            Institution_Name = Each_User[i]['Institution_Name'] 
            Mode = Each_User[i]["Mode"]
            Course_Name = Each_User[i]['Course_Name']
            Total = Each_User[i]['Total']
            Entry_Date = Each_User[i]['Entry_Date']
            Payment_Status = Each_User[i]['Payment_Status']
            Inst_Key = Each_User[i]['Inst_Key']
    
            Create_Div(Name,Last,Phone,Email,Register_Number,Institution_Name,Mode,Course_Name,Total,Entry_Date,Payment_Status);
            Create_Filter_Div(Inst_Key,Course_Name);
        }
        
    })

}




function textChange(id) {
    let change_id = document.getElementById(id);

    if (change_id.innerText.toLowerCase() == "paid"){
        change_id.style.color = "green";
    }
    else{
        change_id.style.color = "red";

    }

}
let Update_form_List = [];

function Save_Button_Turn (){
    let save_button = document.getElementById("Save-Button-disable");
    save_button.id = "Save-Button";
    

    save_button.addEventListener("click",function(){
        console.log(Update_form_List)
        fetch('/update-students-table', {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(Update_form_List)
        })
        .then(response => response.json())
        .then(data => {
            if(data['result']){
                location.reload();
            }
        })
    })
}

let Save_Button_Togle = false;

function On_button_Click (id){
    
    let Target = document.getElementById("students-imformation-div").children;

    for(let i = 0 ; i < Target.length; i++){

        if (Target[i].children[11].children[0].id == id){
           let Target_Email =  Target[i].children[3].children[0].innerText,
           Target_Phone = Target[i].children[2].children[0].innerText,
           Target_Course = Target[i].children[7].children[0].innerText,
           Target_Total = Target[i].children[8].children[0].innerText,
           Target_Payment = Target[i].children[10].children[0].innerText;
            
            if(Update_form_List.length > 0){
                Got = false;
                for(let x = 0 ; x < Update_form_List.length; x ++){
                        if(Target_Email == Update_form_List[x][1] && Target_Phone == Update_form_List[x][0]){
    

                            Update_form_List.splice(x,1)
                            Update_form_List.push([Target_Phone,Target_Email,Target_Course,Target_Total,Target_Payment]);
                            Got = true;
                            break;
                        }

                }

                if (Got == false) {
                    console.log("no got")
                    Update_form_List.push([Target_Phone,Target_Email,Target_Course,Target_Total,Target_Payment]);
                }
            }
            else{
                Update_form_List.push([Target_Phone,Target_Email,Target_Course,Target_Total,Target_Payment]);
            }
            break;
        }
    }

    if (Save_Button_Togle == false){
        Save_Button_Turn();
        Save_Button_Togle = true;
    }

}




Filter_Button.addEventListener('click',function(){
    Filter_Dailog.showModal();
})

Filter_CLose.addEventListener('click',function(){
    Filter_Dailog.close()
})

Filter_Dialog_Remove.addEventListener('click',Filter_Dialog_Remove_Filter)

Filter_Apply.addEventListener('click',Filter_Apply_Function);


Fetch_Data();

document.addEventListener('keydown',function(event){
    if(event.shiftKey && event.key =='F'){
        Filter_Dailog.showModal();
    }

    if(event.ctrlKey && event.key =='i'){
        Import_Dialog.showModal();
    }

})




Export_Button.addEventListener('click',function(){
    Export_Dialog.showModal();
})

Export_Dialog_Close.addEventListener('click',function(){
    Export_Dialog.close();
})

Export_All_Check.addEventListener('change',function(){
    for(let i = 0;i < Export_Select_Div.children.length ; i++){
       Export_Select_Div.children[i].children[1].checked = true;
    }
})


let ALl_Radio = Export_Select_Div.querySelectorAll("input[type='checkbox']");

Export_Dialog_Export.addEventListener("click",function(){
    Export_List_limit = []

    for(let i = 0;i < ALl_Radio.length ; i++){
        if(ALl_Radio[i].checked){
            Export_List_limit.push(i);
        }
    }
    console.log(Export_List_limit)
    fetch('/export-list',{
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({'Export_List' : Export_List,'Export_Limit' : Export_List_limit,'Export_Format' : document.getElementById('Select-export').value })
    })

    .then(response => response.blob())
    .then(file => {
        const file_url = URL.createObjectURL(file);
        Export_Download_Link.href = file_url;
        Export_Download_Button.id = "export-dialog-download";
        Export_Download_Link.download = 'Students_info.csv';
    })
});





Students_Add_Button.addEventListener("click",function(){
    Student_Add_Dialog.showModal();
});

Students_Add_CLose_Button.addEventListener('click',function(){
    Student_Add_Dialog.close();
})