const form = document.querySelector('#todoAddForm');
const addInput = document.querySelector('#todoName');
const todoList = document.querySelector('.list-group');
const firstCardBody = document.querySelectorAll('.card-body')[0];
const secondCardBody = document.querySelectorAll('.card-body')[1];
const clearButton = document.querySelector('#todoClearButton');
const filterInput = document.querySelector('#todoSearch');
let todos = [];
runEvents();

function runEvents() {
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", pageLoaded);
    secondCardBody.addEventListener("click", removeTodoToUI);
    clearButton.addEventListener("click", clearAllTodos);
    filterInput.addEventListener("keyup", filterTodos);
}


function pageLoaded() {
    chechTodoFromStorage();
    todos.forEach(function(todo){
        addTodoToUI(todo);
    });
}

function filterTodos(e) {
    const filterValue = e.target.value.toLowerCase().trim();
    const todoListesi = document.querySelectorAll(".list-group-item");
    if(todoListesi.length > 0){
        todoListesi.forEach(function(todo){
            if(todo.textContent.toLowerCase().trim().includes(filterValue)){
                  todo.setAttribute("style","display : block"); 
            }else{
                todo.setAttribute("style","display : none !important");
            }
        });
    }else{
        showAlert("warning","Filtrelenecek todo bulunamadı");
    }

}

function clearAllTodos() {
    const todoListesi = document.querySelectorAll(".list-group-item");
    if(todoListesi.length > 0){
        //ekrandan silme işlemi
        todoListesi.forEach(function(todo){
            todo.remove();
        });
        //storage dan silme işlemi
        todos = [];
        localStorage.setItem("todos", JSON.stringify(todos));
        showAlert("success","Tüm todolar başarıyla silindi");
    }else{
        showAlert("warning","Silinecek todo bulunamadı");
    }
}

function removeTodoToUI(e) {
    if(e.target.className === "fa fa-remove"){
        //ekrandan silme işlemi
        const todo = e.target.parentElement.parentElement;
        todo.remove();
        //storage dan silme işlemi
        removeTodoToStorage(todo.textContent);
        showAlert("success","Todo başarıyla silindi"); 
    }
}

function removeTodoToStorage(removeTodo) {
    chechTodoFromStorage();
    todos.forEach(function(todo,index){
        if(todo === removeTodo){
            todos.splice(index,1); //arrayden değeri silme işlemi
        }
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}

function addTodo(e) {
    const inputText = addInput.value.trim();
    if(inputText === null || inputText === "" ){
        showAlert("warning","Lütfen bir todo giriniz");
    }else{
        //arayüze ekleme işlemi
        addTodoToUI(inputText);
        //storage e ekleme işlemi
        addTodoToStorage(inputText);
        showAlert("success","Todo başarıyla eklendi");
    }

    e.preventDefault(); //farklı sayfaya gitmeyi önler
}

function addTodoToUI(newTodo) {
    /*<li class="list-group-item d-flex justify-content-between">Todo 1
        <a href="#" class="delete-item">
            <i class="fa fa-remove"></i>
        </a>
    </li>*/
    const li = document.createElement('li');
    li.className = "list-group-item d-flex justify-content-between";
    li.textContent = newTodo;

    const a = document.createElement('a');
    a.href = "#";
    a.className = "delete-item";

    const i = document.createElement('i');
    i.className = "fa fa-remove";

    a.appendChild(i);
    li.appendChild(a);
    todoList.appendChild(li);

    addInput.value = ""; //ekleme işlemi yapldıktan sonra input alanı temizlenir
}

function addTodoToStorage(newTodo) {
    chechTodoFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function chechTodoFromStorage() {
    if(localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
}   

function showAlert(type,message){
    /*<div class="alert alert-warning" role="alert">
        this is a warning alert—check it out!
    </div>*/
    const div = document.createElement("div");
    div.className = `alert alert-${type}`; //type success,warning,danger olabilir
    div.textContent = message;
    firstCardBody.appendChild(div);
    setTimeout(function(){
        div.remove();
    },2000);
}