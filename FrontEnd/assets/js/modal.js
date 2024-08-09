document.addEventListener('DOMContentLoaded', () => {
    // Get the modal
    const adminModal = document.getElementById("admin-modal");
    const photoModal = document.getElementById("photo-modal");
    const overlay =document.getElementById("overlay")

    // Get the link that opens the modal
    const adminLink = document.getElementById("admin-link");

    // Get the <span> elements that closes the modal
    const closeButtons = document.querySelectorAll(".close");

    // Get the back button
    const backArrow = document.getElementById("back-arrow");

    // When the user clicks on the link, check authentication before opening the modal
    adminLink.onclick = function(event) {
        event.preventDefault();
        const token = localStorage.getItem('token');
        if (token) {
            adminModal.style.display = "block";
            overlay.style.display = "block";
        } else {
            alert('Vous devez être connecté pour accéder aux modifications.');
        }
    }

     // When the user clicks on "Ajouter une photo", open the photo modal
     document.getElementById('add-photo').onclick = function() {
        adminModal.style.display = "none";
        photoModal.style.display = "block";
    }

     // When the user clicks on the back button, return to the admin modal
     backArrow.onclick = function() {
        photoModal.style.display = "none";
        adminModal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modals
    closeButtons.forEach(button => {
        button.onclick = function() {
            adminModal.style.display = "none";
            photoModal.style.display = "none";
            overlay.style.display = "none";
        }
    });

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == adminModal || event.target == photoModal || event.target === overlay) {
            adminModal.style.display = "none";
            photoModal.style.display = "none";
            overlay.style.display = "none";
        }
    }

});
