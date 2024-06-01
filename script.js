document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.button');
    let currentValue = '0';
    let previousValue = '';
    let operator = '';

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const action = this.getAttribute('data-action');
            
            if (action >= '0' && action <= '9') {
                if (currentValue === '0') {
                    currentValue = action;
                } else {
                    currentValue += action;
                }
            } else if (action === 'decimal') {
                if (!currentValue.includes('.')) {
                    currentValue += '.';
                }
            } else if (action === 'clear') {
                currentValue = '0';
                previousValue = '';
                operator = '';
            } else if (action === 'sign') {
                currentValue = (parseFloat(currentValue) * -1).toString();
            } else if (action === 'percent') {
                currentValue = (parseFloat(currentValue) / 100).toString();
            } else if (action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide') {
                if (previousValue && operator) {
                    currentValue = calculate(previousValue, currentValue, operator);
                }
                previousValue = currentValue;
                currentValue = '0';
                operator = action;
            } else if (action === 'calculate') {
                if (previousValue && operator) {
                    currentValue = calculate(previousValue, currentValue, operator);
                    previousValue = '';
                    operator = '';
                }
            }

            display.textContent = currentValue;
        });
    });

    function calculate(a, b, op) {
        a = parseFloat(a);
        b = parseFloat(b);

        let result;
        switch (op) {
            case 'add':
                result = a + b;
                break;
            case 'subtract':
                result = a - b;
                break;
            case 'multiply':
                result = a * b;
                break;
            case 'divide':
                if (b === 0) {
                    showAlert('Error: Division by zero');
                    return '0';
                }
                result = a / b;
                break;
            default:
                showAlert('Error: Undefined operation');
                return '0';
        }

        if (isNaN(result) || !isFinite(result)) {
            showAlert('Error: Calculation not possible');
            return '0';
        }

        return result.toFixed(5).replace(/\.?0+$/, '');
    }

    function showAlert(message) {
        alert(message);
    }
});
