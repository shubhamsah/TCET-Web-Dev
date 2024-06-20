import React, {useState} from "react"
import './ColorPicker.css';




function ColorPicker() {
    const [color, setColor] = useState("#FFFFFF");

    function handleColorChange(event){
        setColor(event.target.value);
    }

    return(
        <div className="color-picker-container"> 
            <h1 className="h1-color-picker">Color Picker</h1>
            <div className="color-display" style={{backgroundColor: color}}>
                <p>
                    Selected Color: {color}
                </p>
            </div>
            <label>Select a Color</label>
            <input
                type="color" 
                value={color}
                onChange={handleColorChange}
            />
        </div>
    );
}


export default ColorPicker