
function onScanSuccess(decodedText, decodedResult) {
    alert(decodedText)
    document.getElementById("html5-qrcode-button-camera-stop").click();
    $("#Verify-Modal").modal('hide');
  }
  
  function onScanFailure(error) {
    
  }
  
  let html5QrcodeScanner = new Html5QrcodeScanner(
    "reader",
    { fps: 10, qrbox: {width: 250, height: 250} },false);

const Verify_Button = document.getElementById('verify-cert-btn');


Verify_Button.addEventListener('click',function(){
    html5QrcodeScanner.render(onScanSuccess, onScanFailure);

    let reader = document.getElementById('reader');

    reader.querySelectorAll('img')[0].style = "";
    reader.querySelectorAll('img')[0].style.display = "none";

    reader.querySelector('#html5-qrcode-anchor-scan-type-change').style = "";
    reader.querySelector('#html5-qrcode-anchor-scan-type-change').style.display = "none";

});

