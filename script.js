class ExtendedDate extends Date {
    constructor(dateString) {
        super(dateString);
    }

    getTextDate() {
        const months = [
            'січня', 'лютого', 'березня', 'квітня', 'травня', 'червня', 'липня', 'серпня', 'вересня', 'жовтня', 'листопада', 'грудня'
        ];
        return `${this.getDate()} ${months[this.getMonth()]}`;
    }

    isFutureOrToday() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const inputDate = new Date(this);
        inputDate.setHours(0, 0, 0, 0);
        return inputDate >= today;
    }

    isLeapYear() {
        const year = this.getFullYear();
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    }

    getNextDate() {
        const next = new Date(this);
        next.setDate(this.getDate() + 1);
        return next.toLocaleDateString('uk-UA');
    }
}

$('#analyzeBtn').click(() => {
    const dateStr = $('#dateInput').val();
    if (!dateStr) {
        $('#output').html('<p class="result">Оберіть дату</p>');
        return;
    }
    const extDate = new ExtendedDate(dateStr);

    const results = `
        <p class="result"><strong>Текстова дата:</strong> ${extDate.getTextDate()}</p>
        <p class="result"><strong>Дата в майбутньому або сьогодні:</strong> ${extDate.isFutureOrToday()}</p>
        <p class="result"><strong>Чи високосний рік:</strong> ${extDate.isLeapYear()}</p>
        <p class="result"><strong>Наступна дата:</strong> ${extDate.getNextDate()}</p>
    `;

    $('#output').html(results);
});