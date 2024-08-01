// Get the data works
async function fetchAPI() {
  try {
      const response = await fetch("http://localhost:5678/api/works");
      if (!response.ok) {
          throw new Error('Erreur:' + response.status);
      }
      const data = await response.json();

      // div for the works
      const gallery = document.querySelector(".gallery");
      gallery.innerHTML = "";

      // To create the works from the API data
      data.forEach((work) => {
          // To create the elements to show the works
          const card = document.createElement("figure");
          const cardImg = document.createElement("img");
          const cardTitle = document.createElement("figcaption");

          // To get the important data to show the works
          cardImg.src = work.imageUrl;
          cardImg.alt = work.title;
          cardImg.setAttribute('data-category', work.categoryId);
          cardTitle.innerText = work.title;

          // To connect the elements img and title to their parent card
          card.appendChild(cardImg);
          card.appendChild(cardTitle);

          // To connect the card to the gallery div tag
          gallery.appendChild(card);
      });
  } catch (error) {
      console.error('Erreur lors de la récupération des données :', error);
  }
}

// To call the fetchAPI function
fetchAPI();
