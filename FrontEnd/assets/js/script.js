// Getting the current page URL
const currentPage = window.location.pathname;

// Mapping between URLs and nav link IDs
const navLinks = {
    '/index.html': 'nav-home',
    '/login.html': 'nav-login',
    '/contact.html': 'nav-contact'
};

// Getting the ID of the nav link for the current page
const currentNavLinkId = navLinks[currentPage];

// Matching nav link : 'active' class added
if (currentNavLinkId) {
    document.getElementById(currentNavLinkId).classList.add('active');
}