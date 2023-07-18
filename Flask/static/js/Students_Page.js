const Menu = document.getElementById('Menu-holder-div'),
      Nav = document.getElementById('Side-Nav'),
      Header = document.getElementById('Header');

const mobileQuery = window.matchMedia('(max-width: 1000px)');

const Back_Drop = document.querySelector('.back-drop');

const Cercular_Progress = document.getElementById('duration-cercular-progress'),
      Cercular_Progress_percentage = document.getElementById('duration-percentage');

const Mobile_Duration_Progress = document.getElementById('duration-cercular-progress-mobile'),
      Mobile_Duration_Progress_Percentage = document.getElementById('duration-percentage-mobile'),
      Duration_Modal_Button = document.getElementById('Durtaion-Modal-Mobile-btn');

let Nav_Status = true;
function Side_Nav (){
    if(!mobileQuery.matches){
        if(Nav_Status){
            Nav.style.left = '-250px';
            Header.style.marginLeft = '0px';
            document.body.style.marginLeft = '0px';
            Nav_Status = false;
        }
        else{
            Nav.style.left = '0px';
            Header.style.marginLeft = '250px';
            document.body.style.marginLeft = '250px';
            Nav_Status = true;
        }
    }
    else{
        Nav.style.left = "0px";
        Back_Drop.style.display = 'block';
        Back_Drop.addEventListener('click',function(){
            Nav.style.left = '-250px';
            Back_Drop.style.display = "none";
        })
    }
};

const Nav_Course_Select_btn = document.getElementById('Course-Select-Header'),
      Nav_Course_Select_btn_Mobile = document.getElementById('Course-Select-Mobile');

function Nav_Course_Select(Select){
    Nav_Course_Select_btn.innerText = Select;
} 

function Nav_Course_Select_Mobile(Select){
    Nav_Course_Select_btn_Mobile.innerText = Select;
}


Menu.addEventListener('click',Side_Nav);

function Cercular_Progress_Toggle (){
    let start = 0,
        end = Days_Progress,
        speed = 40;

    let progress = setInterval(function(){
        start ++;
        if(start == end){
            clearInterval(progress);
        }
        Cercular_Progress.style.background = "conic-gradient(rgb(40, 57, 212)" + start * 3.6 + "deg, white 0deg)";
        Cercular_Progress_percentage.innerText = start + "%";
    },speed);
}

Cercular_Progress_Toggle();

function Cercular_Progress_Toggle_Mobile (){
    let start = 0,
        end = Days_Progress,
        speed = 30;

    let progress = setInterval(function(){
        start ++;
        if(start == end){
            clearInterval(progress);
        }
        Mobile_Duration_Progress.style.background = "conic-gradient(rgb(40, 57, 212)" + start * 3.6 + "deg, white 0deg)";
        Mobile_Duration_Progress_Percentage.innerText = start + "%";
    },speed);
}

Duration_Modal_Button.addEventListener('click',Cercular_Progress_Toggle_Mobile);

if(!mobileQuery.matches){
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
}

const Logout_Button = document.getElementById('Log-out-Button'),
      Log_Out_Form = document.getElementById('Logout-form');

Logout_Button.addEventListener('click',function(){
    if(confirm("Do you want to Log out ?")){
        Log_Out_Form.submit();
    }
})