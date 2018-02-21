import * as React from 'react'
import TodoStore from './TodoStore'
import { Todo } from './Interfaces'
import TodoItem from "./TodoItem"

interface TodoListProps  { }

interface TodoListState {
    todos: Todo[],
    newTodo: string
}

export default class TodoList extends React.Component<TodoListProps, TodoListState> {

    private store: TodoStore = new TodoStore()
    private toggleTodo: (todo:Todo) => void
    private destroyTodo: (todo:Todo) => void
    private updateTitle: (todo: Todo, title: string) => void
    private clearCompleted: () => void

    constructor(props: TodoListProps) {
        super(props)

        this.state = {
            // How it should look like
            todos: [],
            newTodo: ''
        }

        this.store.onChange((store) => {
            this.setState({todos: store.todos})
        })


        // to get the right reference without any intermix (ohne verweben)
        this.toggleTodo = this.store.toggleTodo.bind(this.store)

        this.destroyTodo = this.store.removeTodo.bind(this.store)

        this.updateTitle = this.store.updateTitle.bind(this.store)

        this.clearCompleted = this.store.clearCompleted.bind(this.store)
    }

    componentDidMount () {

        this.store.addTodo('Hallo')
        this.store.addTodo('Imad')
    }

    get remainingCount (): number {
        return this.state.todos.reduce((count, todo) => !todo.completed ? count + 1 : count, 0)
    }

    get completedCount (): number {
        return this.state.todos.reduce((count, todo) => todo.completed ? count + 1 : count, 0)
    }

    //toggleTodo = (todo: Todo) => {
    //    this.store.toggleTodo(todo)
    //    this.setState({todos: this.store.todos})
    //}

    render() {

        let {todos, newTodo} = this.state
        let remainingCount = this.remainingCount
        let completedCount = this.completedCount
        return <section className = "todoapp">

            <header className="header">
                <h1>just Test</h1>
                <input
                    className="new-todo"
                    value={newTodo}
                    placeholder="What do you want to add?"
                    onKeyPress={this.addTodo}
                    onInput={this.updateNewTodo}
                />
            </header>
            <section className="main">
                <input className="toggle-all" type="checkbox" checked={remainingCount === 0} onChange={this.toggle}/>
                <label htmlFor= "toggle-all"> Mark all as complete </label>
                <ul className="todo-list" >

                  {todos.map( todo => {
                    return  <TodoItem
                        todo ={todo}
                        key={todo.id}
                        onToggle={this.toggleTodo}
                        onDestroy={this.destroyTodo}
                        onUpdate={this.updateTitle}
                    />

                })}

                </ul>

            </section>
            <footer className="footer" >
                {this.remainingCount  > 0 &&
                    <span className="todo-count" >
                        <strong >{this.remainingCount }</strong>
                        <span > </span>
                        <span >item{ this.remainingCount  > 1 && 's'}</span>
                        <span > left</span>
                    </span>
                }
                <ul className="filters">
                    <li >
                        <a href="#/" className="selected" >All</a>
                    </li>
                    <span > </span>
                    <li >
                        <a href="#/active" className="" >Active</a>
                    </li>
                    <span > </span>
                    <li >
                        <a href="#/completed" className="">Completed</a>
                    </li>
                </ul>

                {completedCount > 0 && <button className="clear-completed" onClick={this.clearCompleted}>Clear completed</button>}
            </footer>
        </section>
    }

    updateNewTodo = (e: React.FormEvent<HTMLInputElement>) => {

        this.setState({newTodo: (e.target as HTMLInputElement).value})
    }

    addTodo = (e: React.KeyboardEvent<HTMLInputElement>) => {

        if ( e.key === 'Enter') {

            this.store.addTodo(this.state.newTodo)
            this.setState({newTodo: ''})
        }
    }

    toggle = (e: React.FormEvent<HTMLInputElement>) => {
        this.store.toggleAll(this.remainingCount > 0)
    }
}
