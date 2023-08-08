//Seleção de elementos
const todoForm = document.querySelector("#todo-form")
const todoInput = document.querySelector("#todo-input")
const todoList = document.querySelector(".todo-list")
const editForm = document.querySelector("#edit-form")
const editInput = document.querySelector("#edit-input")
const cancelEditBtn = document.querySelector("#cancel-edit-btn")

let oldInputValues// armazenar as task antigas
// Declaração da lista global para armazenar os elementos h3
const h3Elements = [];

//funções
const saveTodo = function (text) {
    const todo = document.createElement("div") // Cria a div "todo-done"
    todo.classList.add("todo")

    const todoTitle = document.createElement('h3')
    todoTitle.innerText = text    //inserção do texto no elemento h3 que será criado
    todo.appendChild(todoTitle)
   
    //Criação dos botões(lembrando que temos que criar o botão do "nada" fazendo manipulação com JS)
    const doneBtn = document.createElement("button")
    doneBtn.classList.add("finish-todo")
    doneBtn.innerHTML=  '<i class="fa-solid fa-check"></i>'
    todo.appendChild(doneBtn)

    const editBtn = document.createElement("button")
    editBtn.classList.add("edit-todo")
    editBtn.innerHTML=  ' <i class="fa-solid fa-pen"></i>'
    todo.appendChild(editBtn)

    const deleteBtn = document.createElement("button")
    deleteBtn.classList.add("remove-todo")
    deleteBtn.innerHTML=  '<i class="fa-solid fa-xmark"></i>'
    todo.appendChild(deleteBtn)

    todoList.appendChild(todo)
    // limpar input quando aperta o botão submit
    todoInput.value= ''
    todoInput.focus()
     // Adicionar o elemento h3 à lista global
     h3Elements.push(todoTitle);
     console.log(h3Elements)
}
// Função para esconder e aparecer o edit

const toggleForms = function(){
    editForm.classList.toggle("hide")
    todoForm.classList.toggle("hide")
    todoList.classList.toggle("hide")
}
// função do edit
const updateTodo = function(text){
    const todos = document.querySelectorAll(".todo")

    todos.forEach(function(todo){
        let todoTitle = todo.querySelector("h3")
       
        if (todoTitle.innerText === oldInputValues){
            todoTitle.innerText= text
        }
    }) 

}


// Evento 1- Evento para o botão submit e também adiciona o input na lista do todo
todoForm.addEventListener("submit", function(ev){
    ev.preventDefault();
    
    //save todoinput
    const inputValue = todoInput.value;

    if(inputValue){
    saveTodo(inputValue);
        
    }

})

//Evento para o botão check
document.addEventListener('click', function(ev){
   
    //saber qual elemento foi clicado
    const targetEl = ev.target
    const parentEl = targetEl.closest("div")// selecionando a div mais próxima

    // Criação do título novo (edit) com uma verificação para não conter erro
    let todoTitle;
    if(parentEl && parentEl.querySelector("h3")){
        todoTitle = parentEl.querySelector("h3").innerText
    }


    if(targetEl.classList.contains("finish-todo")) {
        parentEl.classList.toggle("feito") //usa-se toggle para fazer e desfazer a ação do botão
    }
    //Evento para o botão Remove

    if(targetEl.classList.contains("remove-todo")) {
        parentEl.remove()
    }
    //Evento para o botão edit
    if(targetEl.classList.contains("edit-todo")) {
       toggleForms()

        editInput.value = todoTitle
        oldInputValues = todoTitle
    }


})

//BOTÃO CANCELAR DO EDIT

cancelEditBtn.addEventListener("click", function(ev){
    ev.preventDefault()
    toggleForms()

})

//BOTÃO PARA A TROCA DA TASK NO EDIT
editForm.addEventListener("submit", function(ev){
    ev.preventDefault()

    const editInputValue = editInput.value

    if(editInputValue) {
        //atualizar

        updateTodo(editInputValue)
    }
    toggleForms()
})



// Função para realizar a busca no título das tasks
const searchTodo = function(ev) {
    ev.preventDefault()
    const searchTerm = document.querySelector("#search2").value.toLowerCase(); // Pegar o valor do input da busca e converter para minúsculas

    h3Elements.forEach(function(todoTitle) {
        const titleText = todoTitle.innerText.toLowerCase(); // Pegar o texto do h3 e converter para minúsculas

        if (titleText.includes(searchTerm)) {
            todoTitle.parentNode.style.display =  "block"; // Se a busca estiver contida no texto, exibir a div pai (div com classe 'todo')
            todoTitle.parentNode.style.display = "flex"
        } else {
            todoTitle.parentNode.style.display = "none"; // Caso contrário, esconder a div pai
        }
        
             
    });
};
// Evento para o botão de busca
document.querySelector("#search-button").addEventListener("click", searchTodo);



/// Função para exibir todos os elementos h3 novamente
const showAllTodos = function() {
    const searchTerm = document.querySelector("#search2").value = ''

    h3Elements.forEach(function(todoTitle) {
        const titleText = todoTitle.innerText.toLowerCase();

        if (titleText.includes(searchTerm)) {
            todoTitle.parentNode.style.display = "block";
            todoTitle.parentNode.style.display = "flex"
        } else {
            todoTitle.parentNode.style.display = "none";
        }

    });
};


// Evento para o botão "erase-button"
document.querySelector("#erase-button").addEventListener("click", function(ev) {
    ev.preventDefault();
    
    showAllTodos(); // Chamar a função para exibir todos os elementos h3 novamente
});
