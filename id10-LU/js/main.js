const toggleBtn = document.getElementById('toggle-btn')
const navbar = document.getElementById('navbar')

function toggleSideBar(){
    navbar.classList.toggle('close')
    toggleBtn.classList.toggle('rotate')
}

document.getElementById('toggle-btn').addEventListener('click', function() {
    var navbar = document.getElementById('navbar');
    navbar.classList.toggle('open');
});


// particles.js
document.addEventListener('DOMContentLoaded', function () {
    if (typeof particlesJS !== 'undefined') {
        particlesJS("particles-js", {
            particles: {
                number: {
                    value: 10,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: "#000000" // Black particles
                },
                shape: {
                    type: "circle",
                },
                size: {
                    value: 5,
                    random: true,
                    anim: {
                        speed: 3,
                        size_min: 2
                    }
                },
                opacity: {
                    value: 0.7,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0
                    }
                },
                line_linked: {
                    enable: false // No lines between particles
                }
            },
            interactivity: {
                events: {
                    onhover: {
                        enable: true,
                        mode: "repulse"
                    }
                },
                modes: {
                    repulse: {
                        distance: 100,
                        duration: 0.5
                    }
                }
            },
            retina_detect: true
        });
    } else {
        console.error("particles.js library is not loaded correctly.");
    }
});
