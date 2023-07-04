const studentForm = document.getElementById('student-form');
const searchInput = document.getElementById('searchInput');
const studentTable = document.getElementById('student-table');

const students=[ { ID: 1, name: 'Alice', email: 'alice@example.com',age: 21, grade: 'A', degree: 'Btech'},
                 { ID: 2, name: 'Bob',email: 'bob@example.com' , age: 22, grade: 'B', degree: 'MBA' },
                 { ID: 3, name: 'Charlie', email: 'charlie@example.com', age: 20, grade: 'C', degree:'Arts' }
];

let editBtn = false;


function displayStudents() {
    const tbody = studentTable.querySelector('tbody');
    tbody.innerHTML = '';

   students.forEach((student, index) => {
   const row = document.createElement('tr');

   row.innerHTML = `
            <td>${student.ID}</td>
            <td>${student.name}</td>
            <td>${student.email}</td>
            <td>${student.age}</td>
            <td>${student.grade}</td>
            <td>${student.degree}</td>
            <td>
                <button onclick="editStudent(${index})"><i class="fa-regular fa-pen-to-square"></i></button>
                <button onclick="deleteStudent(${index})"><i class="fa-regular fa-trash-can"></i></button>
            </td>
    `;
    tbody.appendChild(row);

   });
}


function addEditStudent(event) {
        event.preventDefault();

        const studentId = document.getElementById('studentId').value;
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const age = document.getElementById('age').value;
        const grade = document.getElementById('grade').value;
        const degree = document.getElementById('degree').value;

        if (editBtn)
        {
            const student = students[studentId];
            student.name = name;
            student.age = age;
            student.grade = grade;
            student.degree = degree;
            student.email = email;
        }
        else
        {
            const newStudents={ID:students.length+1, name, email, age, grade, degree};
            students.push(newStudents);
        }

   resetForm();
   displayStudents();
}

function editStudent(index) {
        const student = students[index];

        document.getElementById('studentId').value = index;
        document.getElementById('name').value = student.name;
        document.getElementById('age').value = student.age;
        document.getElementById('grade').value = student.grade;
        document.getElementById('degree').value = student.degree;
        document.getElementById('email').value = student.email;

        document.getElementById('submitBtn').innerText = 'Edit Student';
        editBtn = true;
}

function resetForm() {
        document.getElementById('studentId').value = '';
        document.getElementById('name').value = '';
        document.getElementById('age').value = '';
        document.getElementById('grade').value = '';
        document.getElementById('degree').value = '';
        document.getElementById('email').value = '';

        document.getElementById('submitBtn').innerText = 'Add Student';
        editBtn = false;
}

function deleteStudent(index) {
    students.splice(index, 1);
    displayStudents();
}


function searchStudents() {
        const searchText = searchInput.value.toLowerCase();

        const filteredStudents = students.filter(student => student.name.toLowerCase().includes(searchText) ||student.email.toLowerCase().includes(searchText) ||
            student.degree.toLowerCase().includes(searchText)
        );

        displayFilteredStudents(filteredStudents);
}


function displayFilteredStudents(filteredStudents) {
        const tbody = studentTable.querySelector('tbody');
        tbody.innerHTML = '';

        filteredStudents.forEach((student, index) => {
            const row = document.createElement('tr');

            row.innerHTML = `
                    <td>${student.ID}</td>
                    <td>${student.name}</td>
                    <td>${student.email}</td>
                    <td>${student.age}</td>
                    <td>${student.grade}</td>
                    <td>${student.degree}</td>
                    <td>
                        <button onclick="editStudent(${index})"><i class="fa-regular fa-pen-to-square"></i></button>
                        <button onclick="deleteStudent(${index})"><i class="fa-regular fa-trash-can"></i></button>
                    </td>
            `;

            tbody.appendChild(row);
        });
}

studentForm.addEventListener('submit', addEditStudent);
searchInput.addEventListener('input', searchStudents);

displayStudents();