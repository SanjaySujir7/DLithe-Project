const Spinner= document.getElementById('Loading_Spinner');

const Input_id = document.getElementById('certificate-id'),
      Input_Name = document.getElementById('floatingInputName'),
      Input_Email = document.getElementById('floatingInputEmail'),
      verify_Button = document.getElementById('verify-button-dialog');

const Result_Modal = document.getElementById('result-modal'),
      Result_Modal_Icon = document.getElementById('result-modal-icon'),
      Result_Modal_title = document.getElementById('staticBackdropLabel');


let Id_valid = false , Name_Valid = false , Email_valid = false;

function Spinner_Toggle (mode){
        if(mode){
            Spinner.style.display = "block";
        }
        else{
            Spinner.style.display = "none";
        }
    }


function Input_Id_Process (event){
    let id_value = Input_id.value;

    if(id_value.length < 7 ){
        Input_id.classList.add('is-invalid');
        Id_valid = false;
    }
    else{
        Input_id.classList.remove('is-invalid');
        Id_valid = true;
    }
};

function Final_Process(){
    if(Input_id.value && Input_Name.value && Input_Email.value){
       if(Id_valid && Name_Valid && Email_valid){
            Spinner_Toggle(true);

            data = {
                id : Input_id.value,
                Name : Input_Name.value,
                Email : Input_Email.value
            }


            fetch('/certificate-verify',{
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(data)
            })

            .then(response => response.json())
            .then(data => {
                Spinner_Toggle(false);

                $('#verifyModal').modal('hide')

                if(data['result']){
                    $('#result-modal').modal('show')

                    Result_Modal_Icon.className = "fi fi-ss-check-circle";
                    Result_Modal_Icon.style.color = 'green';
                    Result_Modal_title.innerText = data['title'];
                }

                else{
                    $('#result-modal').modal('show')

                    Result_Modal_Icon.className = "fi fi-sr-circle-xmark"
                    Result_Modal_Icon.style.color = 'red';
                    Result_Modal_title.innerText = data['title'];
                }

            })

       }
       else{
        if(!Id_valid){
            Input_id.classList.add('is-invalid');
        }

        if(!Name_Valid){
            Input_Name.classList.add('is-invalid');
        }

        if(!Email_valid){
            Input_Email.classList.add('is-invalid');
        }
       }
    }
    else{
        if(!Id_valid){
            Input_id.classList.add('is-invalid');
        }

        if(!Name_Valid){
            Input_Name.classList.add('is-invalid');
        }

        if(!Email_valid){
            Input_Email.classList.add('is-invalid');
        }
    }
}

Input_Name.addEventListener('input',function(){
    if(Input_Name.value){
        if(isNaN(Input_Name.value)){
            Name_Valid = true;
            Input_Name.classList.remove('is-invalid');
        }
        else{
            Name_Valid = false;
            Input_Name.classList.add('is-invalid');
        }
    }

    else{
        Name_Valid = false;
        Input_Name.classList.add('is-invalid');
    }
});

Input_Email.addEventListener('input',function(){
    if(Input_Email.value){
        if(isNaN(Input_Email.value)){

            if(Input_Email.value.includes("@") && Input_Email.value.includes(".com")){
                Email_valid = true;
                Input_Email.classList.remove('is-invalid');
            }
            else{
                Email_valid = false;
                Input_Email.classList.add('is-invalid');
            }
        }
        else{
            Email_valid = false;
            Input_Email.classList.add('is-invalid');
        }
    }

    else{
        Email_valid = false;
        Input_Email.classList.add('is-invalid');
    }
});

Input_id.addEventListener('input',Input_Id_Process);
verify_Button.addEventListener('click',Final_Process);
