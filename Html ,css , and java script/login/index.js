let Check_Box = document.getElementById("checkbox"),
Password_Field = document.getElementById("Password_field");

function Toggle_Password(){
    if (Check_Box.checked){
        Password_Field.type = "text";
    }
    else{
        Password_Field.type = "password";
    }
}