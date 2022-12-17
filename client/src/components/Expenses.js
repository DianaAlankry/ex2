import ExpenseItem from './ExpenseItem'
import {useEffect, useState} from "react";

function Expenses() {
    const [products, setProducts] = useState([]);
    const [items, setItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const onAdd = (item) => () => {
        setProducts([...products, item]);
        setTotalPrice(totalPrice + item.price);
    };

    const onRemove = (item) => () => {
        setProducts(products.filter(product =>
            product.name !== item.name &&
            product.price !== item.price));
        setTotalPrice(totalPrice - item.price);
    };

    useEffect(() => {
        fetch("http://localhost:3000/products")
            .then((Response) => Response.json())
            .then((data) => setItems(data))
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className='expenses'>
            {items.map((item, index) =>
                <ExpenseItem
                    key={index}
                    name={item.name}
                    price={item.price}
                    date={item.date}
                    number={index + 1}
                    handleAdd={onAdd(item)}
                    handleRemove={onRemove(item)}
                />
            )}
            <div style={{marginTop: "50px", textAlign: "center"}}>
                <h3>Shopping Cart</h3>
                <div>
                    {products.map((product, index) =>
                        <div key={index}>
                            {product.name}: {product.price}
                        </div>
                    )}
                </div>
                <h4>Total price: {totalPrice}</h4>
            </div>
        </div>

    )
}

export default Expenses;