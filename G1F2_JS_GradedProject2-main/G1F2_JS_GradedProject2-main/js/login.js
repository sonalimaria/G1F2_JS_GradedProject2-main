document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOMContentLoaded event triggered.');

    // Check if the user is already logged in using sessionStorage
    if (sessionStorage.getItem('isLoggedIn') === 'true') {
        window.location.href = './html/resume.html';; // Redirect to the Resume Page if already logged in
        return;
    }

    const loginForm = document.getElementById('loginForm');
    console.log('loginForm:', loginForm);  // This should not be null

    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent the default form submission

            const username = document.getElementById('username');
            const password = document.getElementById('password');
            console.log('username:', username, 'password:', password);  // These should not be null

            if (username && password) {
                const usernameValue = username.value;
                const passwordValue = password.value;

                // Example: Setting predefined credentials for demonstration
                const storedUsername = 'user';
                const storedPassword = 'admin';

                // Check if the provided credentials match the predefined ones
                if (usernameValue === storedUsername && passwordValue === storedPassword) {
                    sessionStorage.setItem('isLoggedIn', 'true'); // Set the session flag
                    window.location.href = './html/resume.html';; // Redirect to the Resume Page on successful login
                } else {
                    const messageElement = document.getElementById('message');
                    console.log('messageElement:', messageElement);  // This should not be null

                    if (messageElement) {
                        messageElement.textContent = 'Invalid username/password';
                    }
                }
            }
        });
    }
});
