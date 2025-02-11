const toggleBtn = document.getElementById('toggle-btn')
const navbar = document.getElementById('navbar')

function toggleNavBar(){
    navbar.classList.toggle('close')
    toggleBtn.classList.toggle('rotate')

   closeAllSubMenus();
}

document.getElementById('toggle-btn').addEventListener('click', function() {
    var navbar = document.getElementById('navbar');
    navbar.classList.toggle('open');
});




/*Sub-menu*/

function toggleSubMenu(button){

    if(!button.nextElementSibling.classList.contains('show')){
        closeAllSubMenus();
    }
   
    
    button.nextElementSibling.classList.toggle('show');
    button.classList.toggle('rotate');

    if(navbar.classList.contains('close')){
        navbar.classList.toggle('close');
        toggleBtn.classList.toggle('rotate');
    }
}

function closeAllSubMenus(){
    Array.from(navbar.getElementsByClassName('show')).forEach(ul => {
        ul.classList.remove('show');
        ul.previousElementSibling.classList.remove('rotate');
    })
}