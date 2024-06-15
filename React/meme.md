## Creating a React based MemeGenerator Project.


**1. Setting up the Project with Vite:**

```bash
npm create vite@latest my-meme-generator -- --template react
cd my-meme-generator
npm install
```

* `npm create vite@latest my-meme-generator -- --template react` creates a new React project named "my-meme-generator" using the Vite CLI.
* `cd my-meme-generator` navigates into the newly created project directory.
* `npm install` installs all the necessary dependencies for the project.


**2. Creating the "components" Folder:**

* Create a new folder named `components` inside the `src` directory. This will be used to organize your React components.

**Header Component Implementation:**
* Create a new file called as Header.jsx

```javascript
// components/Header.jsx
import '../css/header.css'

export default function Header() {
    return(
        <header className="header">
            <img 
                src="./public/images/troll-face.png" 
                className="header--image"
            />
            <h2 className="header--title">Meme Generator</h2>
            <h4 className="header--project">React Project - Meme Generator</h4>
        </header>
    )
}
```
**Integrating the Header Component in Your App:**

* Import the `Header` component into your main App component (usually `src/App.jsx`) and render it:

```javascript
// src/App.jsx
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <Header />
      {/* Rest of your app content */}
    </div>
  );
}

export default App;
```

**Styling the Header:**

* Create a `header.css` file within the `src/css` directory and add the following CSS code to style the header:

```css
.header {
    display: flex;
    align-items: center;
    height: 65px;
    background: linear-gradient(90deg, #672280 1.18%, #A626D3 100%);
    color: white;
    padding: 20px;
}

.header--image {
    height: 100%;
    margin-right: 6px;
}

.header--title {
    font-size: 1.25rem;
    margin-right: auto;
}

.header--project {
    font-size: 0.75rem;
    font-weight: 500;
}
```
**Meme Component Implementation:**

* Create a new file called as Meme.jsx

```js

import { useEffect, useState } from 'react'
import '../css/meme.css'
export default function Meme(){

    const [meme, setMeme] = useState({
        topText:"",
        bottomText:"",
        randomImage: "http://i.imgflip.com/1bij.jpg"
    })

    const [allMemes, setAllMemes] = useState([])

    useEffect( ()=>{
        async function getMemes() {
            const res = await fetch("https://api.imgflip.com/get_memes")
            const data = await res.json()
            setAllMemes(data.data.memes)
            console.log(data.data.memes)
        }
        getMemes()
    }, [])

    function getMemeImage() {
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        const url = allMemes[randomNumber].url
        setMeme(prevMeme => ({
            ...prevMeme, 
            randomImage: url
        }))
    }

    function handleChange(event) {
        const {name, value} = event.target;
        setMeme(prevMeme => ({
            ...prevMeme, 
            [name]:value
        }))
    }

    return (
        <main>
             <div className="form">
                <input 
                    type="text"
                    placeholder="Top text"
                    className="form--input"
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                />
                <input 
                    type="text"
                    placeholder="Bottom text"
                    className="form--input"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                />
                <button 
                    className="form--button"
                    onClick={getMemeImage}
                >
                    Get a new meme image 🖼
                </button>
            </div>
            <div className = "meme">
                <img src={meme.randomImage} className="meme--image" />
                <h2 className = "meme--text top">{meme.topText}</h2>
                <h2 className='meme--text bottom'>{meme.bottomText}</h2>
            </div>
        </main>
    )
}
```
**Styling the Meme Component:**

* Create a `meme.css` file within the `src/css` directory and add the following CSS code to style the header:

```css 

.form {
    display: grid;
    grid-template: 40px 40px / 1fr 1fr;
    gap: 17px;
    margin-bottom: 17px;
}

.form--input {
    font-family: "Karla", sans-serif;
    border-radius: 5px;
    border: 1px solid #D5D4D8;
    text-indent: 5px;
}

.form--button {
    grid-column: 1 / -1;
    font-family: "Karla", sans-serif;
    border-radius: 5px;
    background: linear-gradient(90.41deg, #711F8D 1.14%, #A818DA 100%);
    color: white;
    border: none;
    cursor: pointer;
}

.meme {
    position: absolute;
}

.meme--image {
    max-width: 100%;
    border-radius: 3px;
}

.meme--text {
    position: absolute;
    width: 80%;
    text-align: center;
    left: 50%;
    transform: translateX(-50%);
    margin: 15px 0;
    padding: 0 5px;
    font-family: impact, sans-serif;
    font-size: 2em;
    text-transform: uppercase;
    color: white;
    letter-spacing: 1px;
    text-shadow:
        2px 2px 0 #000,
        -2px -2px 0 #000,
        2px -2px 0 #000,
        -2px 2px 0 #000,
        0 2px 0 #000,
        2px 0 0 #000,
        0 -2px 0 #000,
        -2px 0 0 #000,
        2px 2px 5px #000;
}

.bottom {
    bottom: 0;
}

.top {
    top: 0;
}
```

**Integrating the Meme Component in Your App:**

* Import the `Meme` component into your main App component (usually `src/App.jsx`) and render it:

```javascript
// src/App.jsx
import Header from './components/Header';
import Meme from './components/Meme';

function App() {
  return (
    <div className="App">
      <Header />
      <Meme />
    </div>
  );
}

export default App;
```


**4. Running the App**

* **Start the Development Server:** Run `npm install` to install the necessary scripts. 
* Run `npm run dev` to start the dev server

