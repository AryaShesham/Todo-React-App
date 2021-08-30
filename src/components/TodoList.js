import React, { useState, useEffect } from 'react'
import Todo from './Todo'
import TodoForm from './TodoForm'
import todo from "../images/todo.svg"

function TodoList() {

    // get local data:
    const getLocalData = () => {
        let list = localStorage.getItem('lists');
        if (list) {
            return JSON.parse(localStorage.getItem('lists'));       // To convert list data from sting to aray.
        }
        else {
            return [];
        }
    }

    const [todos, setTodos] = useState(getLocalData());

    // add a todo:
    const addTodo = todo => {
        if (!todo.text || /^\s*$/.test(todo.text)) {
            return
        }

        const newTodos = [...todos, todo]

        setTodos(newTodos);
    };

    // edit a todo:
    const updateTodo = (todoId, newValue) => {
        if (!newValue.text || /^\s*$/.test(newValue.text)) {
            return;
        }

        setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)));
    };

    // delete a todo:
    const removeTodo = id => {

        const removeArr = [...todos].filter(todo => todo.id !== id)     // will return all todos except the one with which the 'id' is matching.

        setTodos(removeArr);
    }

    const completeTodo = id => {
        let updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                todo.isComplete = !todo.isComplete;
            }
            return todo;
        });
        setTodos(updatedTodos);
    };

    // Remove all todos:
    const removeAll = () => {
        setTodos([]);
    }

    // add data to localStorage:
    useEffect(() => {
        localStorage.setItem('lists', JSON.stringify(todos))
    }, [todos]);



    return (
        <div>
            <div className="images">
                <figure>
                    <img src={todo} alt="todoLogo" class="filter-svg" />
                    <figcaption><h1>What's the Plan for Today ?</h1></figcaption>

                </figure>
            </div>
            <div>
                <TodoForm onSubmit={addTodo} />
                <Todo
                    todos={todos} completeTodo={completeTodo} removeTodo={removeTodo} updateTodo={updateTodo}
                />
            </div>
            <div className="removeAllTodos">
                <button className="btn animation" data-sm-link-text="Remove All" onClick={removeAll}><span>Checklist</span></button>
            </div>
        </div>
    );
}

export default TodoList;
