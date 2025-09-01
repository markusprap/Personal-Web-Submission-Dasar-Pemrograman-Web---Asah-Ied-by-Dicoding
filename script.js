document.addEventListener('DOMContentLoaded', function() {
    const changingTexts = [
        "Markus Prap Kurniawan",
        "Software Engineer",
        "Frontend Developer"
    ];
    let currentTextIndex = 0;

    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        element.classList.remove('typing-complete');
        
        function typing() {
            if (i < text.length) {
                const char = text.charAt(i);
                const span = document.createElement('span');
                span.textContent = char;
                span.className = 'typing-char';
                span.style.animationDelay = '0s';
                element.appendChild(span);
                i++;
                setTimeout(typing, speed);
            } else {
                setTimeout(() => {
                    element.classList.add('typing-complete');
                    setTimeout(() => {
                        eraseText(element, speed);
                    }, 2000);
                }, 1000);
            }
        }
        typing();
    }

    function eraseText(element, speed) {
        const allChars = element.querySelectorAll('.typing-char');
        const staticChars = element.querySelectorAll('.static-text');
        const changingChars = Array.from(allChars);
        
        let i = changingChars.length - 1;
        element.classList.remove('typing-complete');
        
        function erasing() {
            if (i >= 0) {
                changingChars[i].style.animation = 'fadeOut 0.1s ease-out forwards';
                setTimeout(() => {
                    if (changingChars[i] && changingChars[i].parentNode) {
                        changingChars[i].remove();
                    }
                }, 100);
                i--;
                setTimeout(erasing, 50);
            } else {
                setTimeout(() => {
                    currentTextIndex = (currentTextIndex + 1) % changingTexts.length;
                    typeWriter(element, changingTexts[currentTextIndex], 80);
                }, 500);
            }
        }
        erasing();
    }

    const typingText = document.getElementById('typingText');
    if (typingText) {
        setTimeout(() => {
            typeWriter(typingText, changingTexts[currentTextIndex], 80);
        }, 1000);
    }

    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });

    const workSlider = document.querySelector('.work-slider');
    const scrollLeftBtn = document.getElementById('scrollLeft');
    const scrollRightBtn = document.getElementById('scrollRight');

    if (scrollLeftBtn && scrollRightBtn && workSlider) {
        scrollLeftBtn.addEventListener('click', function() {
            workSlider.scrollBy({ left: -370, behavior: 'smooth' });
        });

        scrollRightBtn.addEventListener('click', function() {
            workSlider.scrollBy({ left: 370, behavior: 'smooth' });
        });

        function updateScrollButtons() {
            const { scrollLeft, scrollWidth, clientWidth } = workSlider;

            scrollLeftBtn.style.opacity = scrollLeft > 0 ? '1' : '0.5';
            scrollRightBtn.style.opacity = scrollLeft < scrollWidth - clientWidth ? '1' : '0.5';
        }

        workSlider.addEventListener('scroll', updateScrollButtons);
        updateScrollButtons();
    }

    function showDialog(title, message) {
        const dialog = document.createElement('div');
        dialog.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        `;

        const dialogBox = document.createElement('div');
        dialogBox.style.cssText = `
            background: white;
            padding: 2rem;
            border-radius: 12px;
            max-width: 400px;
            width: 90%;
            text-align: center;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        `;

        dialogBox.innerHTML = `
            <h3 style="margin-bottom: 1rem; color: #333;">${title}</h3>
            <p style="margin-bottom: 1.5rem; color: #666; line-height: 1.5;">${message}</p>
            <button onclick="this.closest('div').remove()" style="
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                border: none;
                padding: 0.75rem 2rem;
                border-radius: 8px;
                cursor: pointer;
                font-weight: 500;
            ">OK</button>
        `;

        dialog.appendChild(dialogBox);
        document.body.appendChild(dialog);

        dialog.addEventListener('click', function(e) {
            if (e.target === dialog) {
                dialog.remove();
            }
        });
    }

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');

            if (!name || !email || !message) {
                showDialog('Validation Error', 'Please fill in all required fields.');
                return;
            }

            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;

            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            setTimeout(() => {
                showDialog('Success!', `Thank you, ${name}! Your message has been sent successfully. I'll get back to you soon.`);
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    function initTechBackground() {
        const techIcons = document.querySelectorAll('.tech-icon');
        
        techIcons.forEach((icon, index) => {
            const duration = Math.random() * 10 + 10;
            icon.style.animationDuration = `${duration}s`;
            
            const delay = Math.random() * -15;
            icon.style.animationDelay = `${delay}s`;
            
            document.addEventListener('mousemove', (e) => {
                const x = e.clientX / window.innerWidth;
                const y = e.clientY / window.innerHeight;
                
                const moveX = (x - 0.5) * 20;
                const moveY = (y - 0.5) * 20;
                
                icon.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${moveX}deg)`;
            });
        });
    }

    initTechBackground();
});
