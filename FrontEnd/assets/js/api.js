// Getting the works
export async function fetchWorks() {
    try {
        const response = await fetch("http://localhost:5678/api/works");
        if (!response.ok) {
            throw new Error('Erreur:' + response.status);
        }
        const works = await response.json(); 
        return works; //return the data    
    
    } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
    }
  }
  

// Getting the categories
export async function fetchCategories() {
  try {
    const response = await fetch("http://localhost:5678/api/categories");
    if (!response.ok) {
        throw new Error('Erreur : ' + response.status);
    }
    const categories = await response.json();   
    return categories; //return the data

  } catch (error) {
      console.error('Erreur lors de la récupération des catégories :', error);
  }
}

