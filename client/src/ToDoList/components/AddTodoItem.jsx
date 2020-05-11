import React, { useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai'

const AddTodoItem = (props) => {

    const [newTask, setNewTask] = useState({
        task: '',
        endDate: '',
        toEvent: props.eventId,
        isDone: false
    });

    const { task, endDate } = newTask;

    const onChangeHandler = (e) => {
        setNewTask({...newTask, [e.target.name]:e.target.value});
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();     
        props.addTask(newTask)
        setNewTask({
            task: '',
            endDate: ''
        });
    }

    return(
        <div className='todo-form-wrapper'>
            <p className='close-btn' onClick={props.onToggle}><AiOutlineCloseCircle /></p>
            <h1>Create new task</h1>
            <form className='todo-form' onSubmit={onSubmitHandler}>
                <input type='text' name='task' value={task} placeholder='Enter new task' 
                required onChange={onChangeHandler} />
                <div>
                    <input type='date' name='endDate' value={endDate} placeholder='End date' 
                    required onChange={onChangeHandler} />
                    <input type='submit' value='Submit' />
                </div>
            </form>
        </div>
    )
}

export default AddTodoItem;