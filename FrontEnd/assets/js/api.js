// Disable automatic page refresh
// window.addEventListener('beforeunload', function (event) {
//     // Prevent the page from reloading
//     event.preventDefault();
// });

// Getting the works
async function fetchWorks() {
    try {
        const response = await fetch("http://localhost:5678/api/works");
        if (!response.ok) {
            throw new Error('Erreur:' + response.status);
        }
        const works = await response.json();
  
        // Selecting and initialize the div for the works
        const gallery = document.querySelector(".gallery");
        const modalGallery = document.querySelector('.modal-gallery');
        gallery.innerHTML = "";
        modalGallery.innerHTML = "";
  
        // Creating the works from the API data
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

            // cardCategory.innerText = work.category.id;
  
            // Connecting the elements img and title to their parent card
            card.appendChild(cardImg);
            card.appendChild(cardCaption);
            card.appendChild(cardCategory);
  
            // Connecting the card to the gallery div tag
            gallery.appendChild(card);

            // Cloning the img ekement for the modal gallery
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
    
    } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
    }
  }
  
  // Calling the fetchWorks function
  fetchWorks();
  


// Getting the data Categories
async function fetchCategories() {
  try {
    const response = await fetch("http://localhost:5678/api/categories");
    if (!response.ok) {
        throw new Error('Erreur : ' + response.status);
    }
    const categories = await response.json();
    console.log(categories);

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
    
       // For "Tous" filter - reset diplay 
        allFilters.addEventListener('click', function () {
            // Selecting all the images in the gallery
            document.querySelectorAll('.gallery img').forEach(image => {
            // Changing display to "block" for all items
            image.parentElement.style.display = 'block';
            });
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
        
  } catch (error) {
      console.error('Erreur lors de la récupération des catégories :', error);
  }
}

// Calling the fetchCategories function
fetchCategories();

