// Getting the current page URL
const currentPage = window.location.pathname;

// Mapping between URLs and nav link IDs
const navLinks = {
    '/index.html': 'nav-home',
    '/login.html': 'nav-log',
    '/contact.html': 'nav-contact'
};

// Getting the ID of the nav link for the current page
const currentNavLinkId = navLinks[currentPage];

// Matching nav link : 'active' class added
if (currentNavLinkId) {
    document.getElementById(currentNavLinkId).classList.add('active');
}

//Check if user is logged in and update nav link
const token = localStorage.getItem('token');
if (token) { 
    const navLog = document.getElementById('nav-log');
    if (navLog) {
        navLog.innerHTML = '<a href="#" id="logout">Logout</a>';
        navLog.addEventListener('click', () => {
            localStorage.removeItem('token');
            window.location.href = 'login.html';
            navLog.innerHTML = '<a href="login.html">Login</a>';
            
        });
    }
}