let h21 = document.querySelectorAll(".h2-70"),
interval = 1000;
let Import_Button = document.getElementById("right-side-sec-button"),
Dialog = document.getElementById("Dialog"),
Dialog_cancel = document.getElementById("Button-Dialog-cancel"),
Dialog_OK = document.getElementById("Button-Dialog-ok"),
Dialog_form= document.getElementById("Dialog-Form");


// h21.forEach((h21)=>{
//     let start_Value = 0, end_Value = parseInt(h21.getAttribute("value"));

//     let duation = Math.floor(interval/end_Value);
//     console.log(end_Value)
//     let counter = setInterval(function(){
//         if (end_Value == "2000"){
//             start_Value += 5
//         }
//         else{
//             start_Value += 1
//         }
        

//         if(start_Value > end_Value){
//             clearInterval(counter)
//         }
//         else{
//             h21.textContent = start_Value;
//         }

//     },duation)

// });

function Dialog_Popup(){
    Dialog.showModal()
}

Import_Button.addEventListener("click",function(){
    Dialog.showModal();
    Dialog_cancel.addEventListener("click",function(){
        Dialog.close();
    });

    Dialog_OK.addEventListener('click',function(){
        Dialog_form.submit();
    });
});