import React, { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom/client';
import subscriber from '../subscriber';
import css from './index.module.less'
import success from '../../img/success.png'
import error from '../../img/error.png'
import TransitionGroup from 'react-addons-css-transition-group';



export type MessageType = "success" | "error"

/**
 * message参数配置
 */
export interface Config {
    duration: number,
    getContainer: HTMLElement,
    maxCount: number,
    prefixCls: string,
    top: number,
    icon: JSX.Element | null
}
/**
 * message配置参数可选
 */
type argConfig = Partial<Config>

/**
 * @param {key} uuid
 */
type messageCom = {
    title: any,
    config: Config,
    type: MessageType,
    key: string
}

interface MessageComProps {
    curMessageList: messageCom[]
    setCurMessageList: (key: string) => void
    destroy: () => void
    maxLength: number
}

const Icon = (props: { src: string }) => {
    const { src } = props
    return <img style={{ width: '16px', height: '16px' }} src={src} alt="" />
}

const Message = (props: MessageComProps) => {
    const { curMessageList, setCurMessageList, destroy, maxLength } = props
    const [list, setList] = useState(curMessageList)
    const listRef = useRef(curMessageList)
    useEffect(() => {
        list.forEach(item => {
            let timer = setTimeout(() => {
                setCurMessageList(item.key)
                listRef.current = listRef.current.filter(l => l.key != item.key)
                setList(listRef.current)
                clearTimeout(timer)
            }, item.config.duration)
        })
        if (list.length == 0) {
            destroy()
        }
    }, [list])
    useEffect(() => {
        subscriber.on('push', (val: messageCom[]) => {
            listRef.current = [...val]
            setList([...val])
        })
    }, [])
    return <div style={{ display: 'flex', flexDirection: 'column' }}>
        {/* <TransitionGroup transitionName="fade" transitionEnterTimeout={500}
            transitionLeaveTimeout={2000} > */}
        {
            list.map((item, index) => {
                if (index >= listRef.current.length - maxLength) {
                    return <div id={item.key} key={item.key} className={css.divs}>
                        {
                            item.config.icon ? item.config.icon : <Icon src={item.type == 'success' ? success : error} />
                        }
                        <span>{item.title}</span>
                    </div>
                }

            })
        }
        {/* </TransitionGroup> */}
    </div >

}



class message {
    /**根节点 */
    private static dom: HTMLElement
    private static root: any
    /**默认配置 */
    private static curConfig: Config = {
        duration: 2000,
        getContainer: document.body,
        maxCount: 3,
        prefixCls: 'chen',
        top: 8,
        icon: null
    }
    /**类名 */
    private static classname: string = `${this.curConfig.prefixCls}-` + 'message'
    /**消息队列 */
    private static curMessageList: messageCom[] = []

    constructor() {

    }
    static init(type: MessageType, title: any = '', config: argConfig = this.curConfig) {
        this.curMessageList.push({
            title,
            config: { ...this.curConfig, ...config },
            type,
            key: crypto.randomUUID()
        })
        this.show()
        /**通知组件渲染 */
        setTimeout(() => {
            subscriber.emit('push', this.curMessageList)
        }, 10)
    }
    static success(title: any = '', config: argConfig = this.curConfig) {
        this.init('success', title, config)
    }
    static error(title: any = '', config: Config = this.curConfig) {
        this.init('error', title, config)
    }
    private static show() {
        if (this.root) return
        this.dom = document.createElement("div")
        this.dom.className = this.classname
        this.dom.style.display = 'flex'
        this.dom.style.justifyContent = 'center'
        this.dom.style.position = 'fixed'
        this.dom.style.transform = 'translateX(-50%)'
        this.dom.style.left = '50%'
        this.curConfig.getContainer.appendChild(this.dom)
        this.root = ReactDOM.createRoot(document.querySelector(`.${this.classname}`) as Element)
        this.root.render(<Message maxLength={this.curConfig.maxCount} curMessageList={this.curMessageList} destroy={this.destroy.bind(this)} setCurMessageList={(key) => { this.removeMessage(key) }} />)
    }
    static destroy() {
        try {
            this.curConfig.getContainer.removeChild(this.dom)
            this.root = null
        } catch (error) {

        }
    }
    private static removeMessage(key: string) {
        this.curMessageList = this.curMessageList.filter(item => item.key != key)
    }
    static config(val: argConfig) {
        this.curConfig = { ...this.curConfig, ...val }
    }
}

export default message

