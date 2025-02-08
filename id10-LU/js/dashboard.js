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
/*TODO List*/

const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-c1");
document.getElementById("add-task-btn").addEventListener("click", addTask);

function addTask(){
    if(inputBox.value == ''){
        alert("You must write somthing!");
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7"
        li.appendChild(span);
    }
    inputBox.value = '';
    saveData();
}

listContainer.addEventListener("click",function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    }
    else if(e.target.tagName === "TODO-SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData(){
    localStorage.setItem("data",listContainer.innerHTML);
}

function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();
//localStorage.clear();