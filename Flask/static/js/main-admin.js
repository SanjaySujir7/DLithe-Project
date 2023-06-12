let h21 = document.querySelectorAll(".h2-70"),
interval = 1000;

let Log_Out = document.getElementById('logout-form');


h21.forEach((h21)=>{
    let start_Value = 0, end_Value = parseInt(h21.getAttribute("value"));

    let duation = Math.floor(interval/end_Value);
    console.log(end_Value)
    let counter = setInterval(function(){
        if (end_Value == "2000"){
            start_Value += 5
        }
        else{
            start_Value += 1
        }
        

        if(start_Value > end_Value){
            clearInterval(counter)
        }
        else{
            h21.textContent = start_Value;
        }

    },duation)

});

Log_Out.addEventListener('click',function(){
    Log_Out.submit()
})