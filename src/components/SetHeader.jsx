import React, {useState, useEffect} from "react";
import '../styles/SetHeader.css';
import axios from "../axios";

const SetHeader = (props) => {
    const [menuHeader, setMenuHeader] = useState([]);

    useEffect(() => {
        axios.get(props.url).then((response) => {
            console.log("SetHeader: ", response.data)
            setMenuHeader(response.data);
        })
    }, []);

    return (
        <>
            {menuHeader.map((item) => (
                <div className="menuHeader" key={item.id}>
                    <div className="menu_title">
                        {item.name}
                    </div>
                </div>
            ))}
        </>
    )
}

export default SetHeader;
