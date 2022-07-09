import React, {ChangeEvent,KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from "./App";

type TodolistPropsType = {
    tasks: TaskType[]
    removeTask: (id: string) => void
    addTask: (t: string) => void
    changeStatus: (id: string, isDone: boolean) => void
    changeFilter: (value: FilterValuesType) => void
    filter: FilterValuesType
}

const Todolist = (props: TodolistPropsType) => {



    let TasksForRender = props.tasks;

    if (props.filter === 'active') {
        TasksForRender = props.tasks.filter(t => t.isDone === false);
    }

    if (props.filter === 'completed') {
        TasksForRender = props.tasks.filter(t => t.isDone === true);
    }

    const [value, setValue] = useState<string>('');
    const [error, setError] = useState('');


    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value);
        setError('');
    }

    const onAddClickHandler = () => {
        if(value.trim() === '') {
            setError('Title is required');
            return;
        } else {
            props.addTask(value.trim());
            setValue('');
        }
    }

    const onKeyPressClickHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') onAddClickHandler();
    }

    const tasksJSXElements = TasksForRender.map(t => {

        const onRemoveClickHandler = () => {
            props.removeTask(t.id);
        }

        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeStatus(t.id, e.currentTarget.checked);
        }

        return (
            <ul style={{listStyle: "none"}}>
                <li  className={t.isDone ? 'completedtask' : ''} key={t.id}>
                    <input checked={t.isDone} onChange={onChangeStatusHandler} type='checkbox'/>
                    {t.title}
                    <button onClick={onRemoveClickHandler}>x</button>
                </li>
            </ul>
        )
    });
    return (
        <div>
            <h1>What to learn</h1>
            <input className={error ?'error' : ''} value={value} onChange={onChangeHandler} onKeyPress={onKeyPressClickHandler} type="text"/>
            <button onClick={onAddClickHandler}>+</button>
            <div className={error ? 'errorText' : ''}>{error}</div>
            {tasksJSXElements}
            <button className={props.filter === 'all' ? 'lightfilter' : ''} onClick={() => props.changeFilter('all')}>All</button>
            <button className={props.filter === 'active' ? 'lightfilter' : ''} onClick={() => props.changeFilter('active')}>Active</button>
            <button className={props.filter === 'completed' ? 'lightfilter' : ''} onClick={() => props.changeFilter('completed')}>Completed</button>
        </div>
    );
};

export default Todolist;