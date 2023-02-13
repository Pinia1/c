import React from "react"
import type { Root } from "react-dom/client";
import ReactDOM from 'react-dom/client';
import css from './index.module.less'

const Modal = () => {
    return <div className={css.upload}>
        <button className={css.uploadBTN} onClick={() => {
            const root = document.getElementById('upload')
            root?.click()
        }}>上传</button>
        <input id='upload' style={{ display: 'none' }} type="file" />
    </div>
}


interface Config {
    url: string
}

class uploadFile {
    private dom: HTMLElement = document.createElement("div")
    private classname: string = 'chen'
    private root: Root | null = null
    private config: Config = {
        url: ''
    }
    private showModal() {
        if (this.root) return
        this.dom = document.createElement("div")
        this.dom.className = this.classname
        this.dom.style.display = 'flex'
        this.dom.style.justifyContent = 'center'
        this.dom.style.position = 'fixed'
        this.dom.style.transform = 'translateX(-50%)'
        this.dom.style.left = '50%'
        this.root = ReactDOM.createRoot(document.querySelector(`.${this.classname}`) as Element)
        this.root.render(<Modal />)
    }
    public btnUpload(): JSX.Element {
        return <Modal />
    }
}

export default uploadFile