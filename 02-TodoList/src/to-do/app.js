import todoStore, { Filters } from '../store/todo.store';
import html from './app.html?raw';
import { renderTodos, renderPending } from './use-cases';

const ElementsIds = {
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
    ClearCompleted: '.clear-completed',
    ToDoFilters: '.filtro',
    PendingCountLabel: '#pending-count'
}

/**
 *
 * @param {string} elementId
 */

export const App = (elementId) => {

    const displayTodos = () => {
        const todos = todoStore.getTodos(todoStore.getCurrentFilter())
        renderTodos(ElementsIds.TodoList, todos)
        updatePendingCount()
    }

    const updatePendingCount = () => {
        renderPending(ElementsIds.PendingCountLabel)
    }

    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app)
        displayTodos()
    })();


    //References HTML
    const newDescriptionInput = document.querySelector(ElementsIds.NewTodoInput)
    const todoListUl = document.querySelector(ElementsIds.TodoList)
    const btnClearCompleted = document.querySelector(ElementsIds.ClearCompleted)
    const filtersUl = document.querySelectorAll(ElementsIds.ToDoFilters)


    newDescriptionInput.addEventListener('keyup', (event) => {
        // console.log(event.target.value); Se obtiene el valor del input

        if (event.keyCode !== 13) return;
        if (event.target.value.trim().length === 0) return

        todoStore.addTodo(event.target.value)
        displayTodos()

        event.target.value = ''

    });

    todoListUl.addEventListener('click', (event) => {
        const element = event.target.closest('[data-id]')
        todoStore.toggleTodo(element.getAttribute('data-id'))
        displayTodos()
    });

    todoListUl.addEventListener('click', (event) => {
        const isDestroyElement = event.target.className === 'destroy'
        const element = event.target.closest('[data-id]')

        if (!isDestroyElement || !element) return;
        todoStore.deleteTodo(element.getAttribute('data-id'))
        displayTodos()
    });

    btnClearCompleted.addEventListener('click', () => {
        todoStore.deleteCompleted()
        displayTodos()
    });

    filtersUl.forEach(element => {
        element.addEventListener('click', (element) => {
            filtersUl.forEach(el => el.classList.remove('selected'));
            element.target.classList.add('selected')

            //Obtener el texto Todos-Pendientes-Completados
            switch (element.target.text) {
                case 'Todos':
                    todoStore.setFilter(Filters.All)
                    break;

                case 'Pendientes':
                    todoStore.setFilter(Filters.Pending)
                    break;

                case 'Completados':
                    todoStore.setFilter(Filters.Completed)
                    break;
            }

            displayTodos()
        })
    });
}