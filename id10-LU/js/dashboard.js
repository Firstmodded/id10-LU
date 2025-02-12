// Retrieve data from local storage
const studentName = localStorage.getItem('firstname');
const semester = localStorage.getItem('semester');
const major = localStorage.getItem('major'); 

// Calculate the year based on the semester
let year;
if (semester >= 1 && semester <= 2) {
    year = 1;
} else if (semester >= 3 && semester <= 4) {
    year = 2;
} else if (semester >= 5 && semester <= 6) {
    year = 3;
} else {
    year = 'Unknown'; // Fallback for invalid semester values
}

// Update the DOM with the retrieved data
document.getElementById('student-name').textContent = studentName || 'Guest';
document.getElementById('student-semester').textContent = semester || 'Unknown'; 
document.getElementById('student-major').textContent = major || 'Unknown';
document.getElementById('student-year').textContent = `Year ${year}`; 

//widgets
document.addEventListener("DOMContentLoaded", function () {
    const widgetUrls = [
        "https://indify.co/widgets/live/countdown/K2otRMAfg7RlO9QqDUTi", //semester countdown
        "https://indify.co/widgets/live/clock/D03Hq9zawuwqFyNH8Fr5",//clock
        "https://indify.co/widgets/live/counter/ZMIpFXHvZAKBxPWpNOoY", //counter
        "https://indify.co/widgets/live/button/yyA07kT0p2iBScnJBKUU" //buttons
    ];

    widgetUrls.forEach((url, index) => {
        let widgetContainer = document.getElementById(`widget-container-${index + 1}`);
        let loadingMessage = document.createElement("p");
        loadingMessage.textContent = "Loading...";
        widgetContainer.appendChild(loadingMessage);

        let iframe = document.createElement("iframe");
        iframe.src = url;
        iframe.width = "100%";
        iframe.height = "100%";
        iframe.style.border = "none";
        widgetContainer.appendChild(iframe);

        iframe.onload = function() {
            loadingMessage.style.display = "none";
        };
    });
});

/*TODO List*/

const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-c2");
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
    document.querySelectorAll("#list-c2 li").forEach((li) => {
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



//pomodoro
const start = document.getElementById("start");
const stopp = document.getElementById("stop");
const reset = document.getElementById("reset");
const timer = document.getElementById("timer");
const sessionCounter = document.getElementById("session-counter");
const breakTimer = document.getElementById("break-timer");
const progress = document.getElementById("progress");

let timeLeft = 1500; // 25 minutes
let breakTimeLeft = 300; // 5 minutes
let interval;
let isPomodoro = true; // Tracks if it's Pomodoro or Break time
let sessionsCompleted = 0;

// Sound for notifications
const sound = new Audio("notification-sound.mp3"); // Add a sound file

// Update Timer Display
const updateTimer = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timer.innerHTML = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

// Update Break Timer Display
const updateBreakTimer = () => {
    const minutes = Math.floor(breakTimeLeft / 60);
    const seconds = breakTimeLeft % 60;
    breakTimer.innerHTML = `Break: ${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

// Update Progress Bar
const updateProgressBar = () => {
    const totalTime = isPomodoro ? 1500 : 300; // Total time for Pomodoro or Break
    const currentTime = isPomodoro ? timeLeft : breakTimeLeft;
    const progressPercentage = ((totalTime - currentTime) / totalTime) * 100;
    progress.style.width = `${progressPercentage}%`;
};

// Start Timer
const startTimer = () => {
    interval = setInterval(() => {
        if (isPomodoro) {
            timeLeft--;
            updateTimer();
            updateProgressBar();

            if (timeLeft === 0) {
                clearInterval(interval);
                sound.play(); // Play sound when Pomodoro ends
                alert("Pomodoro Complete! Time for a break.");
                isPomodoro = false;
                sessionsCompleted++;
                sessionCounter.innerHTML = `Sessions Completed: ${sessionsCompleted}`;
                startBreak();
            }
        } else {
            breakTimeLeft--;
            updateBreakTimer();
            updateProgressBar();

            if (breakTimeLeft === 0) {
                clearInterval(interval);
                sound.play(); // Play sound when Break ends
                alert("Break Over! Start a new Pomodoro.");
                isPomodoro = true;
                timeLeft = 1500;
                breakTimeLeft = 300;
                updateTimer();
                updateBreakTimer();
                updateProgressBar();
            }
        }
    }, 1000);
};

// Start Break
const startBreak = () => {
    breakTimeLeft = 300;
    updateBreakTimer();
    updateProgressBar();
    startTimer();
};

// Stop Timer
const stopTimer = () => clearInterval(interval);

// Reset Timer
const resetTimer = () => {
    clearInterval(interval);
    timeLeft = 1500;
    breakTimeLeft = 300;
    isPomodoro = true;
    sessionsCompleted = 0;
    updateTimer();
    updateBreakTimer();
    updateProgressBar();
    sessionCounter.innerHTML = `Sessions Completed: ${sessionsCompleted}`;
};

const fullscreenButton = document.getElementById("fullscreen");
const pomodoroCard = document.getElementById("c4");

// Enter Full-Screen Mode for the Card
fullscreenButton.addEventListener("click", () => {
    if (!document.fullscreenElement) {
        pomodoroCard.requestFullscreen(); // Enter full-screen for the card
        fullscreenButton.textContent = "Exit Full Screen";
    } else {
        document.exitFullscreen(); // Exit full-screen
        fullscreenButton.textContent = "Enter Full Screen";
    }
});

// Handle Full-Screen Change
document.addEventListener("fullscreenchange", () => {
    if (!document.fullscreenElement) {
        fullscreenButton.textContent = "Enter Full Screen";
    }
});
// Event Listeners
start.addEventListener("click", startTimer);
stopp.addEventListener("click", stopTimer);
reset.addEventListener("click", resetTimer);