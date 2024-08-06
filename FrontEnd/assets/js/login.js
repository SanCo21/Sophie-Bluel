function validateEmail(email) {
    let emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\.[a-z0-9._-]+") 
    return emailRegExp.test(email);  
}

function validatePassword(password) {
    let passwordRegExp = new RegExp("[a-z0-9._-]+") 
    return passwordRegExp.test(password);
}

// Event listener for form submission
document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();

    // Getting the values from the form
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Validating the email and password fields
    if(validateEmail(email) && validatePassword(email)) {
        console.log('Champs correctement remplis')
    } else {
        console.log('erreur')
    } 
});

// Event listener for changes in the email field
document.getElementById('email').addEventListener('change', (event) => {
    const idValue = event.target.value;
    console.log(idValue === "" ? 'Le champ email est vide' : 'Le champ email est rempli');
});

// Event listener for changes in the password field
document.getElementById('password').addEventListener('change', (event) => {
    const passwordValue = event.target.value;
    console.log(passwordValue === "" ? 'Le champ mdp est vide' : 'Le champ mdp est rempli');
});



// Event listener for the login button click
document.getElementById('login-button').addEventListener('click', async() => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Creating the user object
    const user = { email, password };

    // Define the token
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1MTg3NDkzOSwiZXhwIjoxNjUxOTYxMzM5fQ.JGN1p8YIfR-M-5eQ-Ypy6Ima5cKA4VbfL2xMr2MgHm4";

    try {
        // Sending a POST request for authentication
        const response = await fetch("http://localhost:5678/api/users/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + token
             },
            body: JSON.stringify(user)
         });
        
        // Checking the API response
        if (response.ok) {
            const data = await response.json();
            console.log('API Response:', data);

            // Saving the token in local storage
            localStorage.setItem('token', data.token);

            // Redirecting to index.html after successful authentication
            window.location.href = 'index.html';
        } else {
            console.log('API call failed with status:', response.status);
        }
    } catch (error) {
        console.log('Authentification failed', error);
    }   
});