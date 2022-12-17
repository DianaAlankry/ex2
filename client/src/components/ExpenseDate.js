
import './ExpenseDate.css'

function ExpenseDate(props) {
    return <div className="expense-date">
        <div className="expense-date__day"> {props.number}</div>
    </div>
}

export default ExpenseDate;