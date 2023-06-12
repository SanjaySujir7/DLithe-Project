let Nav_bar_Button = document.getElementById("span-div"),
Nav_Button = document.getElementById("Side-Bar-Span");



Nav_bar_Button.addEventListener("click",function(){
    let Nav_bar_Button = document.getElementById("Side-Bar");
    Nav_bar_Button.style.left = "0px";

})

Nav_Button.addEventListener("click",function(){
    let Nav_bar_Button = document.getElementById("Side-Bar");
    console.log('huaa')
    Nav_bar_Button.style.left = "-300px"})
