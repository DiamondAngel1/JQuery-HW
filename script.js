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
                        </tr>
                      </thead>
                      <tbody>`;
        this.employees.forEach(emp => {
            html += `<tr>
                        <td>${emp.name}</td>
                        <td>${emp.age}</td>
                        <td>${emp.email}</td>
                        <td>${emp.position}</td>
                        <td>${emp.department}</td>
                    </tr>`;
        });
        html += `</tbody></table>`;
        return html;
    }
}

const bankEmployees = [
    new Employee("Мудрий Семен", "23","mudriy3000@gmail.com", "Касир", "Операційний"),
    new Employee("Козак Ахмед","32","spravzhniyKozak@ua.fm", "Фінансовий консультант", "Кредитний"),
    new Employee("Квітка Леся","19","kvitochka2093@gmail.com", "Оператор Call-центру", "Обслуговування клієнтів"),
    new Employee("Хомяк Йосип","21", "xomekZvichainiy@ua.fm", "ІТ-спеціаліст", "Технічний"),
    new Employee("Рішалово Петро","45","rishuchiyRishalovo@ua.fm", "Спеціаліст із заборгованості", "Кредитний")
];

const table = new EmpTable(bankEmployees);
$('#tableContainer').html(table.getHtml());