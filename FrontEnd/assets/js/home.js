// // Disable automatic page refresh
// window.addEventListener('beforeunload', function (event) {
//     // Prevent the page from reloading
//     console.log('empeche le rechargement')
//     event.preventDefault();
// });

const form = document.querySelector('form');
form.addEventListener("submit", (event) => {
    event.preventDefault();
})