// Disable automatic page refresh
// window.addEventListener('beforeunload', function (event) {
//     // Prevent the page from reloading
//     event.preventDefault();
// });

// Get the works
async function fetchWorks() {
    try {
        const response = await fetch("http://localhost:5678/api/works");
        if (!response.ok) {
            throw new Error('Erreur:' + response.status);
        }
        const works = await response.json();
  
        // Select and initialize the div for the works
        const gallery = document.querySelector(".gallery");
        gallery.innerHTML = "";
  
        // Create the works from the API data
        works.forEach((work) => {
            // Create the HTML elements to show the works
            const card = document.createElement("figure");
            const cardImg = document.createElement("img");
            const cardCaption = document.createElement("figcaption");
            const cardCategory = document.createElement("id");
  
            // Import the works data
            cardImg.src = work.imageUrl;
            cardImg.alt = work.title;
            cardImg.setAttribute('category', work.categoryId);       
            cardCaption.innerText = work.title;

            // cardCategory.innerText = work.category.id;
  
            // Connect the elements img and title to their parent card
            card.appendChild(cardImg);
            card.appendChild(cardCaption);
            card.appendChild(cardCategory);
  
            // Connect the card to the gallery div tag
            gallery.appendChild(card);
        });
    
    } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
    }
  }
  
  // Call the fetchWorks function
  fetchWorks();
  


// Get the data Categories
async function fetchCategories() {
  try {
    const response = await fetch("http://localhost:5678/api/categories");
    if (!response.ok) {
        throw new Error('Erreur : ' + response.status);
    }
    const categories = await response.json();
    console.log(categories);

    // Create HTML elements for filters)
    const categoryList = document.querySelector(".filters");
    
    // Create the element "allFilters"
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

    // Listen for clicks on the filters buttons
    document.querySelectorAll('.filters p').forEach((filter) => {
        filter.addEventListener('click', () => {        
        const categoryId = filter.id; 
        filterWorks(categoryId);
        filter.classList.add('filter-selected');
        });
    });
    
    // Filter works
    function filterWorks(categoryId) {
        const allWorks = document.querySelectorAll('.gallery img');
        allWorks.forEach((image) => {
            if (image.getAttribute('category') === categoryId) {
                image.parentElement.style.display = 'block'; // Show the work if it matches the filter ID
            } else {
                image.parentElement.style.display = 'none'; // // Hide the work if it doesn't match the filter ID
            }
        });

    //  // For "Tous" filter - reset display only if other filters are not selected
    //  if (categoryId === 'allFilters') {
    //     const otherFiltersSelected = document.querySelector('.filters p.filter-selected:not(allFilters)');
    //     if (!otherFiltersSelected) {
    //         // Select all the images in the gallery
    //         document.querySelectorAll('.gallery img').forEach(image => {
    //             // Change display to "block" for all items
    //             image.parentElement.style.display = 'block';
    //         });
    //     }
    // } else {
    //     // Update the class of the selected filter
    //     document.querySelectorAll('.filters p').forEach((filter) => {
    //         if (filter.id === categoryId) {
    //             filter.classList.add('filter-selected');
    //         } else {
    //             filter.classList.remove('filter-selected'); // Remove the "filter-selected" class from other filters
    //         }
    //     });
    // }

        

       // For "Tous" filter - reset diplay 
        allFilters.addEventListener('click', function () {
            // Select all the images in the gallery
            document.querySelectorAll('.gallery img').forEach(image => {
            // Change display to "block" for all items
            image.parentElement.style.display = 'block';
            });
        }); 
        
        // Update the class of the selected filter
        document.querySelectorAll('.filters p').forEach((filter) => {
            if (filter.id === categoryId) {
                filter.classList.add('filter-selected');
            } else {
                filter.classList.remove('filter-selected'); // Remove the "filter-selected" class from other filters
            }
        });     
    }
        
  } catch (error) {
      console.error('Erreur lors de la récupération des catégories :', error);
  }
}

// Call the fetchCategories function
fetchCategories();

