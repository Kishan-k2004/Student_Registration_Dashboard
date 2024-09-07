document.addEventListener('DOMContentLoaded', () => {
    const studentForm = document.getElementById('student-form');
    let students = JSON.parse(localStorage.getItem('students')) || [];

    const addStudent = (student) => {
        students.push(student);
        localStorage.setItem('students', JSON.stringify(students));
    };

    const resetForm = () => {
        studentForm.reset();
        document.getElementById('submit-button').textContent = 'Add Student';
    };

    studentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = studentForm.querySelector('#name').value.trim();
        const age = studentForm.querySelector('#age').value.trim();
        const grade = studentForm.querySelector('#grade').value.trim();
        const email = studentForm.querySelector('#email').value.trim();

        // Validation
        const nameRegex = /^[A-Za-z\s]+$/;
        const ageRegex = /^\d+$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!name || !age || !grade || !email) {
            Swal.fire({
                icon: 'error',
                title: 'Validation Error',
                text: 'Please fill out all fields.',
            });
            return;
        }

        if (!nameRegex.test(name)) {
            Swal.fire({
                icon: 'error',
                title: 'Validation Error',
                text: 'Name should only contain alphabets.',
            });
            return;
        }

        if (!ageRegex.test(age)) {
            Swal.fire({
                icon: 'error',
                title: 'Validation Error',
                text: 'Age should only contain numbers.',
            });
            return;
        }

        if (!emailRegex.test(email)) {
            Swal.fire({
                icon: 'error',
                title: 'Validation Error',
                text: 'Please enter a valid email address.',
            });
            return;
        }

        const student = { name, age, grade, email };

        addStudent(student);
        resetForm();

        Swal.fire({
            icon: 'success',
            title: 'Student Added',
            text: 'The student information has been added successfully!',
            timer: 2000,
            showConfirmButton: false
        });
    });
});
