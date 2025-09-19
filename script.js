class Employee {
    constructor(name, age, email, position, department) {
        this.name = name;
        this.age = age;
        this.email = email;
        this.position = position;
        this.department = department;
    }
}

class EmpTable {
    constructor(employees) {
        this.employees = employees;
    }

    getHtml() {
        let html = `<table>
                      <thead>
                        <tr>
                          <th>Ім’я</th>
                          <th>Вік</th>
                          <th>Емейл</th>
                          <th>Посада</th>
                          <th>Відділ</th>
                          <th></th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>`;
        this.employees.forEach((emp, index) => {
            html += `<tr>
                        <td>${emp.name}</td>
                        <td>${emp.age}</td>
                        <td>${emp.email}</td>
                        <td>${emp.position}</td>
                        <td>${emp.department}</td>
                        <td><button id="del" data-index="${index}">Видалити</button></td>
                        <td><button id="edit">Редагувати</button></td>
                    </tr>`;
        });
        html += `</tbody></table>`;
        return html;
    }
}

class StyledEmpTable extends EmpTable {
    getStyles() {
        return `<style>
                    table {
                        width: 100%;
                        table-layout: fixed;
                        word-wrap: break-word;
                        border-collapse: collapse;
                        margin-top: 20px;
                        background-color: #f0fbff;
                        border-radius: 10px;
                        overflow: hidden;
                    }
                    th, td {
                        padding: 12px;
                        text-align: left;
                        border-bottom: 1px solid #99d6ff;
                    }
                    th {
                        background-color: #b3e0ff;
                        color: #004466;
                    }
                    tr:hover {
                        background-color: #e6f7ff;
                    }
                </style>`;
    }
    getHtml() {
        return this.getStyles() + super.getHtml();
    }
}

const bankEmployees = [
    new Employee("Мудрий Семен", "23","mudriy3000@gmail.com", "Касир", "Операційний"),
    new Employee("Козак Ахмед","32","spravzhniyKozak@ua.fm", "Фінансовий консультант", "Кредитний"),
    new Employee("Квітка Леся","19","kvitochka2093@gmail.com", "Оператор Call-центру", "Обслуговування клієнтів"),
    new Employee("Хомяк Йосип","21", "xomekZvichainiy@ua.fm", "ІТ-спеціаліст", "Технічний"),
    new Employee("Рішалово Петро","45","rishuchiyRishalovo@ua.fm", "Спеціаліст із заборгованості", "Кредитний")
];

const table = new StyledEmpTable(bankEmployees);
$('#tableContainer').html(table.getHtml());

$(document).on('click', '#del', function() {
    const index = $(this).data('index');
    bankEmployees.splice(index, 1);
    const newTable = new StyledEmpTable(bankEmployees);
    $('#tableContainer').html(newTable.getHtml());
});

$(document).on('click', '#edit', function() {
    const row = $(this).closest('tr');
    const cells = row.find('td');
    if ($(this).text() === 'Редагувати') {
        for (let i = 0; i < cells.length - 2; i++) {
            const cell = $(cells[i]);
            const value = cell.text();
            cell.html(`<input type="text" value="${value}">`);
        }
        $(this).text('Зберегти');
    }
     else {
        for (let i = 0; i < cells.length - 2; i++) {
            const cell = $(cells[i]);
            const input = cell.find('input');
            if (input.length) {
                const newValue = input.val();
                cell.text(newValue);
            }
        }
        $(this).text('Редагувати');
    }
});

const createFormHtml = `
    <form id="createEmployeeForm">
        <label for="name">Ім’я:</label>
        <input type="text" id="name" name="name" required>
        <label for="age">Вік:</label>
        <input type="number" id="age" name="age" required>
        <label for="email">Емейл:</label>
        <input type="email" id="email" name="email" required>
        <label for="position">Посада:</label>
        <input type="text" id="position" name="position" required>
        <label for="department">Відділ:</label>
        <input type="text" id="department" name="department" required>
        <button type="submit">Додати</button>
    </form>
`;
$('#createEmployee').html(createFormHtml);

$('#createEmployeeForm').on('submit', function(event) {
    event.preventDefault();
    const name = $('#name').val();
    const age = $('#age').val();
    const email = $('#email').val();
    const position = $('#position').val();
    const department = $('#department').val();
    const newEmployee = new Employee(name, age, email, position, department);
    bankEmployees.push(newEmployee);
    const newTable = new StyledEmpTable(bankEmployees);
    $('#tableContainer').html(newTable.getHtml());
});