import arrow from "../src/assets/icon-arrow.svg"; 
import "./Logo.css"; 

const Logo = () => {
    return (
        <div className="logo">
            <div className="logo_circle">
                <img src={arrow} alt="" />
            </div>
            <div className="logo_line"></div>
        </div>
    )
}

export default Logo; 