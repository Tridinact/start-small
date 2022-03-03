//don't forget to remove "123+" and "456" 
//div class="previous-operand"> etc
class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear()
    }

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }
    
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1) // chopping off the last number
    }

    appendNumber(number) {
        if(number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation){
        if (this.currentOperand === '') return //
        if (this.previousOperand !== '') {
            this.compute()
        }//if we have anything on the previous opperand than do the computation 
        this.operation = operation
        this.previousOperand = this.currentOperand //when entered, operant becomes previous (bottom becomes up small)
        this.currentOperand = ''
    }

    compute() { //updating variables
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) { //cases for counting
            case '+':
            computation = prev + current
            break
            case '-':
            computation = prev - current
            break
            case '*':
            computation = prev * current
            break
            case '/':
            computation = prev / current
            break
            default: //else
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0]) // turn string into array
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
           integerDisplay = '' 
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0}) // can never be any decimals after
        }
        if (decimalDigits != null) //user did enter a period and had some numbers in it 
        {
            return `${intergerDisplay}.${decimalDigits}`
        } else 
        {
            return integerDisplay
        }
    }

    updateDisplay(){
        this.currentOperandTextElement.innerText = 
        this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            this.previousOperandTextElement.innerText =
            `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {//if theres an operation //to display operation in calculator
        this.previousOperandTextElement.innerText = ''
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]') //get all elements that match a certain string
const operationButtons = document.querySelectorAll('[data-operation]') //The difference between querySelector() and querySelectorAll() is that querySelector() returns a single object with the first HTML element that matches the 'selectors'
const equalsButtons = document.querySelector('[data-equals]') //, but querySelectorAll() returns an array of objects with all the HTML elements that match the 'selectors'.
const deleteButtons = document.querySelector('[data-delete]')
const allClearButtons = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButtons.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButtons.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButtons.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})

//NEED FIX = when pressing '.', it only displays '.x', not '0.x'