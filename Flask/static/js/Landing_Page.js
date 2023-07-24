
const verify_Button = document.getElementById('verfy-mdl-out-btn');

const Result_Modal = document.getElementById('result-modal'),
      Result_Modal_Icon = document.getElementById('result-modal-icon'),
      Result_Modal_title = document.getElementById('Result_Modal_Title_h1');



function Final_Process(Qr_Decode){

        fetch('/certificate-verify',{
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({'data':Qr_Decode})
        })

        .then(response => response.json())
        .then(data => {

            $('#verifyModal').modal('hide')

            if(data['result']){
                $('#result-modal').modal('show')

                Result_Modal_Icon.className = "fi fi-ss-check-circle";
                Result_Modal_Icon.style.color = 'green';
                Result_Modal_title.innerHTML = data['title'];
            }

            else{
                $('#result-modal').modal('show')

                Result_Modal_Icon.className = "fi fi-sr-circle-xmark"
                Result_Modal_Icon.style.color = 'red';
                Result_Modal_title.innerHTML= data['title'];
            }

    })

}


function onScanSuccess(decodedText, decodedResult) {
    Final_Process(decodedText);
    document.getElementById("html5-qrcode-button-camera-stop").click();
    $("#Verify-Modal").modal('hide');
  }
  
  function onScanFailure(error) {
    
  }
  
  let html5QrcodeScanner = new Html5QrcodeScanner(
    "reader",
    { fps: 10, qrbox: {width: 250, height: 250} },false);



verify_Button.addEventListener('click',function(){
    html5QrcodeScanner.render(onScanSuccess, onScanFailure);

    let reader = document.getElementById('reader');

    reader.querySelectorAll('img')[0].style = "";
    reader.querySelectorAll('img')[0].style.display = "none";

    reader.querySelector('#html5-qrcode-anchor-scan-type-change').style = "";
    reader.querySelector('#html5-qrcode-anchor-scan-type-change').style.display = "none";

});

