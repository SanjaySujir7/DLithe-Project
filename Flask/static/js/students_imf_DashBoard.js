let Toggle_Button = document.getElementById('side-Nav-toggle-head');

let Side_Navigation = document.getElementById('Side-Navigation'),
Main_Page = document.getElementById('Main-Page'),
Header_Section = document.getElementById('Header-Page'),
Nav_Mobile_CLose = document.getElementById('Close-Nav-MObile');

let Profile_Popup_Button = document.getElementById("Profile-Popup-see-Profile"),
Profile_Dialog = document.getElementById('Profile-Dialog'),
Profile_Dialog_CLose = document.getElementById('Dialog-Profile-CLose-id');

let View_Course_Button = document.getElementById('View-Programm-Details-Button');

let is_Nav_On = true;
const Duration_Dailog_For_Small_Screen = document.getElementById('Dialog-Duaration-For-Small-Screens');

let Dialog_Duartion_close = document.getElementById('Duartion-Dialog-Close-Button');

const mobileQuery = window.matchMedia('(max-width: 1000px)');

let Circle_Progress = document.getElementById('Duartion-Large-Screen-Visual-Duarion-Graph'),
    Circle_Progress_Value = document.getElementById('Duration-circle-graph-value');

let Circle_Progress_dialog = document.getElementById('Duartion-Large-Screen-Visual-Duarion-Graph-dialog'),
    Circle_Progress_dialog_value= document.getElementById('Duration-circle-graph-value-dialog');

let LogOut_Form = document.getElementById('Log-Out-Form');

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




Profile_Popup_Button.addEventListener("click",function(){
    Profile_Dialog.showModal();
    Profile_Dialog.classList.add('pop');
})

Profile_Dialog_CLose.addEventListener('click',function(){
    Profile_Dialog.classList.remove('pop');
    Profile_Dialog.classList.add('go');
    Profile_Dialog.classList.remove('go');
    setTimeout(function(){
        Profile_Dialog.close();
    },200)
});


View_Course_Button.addEventListener('click',function(){
    Duration_Dailog_For_Small_Screen.showModal();
    Duration_Dailog_For_Small_Screen.classList.add('show_dur');
    Duration_Dailog_For_Small_Screen.classList.remove('close_dur');
    Dialog_Progress_Togle();
});


Dialog_Duartion_close.addEventListener('click',function(){
    Duration_Dailog_For_Small_Screen.classList.remove('show_dur');

    setTimeout(function(){
        Duration_Dailog_For_Small_Screen.close();
    },100)
    
    Duration_Dailog_For_Small_Screen.classList.add('close_dur');

})


let Start_Value = 0,
    End_Value = Days_Left,
    speed = 30;
    console.log(End_Value)
let Progress = setInterval(() => {
    
    if(Start_Value == End_Value){
        clearInterval(Progress);

    }

        Circle_Progress_Value.innerText = Start_Value + "%";
        Circle_Progress.style.background = "conic-gradient(rgb(40, 57, 212)" + Start_Value * 3.6 + "deg, white 0deg)";   

    Start_Value++;
},speed);


function Dialog_Progress_Togle (){
    let Start_Value_d = 0,
        End_Value_d = Days_Left,
        speed_d = 30;
    
    let Progress_d = setInterval(() => {
        

        if(Start_Value_d == End_Value_d){
            
            clearInterval(Progress_d);

        }

        Circle_Progress_dialog_value.innerText = Start_Value_d + "%";
        Circle_Progress_dialog.style.background = "conic-gradient(rgb(40, 57, 212)" + Start_Value_d * 3.6 + "deg, white 0deg)";
        Start_Value_d++;

},speed_d);
}

LogOut_Form.addEventListener('click',function(){
    let text = "Do you want to Log out From This Page ?";

    if(confirm(text) == true){
        LogOut_Form.submit();
    
    }

});
