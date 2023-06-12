let Check_Box = document.getElementById("checkbox"),
Password_Field = document.getElementById("Password_field"),
User_Field = document.getElementById("user_field"),
Login_Button = document.getElementById("Submit_Button"),
Form = document.getElementById("form");

if (error == 'none'){

}
else{
    alert(error)
}

var Us = false, Up = false;


function Toggle_Password(){
    if (Check_Box.checked){
        Password_Field.type = "text";
    }
    else{
        Password_Field.type = "password";
    }
}

function User_Name_Process() {
    if (isNaN(User_Field.value)){
        Us = true;
        User_Field.style.borderColor = "gray";
        User_Field.style.borderStyle = "solid";
        User_Field.setCustomValid("");
    }
    else{
        Us = false;
        User_Field.style.borderColor = "red";
        User_Field.style.borderStyle = "solid";
        User_Field.setCustomValid("The Username is only containes intigers!");
    }
}

function Password_process() {
    if(Password_Field.value.length > 6){
        Up = true;
        Password_Field.style.borderColor = "gray";
        Password_Field.style.borderStyle = "solid";
        Password_Field.setCustomValid("");
    }
    else{
        Up = false;
        Password_Field.style.borderColor = "red";
        Password_Field.style.borderStyle = "solid";
        Password_Field.setCustomValid("Password is too short!");
    }
}


User_Field.addEventListener("input",User_Name_Process);
Password_Field.addEventListener("input",Password_process);
Login_Button.addEventListener("click",function(){
    if(Us && Up){
        Form.submit()
    }
    else{
        alert("Please fill all the field with valid imformation !")
    }
});

Form.addEventListener("submit",function(event){
    event.preventDefault();
});