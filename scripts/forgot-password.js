document.addEventListener('DOMContentLoaded', () => {
    const forgotPasswordForm = document.getElementById('forgot-password-form');
    const inputGroup = document.querySelector('.input-group');

    gsap.from(forgotPasswordForm, {duration: 1, y: 50, opacity: 0, ease: 'power3.out'});
    gsap.from(inputGroup, {duration: 0.8, delay: 0.2, y: 20, opacity: 0, ease: 'power3.out'});

    forgotPasswordForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;

        gsap.to(forgotPasswordForm, {
            duration: 0.5,
            scale: 0.95,
            opacity: 0,
            ease: 'power2.in',
            onComplete: () => {
                // Here you would typically send a request to a server to handle password reset
                // For this example, we'll just show an alert
                alert(`Password reset link sent to ${email}. Please check your email.`);
                window.location.href = 'login.html';
            }
        });
    });
});