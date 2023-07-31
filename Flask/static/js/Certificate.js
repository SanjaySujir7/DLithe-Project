const Menu = document.getElementById('Menu-holder-div'),
      Nav = document.getElementById('Side-Nav'),
      Header = document.getElementById('Header');

const mobileQuery = window.matchMedia('(max-width: 1070px)');

const Back_Drop = document.querySelector('.back-drop');

const Genearte_Button = document.getElementById('Genearte-Id'),
    Loading_Button = document.getElementById('Loading-btn'),
    Download_Button = document.getElementById('Download-Btn'),
    Generate_Div = document.querySelector('.Buttton-group');


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

Menu.addEventListener('click',Side_Nav);

const mobileQuery_Tool = window.matchMedia('(max-width: 900px)');
if(!mobileQuery_Tool.matches){
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
}

function Genearte (){

    const collapseElementList = document.querySelectorAll('.collapse')
    const collapseList = [...collapseElementList].map(collapseEl => new bootstrap.Collapse(collapseEl));
    Generate_Div.style.height = "50%";
    Loading_Button.style.display = "none";
    Download_Button.style.display = "block";
}

Genearte_Button.addEventListener("click",Request_Certificate);

const Download_Certificate_Link = document.getElementById('Download_Link');

function Request_Certificate (){

    Genearte_Button.style.display = 'none';
    Loading_Button.style.display = 'block';

    fetch('/certificate-generate',{
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({'pass' : "bDr*^1t4t_@fj<lDda24Cz9*BM)I@u"})
    })

    .then(response => response.blob())
    .then(file => {
        const file_url = URL.createObjectURL(file);

        Download_Certificate_Link.href = file_url;
        Download_Certificate_Link.download = "DLithe_Certificate.pdf";
    });

    Genearte();
};
