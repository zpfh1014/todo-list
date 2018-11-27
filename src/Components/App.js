import React, { Component } from 'react';
import PageTemplate from './PageTemplate';
import TodoInput from './TodoInput';
import TodoList from './TodoList';

const initialTodos = new Array(500).fill(0).map(
    (foo, index) => ({ 
        id: index, 
        text: `일정 ${index}`,
        done: false 
    })
);

class App extends Component {
    state = {
        input: '',
        todos: initialTodos
    }

    id = 1
    getId = () => {  
        return ++this.id; // 현재 값에서 ++1 더함
    }
    handleChange = (e) => {
        const { value } = e.target;
        this.setState({
            input: value
        });
    }
    
    // 새 객체 추가
    handleInsert = () => {
        const { input, todos } = this.state;
        const newTodo = {
            id: this.getId(),
            text: input,
            done: false
        }

        this.setState({
            todos: [...todos, newTodo],
            input: ''
        });
    }    

    handleToggle = (id) => {
        const { todos } = this.state;
        const idx = todos.findIndex(todo => todo.id === id);

        const toggled = {
            ...todos[idx], 
            done: !todos[idx].done
        }        

        this.setState({
            todos : [
                ...todos.slice(0, idx),
                toggled,
                ...todos.slice(idx + 1, todos.length),
            ]
        });
    }
    
    handleRemove = (id) => {
        const { todos } = this.state;
        const idx = todos.findIndex(todo => todo.id === id);

        this.setState({
            todos : [            
                ...todos.slice(0, idx),
                ...todos.slice(idx + 1, todos.length),
            ]            
        }); 
    }

    render() {
        const { input, todos } = this.state;
        const { handleChange, handleInsert, handleToggle, handleRemove } = this;

        return (
            <PageTemplate>
                <TodoInput onChange={handleChange} onInsert={handleInsert} value={input}/>
                <TodoList todos={todos} onToggle={handleToggle} onRemove={handleRemove}/>
            </PageTemplate>
        )
    }
}

export default App;