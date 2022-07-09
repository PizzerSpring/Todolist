import React, {useState} from 'react';
import './App.css';
import Todolist from "./Todolist";
import {v1} from "uuid";

export type TaskType = {
    id: string;
    title: string
    isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed';

function App() {
    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: false},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
    ]);

    const [filter, setFilter] = useState<FilterValuesType>('all');

    alert(typeof setFilter)

    const addTask = (t: string) => {
        const newTask = {
            id: v1(), title: t, isDone: false
        }
        setTasks([...tasks, newTask]);
    }

    const removeTask = (id: string) => {
        tasks = tasks.filter(t => t.id !== id);
        setTasks(tasks);
    }

    const changeStatus = (id: string, isDone: boolean) => {
        const task = tasks.find(t => t.id === id);
        if(task) {
            task.isDone = isDone;
        }
        setTasks([...tasks]);
    }

    const changeFilter = (value: FilterValuesType) => {
        setFilter(value);
    }

    return (
        <div className="App">
            <Todolist
                tasks={tasks}
                removeTask={removeTask}
                addTask={addTask}
                changeStatus={changeStatus}
                changeFilter={changeFilter}
                filter={filter}
            />
        </div>
    );
}

export default App;
