const
    FIRST = "first-name",
    LAST = "last-name",
    EMAIL = "email",
    PHONE = "phone",
    PASSWORD = "password",
    CONFIRM = "confirm-pass"

const
    NAME_ERR = "Name required",
    EMAIL_ERR = "Required format: myemail@example.com",
    PHONE_ERR = "Format: +263777888999 or 0777888999",
    PASS_ERR_1 = "At least 8 characters long",
    PASS_ERR_2 = "At least one number [0-9] required",
    PASS_ERR_3 = "At least one symbol required",
    CONFIRM_ERR = "Passwords must match";

const
    form = document.querySelector("form");
    firstNameError = document.querySelector(`#${FIRST} + label`),
    emailError = document.querySelector(`#${EMAIL} + label`),
    phoneError = document.querySelector(`#${PHONE} + label`),
    confirmError = document.querySelector(`#${CONFIRM} + label`);
    passwordError1 = document.querySelector("#rule-1"),
    passwordError2 = document.querySelector("#rule-2"),
    passwordError3 = document.querySelector("#rule-3"),
    passwordInput = document.querySelector(`#${PASSWORD}`),
    confirmInput = document.querySelector(`#${CONFIRM}`),
    phoneInput = document.querySelector(`#${PHONE}`);


form.addEventListener("focusout", (e) => {
    if (e.target.nodeName !== "INPUT") {
        return;
    }

    e.target.classList.add("validate")

    if (e.target.id === PASSWORD) {
        parseWord();
        passwordInput.addEventListener("input", parseWord);

    } else if (e.target.id === CONFIRM) {
        confirmPassword();
        confirmInput.addEventListener("input", confirmPassword);
        passwordInput.addEventListener("input", confirmPassword);

    } else if (e.target.id === PHONE) {
        parsePhone();
        phoneInput.addEventListener("input", parsePhone);

    } else if (!e.target.validity.valid) {
        flagError(e.target);
        e.target.addEventListener("input", realtimeValidation);
    }
});

function realtimeValidation(e) {
    if (e.target.validity.valid) {
        solveError(e.target);
    } else {
        flagError(e.target);
    }
}

function flagError(input) {
    if (input.id === FIRST) {
        firstNameError.textContent = `* ${NAME_ERR}`;
        firstNameError.classList.remove("solved");
        firstNameError.classList.add("flag");
    } else if (input.id === EMAIL) {
        emailError.textContent = `* ${EMAIL_ERR}`;
        emailError.classList.remove("solved");
        emailError.classList.add("flag");
    } else if (input.id === PHONE) {
        phoneError.textContent = `* ${PHONE_ERR}`;
        phoneError.classList.remove("solved");
        phoneError.classList.add("flag");
    }
}

function solveError(input) {
    if (input.id === FIRST) {
        firstNameError.textContent = `✓ ${NAME_ERR}`;
        firstNameError.classList.remove("flag");
        firstNameError.classList.add("solved");
    } else if (input.id === EMAIL) {
        emailError.textContent = `✓ ${EMAIL_ERR}`;
        emailError.classList.remove("flag");
        emailError.classList.add("solved");
} else if (input.id === PHONE) {
        phoneError.textContent = `✓ ${PHONE_ERR}`;
        phoneError.classList.remove("flag");
        phoneError.classList.add("solved");
    }
}

function parseWord() {
    const password = passwordInput.value;
    passwordInput.setCustomValidity("");
    
    if (password.length < 8) {
        passwordError1.textContent = `𐄂 ${PASS_ERR_1}`;
        passwordError1.classList.add("flag");
        passwordError1.classList.remove("solved");
        passwordInput.setCustomValidity("Password too short");       
    } else {
        passwordError1.textContent = `✓ ${PASS_ERR_1}`;
        passwordError1.classList.add("solved");        
        passwordError1.classList.remove("flag");
    }
    
    if (/\d/.test(password)) {
        passwordError2.textContent = `✓ ${PASS_ERR_2}`;
        passwordError2.classList.add("solved");        
        passwordError2.classList.remove("flag");
    } else {
        passwordError2.textContent = `𐄂 ${PASS_ERR_2}`;
        passwordError2.classList.add("flag");
        passwordError2.classList.remove("solved");
        passwordInput.setCustomValidity("No numbers in password");       
    }
    
    if (/[!-\/:-@[-`{-~]/.test(password)) {
        passwordError3.textContent = `✓ ${PASS_ERR_3}`;
        passwordError3.classList.add("solved");        
        passwordError3.classList.remove("flag");
    } else {
        passwordError3.textContent = `𐄂 ${PASS_ERR_3}`;
        passwordError3.classList.add("flag");
        passwordError3.classList.remove("solved");
        passwordInput.setCustomValidity("No symbols in password");       
    }
}

function confirmPassword() {
    if (confirmInput.value && confirmInput.value === passwordInput.value) {
        confirmInput.setCustomValidity("");
        confirmError.textContent = `✓ ${CONFIRM_ERR}`;
        confirmError.classList.add("solved");
        confirmError.classList.remove("flag");
    } else {
        confirmInput.setCustomValidity("Passwords do not match");
        confirmError.textContent = `* ${CONFIRM_ERR}`;
        confirmError.classList.add("flag");
        confirmError.classList.remove("solved");
    }
}

function parsePhone() {
    function phoneIsValid() {
        const firstChar = phoneInput.value.charAt(0);
        const body = phoneInput.value.slice(1);

        if (firstChar === "+") {
            const countryCode = body.slice(0,3);
            const actualNumber = body.slice(3);
            return (
                countryCode === "263" &&
                !isNaN(Number(actualNumber)) &&
                actualNumber.length === 9
            );

        } else if (firstChar === "0") {
            return !isNaN(Number(body)) && body.length === 9;

        } else {
            return false;
        }
    }

    if (phoneInput.value === "") {
        phoneInput.setCustomValidity("");
        phoneError.textContent = "";
    } else if (phoneIsValid()) {
        phoneInput.setCustomValidity("");
        phoneError.textContent = `✓ ${PHONE_ERR}`;
        phoneError.classList.add("solved");
        phoneError.classList.remove("flag");
    } else {
        phoneInput.setCustomValidity("Invalid format");
        phoneError.textContent = `* ${PHONE_ERR}`;
        phoneError.classList.add("flag");
        phoneError.classList.remove("solved");
    }
}