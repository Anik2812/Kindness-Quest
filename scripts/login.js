document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const inputGroups = document.querySelectorAll('.input-group');

    gsap.from(loginForm, { duration: 1, y: 50, opacity: 0, ease: 'power3.out' });

    inputGroups.forEach((group, index) => {
        gsap.from(group, {
            duration: 0.8,
            delay: 0.2 * (index + 1),
            y: 20,
            opacity: 0,
            ease: 'power3.out'
        });
    });

    // In login.js
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Simulate login (replace with actual authentication in a real app)
        gsap.to(loginForm, {
            duration: 0.5,
            scale: 0.95,
            opacity: 0,
            ease: 'power2.in',
            onComplete: () => {
                localStorage.setItem('currentUser', JSON.stringify({ username, level: 1, exp: 0 }));
                window.location.href = 'index.html';
            }
        });
    });
});