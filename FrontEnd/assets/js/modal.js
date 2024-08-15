import { deletePhoto, fetchCategories, uploadImage } from './api.js';
import { displayWorks, resetGallery } from './home.js';

// document.addEventListener('DOMContentLoaded', () => {
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
    resetPreview();
}

// When the user clicks on <span> (x), close the modals
closeButtons.forEach(button => {
    button.onclick = function() {
        adminModal.style.display = "none";
        photoModal.style.display = "none";
        overlay.style.display = "none";
        resetPreview();
    }
});

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == adminModal || event.target == photoModal || event.target === overlay) {
        adminModal.style.display = "none";
        photoModal.style.display = "none";
        overlay.style.display = "none";
        resetPreview();
    }
}


// Adding the categories in the drop-down list
const selectElement = document.getElementById('category');

async function categoriesDropList() {        
    try {
        const categories = await fetchCategories();
        
        // Reseting the existing categories
        selectElement.innerHTML = '<option value="" selected disabled hidden></option>';

        // Adding the new categories
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.textContent = category.name;
            selectElement.appendChild(option);
        });
    } catch (error) {
        console.error('Error adding categories to select:', error);
    }
}

categoriesDropList();


const fileInput = document.getElementById('photo-upload');
const preview = document.getElementById('preview');
// const fileName = document.getElementById('file-name');
const photoButton = document.getElementById('photo-button');
const uploadText = document.querySelector('.upload p');
const validateButton = document.getElementById('validate');
const titleInput = document.getElementById('title');
const categoryInput = document.getElementById('category');

photoButton.addEventListener('click', () => {    
    console.log('photoButton clicked');
    fileInput.click(); // Triggering the file input click
    event.preventDefault();
});

let imageCounter = 0;
function generateUniqueId() {
    return imageCounter++;
}

function handleFileChange() {
    console.log('handleFileChange called');
    console.log('Photo input files on change:', fileInput.files);

    const file = fileInput.files[0]; 

    if (!file) {
        console.log('No file selected');
        resetPreview();
        return;
    }

    // Checking the file type
    const validTypes = ['image/jpeg', 'image/png'];
    if (!validTypes.includes(file.type)) {
        alert('Merci de sélectionner un fichier JPG ou PNG.');
        resetFileInput();
        return;
    }

    // Checking the file size (4MB = 4 * 1024 * 1024 bytes)
    const maxSize = 4 * 1024 * 1024;
    if (file.size > maxSize) {
        alert('Le fichier doit être inférieur à 4mo.');
        resetFileInput();
        return;
    }

    // Reading and displaying the image
    const reader = new FileReader();
    reader.onload = (e) => {
        const uniqueId = generateUniqueId(); // Generating a unique ID
        preview.id = uniqueId; // Assigning the unique ID to the preview image
        preview.src = e.target.result;
        preview.style.display = 'block';
        photoButton.style.display = 'none'; // Hiding the button
        uploadText.style.display = 'none'; // Hiding the text
    }
    reader.readAsDataURL(file);

    checkFormFields(); // Checking form fields after file selection
}

fileInput.addEventListener('change', handleFileChange);

// function resetFileInput() {
//     fileInput.removeEventListener('change', handleFileChange); // Disconnecting the event
//     fileInput.value = ''; // Clearing the input
//     fileInput.addEventListener('change', handleFileChange); // Reconnecting the event
// }

const checkFormFields = () => {
    const allFieldsFilled = fileInput.value && titleInput.value && categoryInput.value;
    validateButton.disabled = !allFieldsFilled;
};

checkFormFields();

titleInput.addEventListener('input', checkFormFields);
categoryInput.addEventListener('input', checkFormFields);

validateButton.addEventListener('click', async function(event) {
    event.preventDefault();

    const formData = new FormData();
    const uniqueId = generateUniqueId();

    formData.append('id', uniqueId); // Adding unique ID
    formData.append('title', titleInput.value);
    formData.append('category', parseInt(categoryInput.value));

    const file = fileInput.files[0];
    if (file) {
        formData.append('image', file);
    } else {
        console.error('Aucun fichier image sélectionné');
        alert('Veuillez sélectionner une image à télécharger.');
        return;
    }

    console.log('ID:', uniqueId);
    console.log('Title:', titleInput.value);
    console.log('Category:', parseInt(categoryInput.value));
    console.log('User ID:', localStorage.getItem('userId'));
    console.log('Image File:', file);

    try {
        await uploadImage(formData); // Waiting for the image to be downloaded
        // alert('Image téléchargée avec succès !');
        document.getElementById('photo-modal').style.display = "none";
        document.getElementById('overlay').style.display = "none";

        // Selecting and initialize the div for the works
        resetGallery();

        resetFileInput();

        // Updating the galleries
        await displayWorks();

    } catch (error) {
        console.error('Erreur lors du téléchargement de l\'image:', error);
        resetFileInput();
    }
});
    


function resetFileInput() {
    fileInput.value = ''; // Reset the input
    resetPreview();
}

function resetPreview() {
    preview.src = '';
    preview.id = ''; // Clearing the ID
    preview.style.display = 'none';    
    photoButton.style.display = 'flex';
    uploadText.style.display = 'block';
    // fileInput.value = '';                
}


export const setupDeleteIcon = (deleteIcon, modalCard) => {

    deleteIcon.onclick = async () => {
        const workId = modalCard.getAttribute('work-id'); // photo ID is stocked in the attribute of the modalCard element
        console.log('workId récupéré:', workId);

        if (workId) {
            try {
                const response = await deletePhoto(workId);
                console.log('Réponse du serveur:', response);        
                // alert('Projet supprimé avec succès.');
                // modalCard.remove();

                // Selecting and initialize the div for the works
                resetGallery();

                // Updating the gallery after deleting
                await displayWorks();

            } catch(error) {
                console.error('Erreur:', error);
                alert('Erreur lors de la suppression du projet.');
            }

        } else {
            alert('Aucun projet à supprimer.');
        }
    };
};          


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