import React from 'react';

import TodoSingleItem from './TodoSingleItem';

const TodoList = (props) => {

    if(!props.list.length) {
        return(
                <div className='empty-event'>
                    <p>Your Todo List is empty </p>
                    <p className='line'/>
                </div>  

            )   
    }

    let doneItems = []
    let undoneItems = props.list.map( item => {
        if(item.isDone){
            doneItems.push(item)
            return null
        }
        return(
            <TodoSingleItem key={item.id} 
            task={item.task}
            endDate={item.endDate}
            isDone={item.isDone}
            delete={() => props.delete(item.id)}
            doneTask={() => props.doneTask(item.id)}
            undoneTask={() => props.undoneTask(item.id)}/>
        )
    })

    return(
        <div>
            <ul>
                { undoneItems }
                {doneItems.map(item => (
                    <TodoSingleItem key={item.id} 
                                task={item.task}
                                endDate={item.endDate}
                                isDone={item.isDone}
                                delete={() => props.delete(item.id)}
                                doneTask={() => props.doneTask(item.id)}
                                undoneTask={() => props.undoneTask(item.id)}/>
                ))}
            </ul>
        </div>
    )

}

export default TodoList;