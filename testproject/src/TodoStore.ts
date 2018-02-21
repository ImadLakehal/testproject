import { Todo } from './Interfaces'

declare type ChangeCallback =  (store: TodoStore) => void

export default class TodoStore {

    private static i = 0
    public todos: Todo [ ] = []
    private callbacks: ChangeCallback[] = []

    private static increment() {   // just to inrement the i value during our session

        return this.i++
    }

    inform () {
      this.callbacks.forEach(cb => cb (this))
    }

    onChange (cb: ChangeCallback) {
        this.callbacks.push(cb)
    }

    addTodo(title: string): void {
        // add en element at the end of the table

        if ((title !== '') && (title !== " ")) {  // we can use regex to avoid multiple white spaces

            this.todos = [{
                id: TodoStore.increment(),
                title: title,
                completed: false
            }, ...this.todos]
            this.inform()
        }

    }

    removeTodo(todo: Todo): void {
        // Move all the element to a new table except selected element
        this.todos = this.todos.filter(t => t !== todo)
        this.inform()
    }

    updateTitle(todo: Todo, title: string): void {
        //
        this.todos = this.todos.map(t => t === todo ? {...t, title} : t)
        this.inform()
    }

    clearCompleted(): void {
        // delete all completed tasks or just lose them
        this.todos = this.todos.filter(t => !t.completed)
        this.inform()
    }

    toggleTodo(todo: Todo): void {
        console.log(this)
        this.todos = this.todos.map(t => t === todo ? { ...t, completed: !t.completed } : t)
        this.inform()
    }

    toggleAll(completed = true): void {
        //
        this.todos = this.todos.map(t => completed !== t.completed ? {...t, completed} : t)
        this.inform()
    }
}
