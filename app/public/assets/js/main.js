const topics = ['introduction', 'arrays and slices', 'loops', 'maps', 'structs', 'pointers', "Receiver Functions", "interfaces", 'stringer', "channels", "Go routines", "More about channels", "keywords", "More topics", "Golang Code Examples"];

$(document).ready(function() {
    const navbarMenu = document.getElementById('navbarMenu');
    const navLinks = document.querySelectorAll('.topics-mobile');

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // alert("click")
            if (navbarMenu.classList.contains('show')) {
                bootstrap.Collapse.getInstance(navbarMenu).hide();
            }
        });
    });


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
    setTimeout(function() {
        if (navbarMenu.classList.contains('show')) {
            bootstrap.Collapse.getInstance(navbarMenu).hide();
        }
    },200)
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

const mybutton = document.getElementById("scrollToTopBtn");

window.onscroll = () => {
    mybutton.style.display = (document.documentElement.scrollTop > 350) ? "block" : "none";
};

mybutton.onclick = () => {
    document.documentElement.scrollTop = 0;
};

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js').then(function(registration) {
        registration.onupdatefound = function() {
            var installingWorker = registration.installing;
            installingWorker.onstatechange = function() {
                if (installingWorker.state === 'installed') {
                    if (navigator.serviceWorker.controller) {
                        if(confirm('New content is available; please refresh.')) {
                            window.location.reload();
                        }
                        console.log('New content is available; please refresh.');
                    } else {
                        console.log('Content is cached for offline use.');
                    }
                }
            };
        }
      console.log('Service Worker registered with scope:', registration.scope);
    }).catch(function(error) {
      console.log('Service Worker registration failed:', error);
    });
  }
  
});
