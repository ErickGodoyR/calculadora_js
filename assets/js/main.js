class Calculator{
    constructor(operand1Element, operand2Element){
        this.operand1Element = operand1Element;
        this.operand2Element = operand2Element;
        this.clear();

    }

    // limpiar pantalla de calculadora
    clear(){
        this.operand1 = 0;
        this.operand2 = 0;
        this.operator = '';
        this.updateUI();
        
    }

    // actualiza pantalla de calculadora
    updateUI(){
        this.operand1Element.innerHTML = this.operand1 + this.operator;
        this.operand2Element.innerHTML = this.operand2;
    }

    // agrega los numeros 
    appendNumber(number){
        if(number === "." && this.operand2.includes('.')) return;
        this.operand2 = this.operand2 === 0
                        ? number
                        : this.operand2.toString() + number;
        this.updateUI();
    }

    // elimina último número
    delete(){
        if(this.operand2 === 0) return;
        this.operand2 = +this.operand2.toString().slice(0, -1);
        this.updateUI();
    }

    // operaciones
    operation(operator){
        if(this.operator){
            this.calc(); 
        }
        this.operator = operator;
        this.operand1 = +this.operand2 === 0 
                        ? this.operand1 
                        : this.operand2;
        this.operand2 = 0;
        this.updateUI();
    }

    // realiza el calculo seleccionado
    calc(){
        switch(this.operator){
            case "+":
                this.operand1 = +this.operand1 + +this.operand2;
            break;
            case "-":
                this.operand1 = +this.operand1 - +this.operand2;
            break;
            case "*":
                this.operand1 = +this.operand1 * +this.operand2;
            break;
            case "/":
                this.operand1 = +this.operand1 / +this.operand2;
            break;
        }
        this.operator = "";
        this.operand2 = 0;
        this.updateUI();
    }

}


// declaración de variables
const operand1Element = document.querySelector("[data-operand-1]");
const operand2Element = document.querySelector("[data-operand-2]");
const clearButton = document.querySelector("[data-clear]");
const numberButtons = document.querySelectorAll("[data-number]");
const deleteButton = document.querySelector("[data-delete]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");


const calculator = new Calculator(operand1Element, operand2Element); 


// llamada a operaciones al hacer click en los botones
clearButton.addEventListener("click", () =>{
    calculator.clear();
})


numberButtons.forEach(button => {
    button.addEventListener("click", ()=>{
        calculator.appendNumber(button.innerHTML);
    })
})

deleteButton.addEventListener('click', () =>{
   calculator.delete(); 
});

operationButtons.forEach(button => {
    button.addEventListener("click", () =>{
        calculator.operation(button.innerHTML);
    });
});

equalsButton.addEventListener("click", () =>{
    calculator.calc();
});