import "./Output.css"

const Output = (props) => {
    let currentDate = new Date(); 
    let currentDateObj = {
        day: currentDate.getDate(), 
        month: currentDate.getMonth(),
        year: currentDate.getFullYear(), 
    }
    let daysInPrevMonth = new Date(currentDateObj.day, currentDateObj.month, "0").getDate(); 
    let userDate = {}; 
    let dateDifference = {
        day: "--", 
        month: "--", 
        year: "--"
    }

    if (props.validInput.day && props.validInput.month && props.validInput.year) {
        userDate = {
            day: props.validInput.day, 
            month: props.validInput.month - 1,
            year: props.validInput.year
        }; 
        dateDifference = {
            day: currentDateObj.day - userDate.day, 
            month: currentDateObj.month - userDate.month, 
            year: currentDateObj.year - userDate.year
        }
        if (dateDifference.day < 0) {
            dateDifference.month -= 1; 
            dateDifference.day += daysInPrevMonth; 
        }
        if (dateDifference.month < 0) {
            dateDifference.year -= 1; 
            dateDifference.month += 12; 
        }
    }

    return (
        <section className="output">
            <div className="output_container">
                <span className="output_result">{dateDifference.year}</span>
                <span>{` ${dateDifference.year === 1 ? "year" : "years"}`}</span>
            </div>
            <div className="output_container">
                <span className="output_result">{dateDifference.month}</span>
                <span>{` ${dateDifference.month === 1 ? "month" : "months"}`}</span>
            </div>
            <div className="output_container">
                <span className="output_result">{dateDifference.day }</span>
                <span>{` ${dateDifference.day === 1 ? "day" : "days"}`} </span>
            </div>
        </section>
    )
}

export default Output; 