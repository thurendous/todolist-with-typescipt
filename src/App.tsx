import React, { useState, useRef } from 'react'

import './App.css'

function App() {
    const [inputValue, setInputValue] = useState<string>('')
    const [todos, setTodos] = useState<Todo[]>([])
    const inputRef = useRef<HTMLInputElement>(null)

    type Todo = {
        inputValue: string
        id: number
        checked: boolean
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value)
        setInputValue(e.target.value)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // 新しいtodoを作成
        const newTodo: Todo = {
            inputValue: inputValue,
            id: todos.length,
            checked: false,
        }

        setTodos([newTodo, ...todos])
        inputRef.current!.value = ''
        setInputValue('')
    }

    const handleEdit = (id: number, inputValue: string) => {
        const newTodos = todos.map((todo) => {
            if (todo.id === id) {
                todo.inputValue = inputValue
            }
            return todo
        })
        setTodos(newTodos)
    }

    const handleCheck = (id: number, checked: boolean) => {
        const newTodos = todos.map((todo) => {
            if (todo.id === id) {
                todo.checked = !checked
            }
            return todo
        })
        setTodos(newTodos)
    }

    const handleDelete = (id: number) => {
        const newTodos = todos.filter((todo) => todo.id !== id)
        setTodos(newTodos)
    }

    return (
        <div className="App">
            <div>
                <h2>todo list with typescript</h2>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <input
                        type="text"
                        onChange={(e) => handleChange(e)}
                        className="inputText"
                        ref={inputRef}
                    />
                    <input
                        type="submit"
                        value="create"
                        className="submitButton"
                    />
                </form>
                <ul className="todoList">
                    {todos.map((todo) => (
                        <li key={todo.id}>
                            <input
                                type="text"
                                onChange={(e) =>
                                    handleEdit(todo.id, e.target.value)
                                }
                                className="inputText"
                                value={todo.inputValue}
                                disabled={todo.checked}
                            />
                            <input
                                type="checkbox"
                                onChange={(e) =>
                                    handleCheck(todo.id, todo.checked)
                                }
                            />
                            <button onClick={() => handleDelete(todo.id)}>
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default App
