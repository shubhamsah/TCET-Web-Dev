## Building a Simple Color Picker App with React

This guide will walk you through creating a basic color picker app using React.

**1. Project Setup**

* **Create a React App:** If you don't have an existing React project, use Create React App to set up a new one.

  ```bash
  npm create vite@latest
  ```

**2. Component Creation**

* **ColorPicker.jsx:** Create a new file named `ColorPicker.js` within your `src` directory. This will contain the logic for our color picker component.

```javascript
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
```

* **ColorPicker.css:** Create a corresponding CSS file `ColorPicker.css` to style your component.

```css
.color-picker-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
.h1-color-picker {
    margin: 50px;
    font-size: 3rem;
  }
  
.color-display{
    width: 300px;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 5px solid hsl(0, 0%, 80%);
    border-radius: 25px;
    margin-bottom: 25px ;
    transition: 0.5s ease;
  }
  
.color-display p{
    color: hsl(0, 0%, 20%);
    font-size: 2rem;
    text-align: center;
  }
  
label {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 10px;
  }
  
input[type="color"] {
    width: 75px;
    height: 50px;
    padding: 5px;
    border-radius: 10px;
    border: 3px solid hsl(0, 0%, 80%);
  }
```

**3. Integrating the Component**

* **App.js:** Import the `ColorPicker` component into your `App.js` file and render it:

```javascript
import './App.css'
import ColorPicker from './ColorPicker'

function App() {

  return (
   <>
    <ColorPicker /> 
   </>
  )
}

export default App
```

**4. Running the App**

* **Start the Development Server:** Run `npm install` to install the necessary scripts. 
* Run `npm run dev` to start the dev server

**Explanation:**

* **useState:** The `useState` hook is used to manage the `color` state, which stores the currently selected color.
* **handleColorChange:** This function updates the `color` state whenever the input color changes.
* **JSX:** The JSX code renders the UI elements:
    * **Container:** `div` with `color-picker-container` class for styling.
    * **Color Display:** `div` with `color-display` class, styled with the `backgroundColor` set to the current `color`.
    * **Label:**  Label for the color input.
    * **Input:** `input` with `type="color"` to allow color selection.
