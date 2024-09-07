document.addEventListener('DOMContentLoaded', () => {
    // Get the entry count div
    const entryCountDiv = document.getElementById('entry-count');

    // Retrieve students from local storage
    let students = JSON.parse(localStorage.getItem('students')) || [];

    // Update the entry count
    entryCountDiv.textContent = `${students.length}+`;
});


document.getElementById('join_us').addEventListener('click', function() {
    window.location.href = '/html/sign_up.html';
});


document.getElementById('Login').addEventListener('click', function() {
    window.location.href = '/html/sign_in.html';
});


document.getElementById('add_button').addEventListener('click', function() {
    window.location.href = '/html/add_student.html';
});


document.getElementById('view_button').addEventListener('click', function() {
    window.location.href = '/html/student_list.html';
});