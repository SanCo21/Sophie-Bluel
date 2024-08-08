import { fetchWorks, fetchCategories } from './api.js';
import { addAdminLink } from './login.js';

// Selecting and initialize the div for the works
const gallery = document.querySelector(".gallery");
const modalGallery = document.querySelector('.modal-gallery');
gallery.innerHTML = "";
modalGallery.innerHTML = "";

// Creating the works from the API data
async function displayWorks() {
    const works = await fetchWorks(); // Waiting for the response of fetchWorks function

    if (works) {
        works.forEach((work) => {
            // Creating the HTML elements to show the works
            const card = document.createElement("figure");
            const cardImg = document.createElement("img");
            const cardCaption = document.createElement("figcaption");
            const cardCategory = document.createElement("id");

            // Importing the works data
            cardImg.src = work.imageUrl;
            cardImg.alt = work.title;
            cardImg.setAttribute('category', work.categoryId);       
            cardCaption.innerText = work.title;

            // Connecting the elements img and title to their parent card
            card.appendChild(cardImg);
            card.appendChild(cardCaption);
            card.appendChild(cardCategory);

            // Connecting the card to the gallery div tag
            gallery.appendChild(card);

            // Cloning the img element for the modal gallery
            const modalCard = document.createElement("figure");
            const modalCardImg = cardImg.cloneNode(true);

            // Create delete icon container
            const deleteIconContainer = document.createElement("div");
            deleteIconContainer.className = "delete-icon-container";
        
            // Creating delete icon
            const deleteIcon = document.createElement("i");
            deleteIcon.className = "fa-solid fa-trash-can";
            deleteIcon.onclick = function() {
                modalCard.remove();
            };

            // Adding delete icon to its container
            deleteIconContainer.appendChild(deleteIcon);

            // Adding img and delete icon to the modal card
            modalCard.appendChild(modalCardImg);
            modalCard.appendChild(deleteIconContainer);
            modalGallery.appendChild(modalCard);
        });
    }
}

// Calling displayWorks function
displayWorks();


async function displayCategories() {
    const categories = await fetchCategories(); // Waiting for the response of fetchCategories function

    if (categories) {
        // Creating HTML elements for filters)
        const categoryList = document.querySelector(".filters");
            
        // Creating the element "allFilters"
        const allFilters = document.createElement('p');
        allFilters.textContent = 'Tous';
        allFilters.classList.add('filter-selected');
        categoryList.appendChild(allFilters);
  
        categories.forEach((category) => {
            const filter = document.createElement("p");            
            categoryList.appendChild(filter);
            filter.innerText = category.name;
            filter.id = category.id;   
        });

        // Listening for clicks on the filters buttons
        document.querySelectorAll('.filters p').forEach((filter) => {
            filter.addEventListener('click', () => {        
            const categoryId = filter.id; 
            filterWorks(categoryId);
            filter.classList.add('filter-selected');
            });
        });

        // For "Tous" filter
        allFilters.addEventListener('click', function () {
            // Selecting all the images in the gallery
            document.querySelectorAll('.gallery img').forEach(image => {
            // Changing display to "block" for all items
            image.parentElement.style.display = 'block';
            });
        }); 

        // Filtering the works
        function filterWorks(categoryId) {
            const allWorks = document.querySelectorAll('.gallery img');
            allWorks.forEach((image) => {
                if (image.getAttribute('category') === categoryId) {
                    image.parentElement.style.display = 'block'; // Showing the work if it matches the filter ID
                } else {
                    image.parentElement.style.display = 'none'; // // Hiding the work if it doesn't match the filter ID
                }
            });         
        
            // Updating the class of the selected filter
            document.querySelectorAll('.filters p').forEach((filter) => {
                if (filter.id === categoryId) {
                    filter.classList.add('filter-selected');
                } else {
                    filter.classList.remove('filter-selected'); // Removing the "filter-selected" class from other filters
                }
            });     
        }
    }
}    

// Calling displayCategories function
displayCategories();
        

const token = localStorage.getItem('token');
if (token) {
    addAdminLink();
}

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
    const overlay =document.getElementById("overlay")

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
            overlay.style.display = "block";
        } else {
            alert('Vous devez être connecté pour accéder aux modifications.');
        }
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
        overlay.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal || event.target === overlay) {
            modal.style.display = "none";
            overlay.style.display = "none";
        }
    }

    // // Function to add the admin link
    // function addAdminLink() {
    //     const adminLinkSpan = document.getElementById('admin-link');
    //     if (adminLinkSpan) { 
    //         adminLinkSpan.style.display = 'block';
    //     } else {
    //         console.error('Element with id "admin-link" not found');
    //     }
    // }

    // // Check if the user is logged in when the page loads
    // const token = localStorage.getItem('token');
    // if (token) {
    //     addAdminLink();
    // }
});
