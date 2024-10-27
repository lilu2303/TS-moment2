// Definiera ett interface och exportera denna
export interface ToDo {
    task: string;
    completed: boolean;
    priority: number;
}

// Implementering av ToDoList-klassen och exportera denna
export class ToDoList {
    todos: ToDo[] = []; // Array med todos

    // Lägg till nya todos med prioritet, returnera true om korrekt
    addToDo(task: string, priority: number): boolean {
        if (task.trim() === '' || priority < 1 || priority > 3) {
            return false;
        }

        const newToDo: ToDo = {
            task: task,
            completed: false,
            priority: priority,
        };

        this.todos.push(newToDo); // Lägg till ny todo
        this.saveToLocalStorage(); // Spara i localstorage
        return true;
    }

    constructor() {
        this.loadFromLocalStorage();
    }

    // Markera todo som klar
    markTodoCompleted(todoIndex: number): void {
        if (todoIndex >= 0 && todoIndex < this.todos.length) {
            this.todos[todoIndex].completed = true;
            this.saveToLocalStorage();
        }
    }

    // Hämta hela listan av todos
    getTodos(): ToDo[] {
        return this.todos;
    }

    // Spara todos till LocalStorage
    saveToLocalStorage(): void {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    // Hämta todos från LocalStorage
    loadFromLocalStorage(): void {
        const savedToDos = localStorage.getItem('todos');
        if (savedToDos) {
            this.todos = JSON.parse(savedToDos);
        }
    }

    // Ta bort en uppgift
    removeTodo(index: number): void {
        if (index >= 0 && index < this.todos.length) {
            this.todos.splice(index, 1); // Ta bort element från index
            this.saveToLocalStorage(); // Uppdatera localstorage
        }
    }
}
