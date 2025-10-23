document.addEventListener('DOMContentLoaded', () => {

    const timeElement = document.querySelector('[data-testid="test-user-time"]');

    function updateTime() {
        if (timeElement) {
            timeElement.textContent = Date.now();
        }
    }

    setInterval(updateTime, 1000);

    updateTime();

});


document.addEventListener('DOMContentLoaded', () => {

    //Page Navigation Setup

    const pages = {
        profile: document.querySelector('[data-testid="test-profile-card"]'),
        about: document.getElementById('about-page'),
        contact: document.getElementById('contact-page')
    };

    const navButtons = {
        about: document.getElementById('nav-about'),
        contact: document.getElementById('nav-contact')
    };

    const backButtons = document.querySelectorAll('.back-button');

    function showPage(pageId) {
       
        for (const pageName in pages) {
            if (pages[pageName]) {
                pages[pageName].classList.add('hidden');
            }
        }
     
        if (pages[pageId]) {
            pages[pageId].classList.remove('hidden');
            window.scrollTo(0, 0); 
        }
    }


    if (navButtons.about) {
        navButtons.about.addEventListener('click', () => showPage('about'));
    }
    if (navButtons.contact) {
        navButtons.contact.addEventListener('click', () => showPage('contact'));
    }

    backButtons.forEach(button => {
        button.addEventListener('click', () => showPage('profile'));
    });


    // Contact Form Validation
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
     
        const inputs = {
            name: document.getElementById('contact-name'),
            email: document.getElementById('contact-email'),
            subject: document.getElementById('contact-subject'),
            message: document.getElementById('contact-message')
        };

        const errorMessages = {
            name: document.getElementById('error-name'),
            email: document.getElementById('error-email'),
            subject: document.getElementById('error-subject'),
            message: document.getElementById('error-message')
        };

        const successMessage = document.querySelector('[data-testid="test-contact-success"]');

    
        function showError(field, message) {
            if (errorMessages[field]) {
                errorMessages[field].textContent = message;
            }
            if (inputs[field]) {
               
                inputs[field].setAttribute('aria-invalid', 'true');
                inputs[field].setAttribute('aria-describedby', errorMessages[field].id);
            }
        }

       
        function clearError(field) {
            if (errorMessages[field]) {
                errorMessages[field].textContent = '';
            }
            if (inputs[field]) {
               
                inputs[field].removeAttribute('aria-invalid');
                inputs[field].removeAttribute('aria-describedby');
            }
        }

      
        function isValidEmail(email) {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(String(email).toLowerCase());
        }

        contactForm.addEventListener('submit', (event) => {
            event.preventDefault(); 
            let isValid = true;

            Object.keys(inputs).forEach(clearError);
            successMessage.classList.add('hidden');


            if (inputs.name.value.trim() === '') {
                showError('name', 'Full name is required.');
                isValid = false;
            }

            const emailValue = inputs.email.value.trim();
            if (emailValue === '') {
                showError('email', 'Email is required.');
                isValid = false;
            } else if (!isValidEmail(emailValue)) {
                showError('email', 'Please enter a valid email address (e.g., name@example.com).');
                isValid = false;
            }

            if (inputs.subject.value.trim() === '') {
                showError('subject', 'Subject is required.');
                isValid = false;
            }

            const messageValue = inputs.message.value.trim();
            if (messageValue === '') {
                showError('message', 'Message is required.');
                isValid = false;
            } else if (messageValue.length < 10) {
                showError('message', 'Message must be at least 10 characters long.');
                isValid = false;
            }

        
            if (isValid) {
                successMessage.classList.remove('hidden');
                contactForm.reset();
                setTimeout(() => {
                    successMessage.classList.add('hidden');
                }, 5000);
            }
        });
    }

});

