import React from 'react';
import { AiOutlineDelete, AiOutlineCheckCircle, AiOutlineUndo } from 'react-icons/ai';

const TodoSingleItem = (props) => {

    let date = new Date(props.endDate).toLocaleDateString('de-DE');

    return(     
        <div style={{background: props.isDone && '#BFF1B3'}} className='todo-container'>
            <div className='todo-info'>
                <p>{props.task}</p>
                <p>Untill: {date}</p>
            </div>
            <div className='todo-buttons'>
                <p onClick={props.delete}><AiOutlineDelete /></p>
                {
                    !props.isDone ? 
                    <p onClick={props.doneTask}><AiOutlineCheckCircle /></p>
                    :
                    <p onClick={props.undoneTask}><AiOutlineUndo /></p>
                }          
            </div>
        </div>
    )

}

export default TodoSingleItem;

