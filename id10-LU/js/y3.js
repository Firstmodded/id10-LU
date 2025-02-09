// Function to calculate the Year and Semester Evaluations in real-time for Year 3
function calculateYear3Grades() {
    const courseCodes = [
        'DHR300', 'I3301', 'I3302', 'I3303', 'I3304', 'I3305', 'I3306', 'I3350', 'I3351', 
        'I3307', 'I3308', 'I3330', 'I3331', 'I3332', 'I3333', 'I3340', 'I3341', 'I3342', 'I3343', 'I3344', 'L3300'
    ];
    
    // Retrieve grades from inputs or default to 0
    const grades = Object.fromEntries(courseCodes.map(code => [code, parseFloat(document.getElementById(code).value) || 0]));
    
    // Define credit hours for each course
    const creditHours = {
        DHR300: 3, I3301: 4, I3302: 4, I3303: 4, I3304: 4, I3305: 3, I3306: 3, I3350: 5, I3351: 5, 
        I3307: 4, I3308: 4, I3330: 3, I3331: 3, I3332: 3, I3333: 3, I3340: 4, I3341: 4, I3342: 3, I3343: 3, I3344: 6, L3300: 3
    };

    const semesters = {
        semester5: ['DHR300', 'I3301', 'I3302', 'I3303', 'I3304', 'I3305', 'I3306', 'I3350', 'I3351'],
        semester6: ['I3307', 'I3308', 'I3330', 'I3331', 'I3332', 'I3333', 'I3340', 'I3341', 'I3342', 'I3343', 'I3344', 'L3300']
    };

    // Clear previous error messages
    const resultElement = document.getElementById('result');
    resultElement.innerHTML = '';

    // Function to calculate semester average
    function calculateSemester(courses) {
        let totalPoints = 0, totalCredits = 0;
        for (let course of courses) {
            let grade = grades[course], credits = creditHours[course];
            if (isNaN(grade) || grade < 0 || grade > 100) {
                displayError(`Please enter a valid grade between 0 and 100 for ${course}.`);
                return null;
            }
            totalPoints += grade * credits;
            totalCredits += credits;
        }
        return totalPoints / totalCredits;
    }

    // Calculate semester evaluations
    const sem5Eval = calculateSemester(semesters.semester5);
    const sem6Eval = calculateSemester(semesters.semester6);
    const yearEval = (sem5Eval !== null && sem6Eval !== null) ? (sem5Eval + sem6Eval) / 2 : null;

    // Function to display evaluation results
    function displayResult(elementId, evaluation) {
        const element = document.getElementById(elementId);
        if (evaluation !== null) {
            element.textContent = `${elementId.replace('Result', '')} Evaluation: ${evaluation.toFixed(2)}%`;
            element.style.color = evaluation >= 50 ? '#4CAF50' : '#F44336';
        }
    }

    displayResult('sem5Result', sem5Eval);
    displayResult('sem6Result', sem6Eval);

    if (yearEval !== null) {
        resultElement.textContent = `Your Year 3 Evaluation is: ${yearEval.toFixed(2)}%`;
        resultElement.style.color = yearEval >= 50 ? '#4CAF50' : '#F44336';
        resultElement.innerHTML += yearEval >= 50 ? ' ✔ You have passed!' : ' ✖ Unfortunately, you have failed.';
    }
}

// Display error message dynamically
function displayError(message) {
    const resultElement = document.getElementById('result');
    resultElement.style.color = "#F44336";
    resultElement.innerHTML = `<span class="error-message">⚠️ ${message}</span>`;
}

// Attach event listeners for real-time calculation
document.querySelectorAll('input[type="number"]').forEach(input => {
    input.addEventListener('input', calculateYear3Grades);
});

// Clear function
function clearYear3Inputs() {
    document.querySelectorAll('input[type="number"]').forEach(input => input.value = '');
    ['sem5Result', 'sem6Result', 'result'].forEach(id => document.getElementById(id).textContent = '');
}

document.getElementById('clearButton').addEventListener('click', clearYear3Inputs);

// Function to download grades as a CSV file for Year 3
function downloadYear3CSV() {
    const courseCodes = [
        'DHR300', 'I3301', 'I3302', 'I3303', 'I3304', 'I3305', 'I3306', 'I3350', 'I3351', 
        'I3307', 'I3308', 'I3330', 'I3331', 'I3332', 'I3333', 'I3340', 'I3341', 'I3342', 'I3343', 'I3344', 'L3300'
    ];
    const grades = Object.fromEntries(courseCodes.map(code => [code, parseFloat(document.getElementById(code).value) || 0]));
    const creditHours = {
        DHR300: 3, I3301: 4, I3302: 4, I3303: 4, I3304: 4, I3305: 3, I3306: 3, I3350: 5, I3351: 5, 
        I3307: 4, I3308: 4, I3330: 3, I3331: 3, I3332: 3, I3333: 3, I3340: 4, I3341: 4, I3342: 3, I3343: 3, I3344: 6, L3300: 3
    };
    
    let csvContent = "Course Code,Grade,Credit Hours\n" +
        courseCodes.map(course => `${course},${grades[course]},${creditHours[course]}`).join("\n");
    
    csvContent += `\n${document.getElementById('sem5Result').textContent}\n`;
    csvContent += `${document.getElementById('sem6Result').textContent}\n`;
    csvContent += `${document.getElementById('result').textContent}\n`;
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'year3_grade_report.csv';
    link.click();
}

document.getElementById('downloadButton').addEventListener('click', downloadYear3CSV);
