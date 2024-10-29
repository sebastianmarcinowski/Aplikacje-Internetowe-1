
const today = new Date().toISOString().split('T')[0];
let tasks = [];
function dateSetup(){
    const newTaskDate = document.getElementById('new_task_date');
    newTaskDate.min = today;
}

function addFunction(task_value = '', taskDate= ''){

    //Sprawdzanie czy zadanie jest wczytywane z localStorage czy jest to nowe zadanie
    if(!task_value){
        const new_task = document.getElementById('add_task');
        task_value = new_task.value;
        if(task_value.length < 3 || task_value.length > 255){
            window.alert('Incorrect task length (3-255 signs)');
            return;
        }
    }

    const task_ID = "task" + Math.floor(Math.random() * Date.now());

    //Tworzenie "obiektu" nowego zadania
    const task_Paragraph = document.createElement('p');
    task_Paragraph.className = "task_container";
    task_Paragraph.id = task_ID;
    task_Paragraph.addEventListener('click', function(){
        editTask(task_ID);
    });

    const task_Checkbox = document.createElement('input')
    task_Checkbox.type = "checkbox";

    const task_Label = document.createElement('label');
    task_Label.className = "task_content"
    task_Label.textContent = task_value;

    const task_Date = document.createElement('label');
    task_Date.className = "date_label";
    let newDate = document.getElementById("new_task_date").value;
    if(newDate === ""){
        task_Date.textContent = today;
    }
    else{
        task_Date.textContent = newDate;
    }

    const del_Btn = document.createElement('button');
    del_Btn.textContent = "Delete";
    del_Btn.className = "del_button";

    task_Paragraph.appendChild(task_Checkbox);
    task_Paragraph.appendChild(task_Label);
    task_Paragraph.appendChild(task_Date);
    task_Paragraph.appendChild(del_Btn);
    document.getElementById('container').appendChild(task_Paragraph);

    del_Btn.addEventListener("click", function(){
        deleteTask(task_ID);
    });

    //czyszczenie pola do wpisania wartosci zadania
    document.getElementById('add_task').value = '';

    //wywolanie funkcji do zapisu zadan do localStorage
    saveTasks(task_ID, task_Label.textContent, task_Date.textContent);
}

function deleteTask(taskID) {
    const taskElement = document.getElementById(taskID);
    if (taskElement) {
        taskElement.remove();
    }

    tasks = tasks.filter(task => task.id !== taskID);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
function saveTasks(tID, tCont = '',tData=''){
    if (tCont){
        tasks.push({
            id: tID,
            content: tCont,
            date: tData
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(task => {
        if (task.content === ""){

        }
        else{
            addFunction(task.content, task.date);
        }
    });
}

function Search(){
    const searchValue = document.getElementById('search_task').value.toLowerCase();
    if(searchValue.length >= 2){
        tasks.forEach(task => {
            const taskElement = document.getElementById(task.id);
            const taskContentLabel = taskElement.children[1];
            taskContentLabel.innerHTML = task.content;

            if (task.content.toLowerCase().includes(searchValue)) {
                taskElement.style.display = '';
                const regex = new RegExp(`(${searchValue})`, 'gi');
                taskContentLabel.innerHTML = task.content.replace(regex, '<span class="highlight">$1</span>');
            } else {
                taskElement.style.display = 'none';
            }
        });
    }else{
        tasks.forEach(task => {
            const taskElement = document.getElementById(task.id);
            const taskContentLabel = taskElement.children[1];
            taskElement.style.display = '';
            taskContentLabel.innerHTML = task.content;
        });
    }
}

function editTask(taskID) {
    const taskElement = document.getElementById(taskID);
    const taskLabel = taskElement.querySelector('.task_content');
    const taskDateLabel = taskElement.querySelector('.date_label');

    // Sprawdzenie, czy tryb edycji jest już aktywny
    if (taskElement.querySelector('input[type="text"]') || taskElement.querySelector('input[type="date"]')) return;

    // Tworzenie pola tekstowego do edycji treści zadania
    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.value = taskLabel.textContent;
    editInput.className = 'edit_task_input expand-animation edit_spacing'; // Dodanie klasy odstępu

    // Tworzenie pola daty do edycji daty zadania
    const editDateInput = document.createElement('input');
    editDateInput.type = 'date';
    editDateInput.value = taskDateLabel.textContent;
    editDateInput.className = 'edit_task_date_input expand-animation edit_spacing';
    editDateInput.min = today;

    // Utworzenie przycisku "Edytuj"
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.className = 'edit_button';

    // Zastąpienie pól zadania, w trybie edycji
    taskElement.replaceChild(editInput, taskLabel);
    taskElement.replaceChild(editDateInput, taskDateLabel);
    taskElement.appendChild(editBtn);

    // Funkcja pomocnicza do zakończenia edycji
    function finishEditing(){
        const newContent = editInput.value.trim();
        const newDate = editDateInput.value || today;

        editInput.classList.remove('expand-animation');
        editDateInput.classList.remove('expand-animation');
        editInput.classList.add('shrink-animation');
        editDateInput.classList.add('shrink-animation');

        if (newContent.length >= 3 && newContent.length <= 255) {
            setTimeout(() => {
                taskLabel.textContent = newContent;
                taskDateLabel.textContent = newDate;

                // Update data
                const taskIndex = tasks.findIndex(task => task.id === taskID);
                if (taskIndex > -1) {
                    tasks[taskIndex].content = newContent;
                    tasks[taskIndex].date = newDate;
                    localStorage.setItem('tasks', JSON.stringify(tasks));
                }

                // Change edit fields back to normal mode
                taskElement.replaceChild(taskDateLabel, editDateInput);
                taskElement.replaceChild(taskLabel, editInput);
                taskElement.removeChild(editBtn);
            }, 10);
        }
        else {
            alert('Task length must be between 3 and 255 characters.');
        }
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            finishEditing();
        }
    };
    editInput.addEventListener('keypress', handleKeyPress);

    editBtn.addEventListener('click', function (){
        finishEditing();
    });
}

window.addEventListener('load', loadTasks);