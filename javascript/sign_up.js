document.getElementById('signup_button').addEventListener('click', function() {

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    // Check for empty input fields

    if (!name || !email || !password) {
        alert('All fields are required.');
        return;
    }

    // Email validation

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    // Password validation
    
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordPattern.test(password)) {
        alert('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.');
        return;
    }

    // Create a user object
    const user = {
        name: name,
        email: email,
        password: password
    };

    // Convert the object to a JSON string and store it in local storage
    localStorage.setItem('user', JSON.stringify(user));

    // Display a success message or log the success in the console
    alert('Signup successful! User info stored in local storage.');

    // Redirect to the home page
    window.location.href = '/html/sign_in.html';
});
