import React from "react";
import ReactDOM from 'react-dom/client';
import message from "./core/message/";
import uploadFile from "./core/file";
import Button from "./core/button";
import translate from './core/translate'


const Upolad = new uploadFile()

const App = () => {
    return <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        我是陈兴强
    </div>
}

const root = ReactDOM.createRoot(document.getElementById('root') as Element)
root.render(<App />)

translate.open()
// translate.close()

const c = {
    message,
    uploadFile,
    Button,
    translate
}

export default c


