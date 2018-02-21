import * as React from 'react'
import { render } from 'react-dom'
import TodoList from './TodoList'
// import s from './TodoStore'

// to display the different errors
// console.log(s)

render(
    <TodoList/>,
    document.getElementById('app') as Element
)
