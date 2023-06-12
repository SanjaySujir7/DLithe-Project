let Toggle_Button = document.getElementById('side-Nav-toggle-head');

let Side_Navigation = document.getElementById('Side-Navigation'),
Main_Page = document.getElementById('Main-Page'),
Header_Section = document.getElementById('Header-Page'),
Nav_Mobile_CLose = document.getElementById('Close-Nav-MObile');

let Course_Sub_Menu = document.getElementById('COurse-Side-Nav-DropDown'),
Course_Sub_Menu_Div = document.getElementById('Progrmes-side-nav-dropdown');




let is_Nav_On = true;

const mobileQuery = window.matchMedia('(max-width: 1000px)');

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

let Course_Sub_Menu_State = false;

Course_Sub_Menu.addEventListener('click',function(){
    
    if (Course_Sub_Menu_State == false){
        Course_Sub_Menu_Div.classList.add('visible');
        Course_Sub_Menu_State = true;
    }

    else{
        Course_Sub_Menu_Div.classList.remove('visible');
        Course_Sub_Menu_Div.classList.add('hide');
        Course_Sub_Menu_State = false;
        Course_Sub_Menu_Div.classList.remove('hide');
    }
})