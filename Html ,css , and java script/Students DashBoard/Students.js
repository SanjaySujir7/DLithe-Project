let Nav_bar_Button = document.getElementById("right-nav-toggle-div"),
Nav_Button = document.getElementById("Side-Bar-Span");

let Parent_Div = document.getElementById("students-imformation-div"),
Import_Dialog = document.getElementById("Import-Dialog"),
Import_Button = document.getElementById("Import-Button"),
Dialog_Close = document.getElementById("material-symbols-outlined");

let Dialog_Form = document.getElementById("dialog-import-form"),
Dialog_Import = document.getElementById("Dialog-Import-Button");


Nav_bar_Button.addEventListener("click",function(){
    let Nav_bar_Button = document.getElementById("Side-Bar");
    Nav_bar_Button.style.left = "0px";

})

Nav_Button.addEventListener("click",function(){
    let Nav_bar_Button = document.getElementById("Side-Bar");
    console.log('huaa')
    Nav_bar_Button.style.left = "-300px"})


function Create_Div(Name,Last,Phone,Email,Usn,Inst,Course,Total,Entry,Payment) {
    let Child = document.createElement('div');
    Child.className = 'students-imformation-body';

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
    text3.innerHTML = Phone
    div3.appendChild(text3);
    Child.appendChild(div3);

    let div4 = document.createElement('div'),
    text4 = document.createElement('h3');
    text4.innerHTML = Email
    div4.appendChild(text4);
    Child.appendChild(div4);

    let div5 = document.createElement('div'),
    text5 = document.createElement('h3');
    text5.innerHTML = Usn
    div5.appendChild(text5);
    Child.appendChild(div5);

    let div6 = document.createElement('div'),
    text6 = document.createElement('h3');
    text6.innerHTML = Inst
    div6.appendChild(text6);
    Child.appendChild(div6);

    let div7 = document.createElement('div'),
    text7 = document.createElement('h3');
    text7.innerHTML = Course
    div7.appendChild(text7);
    Child.appendChild(div7);

    let div8 = document.createElement('div'),
    text8 = document.createElement('h3');
    text8.innerHTML = Total
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
    if(Payment.toLowerCase() == 'paid'){
        text10.style.color = 'green';
    }
    else{
        text10.style.color = 'red';
    }
    div10.appendChild(text10);
    Child.appendChild(div10);
}

Import_Button.addEventListener("click",function(){
    Import_Dialog.showModal();

    Dialog_Close.addEventListener("click",function(){
        Import_Dialog.close()
    })
})

Dialog_Import.addEventListener('click',function(){
    // Dialog_Form.submit()
})


// Filter

let Filter_Dailog = document.getElementById("Filter-Dialog"),
Filter_Button = document.getElementById("Filter-Button"),
Filter_CLose = document.getElementById("Filter-Close-Dialog-but");



Filter_Button.addEventListener('click',function(){
    Filter_Dailog.showModal();
})

Filter_CLose.addEventListener('click',function(){
    Filter_Dailog.close()
})


// Export Option

let Export_Button = document.getElementById('Export-Button'),
Export_Dialog = document.getElementById('Export-Dalog'),
Export_Dialog_Close = document.getElementById('export-dialog-close'),
Export_All_Check = document.getElementById('all'),
Export_Select_Div = document.getElementById('export-select-box-div');

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


// Student Add 

let Student_Add_Dialog = document.getElementById('Student-add-dailog'),
Students_Add_Button = document.getElementById("Add-student-Button"),
Students_Add_CLose_Button= document.getElementById("Add-Students-close-Dialog");


Students_Add_Button.addEventListener("click",function(){
    Student_Add_Dialog.showModal();
});

Students_Add_CLose_Button.addEventListener('click',function(){
    Student_Add_Dialog.close();
})

// Success Dialog

let Dialog_Sucess_Popup = document.getElementById('Dialog-Success-Pop-Up');
Dialog_Import.addEventListener('click',function(){
    Dialog_Sucess_Popup.showModal();
    
    setTimeout(function(){
        Dialog_Sucess_Popup.close();
    },1000)
})
