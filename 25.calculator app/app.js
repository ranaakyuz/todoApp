//elementleri seçmek
const calculatorEl = document.querySelector("#calculator");
const resultEl = document.querySelector(".result");
const clearAllEl = document.querySelector("#clearAll");
const deleteCharEl = document.querySelector("#deleteAChar");

//değişken tanımlama
let firstNumber="";
let selectedOperator="";
let afterNumber="";
let isWaitingANewValue=false;

runEventListener();

function runEventListener(){
    calculatorEl.addEventListener("click",write);
    clearAllEl.addEventListener("click",clearAll);
    deleteCharEl.addEventListener("click",deleteAChar);
}

function deleteAChar(){
    if(isWaitingANewValue){
        afterNumber = Calculator.deleteLastChar(afterNumber);
    }else{
        firstNumber = Calculator.deleteLastChar(firstNumber);
    }
   resultEl.innerHTML = Calculator.deleteLastChar(resultEl.innerHTML);
}

function clearAll(){
    firstNumber="";
    selectedOperator="";
    afterNumber="";
    isWaitingANewValue=false;
    clearResultPanel();
}

function write(e){
    const element = e.target;
    if(element.classList.contains("number")){
        //sayıya basmıştır
        if(isWaitingANewValue){
            afterNumber+=element.value;
        }else{
            firstNumber+=element.value;
        }
        updateResultPanel(element.value);
    }
    else if(element.classList.contains("operator")){
        //operatöre basmıştır
        if(!Calculator.isHaveOperator(resultEl.innerHTML)){
            selectedOperator=element.value;
            isWaitingANewValue=true;
            updateResultPanel(element.value);//operatör yoksa paneli güncelle(fazladan operatör koymayı engelledik)
        }
    }
    else if(element.classList.contains("equals")){
        //eşittire basmıştır
        let result = calculate(firstNumber,selectedOperator,afterNumber).toString();
        firstNumber=result;
        isWaitingANewValue=false;
        clearOperatorAndAfterNumber();
        clearResultPanel();
        updateResultPanel(result);
    }
}

function updateResultPanel(value){
    if(value.length>=6){
        value = parseFloat(value).toFixed(2);
    }
    resultEl.innerHTML+=value;
}

function clearResultPanel(value){
    resultEl.innerHTML="";
}

function clearOperatorAndAfterNumber(){
    selectedOperator="";
    afterNumber="";
}

function calculate(firstNumber,operator,secondNumber){
    let result;
    let isDotHave = Calculator.isDotHave(firstNumber) || Calculator.isDotHave(secondNumber);
    switch(operator){
        case "+":
            result = isDotHave ? parseFloat(firstNumber) + parseFloat(secondNumber) : parseInt(firstNumber) + parseInt(secondNumber);
            break;
        case "-":
            result = isDotHave ? parseFloat(firstNumber) - parseFloat(secondNumber) : parseInt(firstNumber) - parseInt(secondNumber);
            break;
        case "*":
            result = isDotHave ? parseFloat(firstNumber) * parseFloat(secondNumber) : parseInt(firstNumber) * parseInt(secondNumber);
            break;
        case "/":
            result = isDotHave ? parseFloat(firstNumber) / parseFloat(secondNumber) : parseInt(firstNumber) / parseInt(secondNumber);
            break;
    }
    return result;
}