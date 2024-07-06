const topics = ['introduction', 'arrays and slices', 'loops', 'maps', 'structs', 'pointers', 'stringer'];

$(document).ready(function() {

let mobileNavBars = ""
let desktopNavBars = ""
for(const topic of topics) {
    desktopNavBars+= `<li class="nav-item"><a class="nav-link" href="#" data-file="./assets/notes/${topic}.html" id="${topic}-link">${topic.toLocaleUpperCase()}</a></li>`;
    mobileNavBars+= `<li class="nav-item"><a class="nav-link" href="#" data-file="./assets/notes/${topic}.html" id="mobile-${topic}-link">${topic.toLocaleUpperCase()}</a></li>`;
}
document.getElementById('desktop-nav').innerHTML = desktopNavBars;
document.getElementById('mobile-nav').innerHTML = mobileNavBars;

const links = document.querySelectorAll('.nav-link');
    
links.forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        const file = this.getAttribute('data-file');
        loadContent(file);
        setActiveLink(this);
    });
});

// async function loadContent(file) {
//     // import(file)
//     const { htmlContent } = await import(file);
//     const dynamicContentDiv = document.getElementById('content');
//     dynamicContentDiv.innerHTML = htmlContent;
//     // document.getElementById('content').innerHTML = `<object type="text/html" data="${file}" style="width: 100%; height: 100%; border: none;"></object>`;
//     // document.getElementById('content').innerHTML = `<iframe src= ${file} class="w-100 h-100 mt-3" style="border: none;"></iframe>`;
// }
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
    links.forEach(link => {
        link.classList.remove('active');
    });
    element.classList.add('active');
}

// Load default content
loadContent('./assets/notes/introduction.html');
setActiveLink(links[0]);

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
      console.log('Service Worker registered with scope:', registration.scope);
    }).catch(function(error) {
      console.log('Service Worker registration failed:', error);
    });
  }
  
});
