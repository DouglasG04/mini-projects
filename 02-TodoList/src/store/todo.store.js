import { Todo } from "../to-do/models/todo.model";

export const Filters = {
    All: 'all',
    Completed: 'completed',
    Pending: 'pending'
}

const state = {
    todos: [
        new Todo("EXAMEN II - FUNDAMENTOS DE PROGRAMACION"),
        new Todo("ENTREGAR AVANCE II - LOGICA Y MATEMATICAS")
    ],
    filter: Filters.All
}


const initStore = () => {
    loadStore()
    console.log("Store initialized")
}

const loadStore = () => {
    if (!localStorage.getItem('state')) return

    const { todos = [], filters = Filters.All } = JSON.parse(localStorage.getItem('state'))
    state.todos = todos
    state.filter = filters
}

const saveStateLocalStorage = () => {
    localStorage.setItem('state', JSON.stringify(state))
}

const getTodos = (filter = Filters.All) => {
    switch (filter) {
        case Filters.All:
            return [...state.todos]

        case Filters.Completed:
            return state.todos.filter(todo => todo.done)

        case Filters.Pending:
            return state.todos.filter(todo => !todo.done)

        default:
            throw new Error(`Option ${filter} is not valid`)
    }
}


/**
 * 
 * @param {String} description 
 */
const addTodo = (description) => {
    if (!description) {
        throw new Error("Description is required")
    }

    state.todos.push(new Todo(description))
    saveStateLocalStorage();
}

/**
 * 
 * @param {String} todoId 
 */
const toggleTodo = (todoId) => {
    state.todos = state.todos.map(todo => {
        if (todo.id === todoId) {
            todo.done = !todo.done //Pasa de false a true o viceversa
        }
        return todo;
    })

    saveStateLocalStorage();
}

const deleteTodo = (todoId) => {
    // Va retornar todos los todos con la id diferente que entra en parametro
    state.todos = state.todos.filter(todo => todo.id !== todoId);
    saveStateLocalStorage();
}

const deleteCompleted = () => {
    state.todos = state.todos.filter(todo => !todo.done);
    saveStateLocalStorage();
}


/**
 * 
 * @param {Filters} newFilter 
 */
const setFilter = (newFilter = filter.All) => {
    state.filter = newFilter;
    saveStateLocalStorage();
}

const getCurrentFilter = () => {
    return state.filter;
}



export default {
    initStore,
    loadStore,
    getTodos,
    addTodo,
    toggleTodo,
    deleteTodo,
    deleteCompleted,
    setFilter,
    getCurrentFilter
}