const Name_Field = document.getElementById('Name-Input'),
      Password = document.getElementById('Password-Input'),
      FeedBack = document.querySelectorAll('.feedback'),
      Submit = document.getElementById('Submit-btn'),
      Form = document.getElementById('Login-Form');


let Name_Email_Valid = false,Password_Valid = false;
function Name_Email_Process (){
    if(Name_Field.value){
        if(Name_Field.value.includes('@')){
            if(Name_Field.type == "text"){
                Name_Field.type = 'email';
            }
            if(Name_Field.value.includes('.com') ||  Name_Field.value.includes('.in')){
                Name_Field.classList.add('is-valid');
                Name_Field.classList.remove('is-invalid');

                Name_Email_Valid = true;
            }
            else{
                Name_Field.classList.remove('is-valid');
                Name_Email_Valid = false;
            }
        }
        else{
            if(Name_Field.type == "email"){
                Name_Field.type = 'text';
            }

            if(isNaN(Name_Field.value)){
                Name_Field.classList.add('is-valid');
                Name_Field.classList.remove('is-invalid');

                Name_Email_Valid = true;
            }
            else{
                Name_Field.classList.remove('is-valid');
                Name_Email_Valid = false;
            }
        }
    }
    else{
        FeedBack[0].innerHTML = "Name or Email is required";
        Name_Field.classList.add('is-invalid');
        Name_Email_Valid = false;
    }
};


function Password_process(){
    if(!Password.value){
        FeedBack[1].innerHTML = "Password is required";
        Password.classList.add('is-invalid');
        Password_Valid = false;
    }
    else{
        Password.classList.remove('is-invalid');
        if(Password.value.length >= 10){
            Password.classList.add('is-valid');
            Password_Valid = true;
        }
        else{
            Password.classList.remove('is-valid');
            Password_Valid = false;
        }
    }
};


function Final_Process (){
    let Final = true;
    if(Name_Field.value && Password.value){
        if(Password.value.length < 10){
            FeedBack[1].innerHTML = "Password must contain 10 characters";
            Password.classList.add('is-invalid')
            Final = false;
        }
        if(Name_Field.value.includes('@')){
            if(!Name_Field.value.includes('.com') && !Name_Field.value.includes('.in')){
                FeedBack[0].innerHTML = "Invalid Email";
                Name_Field.classList.add('is-invalid');
                Final = false;
            }
        }

        if(Final & Name_Email_Valid & Password_Valid){
            Form.submit();
        }
        else{
            if(!Name_Email_Valid){
                FeedBack[0].innerHTML = "invalid input";
                Name_Field.classList.add('is-invalid');
            }
            if(!Password_Valid){
                FeedBack[1].innerHTML = "invalid Password";
                Password.classList.add('is-invalid');
            }
          
        }
    }
    else{
        if(!Name_Email_Valid){
            Name_Field.classList.add('is-invalid');
        }
        if(!Password_Valid){
            Password.classList.add('is-invalid');
        }
    }
};

Name_Field.addEventListener('input',Name_Email_Process);
Password.addEventListener('input',Password_process);
Submit.addEventListener('click',Final_Process);
Form.addEventListener('submit',function(event){
    event.preventDefault();
})