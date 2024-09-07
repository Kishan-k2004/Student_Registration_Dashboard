document.addEventListener('DOMContentLoaded', () => {
    const studentForm = document.getElementById('student-form');
    const studentTable = document.getElementById('student-table').querySelector('tbody');
    let students = JSON.parse(localStorage.getItem('students')) || [];
    let editIndex = null;

    const renderTable = () => {
        studentTable.innerHTML = '';
        students.forEach((student, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student.name}</td>
                <td>${student.age}</td>
                <td>${student.grade}</td>
                <td>${student.email}</td>
                <td class="actions">
                    <button class="edit" data-index="${index}"><i class="bi bi-pencil-square"></i>   Edit</button>
                    <button class="delete" data-index="${index}"><i class="bi bi-trash-fill"></i>  Delete</button>
                </td>
            `;
            studentTable.appendChild(row);
        });
    };

    const resetForm = () => {
        studentForm.reset();
        document.getElementById('submit-button').textContent = 'Add Student';
        editIndex = null;
    };

    const addStudent = (student) => {
        students.push(student);
        localStorage.setItem('students', JSON.stringify(students));
        renderTable();
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

    studentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const student = {
            name: studentForm.querySelector('#name').value,
            age: studentForm.querySelector('#age').value,
            grade: studentForm.querySelector('#grade').value,
            email: studentForm.querySelector('#email').value,
        };

        if (editIndex !== null) {
            updateStudent(editIndex, student);
        } else {
            addStudent(student);
        }

        resetForm();
    });

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
                preConfirm: () => {
                    return {
                        name: document.getElementById('swal-input1').value,
                        age: document.getElementById('swal-input2').value,
                        grade: document.getElementById('swal-input3').value,
                        email: document.getElementById('swal-input4').value
                    }
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

    renderTable();
});
