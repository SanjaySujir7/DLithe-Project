let Eye_Button = document.getElementById('Span-Eye'),
Password_Input = document.getElementById('Password-Input'),
Name_Email = document.getElementById('Name-Input'),
Error_Label= document.querySelectorAll('.Error-Label'),
Login_Button = document.getElementById('Login-Button'),
Login_Form = document.getElementById('Login-Page-Form');

Eye_Button.addEventListener('click',function(){
    if(Eye_Button.innerText == 'visibility'){
        Eye_Button.innerText = 'visibility_off';
        Password_Input.type = 'text';
    }
    else{
        Eye_Button.innerText = 'visibility';
        Password_Input.type = 'password';
    }
})

let Name_Email_Check_bool = false,
Password_Check_bool = false;

function Name_Check (){
    if(Name_Email.value.includes('@')){
        if(!Name_Email.value.includes('.com')){
            Error_Label[0].innerText = "Email is Not valid";
            Error_Label[0].style.display = 'block';
            Name_Email.style.border = '1px solid red';

            Name_Email_Check_bool = false;
        }
        else{
            if (Error_Label[0].style.display == 'block'){
                Error_Label[0].style.display = 'none';
                Name_Email.style.border = '1.5px solid rgb(80, 78, 78)';
                Name_Email_Check_bool = true;
            }
        }
    }
    else{

        if (Error_Label[0].style.display == 'block'){

            Error_Label[0].style.display = 'none';
            Name_Email.style.border = '1.5px solid rgb(80, 78, 78)';
            Name_Email_Check_bool = true;
        }

        if(isNaN(Name_Email.value)){
            Name_Email_Check_bool = true;
            if (Error_Label[0].style.display == 'block'){
                Error_Label[0].style.display = 'none';
                Name_Email.style.border = '1.5px solid rgb(80, 78, 78)';
            }
        }
        else{
            Error_Label[0].innerText = "Name must be string";
            Error_Label[0].style.display = 'block';
            Name_Email.style.border = '1px solid red';
            Name_Email_Check_bool = false;
        }
    }
}

function Password_Check (){
    if(Password_Input.value.length < 7){
        Error_Label[1].innerText = "Password must  be greater than 6 characters";
        Error_Label[1].style.display = 'block';
        Password_Input.style.border = '1px solid red';
        Password_Check_bool = false;
    }
    else{
        Password_Check_bool = true;
        if (Error_Label[1].style.display == 'block'){
            Error_Label[1].style.display = 'none';
            Password_Input.style.border = '1.5px solid rgb(80, 78, 78)';
        }
    }
};

function Null_Check (){
    
    let i = 0, Final = true;
    if (Name_Email.value && Password_Input.value){
        if (Name_Email_Check_bool == false){
            Final = false;
            Error_Label[0].style.display = 'block';
        }

        if(Password_Check_bool == false){
            Final = false;
            Error_Label[1].style.display = 'block';
        }
    }
    else {
        if (Name_Email_Check_bool == false){
            Final = false;
            Name_Email.style.border = '1px solid red';
            Error_Label[0].style.display = 'block';
        }

        if(Password_Check_bool == false){
            Final = false;
            Error_Label[1].style.display = 'block';
            Password_Input.style.border = '1px solid red';
        }
    }

    if (Final){
        Login_Form.submit();
    }

    console.log(Name_Email_Check_bool , Password_Check_bool);
}


Login_Button.addEventListener('click',Null_Check);
Name_Email.addEventListener('input',Name_Check);
Password_Input.addEventListener('input',Password_Check);
Login_Form.addEventListener('submit',function(event){
    event.preventDefault();
})