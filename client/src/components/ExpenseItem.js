import React, {useState} from 'react';
import ExpenseDate from './ExpenseDate';
import './ExpenseItem.css'
import Card from './UI/Card'

function ExpenseItem(props) {

    const [isAdded, setIsAdded] = useState(false);

    const addHandler = () => {
        props.handleAdd();
        setIsAdded(true);
    }

    const removeHandler = () => {
        props.handleRemove();
        setIsAdded(false);
    }

    return (
        <Card className='expense-item'>
            <ExpenseDate number={props.number}/>
            <div className="expense-item__description ">
                <h2>{props.name}</h2>
                <div className="expense-item__price"> {props.price}</div>
            </div>
            <button disabled={isAdded} onClick={addHandler}>Add to cart</button>
            <button disabled={!isAdded} onClick={removeHandler}>Remove from cart</button>
        </Card>
    );
}

export default ExpenseItem;