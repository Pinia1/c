import React from "react";
import ReactDOM from 'react-dom/client';
import message from "./core/message/";
import uploadFile from "./core/file";
import Button from "./core/button";


const Upolad = new uploadFile()

const App = () => {
    return <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <Button size="default" />
    </div>
}

const root = ReactDOM.createRoot(document.getElementById('root') as Element)
root.render(<App />)



const c = {
    message,
    uploadFile,
    Button
}

export default c


