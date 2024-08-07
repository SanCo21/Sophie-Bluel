// // Disable automatic page refresh
// window.addEventListener('beforeunload', function (event) {
//     // Prevent the page from reloading
//     console.log('empeche le rechargement')
//     event.preventDefault();
// });

// const form = document.querySelector('form');
// form.addEventListener("submit", (event) => {
//     event.preventDefault();
// })



// document.addEventListener('DOMContentLoaded', () => {
    function addAdminLink() {
        const adminLink = document.getElementById('admin-link');
        if (adminLink) { 
            adminLink.innerHTML = '<a href="modal1"><i class="fa-regular fa-pen-to-square"></i>modifier</a>';
            adminLink.style.display = 'block';
        } else {
            console.error('Element with id "admin-link" not found');
        }
    }

    const token = localStorage.getItem('token');
    if (token) {
        addAdminLink();
    }
// });


// // Checking if the user is logged in when the page loads
// window.addEventListener('load', () => {
//     console.log('Window load event triggered');
//     const token = localStorage.getItem('token');
//     console.log('Token from local storage: ', token);
//     if (token) {
//         // Adding the admin link if the user is logged in
//         addAdminLink();
//     }
// });

document.addEventListener('DOMContentLoaded', () => {
    // Get the modal
    const modal = document.getElementById("admin-modal");

    // Get the link that opens the modal
    const adminLink = document.getElementById("admin-link");

    // Get the <span> element that closes the modal
    const span = document.querySelector(".close");

    // When the user clicks on the link, check authentication before opening the modal
    adminLink.onclick = function(event) {
        event.preventDefault();
        const token = localStorage.getItem('token');
        if (token) {
            modal.style.display = "block";
        } else {
            alert('Vous devez être connecté pour accéder aux modifications.');
        }
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // Function to add the admin link
    function addAdminLink() {
        const adminLinkSpan = document.getElementById('admin-link');
        if (adminLinkSpan) { 
            adminLinkSpan.style.display = 'block';
        } else {
            console.error('Element with id "admin-link" not found');
        }
    }

    // Check if the user is logged in when the page loads
    const token = localStorage.getItem('token');
    if (token) {
        addAdminLink();
    }
});
