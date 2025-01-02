import React, {useState, useEffect} from "react";
import '../styles/SetHeader.css';
import axios from "../axios";

const SetHeader = (props) => {
    const [menuHeader, setMenuHeader] = useState([]);

    useEffect(() => {
        axios.get(props.url).then((response) => {
            console.log(response.data)
            setMenuHeader(response.data);
        })
    }, []);

    return (
        <>
            {menuHeader.map((item, index) => (
                <div className="menuHeader">
                    <div className="menu_title">
                        {item}
                    </div>
                </div>
            ))}
        </>
    )
}

export default SetHeader;
