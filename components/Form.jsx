import {useRef, useState, Fragment} from "react"; 
import "./Form.css"; 

const Form = (props) => {
    const [isError, setIsError] = useState({error: false, errorMsg: "", isValid: false}); 

    const dayRef = useRef(); 
    const monthRef = useRef(); 
    const yearRef = useRef(); 

    const date = new Date(); 

    const createInputArray = () => {
        let array = []; 
        array.push(dayRef.current.value, monthRef.current.value, yearRef.current.value)
        return array; 
    }

    const isInputFilled = (array) => {
        if (array.includes("") || array.includes("0")) {
            return false; 
        } else {
            return true; 
        }
    }

    const containsSpecialCharacters = (array) => {
        let regex = /[e|+|\-|.]/gi;

        let mapped = array.map((input) => {
            return regex.test(input); 
        })

        return mapped; 
    }

    const containsFutureDate = array => {
        let date = new Date(); 
        let lastDay = new Date(date.getFullYear(), date.getMonth(), 0); 
        if (Number(array[2]) > date.getFullYear()) {
            return `Invalid input year: Input cannot exceed ${date.getFullYear()}`
        } else if (Number(array[2]) === date.getFullYear() && Number(array[1]) > (date.getMonth() + 1) && Number(array[1]) < 13) {
            return `Invalid input month: Input cannot exceed ${date.getMonth() + 1} in the year ${date.getFullYear()}`
        } else if (Number(array[2]) === date.getFullYear() && Number(array[1]) === (date.getMonth() + 1) && Number(array[0]) > date.getDate() && Number(array[0]) < lastDay.getDate()) {
            return `Invalid input day: Input cannot exceed ${date.getDate()} in month ${date.getMonth() + 1} of ${date.getFullYear()}.`
        }
    }

    const inputDoesNotExist = (array) => {
        let lastDay = new Date(array[2], array[1], 0).getDate(); 
        let date = new Date(); 
        
        if (Number(array[1]) > 12) {
            return `Invalid month: There are only 12 months in any given year`; 
        } else if (Number(array[0]) > lastDay) {
            return `Invalid date: Month #${Number(array[1])} only contains ${lastDay} days.`
        } else if (Number(array[2] < 100)) {
            return `Invalid year: Year input cannot be less than 100 or greater than ${date.getFullYear()}`; 
        }
    }

    const errorMessageHandler = (message) => {
        setIsError(prevState => ({
            ...prevState, 
            error: true,  
            errorMsg: message, 
            isValid: false
        })); 
        props.sendValidInputHandler({day: "", month: "", year: ""})
    }

    const submitHandler = (e) => {
        e.preventDefault();   
        let array = createInputArray(); 
        
        if (!isInputFilled(array)) {
            errorMessageHandler("All inputs must be filled with an input greater than 0 for a valid calculation"); 
            return 
        } else if (containsSpecialCharacters(array).includes(true)) {
            errorMessageHandler("All inputs must contains integers from 0-9. No special characters like `e`, `-`, `+` or `.` are allowed"); 
            return; 
        } else if (containsFutureDate(array)) {
            errorMessageHandler(containsFutureDate(array)); 
            return
        } else if (inputDoesNotExist(array)) {
            errorMessageHandler(inputDoesNotExist(array)); 
            return
        }
        setIsError(prevState => ({
            ...prevState, 
            error: false, 
            errorMsg: "", 
            isValid: true
        }))
        props.sendValidInputHandler({day: dayRef.current.value, month: monthRef.current.value, year:yearRef.current.value})
    }

    return (
        <Fragment>
        {isError.isValid ? 
            <section className="heading">
                <div className="heading_title">Comparing...</div>
                <div className="heading_dates">
                    <p className="heading_date">{date.getDate()}</p>
                    <p className="heading_date">{date.getMonth() + 1}</p>
                    <p className="heading_date">{date.getFullYear()}</p>
                </div>
                <div className="heading_title">to</div>
            </section>
                : null
        }

        <form className="date" onSubmit={submitHandler} noValidate>
            <div className="date_container">
                <label className={isError.error ? "date--text-error" : null}>DAY</label>
                <input className={`date_input ${isError.error ? "date--input-error" : ""}`} type="number" placeholder="DD" ref={dayRef} />
            </div>
            <div className="date_container">
                <label className={isError.error ? "date--text-error" : null}>MONTH</label>
                <input className={`date_input ${isError.error ? "date--input-error" : ""}`} type="number" placeholder="MM" ref={monthRef} />
            </div>
            <div className="date_container">
                <label className={isError.error ? "date--text-error" : null}>YEAR</label>
                <input className={`date_input ${isError.error ? "date--input-error" : ""}`} type="number" max="2024" placeholder="YYYY" ref={yearRef} />
            </div>
            <button>Submit</button>
        </form>
        {isError.error ? 
        <div className="error">
            <div>ERROR REPORT</div>
            <div>{isError.errorMsg}</div>
        </div>
        : null
        }   
    </Fragment>
    )
}

export default Form; 