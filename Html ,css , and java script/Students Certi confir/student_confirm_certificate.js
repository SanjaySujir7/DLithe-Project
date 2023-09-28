const Download_Button = document.getElementById('Download_Button'),
      Loading_Button = document.getElementById('Loading_Button'),
      Download_Link = document.getElementById('download_link'),
      Toggle_Button = document.getElementById('Toggle_Button');

const Certificate_Id = document.getElementById('Certificate_Id');

let Result_Result = document.querySelectorAll('.Result_Result');


function Certificate_Id_Process (){
    if(Certificate_Id.value){
        Certificate_Id.classList.remove('is-invalid');
    }
    else{
        Certificate_Id.classList.add('is-invalid');
    }
}

Download_Button.addEventListener('click',function(){
    Download_Button.style.display = 'none';
    Loading_Button.style.display = 'block';

    fetch('/certificate-student-download',{
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },

        body : JSON.stringify({'data' : Certificate_Id.value})

    })

    .then(response => {
        if(response.ok){
            return response.blob();
        }
        else if(response.status == 401){
            Result_Result[0].innerHTML = "Id does not exists !";
            Result_Result[1].innerHTML = "The ID you entered does not exist. Please double-check your ID and enter it again carefully. if you are still having trouble, please contact DLithe."
            Toggle_Button.click();
            Loading_Button.style.display = "none";
            Download_Button.style.display = "block";
        }
        else if(response.status == 406){
            Result_Result[0].innerHTML = "Not allowed !";
            Result_Result[1].innerHTML = "You can only generate your certificate once. if you need more information, please contact DLithe."
            Toggle_Button.click();
            Loading_Button.style.display = "none";
            Download_Button.style.display = "block";
            Download_Button.disabled = true;
        }
        else{
            Result_Result[0].innerHTML = "Something went wrong!";
            Result_Result[1].innerHTML = "Something went wrong! Please check your connection and try again later."
            Toggle_Button.click();
            Loading_Button.style.display = "none";
            Download_Button.style.display = "block";
        }
    })

    .then(data => {
        if(data){
            const File_Url = URL.createObjectURL(data);
            Loading_Button.style.display = "none";
            Download_Link.style.display = "block";
            Download_Link.href = File_Url;
            Download_Link.download = "DLithe_Certificate_2023.pdf";
            Download_Link.click();

        }
    })

})

Certificate_Id.addEventListener('input',Certificate_Id_Process);