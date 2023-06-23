let Toggle_Button = document.getElementById('side-Nav-toggle-head');

let Side_Navigation = document.getElementById('Side-Navigation'),
Main_Page = document.getElementById('Main-Page'),
Header_Section = document.getElementById('Header-Page'),
Nav_Mobile_CLose = document.getElementById('Close-Nav-MObile');

const mobileQuery = window.matchMedia('(max-width: 1000px)');
let is_Nav_On = true;

let Generate_Button = document.getElementById('Generate-button'),
    Generate_Loading_Button = document.getElementById('Loading-generate-button');

let File_Card = document.querySelector('.File_Imformation_Card'),
    Button_Div = document.querySelector('.certificate-main-content-body-div'),
    Download_Button = document.getElementById('Download-Button'),
    Download_Certificate_Link = document.getElementById('Download-Certificate-Link');



Toggle_Button.addEventListener('click',function(){

    if (!mobileQuery.matches){

        if(is_Nav_On){
            Side_Navigation.style.left="-200px"
            // Main_Page.style.width = '100%';
            document.body.style.marginLeft = '0px';
            Main_Page.style.left = '0px';
            Main_Page.style.transition = '0.2s';
            Header_Section.style.left = '0px';
            Header_Section.style.transition = '0.2s';
            is_Nav_On = false;
        }
        
        else{

            Side_Navigation.style.left= '0px';

            document.body.style.marginLeft = '200px';
            Main_Page.style.left = '200px';
            Main_Page.style.transition = '0.2s';
            Header_Section.style.left = '200px';
            is_Nav_On = true;
        }

    }

    else{
        Side_Navigation.style.left= '0px';
        Main_Page.style.filter = 'blur(2px)';
        Header_Section.style.filter = 'blur(2px)';
    }
})
   
Nav_Mobile_CLose.addEventListener('click',function(){
    Side_Navigation.style.left = '-200px';
    Main_Page.style.filter = 'blur(0px)';
    Header_Section.style.filter = 'blur(0px)';
})




if (!mobileQuery.matches){
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
})
}

Generate_Button.addEventListener('click',function(){
    Generate_Button.style.display = "none";
    Generate_Loading_Button.style.display = "block";

    Request_Certificate();

})


function Loading_Button_Handler (){
    File_Card.classList.add('visible')
    Button_Div.classList.add('slide')
    Generate_Loading_Button.style.display = "none";
    Download_Button.style.display = "block";

};

function Request_Certificate (){

    fetch('/certificate-generate',{
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({'pass' : "q#5qJKkaq*%@:+=771"})
    })

    .then(response => response.blob())
    .then(file => {
        const file_url = URL.createObjectURL(file);

        Download_Certificate_Link.href = file_url;
        Download_Certificate_Link.download = "DLithe_Certificate.pdf";
        Loading_Button_Handler();
    });
};
