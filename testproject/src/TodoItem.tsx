import * as React from 'react'
import { Todo } from './Interfaces'
import * as cx from 'classnames'
import {ChangeEvent, MouseEvent, FormEvent} from "react"

interface Props {
    todo: Todo
    onToggle: (todo: Todo) => void
    onDestroy: (todo: Todo) => void
    onUpdate: (todo: Todo, title: string) => void
}

interface State {
    editing: boolean
    title: string
}

export  default class TodoItem extends React.PureComponent<Props,State> {

    constructor (props: Props) {

        super(props)
        this.state = {
            editing: false,
            title: ''
        }
    }

    render () {

        // create a var and get it from properties 'props'
        let {todo} = this.props
        let {editing, title } = this.state
        return  <li className={cx({completed: todo.completed, editing})}>
                <div className="view" >
                    <input className="toggle" type="checkbox" onChange={this.toggle} checked={todo.completed}/>
                    <label onDoubleClick={this.startEditing}>{ todo.title}</label>
                    <button className="destroy" onClick={this.destroy}/>
                </div>
                <input
                    className="edit"
                    value={title}
                    onBlur={this.handleSubmit}      // when enter clicked
                    onKeyDown={this.handleKeyDown}  // when escape
                    onInput={this.handleInput}      // when tapping clicked
                    type="text"
                />
            </li>
    }

    toggle = (e: ChangeEvent<HTMLInputElement>) => {
        // the prevent default was removed to avoid misfunction
        //e.preventDefault()

        // we give it he fct we ve got before
        this.props.onToggle(this.props.todo)
    }

    destroy = (e: MouseEvent<HTMLButtonElement>) => {

        this.props.onDestroy(this.props.todo)
    }

    startEditing = (e: React.MouseEvent<HTMLLabelElement>) => {
        this.setState({editing: true, title: this.props.todo.title})
    }

    handleSubmit = () => {
        this.props.
    }

    handleInput = (e: React.FormEvent<HTMLInputElement>) => {
        this.setState( {title: (e.target as HTMLInputElement).value})
    }

    handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Escape') {
            this.setState({editing: false})
        }else if (e.key === 'Enter') {

            this.props.onUpdate(this.props.todo, this.state.title)
        }
    }
}