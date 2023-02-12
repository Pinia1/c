import React from "react";
import ReactDOM from 'react-dom/client';
import message from "./core/message/";
import lovingHeart from "./core/lovingHeart";
import uploadFile from "./core/file";
import subscriber from './core/subscriber'

const App = () => {
    return <div>
        <button onClick={() => {
            message.success('成功')
        }}>点击1</button>
    </div>
}

const root = ReactDOM.createRoot(document.getElementById('root') as Element)
root.render(<App />)



const c = {
    message,
    lovingHeart,
    uploadFile,
    subscriber
}

export default c


