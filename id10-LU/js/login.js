console.log('login.js loaded'); // Debugging line

const form = document.getElementById('form');
const firstname_input = document.getElementById('firstname-input');
const semester_input = document.getElementById('semester-input');
const email_input = document.getElementById('email-input');
const password_input = document.getElementById('password-input');
const error_message = document.getElementById('error-message');
const major_input = document.getElementById('major-input');

form.addEventListener('submit', (e) => {
    console.log('Form submit event triggered'); // Debugging line
    e.preventDefault(); // Always call this first

    let errors = getSignupFormErrors(firstname_input, semester_input, email_input, password_input, major_input);

    if (errors.length > 0) {
        console.log('Form has errors:', errors); // Debugging line
        error_message.innerHTML = errors.join(". ");
    } else {
        console.log('Form is valid. Saving to local storage...'); // Debugging line

        // Save firstname, semester, and major to local storage
        localStorage.setItem('firstname', firstname_input.value);
        localStorage.setItem('semester', semester_input.value);
        localStorage.setItem('major', major_input.value);

        console.log('Firstname saved:', localStorage.getItem('firstname')); // Debugging line
        console.log('Semester saved:', localStorage.getItem('semester')); // Debugging line
        console.log('Major saved:', localStorage.getItem('major')); // Debugging line

        // Redirect to dashboard.html
        console.log('Redirecting to dashboard.html...'); // Debugging line
        window.location.href = 'dashboard.html';
    }
});

function getSignupFormErrors(firstname, semester, email, password, major) {
    let errors = [];

    if (firstname.value === '' || firstname.value == null) {
        errors.push('Firstname is required');
        firstname_input.parentElement.classList.add('incorrect');
    }

    if (semester.value === '' || semester.value == null) {
        errors.push('Semester Nb is required');
        semester_input.parentElement.classList.add('incorrect');
    }

    if (email.value === '' || email.value == null) {
        errors.push('Email is required');
        email_input.parentElement.classList.add('incorrect');
    }

    if (password.value === '' || password.value == null) {
        errors.push('Password is required');
        password_input.parentElement.classList.add('incorrect');
    }

    if (major.value === '' || major.value == null) {
        errors.push('Major is required');
        major_input.parentElement.classList.add('incorrect');
    }

    console.log('Errors found:', errors); // Debugging line
    return errors;
}

const allInputs = [firstname_input, semester_input, email_input, password_input,major_input];

allInputs.forEach(input => {
    input.addEventListener('input', () => {
        if (input.parentElement.classList.contains('incorrect')) {
            input.parentElement.classList.remove('incorrect');
            error_message.innerHTML = '';
        }
    });
});