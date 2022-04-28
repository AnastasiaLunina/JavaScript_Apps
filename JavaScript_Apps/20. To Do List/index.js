const toDoInput = document.querySelector('.todo_input');
const toDoButton = document.querySelector('.todo_button');
const toDoList = document.querySelector('.todo_list');

toDoButton.addEventListener('click', () => {
    // creating list
    const toDoListElement = document.createElement('li');
    
    // getting access to input field
    toDoListElement.innerText = toDoInput.value;
    // to prevent from adding an add empty field
    if (toDoInput.value.length === 0) {
        return false;
        }
    // creating an item to add style to user input
    toDoListElement.classList.add('todo_list_element');
    toDoList.appendChild(toDoListElement);
    
    // clear input field
    toDoInput.value = ''
    
    // adding new item to add style and cross out user input
    toDoListElement.addEventListener('click', () => {
        toDoListElement.classList.add('todo_completed');
    })

    // deleting  tasks (opposite to append)
    toDoListElement.addEventListener('dblclick', () => {
    toDoList.removeChild(toDoListElement);
    })
})