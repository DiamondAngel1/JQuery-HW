class Marker {
    constructor(color, inkLevel) {
        this.color = color;
        this.inkLevel = inkLevel;
    }

    setColor(newColor) {
        this.color = newColor;
    }

    print(text) {
        let printedText = '';
        for (let char of text) {
            if (this.inkLevel <= 0){
                alert('Не хватає чорнил. Заправте маркер.');
                break;
            }
            if (char !== ' ') {
                if (this.inkLevel >= 0.5) {
                    printedText += char;
                    this.inkLevel -= 0.5;
                }
            } 
            else {
                printedText += char;
            }
        }
        $('#output').html(`<span style="color:${this.color}; font-size: 18px;">${printedText}</span>`);
        $('#inkLevel').text(`Рівень чорнил: ${this.inkLevel.toFixed(1)}%`);
    }
}

class RefillableMarker extends Marker {
    refill() {
        this.inkLevel = 100;
        $('#inkLevel').text(`Маркер заправлено. Рівень чорнил: ${this.inkLevel}%`);
    }
}

const myMarker = new RefillableMarker($('#colorPicker').val(), 100);

$('#printBtn').click(() => {
    const text = $('#textInput').val();
    const selectedColor = $('#colorPicker').val();
    myMarker.setColor(selectedColor);
    myMarker.print(text);
});

$('#refillBtn').click(() => {
    myMarker.refill();
});