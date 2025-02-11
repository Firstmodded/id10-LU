/*const toggleBtn = document.getElementById('toggle-btn')
const navbar = document.getElementById('navbar')

function toggleSideBar(){
    navbar.classList.toggle('close')
    toggleBtn.classList.toggle('rotate')
}

document.getElementById('toggle-btn').addEventListener('click', function() {
    var navbar = document.getElementById('navbar');
    navbar.classList.toggle('open');
});
*/



/*Sub-menu*/

function toggleSubMenu(button){
    button.nextElementSibling.classList.toggle('show');
    button.classList.toggle('rotate');
}