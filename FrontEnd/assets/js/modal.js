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

const fileInput = document.getElementById('photo-upload');
const preview = document.getElementById('preview');
// const fileName = document.getElementById('file-name');
const photoButton = document.getElementById('photo-button');
const uploadText = document.querySelector('.upload p');

photoButton.addEventListener('click', () => {    
    fileInput.click(); // Trigger the file input click
});


fileInput.addEventListener('change', () => {    
    const file = fileInput.files[0]; // Access the first (and only) file
    if (file) {
        // Check the file type
        const validTypes = ['image/jpeg', 'image/png'];
        if (!validTypes.includes(file.type)) {
            alert('Merci de sélectionner un fichier JPG ou PNG.');
            fileInput.value = '';
            return;
        }

        // Check the file size (4MB = 4 * 1024 * 1024 bytes)
        const maxSize = 4 * 1024 * 1024;
        if (file.size > maxSize) {
            // alert('Le fichier doit être inférieur à 4mo.');
            fileInput.value = '';
            return;
        }

        // Read and display the image
        const reader = new FileReader();
        reader.onload = (e) => {
            preview.src = e.target.result;
            preview.style.display = 'block';
            photoButton.style.display = 'none'; // Hide the button
            uploadText.style.display = 'none'; // Hide the text
        };
        reader.readAsDataURL(file);
        // fileName.textContent = file.name;
    } else {
        console.log('No file selected');
        preview.style.display = 'none';
        photoButton.style.display = 'flex'; // Show the button again
        uploadText.style.display = 'block'; // Show the text again
        // fileName.textContent = '';
    }

    // Reset the input
    fileInput.value = '';
});

// const dropZone = document.getElementById('drop-zone');
// const photoInput = document.getElementById('photo-upload');

// dropZone.addEventListener('dragover', (event) => {
//     event.preventDefault();
//     dropZone.classList.add('dragover');
// });

// dropZone.addEventListener('dragleave', () => {
//     dropZone.classList.remove('dragover');
// });

// dropZone.addEventListener('drop', (event) => {
//     event.preventDefault();
//     dropZone.classList.remove('dragover');
//     const files = event.dataTransfer.files;
//     if (files.length > 0) {
//         photoInput.files = files;
//     }
// });

// dropZone.addEventListener('click', () => {
//     photoInput.click();
// });

// photoInput.addEventListener('change', () => {
//     photoInput.addEventListener('change', () => {
//         const fileName = photoInput.files[0].name;
//         console.log(`Fichier sélectionné : ${fileName}`);
//     });
// });

// document.getElementById('validate').addEventListener('click', function(event) {
//     event.preventDefault();
//     const formData = new FormData(document.getElementById('modal-form'));
//     const photoInput = document.getElementById('photo-upload');
//     formData.append('photo', photoInput.files[0]);

//     fetch('http://localhost:5678/api/works', {
//         method: 'POST',
//         headers: {
//             'Authorization': `Bearer ${localStorage.getItem('token')}`
//         },
//         body: formData
//     })
//     .then(response => response.json())
//     .then(data => {
//         if (data.success) {
//             alert('Photo uploaded successfully!');
//             document.getElementById('photo-modal').style.display = "none";
//             document.getElementById('overlay').style.display = "none";
//         } else {
//             alert('Failed to upload photo.');
//         }
//     })
//     .catch(error => {
//         console.error('Error:', error);
//         alert('An error occurred while uploading the photo.');
//     });
// });
