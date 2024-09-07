document.getElementById('signin_button').addEventListener('click', function() {
    // Get form values
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    // Check for empty input fields
    if (!email || !password) {
        Swal.fire({
            icon: 'error',
            title: 'Validation Error',
            text: 'Both fields are required.',
        });
        return;
    }

    // Retrieve stored user data from local storage
    const storedUser = JSON.parse(localStorage.getItem('user'));

    // Check if user data exists
    if (!storedUser) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No user data found. Please sign up first.',
        });
        return;
    }

    // Validate email and password
    if (email !== storedUser.email) {
        Swal.fire({
            icon: 'error',
            title: 'Validation Error',
            text: 'Invalid email address.',
        });
        return;
    }

    if (password !== storedUser.password) {
        Swal.fire({
            icon: 'error',
            title: 'Validation Error',
            text: 'Incorrect password.',
        });
        return;
    }

    // Redirect to the home page
    Swal.fire({
        icon: 'success',
        title: 'Sign-in Successful',
        text: 'You will be redirected shortly.',
        timer: 2000,
        showConfirmButton: false
    }).then(() => {
        window.location.href = 'home.html'; // Update this to the actual path of your home page
    });
});
