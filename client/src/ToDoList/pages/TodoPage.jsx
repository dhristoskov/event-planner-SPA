import React, { Fragment, useReducer, useEffect, useState, useCallback } from 'react'
import axios from '../../axios';

import TodoList from '../components/TodoList'; 
import AddTodoItem from '../components/AddTodoItem';
import Loader from '../../shared/components/Loader/Loader';
import ToggleButton from '../../shared/components/Buttons/ToggleButton';
import Pagination from '../../shared/components/Pagination/Pagination';

const toDoReducer = ( state, action ) => {
    switch(action.type){
        case 'GET':
            return action.tasks;
        case 'ADD':
            return [...state, action.tasks ]
        case 'DELETE':
            return state.filter(task => task.id !== action.id);
        case 'DONE':
            return state.map(task => task.id === action.id ? { ...task, isDone: true}: task);
        case 'UNDONE':
            return state.map(task => task.id === action.id ? { ...task, isDone: false}: task)
        default:
            return state;
    }
};

const TodoPage = (props) => {

    const [ tasks, dispatch ] = useReducer(toDoReducer, []);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ toggleForm, setToggleFrom ] = useState(false);
    const [ currentPage, setCurrenPage ] = useState(1);
    const itemsPerPage = 5;
    const { eventId } = props;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = tasks.slice(indexOfFirstItem, indexOfLastItem);

    useEffect(() => {
        setIsLoading(true);
        axios.get(`/tasks/event/${eventId}`)
             .then(res => {
                setIsLoading(false);
                dispatch({type: 'GET', tasks: res.data.tasks})
             }).catch(err => {
                setIsLoading(false);
                console.log(err);
             })
    }, [eventId])

    const addNewTask = useCallback((task) => {    
        setIsLoading(true);
        axios.post('/tasks', task, 
        { 'Content-Type': 'application/json' })
             .then(res => {
                setIsLoading(false);
                dispatch({type: 'ADD', tasks:{id:res.data.task._id, ...res.data.task}})
             }).catch(err => {
                setIsLoading(false);
                console.log(err);
             })
    }, []);

    const deleteTask = useCallback((taskId) => {
        setIsLoading(true);
        axios.delete(`/tasks/${taskId}`)
             .then(res => {
                 setIsLoading(false);
                 dispatch({type: 'DELETE', id: taskId})
             }).catch(err => {
                setIsLoading(false);
                console.log(err)
             });
    }, [])

    const doneTask = useCallback((taskId) => {
        setIsLoading(true);
        axios.patch(`/tasks/${taskId}`, {isDone : true},
                { 'Content-Type': 'application/json' })
             .then(res => {
                setIsLoading(false);
                dispatch({type:'DONE', id: taskId})
             }).catch(err => {
                setIsLoading(false);
                console.log(err)
             });
    }, []);

    const undoneTask = useCallback((taskId) => {
        setIsLoading(true);
        axios.patch(`/tasks/${taskId}`, {isDone : false},
                { 'Content-Type': 'application/json' })
             .then(res => {
                setIsLoading(false);
                dispatch({type: 'UNDONE', id:taskId})
             }).catch(err => {
                setIsLoading(false);
                console.log(err)
             })
    }, []);

    const onToggleForm = () => {
        setToggleFrom(prevState => !prevState);
    };

    const onPaginationHandler = (number) => {
        setCurrenPage(number)
    };

    return(
        <div>
            {
                isLoading ? <Loader />
                :
                <Fragment>                 
                    {
                        ! toggleForm ? 
                        <ToggleButton onToggle={onToggleForm}>Create Task</ToggleButton>
                        :
                        <AddTodoItem addTask={addNewTask}
                        onToggle={onToggleForm}
                        eventId={eventId}/>
                    }
                    {
                        tasks.length > 0 && 
                        <p className='list-counter'>You have {tasks.length} {tasks.length === 1 ? 'Task' : 'Tasks'} in your list</p>
                    }
                    <TodoList list={currentItems}
                    delete={deleteTask}
                    doneTask={doneTask}
                    undoneTask={undoneTask}/>
                    { tasks.length > 5 && 
                    <Pagination totalItems={tasks.length}
                    itemsPerPage={itemsPerPage}
                    pagination={onPaginationHandler}/>
                    }
                </Fragment>
            }
        </div>
    )
}

export default TodoPage;