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
                    <button class="edit" data-index="${index}">Edit</button>
                    <button class="delete" data-index="${index}">Delete</button>
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
    };

    const deleteStudent = (index) => {
        students.splice(index, 1);
        localStorage.setItem('students', JSON.stringify(students));
        renderTable();
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
        const index = e.target.dataset.index;

        if (e.target.classList.contains('edit')) {
            const student = students[index];
            studentForm.querySelector('#name').value = student.name;
            studentForm.querySelector('#age').value = student.age;
            studentForm.querySelector('#grade').value = student.grade;
            studentForm.querySelector('#email').value = student.email;
            editIndex = index;
            document.getElementById('submit-button').textContent = 'Update Student';
        } else if (e.target.classList.contains('delete')) {
            deleteStudent(index);
        }
    });

    renderTable();
});
