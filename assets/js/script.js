'use strict'

// add Event on multiple elements

const addEventOnElements = function(elements, eventType, callBack) {
    for (let i = 0; i < elements.length; i++) {
        elements[i].addEventListener(eventType, callBack);
    }
}

// PRELOADING

const loadingElement = document.querySelector("[data-loading]");

window.addEventListener("load", function() {
    loadingElement.classList.add("loaded");
    this.document.body.classList.remove("active");
});


// MOBILE NAV TOGGLE

const [navTogglers, navLinks, navbar, overlay] = [
    document.querySelectorAll("[data-nav-toggler]"),
    document.querySelectorAll("[data-nav-link]"),
    document.querySelector("[data-navbar]"),
    document.querySelector("[data-overlay]")
];

const toggleNav = function() {
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.classList.toggle("active");
}

addEventOnElements(navTogglers, "click", toggleNav);

const closeNav = function() {
    navbar.classList.remove("active");
    overlay.classList.remove("active");
    document.body.classList.remove("active");
}

addEventOnElements(navLinks, "click", closeNav)

// HEADER

const header = document.querySelector("[data-header]");

const activeElementOnScroll = function() {
    if (window.scrollY > 50) {
        header.classList.add("active");
    } else {
        header.classList.remove("active");
    }
}

window.addEventListener("scroll", activeElementOnScroll);



/*
!     TEXT ANIMATION EFFECT FOR HERO SECTION
*/

const letterBoxes = document.querySelectorAll("[data-letter-effect]");

let activeLetterBoxIndex = 0;
let lastActiveLetterBoxIndex = 0;
let totalLetterBoxDelay = 0;

const setLetterEffect = function() {

    // loop through all letter boxes
    for (let i = 0; i < letterBoxes.length; i++) {
        // set Initial animation delay
        let letterAnimationDelay = 0;

        // Get all character from the current letter box
        const letters = letterBoxes[i].textContent.trim();
        // remove all character from the current letter box
        letterBoxes[i].textContent = "";

        // loop through all letters
        for (let j = 0; j < letters.length; j++) {

            // create a span 
            const span = document.createElement("span");

            // set animation delay on span
            span.style.animationDelay = `${letterAnimationDelay}s`;

            // set the "in" class on the span, if current letter box is active
            // otherwise class is "out" 
            if (i === activeLetterBoxIndex) {
                span.classList.add("in");
            } else {
                span.classList.add("out");
            }

            // pass current letter into span
            span.textContent = letters[j];

            // add space class in span, when current letter contain space
            if (letters[j] == " ") {
                span.classList.add("space");
            }

            // pass the span on current letter box
            letterBoxes[i].appendChild(span);

            // skip letterAnimationDelay when loop is in the last index
            if (j >= letterAnimationDelay.length - 1) {
                break;
            }

            // otherwise update
            letterAnimationDelay += 0.05;

        }

        // get total delay of active of active letter box
        if (i === activeLetterBoxIndex) {
            totalLetterBoxDelay = Number(letterAnimationDelay.toFixed(2));
        }

        // add active class on last active letter box
        if (i == lastActiveLetterBoxIndex) {
            letterBoxes[i].classList.add("active");
        } else {
            letterBoxes[i].classList.remove("active");
        }

    }

    setTimeout(function() {
        lastActiveLetterBoxIndex = activeLetterBoxIndex;

        // update activeLetterBoxIndex boxed on total letter boxes
        activeLetterBoxIndex >= letterBoxes.length - 1 ? activeLetterBoxIndex = 0 : activeLetterBoxIndex++;

        setLetterEffect();

    }, (totalLetterBoxDelay * 1000) + 3000);

}

// call the letter effect function after window loaded
window.addEventListener("load", setLetterEffect);




/*
! BACK TO TOP
*/

const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", function() {
    const bodyHeight = this.document.body.scrollHeight;
    const windowHeight = this.window.innerHeight;
    const scrollEndPos = bodyHeight - windowHeight;
    const totalScrollPercent = (this.window.scrollY / scrollEndPos) * 100;

    backTopBtn.textContent = `${totalScrollPercent.toFixed(0)}%`;

    // visible back top btn when scrolled 5% of the page
    if (totalScrollPercent > 5) {
        backTopBtn.classList.add("show");
    } else {
        backTopBtn.classList.remove("show");
    }
});





/*
! SCROLL REVEAL
*/

const revealElements = document.querySelectorAll("[data-reveal]");

const scrollReveal = function() {
    for (let i = 0; i < revealElements.length; i++) {
        const elementIsInScreen = revealElements[i].getBoundingClientRect().top < window.innerHeight / 1.15;

        if (elementIsInScreen) {
            revealElements[i].classList.add("revealed");
        } else {
            revealElements[i].classList.remove("revealed");
        }
    }
}

window.addEventListener("scroll", scrollReveal);

scrollReveal();



/*
! CUSTOM CURSER
*/

const cursor = document.querySelector("[data-cursor]");
const anchorElements = document.querySelectorAll("a");
const buttons = document.querySelectorAll("button");

// change cursorElements position based on cursor move
document.body.addEventListener("mousemove", function(events) {

    setTimeout(function() {
        cursor.style.top = `${events.clientY}px`;
        cursor.style.left = `${events.clientX}px`;
    }, 100);

});

// add cursor hovered class
const hoverActive = function() {
    cursor.classList.add("hovered");
}


// remove cursor hovered class
const hoverInactive = function() {
    cursor.classList.remove("hovered");
}

// add hover effect on curser, when hover on any button or hyperLine

addEventOnElements(anchorElements, "mouseover", hoverActive)
addEventOnElements(anchorElements, "mouseout", hoverInactive)
addEventOnElements(buttons, "mouseover", hoverActive)
addEventOnElements(buttons, "mouseout", hoverInactive)

// add disabled class on cursorElement, when mouse out of the body
document.body.addEventListener("mouseout", function() {
    cursor.classList.add("disabled");
});

// remove disabled class in cursorElement, when mouse in the body
document.body.addEventListener("mouseover", function() {
    cursor.classList.remove("disabled");
});
// Add this at the end of your existing script.js file

/*
! IMAGE MODAL AND CONTACT FORM FUNCTIONALITY
*/

document.addEventListener('DOMContentLoaded', function() {
    // Image Modal Functionality
    const galleryCards = document.querySelectorAll('[data-modal-image]');
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalSubtitle = document.getElementById('modalSubtitle');
    const modalClose = document.querySelector('#imageModal .modal-close');

    // For each gallery card, add click event to open modal
    galleryCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // If clicked on a link inside the card, don't open modal
            if (e.target.tagName === 'A' || e.target.closest('a')) {
                return;
            }

            // Prevent default behavior
            e.preventDefault();

            // Get image source, title and subtitle from data attributes
            const imgSrc = this.getAttribute('data-modal-image');
            const title = this.getAttribute('data-modal-title');
            const subtitle = this.getAttribute('data-modal-subtitle');

            // Set modal content and preload image
            const preloadImg = new Image();
            preloadImg.src = imgSrc;
            preloadImg.onload = function() {
                // Image loaded, now show the modal
                modalImage.src = imgSrc;
                modalImage.alt = title;
                modalTitle.textContent = title;
                modalSubtitle.textContent = subtitle;

                // Show modal with animation
                modal.classList.add('show');
                setTimeout(() => {
                    modal.querySelector('.modal-content').style.opacity = '1';
                }, 50);

                // Disable scrolling on body
                document.body.style.overflow = 'hidden';
            };
        });
    });

    // Close modal when clicking on close button
    modalClose.addEventListener('click', function() {
        closeImageModal();
    });

    // Close modal when clicking outside of modal content
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeImageModal();
        }
    });

    // Close modal when pressing ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeImageModal();
        }
    });

    // Function to close image modal
    function closeImageModal() {
        const modalContent = modal.querySelector('.modal-content');
        modalContent.style.opacity = '0';
        modalContent.style.transform = 'translateY(50px)';

        setTimeout(() => {
            modal.classList.remove('show');
            document.body.style.overflow = '';
            // Reset transform after animation completes
            setTimeout(() => {
                modalContent.style.transform = '';
            }, 300);
        }, 300);
    }

    // Contact Modal Functionality
    const contactModal = document.getElementById('contactModal');
    const openContactBtn = document.getElementById('openContactModal');
    const closeContactBtn = document.getElementById('closeContactModal');

    // Open contact modal
    openContactBtn.addEventListener('click', function() {
        contactModal.classList.add('show');
        setTimeout(() => {
            contactModal.querySelector('.modal-content').style.opacity = '1';
        }, 50);

        document.body.style.overflow = 'hidden';
    });

    // Close contact modal
    closeContactBtn.addEventListener('click', function() {
        closeContactModal();
    });

    // Close when clicking outside
    contactModal.addEventListener('click', function(e) {
        if (e.target === contactModal) {
            closeContactModal();
        }
    });

    // Close when pressing ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && contactModal.classList.contains('show')) {
            closeContactModal();
        }
    });

    // Function to close contact modal
    function closeContactModal() {
        const modalContent = contactModal.querySelector('.modal-content');
        modalContent.style.opacity = '0';
        modalContent.style.transform = 'translateY(50px)';

        setTimeout(() => {
            contactModal.classList.remove('show');
            document.body.style.overflow = '';
            // Reset transform after animation completes
            setTimeout(() => {
                modalContent.style.transform = '';
            }, 300);
        }, 300);
    }
});

// Contact Form Submission
function submitContactForm(event) {
    event.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // In a real implementation, you would send these values to a server
    // For example, using the Fetch API:
    /*
    fetch('https://your-form-endpoint.com', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, subject, message })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        showFormSuccess();
    })
    .catch(error => {
        console.error('Error:', error);
    });
    */

    // For now, just log the values and show success message
    console.log('Form submitted with values:', { name, email, subject, message });

    // Show success message
    document.getElementById('formSuccess').classList.add('show');

    // Reset form
    document.getElementById('contactForm').reset();

    // Hide success message after 5 seconds
    setTimeout(() => {
        document.getElementById('formSuccess').classList.remove('show');
    }, 5000);
}