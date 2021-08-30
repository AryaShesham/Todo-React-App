import React, { useState, useEffect, useRef } from 'react'

function TodoForm(props) {

    const [input, setInput] = useState('');

    const inputRef = useRef(null)

    useEffect(() => {
        inputRef.current.focus()
    })


    const handleChange = e => {
        setInput(e.target.value);       //To get the data which we input as 'todo' 
    };

    const handleSubmit = e => {
        e.preventDefault();         // To prevent from getting refresh after every click.

        props.onSubmit({
            id: Math.floor(Math.random() * 11111),
            text: input
        });

        setInput('');
    };

    return (
        <form className="todo-form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Add a todo"
                value={input}
                name="text"
                className="todo-input"
                onChange={handleChange}
                ref={inputRef}
            />
            <button className="todo-button">Add Todo</button>
        </form>
    )
}

export default TodoForm
