let Toggle_Button = document.getElementById('side-Nav-toggle-head');

let Side_Navigation = document.getElementById('Side-Navigation'),
Main_Page = document.getElementById('Main-Page'),
Header_Section = document.getElementById('Header-Page'),
Nav_Mobile_CLose = document.getElementById('Close-Nav-MObile');

const mobileQuery = window.matchMedia('(max-width: 1000px)');
let is_Nav_On = true;

let Generate_Button = document.getElementById('Generate-button'),
    Generate_Loading_Button = document.getElementById('Loading-generate-button');

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



var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})

Generate_Button.addEventListener('click',function(){
    Generate_Button.style.display = "none";
    Generate_Loading_Button.style.display = "block";
    Button_Div.classList.add('slide')
    File_Card.classList.add('visible');
})

// file

let File_Card = document.querySelector('.File_Imformation_Card'),
Button_Div = document.querySelector('.certificate-main-content-body-div');
