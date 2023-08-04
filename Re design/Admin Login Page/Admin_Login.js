

const Password_Input = document.getElementById('Password_Input'),
      Name_Email_Input = document.getElementById('Name_Email_Input'),
      Error_Label = document.querySelectorAll('error-feedback-label');

const Eye_Icon = document.getElementById("eye-icon");

let Eye_Toggle = false;

Eye_Icon.addEventListener('click',function(){
    if(!Eye_Toggle){
        Eye_Icon.className = "fi fi-sr-eye-crossed";
        Password_Input.type = "text";
        Eye_Toggle = true;
    }
    else{
        Eye_Icon.className = "fi fi-sr-eye";
        Eye_Toggle = false;
        Password_Input.type = "password";
    }
})

let Name_Email_Valid = false, Password_Email_Valid = false;

function Name_Email_process (){
    if(Name_Email_Input.value){
        if(Name_Email_Input.value.includes('@')){
            Name_Email_Input.type = "email";
        
            if(Name_Email_Input.value.includes('.com') || Name_Email_Input.value.includes('.in')){
                Name_Email_Input.classList.add('is-valid');
                Name_Email_Input.classList.remove('is-invalid');
                Name_Email_Valid = true;
            }
            else{
                Name_Email_Input.classList.remove('is-valid');
                Name_Email_Valid = false;
            }
        }
        else{
            Name_Email_Input.type = "text";
            Name_Email_Input.classList.add('is-valid');
            Name_Email_Input.classList.remove('is-invalid');
            Name_Email_Valid = true;
        }
    }
    else{
        Name_Email_Input.classList.add('is-invalid');
        Name_Email_Input.classList.remove('is-valid');
        Name_Email_Valid = false;
    }
}

function Password_Process (){  
    if(!Password_Input.value){
        Password_Input.classList.add('is-invalid');
        Password_Input.classList.remove('is-valid');
    }
    else{
        Password_Input.classList.add('is-valid');
        Password_Input.classList.remove('is-invalid');
    }
}

Name_Email_Input.addEventListener('input',Name_Email_process);
Password_Input.addEventListener('input',Password_Process);