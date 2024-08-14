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


export async function loginUser(email, password) {
    const user = { email, password };

    try {
        const response = await fetch("http://localhost:5678/api/users/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        console.log('HTTP Status Code:', response.status);
        console.log('Response Headers:', response.headers);

        if (response.ok) {
            const data = await response.json();
            console.log('API Response:', data);
            return data;
        } else {
            console.log('API call failed with status:', response.status);
            throw new Error('Échec de l\'authentification');
        }
    } catch (error) {
        console.log('Authentification failed', error);
        throw error;
    }
}


// Deleting the works
export const deletePhoto = async (workId) => {
    const token = localStorage.getItem('token');
    console.log('Token récupéré:', token); 

    if (!token) {
        console.error('Aucun token trouvé dans le local storage.');
        alert('Vous devez être authentifié pour supprimer un projet.');
        return Promise.reject('Aucun token trouvé');
    }

    try {
        const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`, 
                'Content-Type': 'application/json'
            }
        });
        console.log('Réponse de l\'API:', response);

        if (response.status === 204) {
            return;
        }

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Erreur lors de la suppression du projet:', errorText);
            throw new Error('Erreur lors de la suppression du projet.');
        }

        return await response.json();
    } catch (error) {
        console.error('Erreur lors de la requête:', error);
        throw error; // Error will be catch in setupDeleteIcon
    }
};


// Adding a new work
export async function uploadImage(formData) {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Vous devez être connecté pour télécharger une image.');
        return;
    }

    try {
        const response = await fetch("http://localhost:5678/api/works", {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                // 'Content-Type': 'multipart/form-data',
                // 'Accept': "application/json"
            },
            body: formData
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Erreur lors du téléchargement de l\'image:', errorText);
            throw new Error('Erreur d\'authentification');
        }

        const data = await response.json();
        console.log('Réponse de l\'API:', data);          
        alert('Image téléchargée avec succès !');
        return data       
        
    } catch (error) {
        console.error('Error:', error);
        alert('Une erreur s\'est produite pendant le téléchargement de l\'image.');
        throw error;
    }
}