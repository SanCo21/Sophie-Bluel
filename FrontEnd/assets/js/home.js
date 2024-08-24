import { fetchWorks, fetchCategories } from './api.js';
import { addAdminLink } from './login.js';
import { setupDeleteIcon } from './modal.js';

const gallery = document.querySelector(".gallery");
const modalGallery = document.querySelector('.modal-gallery');

// Selecting and initialize the div for the works
export function resetGallery() {    
    gallery.innerHTML = "";
    modalGallery.innerHTML = "";
}

// Creating the works from the API data
export async function displayWorks() {
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

            // Setting the work-id attribute
            modalCard.setAttribute('work-id', work.id);

            // Creating delete icon container
            const deleteIconContainer = document.createElement("div");
            deleteIconContainer.className = "delete-icon-container";
        
            // Creating delete icon
            const deleteIcon = document.createElement("i");
            deleteIcon.className = "fa-solid fa-trash-can";
            setupDeleteIcon(deleteIcon, modalCard);   

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

export async function updateHomeGallery() {
    const works = await fetchWorks(); // Waiting for fetchWorks function

    if (works) {
        const homeGallery = document.querySelector('.gallery');
        homeGallery.innerHTML = ''; 

        works.forEach((work) => {
            
            const card = document.createElement("figure");
            const cardImg = document.createElement("img");
            const cardCaption = document.createElement("figcaption");

            cardImg.src = work.imageUrl;
            cardImg.alt = work.title;
            cardImg.setAttribute('category', work.categoryId);
            cardCaption.innerText = work.title;

            card.appendChild(cardImg);
            card.appendChild(cardCaption);

            homeGallery.appendChild(card);
        });

        await displayCategories();
    }
}

async function displayCategories() {
    const categories = await fetchCategories(); // Waiting for the response of fetchCategories function

    if (categories) {
        // Creating HTML elements for filters)
        const categoryList = document.querySelector(".filters");
        categoryList.innerHTML = ''; // Réinitialiser les filtres existants
            
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
