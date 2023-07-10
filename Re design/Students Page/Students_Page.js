const Menu = document.getElementById('Menu-holder-div'),
      Nav = document.getElementById('Side-Nav'),
      Header = document.getElementById('Header');

const mobileQuery = window.matchMedia('(max-width: 1000px)');

const Back_Drop = document.querySelector('.back-drop');

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