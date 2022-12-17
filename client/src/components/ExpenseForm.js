import './ExpenseForm.css'
import React, {useState} from 'react';


const ExpenseForm = () => {

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

    const nameChangeHandeler = (event) => {
        setName(event.target.value);
    }
    const priceChangeHandeler = (event) => {
        setPrice(event.target.value);
    }

    const submitHandler = (event) => {
        event.preventDefault();

        const expenseData = {
            name: name,
            price: price,
        };
        fetch('http://localhost:3000/products/r', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(expenseData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        setName('');
        setPrice('');
    }

    return (
        <form onSubmit={submitHandler}>
            <div className="new-expense__controls">
                <div className="new-expense__control">
                    <label>Name</label>
                    <input type='text' value={name} onChange={nameChangeHandeler}/>
                </div>
                <div className="new-expense__control">
                    <label>Price</label>
                    <input type='number' min="1" step="1" value={price} onChange={priceChangeHandeler}/>
                </div>
            </div>
            <div className="new-expense__actions">
                <button type="submit">Add game</button>
            </div>
        </form>
    );


}

export default ExpenseForm;