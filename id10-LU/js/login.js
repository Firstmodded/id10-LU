const form = document.getElementById('form');
const firstname_input = document.getElementById('firstname-input');
const semester_input = document.getElementById('semester-input');
const email_input = document.getElementById('email-input');
const password_input = document.getElementById('password-input');
const error_message = document.getElementById('error-message')

form.addEventListener('submit',(e) => {
    
    let errors = []

    errors = getSignupFormErrors(firstname_input,semester_input,email_input,password_input)

    if(errors.length > 0){
        e.preventDefault()
        error_message.innerHTML = errors.join(". ")
    }
})

function getSignupFormErrors(firstname,semester,email,password){
    let errors = []

    if(firstname.value === '' || firstname.value == null){
        errors.push('Firstname is required')
        firstname_input.parentElement.classList.add('incorrect')
    }

    if(semester.value === '' || semester.value == null){
        errors.push('Semester Nb is required')
        semester_input.parentElement.classList.add('incorrect')
    }

    if(email.value === '' || email.value == null){
        errors.push('Email is required')
        email_input.parentElement.classList.add('incorrect')
    }

    if(password.value === '' || password.value == null){
        errors.push('Password is required')
        password_input.parentElement.classList.add('incorrect')
    }

    return errors;
}

const allInputs = [firstname_input,semester_input,email_input,password_input]

allInputs.forEach(input => {
    input.addEventListener('input',() => {
        if(input.parentElement.classList.contains('incorrect')){
            input.parentElement.classList.remove('incorrect')
            error_message.innerHTML = ''
        }
    })
})