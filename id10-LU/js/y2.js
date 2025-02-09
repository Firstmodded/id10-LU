// Function to calculate the Year and Semester Evaluations in real-time for Year 2
function calculateYear2Grades() {
    const courseCodes = ['S2201', 'I2200', 'M2200', 'M2201', 'P2200', 'P2201', 'M2206', 'M2202', 'M2203', 'M2204', 'M2205', 'I2201'];
    
    // Retrieve grades from inputs or default to 0
    const grades = Object.fromEntries(courseCodes.map(code => [code, parseFloat(document.getElementById(code).value) || 0]));
    
    // Define credit hours for each course
    const creditHours = {
        S2201: 3, I2200: 3, M2200: 6, M2201: 6, P2200: 6, P2201: 6,
        M2206: 3, M2202: 3, M2203: 6, M2204: 6, M2205: 6, I2201: 6
    };

    const semesters = {
        semester1: ['S2201', 'I2200', 'M2200', 'M2201', 'P2200', 'P2201'],
        semester2: ['M2206', 'M2202', 'M2203', 'M2204', 'M2205', 'I2201']
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
    const sem1Eval = calculateSemester(semesters.semester1);
    const sem2Eval = calculateSemester(semesters.semester2);
    const yearEval = (sem1Eval !== null && sem2Eval !== null) ? (sem1Eval + sem2Eval) / 2 : null;

    // Function to display evaluation results
    function displayResult(elementId, evaluation) {
        const element = document.getElementById(elementId);
        if (evaluation !== null) {
            element.textContent = `${elementId.replace('Result', '')} Evaluation: ${evaluation.toFixed(2)}%`;
            element.style.color = evaluation >= 50 ? '#4CAF50' : '#F44336';
        }
    }

    displayResult('sem1Result', sem1Eval);
    displayResult('sem2Result', sem2Eval);

    if (yearEval !== null) {
        resultElement.textContent = `Your Year 2 Evaluation is: ${yearEval.toFixed(2)}%`;
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
    input.addEventListener('input', calculateYear2Grades);
});

// Clear function
function clearYear2Inputs() {
    document.querySelectorAll('input[type="number"]').forEach(input => input.value = '');
    ['sem1Result', 'sem2Result', 'result'].forEach(id => document.getElementById(id).textContent = '');
    document.getElementById('sem1Progress').style.width = '0%';
    document.getElementById('sem2Progress').style.width = '0%';
}

document.getElementById('clearButton').addEventListener('click', clearYear2Inputs);

// Function to download grades as a CSV file for Year 2
function downloadYear2CSV() {
    const courseCodes = ['S2201', 'I2200', 'M2200', 'M2201', 'P2200', 'P2201', 'M2206', 'M2202', 'M2203', 'M2204', 'M2205', 'I2201'];
    const grades = Object.fromEntries(courseCodes.map(code => [code, parseFloat(document.getElementById(code).value) || 0]));
    const creditHours = {
        S2201: 3, I2200: 3, M2200: 6, M2201: 6, P2200: 6, P2201: 6,
        M2206: 3, M2202: 3, M2203: 6, M2204: 6, M2205: 6, I2201: 6
    };
    
    let csvContent = "Course Code,Grade,Credit Hours\n" +
        courseCodes.map(course => `${course},${grades[course]},${creditHours[course]}`).join("\n");
    
    csvContent += `\n${document.getElementById('sem1Result').textContent}\n`;
    csvContent += `${document.getElementById('sem2Result').textContent}\n`;
    csvContent += `${document.getElementById('result').textContent}\n`;
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'year2_grade_report.csv';
    link.click();
}

document.getElementById('downloadButton').addEventListener('click', downloadYear2CSV);
