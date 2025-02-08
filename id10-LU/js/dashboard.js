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

// Add event listener for the Enter key
inputBox.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {  // If Enter key is pressed
        addTask();  // Call addTask() function
    }
});

// Add task to the list
function addTask() {
    if (inputBox.value === '') {
        alert("You must write something!");
    } else {
        let li = document.createElement("li");
        li.textContent = inputBox.value;
        listContainer.appendChild(li);

        // Create a delete button (span)
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";  // Cross sign for delete
        li.appendChild(span);

        // Save task list after adding
        saveData();
    }
    inputBox.value = ''; // Clear input box
}

// Handle clicking on the list to mark as checked or delete
listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData(); // Save the updated state
    }
    // Deleting task by clicking on the cross
    else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData(); // Save the updated list
    }
}, false);

// Save the task list to localStorage (in an array form)
function saveData() {
    const tasks = [];
    document.querySelectorAll("#list-c1 li").forEach((li) => {
        tasks.push({
            text: li.textContent.replace("\u00d7", "").trim(), // Remove cross sign from text
            checked: li.classList.contains("checked"), // Save checked state
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks)); // Save as JSON
}

// Load tasks from localStorage
function showTask() {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks) {
        tasks.forEach(task => {
            let li = document.createElement("li");
            li.textContent = task.text;

            // Create delete button (span)
            let span = document.createElement("span");
            span.innerHTML = "\u00d7";
            li.appendChild(span);

            // Apply checked class if the task was previously checked
            if (task.checked) {
                li.classList.add("checked");
            }

            listContainer.appendChild(li);
        });
    }
}

// Show tasks when page loads
showTask();
