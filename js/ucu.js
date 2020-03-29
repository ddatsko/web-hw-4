// 1. Submit the form, only if it is valid
//    email is between 5 and 50 chars long
//    email format is correct
//    name has 0 or 2 whitespaces benween words
//    name length is 1 or more chars
//    phone length is 12 or more digits
//    phone format is correct. Valid formats: "+38032 000 000 00", "+380(32) 000 000 00", "+380(32)-000-000-00", "0380(32) 000 000 00", + any combitaion
//    message is 10 or more characters.
//    message must not iclude bad language: ugly, dumm, stupid, pig, ignorant
// 2. Validate each input on the fly using onchange event
// 3. Define re-usable validators: length, format,


const badWords = ['ugly', 'dumb', 'stupid', 'pig', 'ignorant'];
const email = document.getElementById('email');
const name = document.getElementById('name');
const number = document.getElementById('phone');
const message = document.getElementById('message');

email.addEventListener('change', () => validateEmail(email));
name.addEventListener('change', () => validateName(name));
number.addEventListener('change', () => validatePhoneNumber(number));
message.addEventListener('changr', () => validateMessage(message));


function validateMe(event) {
    event.preventDefault();

    const emailNode = event.target.elements['email'];
    const nameNode = event.target.elements['name'];
    const phoneNode = event.target.elements['phone'];
    const messageNode = event.target.elements['message'];

    validateEmail(emailNode);
    validateName(nameNode);
    validatePhoneNumber(phoneNode);
    validateMessage(messageNode);

    return false;
}


function validateMessage(messageNode) {
    let message = messageNode.value;
    let errorsList = [];

    if (message.length < 10) errorsList.push('Message is too short');

    for (let word of badWords) {
        if (message.toLowerCase().includes(word)) {
            errorsList.push("There is a bad word in message (" + word + ")");
            break;
        }
    }
    displayErrors(messageNode, errorsList);
}


function validateName(nameNode) {
    let errorsList = [];
    let name = nameNode.value;

    if (name.length === 0) errorsList.push('Name cannot be empty');

    if (!name.match(/^\w+$/) && !name.match(/^\w+\s+\w+\s+\w+$/)) errorsList.push('Name can contain only 0 or 2 whitespaces and cannot contain non-letters');

    displayErrors(nameNode, errorsList);

}

function validatePhoneNumber(phoneNode) {
    let errorsList = [];
    let number = phoneNode.value;

    if (!number.match(/^[0+]\d{3}(\(\d{2}\)|\d{2})([ -]?\d{3}){2}[ -]?\d{2}$/)) errorsList.push('Phone number format is incorrect');

    if (number.replace(/[^0-9]/gi, '').length < 12) errorsList.push('Phone number has too few digits');

    displayErrors(phoneNode, errorsList);
}

function validateEmail(emailNode) {
    let errorsList = [];
    let email = emailNode.value;

    if (email.length < 5) errorsList.push('Email is too short');

    if (email.length > 50) errorsList.push('Email is too long');

    if (!email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
        errorsList.push('Email format is incorrect');
    }
    displayErrors(emailNode, errorsList);
}

function displayErrors(valueNode, errorsList) {
    const valueErrorNode = valueNode.parentNode.querySelector('p.help-block');
    valueErrorNode.innerHTML = '';
    let valueErrors = document.createElement('ul');
    valueErrors.setAttribute('role', 'alert');

    if (errorsList.length === 0) return;

    for (let error of errorsList) {
        appendError(error, valueErrors);
    }

    valueErrorNode.appendChild(valueErrors);
}

function appendError(errorText, errorsListNode) {
    let li = document.createElement('li');
    li.innerText = errorText;
    errorsListNode.appendChild(li);
}