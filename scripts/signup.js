document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signup-form');
    const inputGroups = document.querySelectorAll('.input-group');

    gsap.from(signupForm, {duration: 1, y: 50, opacity: 0, ease: 'power3.out'});

    inputGroups.forEach((group, index) => {
        gsap.from(group, {
            duration: 0.8,
            delay: 0.2 * (index + 1),
            y: 20,
            opacity: 0,
            ease: 'power3.out'
        });
    });

    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        if (password !== confirmPassword) {
            alert("Passwords don't match!");
            return;
        }

        gsap.to(signupForm, {
            duration: 0.5,
            scale: 0.95,
            opacity: 0,
            ease: 'power2.in',
            onComplete: () => {
                // Here you would typically send this data to a server to create a new account
                // For this example, we'll just simulate account creation
                localStorage.setItem('currentUser', JSON.stringify({username, email, level: 1, exp: 0}));
                alert('Account created successfully!');
                window.location.href = 'index.html';
            }
        });
    });
});