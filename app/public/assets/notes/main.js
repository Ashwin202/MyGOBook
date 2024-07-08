const topics = ['introduction', 'arrays and slices', 'loops', 'maps', 'structs', 'pointers', 'stringer', "channels", "Go routines", "Golang Code Examples"];

$(document).ready(function() {

let mobileNavBars = ""
let desktopNavBars = ""
for(const topic of topics) {
    desktopNavBars+= `<li class="nav-item"><a class="nav-link" href="#" data-file="./assets/notes/${topic}.html" id="${topic}-link">${topic.toLocaleUpperCase()}</a></li>`;
    mobileNavBars+= `<li class="nav-item"><a class="nav-link topics-mobile" href="#" data-file="./assets/notes/${topic}.html" id="mobile-${topic}-link">${topic.toLocaleUpperCase()}</a></li>`;
}
document.getElementById('desktop-nav').innerHTML = desktopNavBars;
document.getElementById('mobile-nav').innerHTML = mobileNavBars;

const links = document.querySelectorAll('.nav-link');
const mobileLinks = document.querySelectorAll('.topics-mobile');
    
links.forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        const file = this.getAttribute('data-file');
        loadContent(file);
        setActiveLink(this);
        setTimeout(function() {
            hljs.highlightAll();
        }, 500)
    });
});

function loadContent(file) {
    fetch(file)
        .then(response => response.text())
        .then(data => {
            document.getElementById('content').innerHTML = data;
        })
        .catch(error => {
            console.error('Error loading content:', error);
        });
}

function setActiveLink(element) {
    console.log({element});
    links.forEach(link => {
        link.classList.remove('active');
    });
    element.classList.add('active');
}

// Load default content
loadContent('./assets/notes/introduction.html');
//check if mobile
if(window.innerWidth < 768) {
    setActiveLink(mobileLinks[0]);
}
else{
setActiveLink(links[0]);
}


if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
      console.log('Service Worker registered with scope:', registration.scope);
    }).catch(function(error) {
      console.log('Service Worker registration failed:', error);
    });
  }
  
});
