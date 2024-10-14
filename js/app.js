const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

// Manejar el evento de envío del formulario
taskForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Obtener el valor del input
    const taskText = taskInput.value;

    // Crear un nuevo elemento de lista (li)
    const newTask = document.createElement('li');
    newTask.innerHTML = `
        <span>${taskText}</span>
        <div>
            <button class="complete-btn" onclick="completarTarea(this)">Completar</button>
            <button class="edit-btn" onclick="modificarTarea(this)">Modificar</button>
            <button class="delete-btn" onclick="eliminarTarea(this)">Eliminar</button>
        </div>
    `;

    // Agregar la nueva tarea a la lista de tareas
    taskList.appendChild(newTask);

    // Limpiar el input
    taskInput.value = '';
});

// Función para completar una tarea
function completarTarea(button) {
    const taskItem = button.parentElement.parentElement;
    taskItem.classList.toggle('completed');
}

// Función para eliminar una tarea
function eliminarTarea(button) {
    const taskItem = button.parentElement.parentElement;
    taskList.removeChild(taskItem);
}

// Función para modificar una tarea
function modificarTarea(button) {
    const taskItem = button.parentElement.parentElement;
    const taskTextElement = taskItem.querySelector('span');
    
    // Crear un input con el texto actual
    const input = document.createElement('input');
    input.type = 'text';
    input.value = taskTextElement.textContent;
    
    // Reemplazar el texto con el input
    taskItem.replaceChild(input, taskTextElement);

    // Cambiar el botón de modificar a "Guardar"
    button.textContent = 'Guardar';
    button.onclick = function() {
        // Guardar el texto modificado
        const newText = input.value;
        const newTaskText = document.createElement('span');
        newTaskText.textContent = newText;

        // Reemplazar el input con el texto actualizado
        taskItem.replaceChild(newTaskText, input);

        // Cambiar el botón de "Guardar" de vuelta a "Modificar"
        button.textContent = 'Modificar';
        button.onclick = function() {
            modificarTarea(button);
        }
    };
}