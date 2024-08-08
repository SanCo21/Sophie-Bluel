
console.log('script loaded')

// Function to add the admin link
export function addAdminLink() {
    const adminLink = document.getElementById('admin-link');
    const adminBanner = document.getElementById('admin-banner');
    const body = document.body;

    if (adminLink && adminBanner) { 
        console.log('Adding admin link');
        const adminLinkContent = '<a href="modal1" id="openModalLink"><i class="fa-regular fa-pen-to-square"></i>modifier</a>';
        const adminBannerContent = '<a href="modal1" id="openModalLink"><i class="fa-regular fa-pen-to-square"></i>Mode édition</a>';

        adminLink.innerHTML = adminLinkContent; 
        adminBanner.innerHTML = adminBannerContent;
        adminBanner.style.display = 'block';
        adminLink.style.display = 'inline-block'; // Ensure the link is displayed
        body.classList.add('with-banner'); // Add class to body

        // // Change login to logout
        // if (navLog) {
        //     navLog.innerHTML = '<a href="#" id="logout">Logout</a>';
        //     navLog.addEventListener('click', () => {

        //         // Clear the token from local storage
        //         localStorage.removeItem('token');

        //         // Redirect to login page
        //         window.location.href = 'login.html';
        //     });

        // } else {
        //     console.error('Element with ID "nav-log" not found');
        // }

    } else {
        console.error('Element with class "admin-link" not found');
    }
}

// Function to remove the admin-link
// export function removeAdminLink() {
//     const adminBanner = document.getElementById('admin-banner');
//     const body = document.body;
    
//     if (adminBanner) {
//         adminBanner.style.display = 'none'; // Hide the banner
//         body.classList.remove('with-banner'); // Remove class from body
//     } else {
//         console.error('Element with id "admin-banner" not found');
//     }
// }

// Handling the login form
document.addEventListener('DOMContentLoaded', () => {
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const form = document.querySelector('form');
    const loginButton = document.getElementById('login-button');
    // const navLog = document.getElementById('nav-log');
    
    function validateEmail(email) {
        let emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\.[a-z0-9._-]+") 
        return emailRegExp.test(email);  
    }

    function validatePassword(password) {
        let passwordRegExp = new RegExp("[a-z0-9._-]+") 
        return passwordRegExp.test(password);
    }
    
    // Getting the values from the form
    function getFormValues() {
        return {
            email: emailInput.value,
            password: passwordInput.value
        };
    }

    //for form key submission
    function handleFormSubmission(event) {
        event.preventDefault();
        const { email, password } = getFormValues();

     // Validating the email and password fields
        if(validateEmail(email) && validatePassword(password)) {
            console.log('Champs correctement remplis')
        } else {
            console.log('Erreur')
        }
    }   
 
    async function handleLoginClick(event) {
        event.preventDefault();
        const { email, password } = getFormValues();
        const user = { email, password };

        try {
            // Sending a POST request for authentication
            const response = await fetch("http://localhost:5678/api/users/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'application/json'
                },
                body: JSON.stringify(user)
            });

            console.log('HTTP Status Code:', response.status);
            console.log('Response Headers:', response.headers);
            
            // Checking the API response
            if (response.ok) {
                const data = await response.json();
                console.log('API Response:', data);              

                // Saving the token in local storage
                localStorage.setItem('token', data.token); 
                
                // Add the admin link
                addAdminLink();
                
                // Redirecting to index.html after successful authentication
                window.location.href = 'index.html';                        
            
            } else {
                console.log('API call failed with status:', response.status);
                displayErrorMessage('Échec de l\'authentification. Veuillez vérifier vos identifiants.');
            }
        } catch (error) {
            console.log('Authentification failed', error);
            displayErrorMessage('Une erreur est survenue lors de l\'authentification. Veuillez réessayer.');
        } 
    };    
    // Function to display error message
    function displayErrorMessage(message) {
        const errorMessageDiv = document.getElementById('error-message');
        errorMessageDiv.textContent = message;
        errorMessageDiv.style.display = 'block';
    }

form.addEventListener('submit', handleFormSubmission);
loginButton.addEventListener('click', handleLoginClick);

    // emailInput.addEventListener('change', (event) => {
    //     const idValue = event.target.value;
    //     console.log(idValue === "" ? 'Le champ email est vide' : 'Le champ email est rempli');
    // });

    // passwordInput.addEventListener('change', (event) => {
    //     const passwordValue = event.target.value;
    //     console.log(passwordValue === "" ? 'Le champ mdp est vide' : 'Le champ mdp est rempli');
    // });

});
