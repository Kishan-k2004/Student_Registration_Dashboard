document.addEventListener('DOMContentLoaded', () => {
    const studentTable = document.getElementById('student-table').querySelector('tbody');
    const searchInput = document.getElementById('search-input');
    let students = JSON.parse(localStorage.getItem('students')) || [];
    
    const renderTable = (filteredStudents = students) => {
        studentTable.innerHTML = '';
        filteredStudents.forEach((student, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student.name}</td>
                <td>${student.age}</td>
                <td>${student.grade}</td>
                <td>${student.email}</td>
                <td class="actions">
                    <button class="edit" data-index="${index}"><i class="bi bi-pencil-square"></i> Edit</button>
                    <button class="delete" data-index="${index}"><i class="bi bi-trash-fill"></i> Delete</button>
                </td>
            `;
            studentTable.appendChild(row);
        });
    };

    const updateStudent = (index, student) => {
        students[index] = student;
        localStorage.setItem('students', JSON.stringify(students));
        renderTable();
        Swal.fire({
            icon: 'success',
            title: 'Student Updated',
            text: 'The student information has been updated successfully!',
            timer: 2000,
            showConfirmButton: false
        });
    };

    const deleteStudent = (index) => {
        students.splice(index, 1);
        localStorage.setItem('students', JSON.stringify(students));
        renderTable();
        Swal.fire({
            icon: 'success',
            title: 'Student Deleted',
            text: 'The student has been deleted successfully!',
            timer: 2000,
            showConfirmButton: false
        });
    };

    studentTable.addEventListener('click', (e) => {
        const target = e.target.closest('button');
        const index = target ? target.dataset.index : null;

        if (!index) return;

        if (target.classList.contains('edit')) {
            const student = students[index];
            Swal.fire({
                title: 'Edit Student Details',
                html: `
                    <input id="swal-input1" class="swal2-input" placeholder="Name" value="${student.name}">
                    <input id="swal-input2" class="swal2-input" placeholder="Age" value="${student.age}">
                    <input id="swal-input3" class="swal2-input" placeholder="Grade" value="${student.grade}">
                    <input id="swal-input4" class="swal2-input" placeholder="Email" value="${student.email}">
                `,
                focusConfirm: false,
                showCancelButton: true,
                preConfirm: () => {
                    const name = document.getElementById('swal-input1').value.trim();
                    const age = document.getElementById('swal-input2').value.trim();
                    const grade = document.getElementById('swal-input3').value.trim();
                    const email = document.getElementById('swal-input4').value.trim();

                    // Validation
                    const nameRegex = /^[A-Za-z\s]+$/;
                    const ageRegex = /^\d+$/;
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                    if (!name || !age || !grade || !email) {
                        Swal.showValidationMessage('Please fill out all fields.');
                        return false;
                    }

                    if (!nameRegex.test(name)) {
                        Swal.showValidationMessage('Name should only contain alphabets.');
                        return false;
                    }

                    if (!ageRegex.test(age)) {
                        Swal.showValidationMessage('Age should only contain numbers.');
                        return false;
                    }

                    if (!emailRegex.test(email)) {
                        Swal.showValidationMessage('Please enter a valid email address.');
                        return false;
                    }

                    return { name, age, grade, email };
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    updateStudent(index, result.value);
                }
            });
        } else if (target.classList.contains('delete')) {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel!',
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {
                    deleteStudent(index);
                }
            });
        }
    });

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredStudents = students.filter(student =>
            student.name.toLowerCase().includes(searchTerm)
        );
        renderTable(filteredStudents);
    });

    renderTable();
});
