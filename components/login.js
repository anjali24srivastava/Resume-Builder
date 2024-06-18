// Select the login form and add a submit event listener
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('#loginForm');
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting normally

        // Get the input values from the form
        const username = document.querySelector('#username').value;
        const password = document.querySelector('#password').value;

        // Perform client-side validation if needed
        if (!username || !password) {
            alert('Please enter both username/email and password.');
            return;
        }

        // Construct the login data to send to the server
        const loginData = {
            username: username,
            password: password
        };

        // Send a POST request to the server to authenticate the user
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Handle the server response (e.g., redirect to dashboard on success)
            if (data.success) {
                alert('Login successful!');
                window.location.href = '/dashboard'; // Redirect to dashboard page
            } else {
                alert('Login failed. Please check your credentials.');
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            alert('An error occurred while processing your request. Please try again later.');
        });
    });
});
