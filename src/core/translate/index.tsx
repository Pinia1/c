import React, { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom/client';
import message from '../message';
import type { Root } from 'react-dom/client'
import './index.less'


interface Props {
    destroy: () => void
    q: string
}

declare global {
    interface Window {
        truncate: any
        CryptoJS: any
        $: any
    }
}


const Menu = (props: Props) => {
    const { destroy, q } = props
    const ref = useRef<HTMLDivElement>(null)
    useEffect(() => {
        document.addEventListener('click', destroy)
        if (ref.current) {
            ref.current.addEventListener('contextmenu', e => e.preventDefault())
        }
        return () => {
            document.removeEventListener('click', destroy)
        }

    }, [])

    function truncate(q: string) {
        var len = q.length;
        if (len <= 20) return q;
        return q.substring(0, 10) + len + q.substring(len - 10, len);

    }

    function onTranslate(type: 'zh' | 'en') {
        let from = 'zh-CHS'
        let to = 'en'
        const salt = (new Date).getTime()
        const curtime = Math.round(new Date().getTime() / 1000);
        const str1 = '40102bbc4ffc4322' + truncate(q) + salt + curtime + 'BsRp3WGWZYybcd37hgrO3UoZclvvC1Ux';
        const sign = window.CryptoJS.SHA256(str1).toString(window.CryptoJS.enc.Hex)
        switch (type) {
            case 'zh':
                from = 'en'
                to = 'zh-CHS'
                break;
            case 'en':
                from = 'zh-CHS'
                to = 'en'
                break;
            default:
                break;
        }
        window.$.ajax({
            url: 'https://openapi.youdao.com/api',
            type: 'post',
            dataType: 'jsonp',
            data: {
                from,
                to,
                q,
                appKey: '40102bbc4ffc4322',
                salt,
                sign,
                signType: "v3",
                curtime: curtime,
            },
            success: function (data: any) {
                const { translation } = data
                message.success(translation[0])
            }
        });



    }
    return <div ref={ref} className='c-menu'>
        <ul>
            <li onClick={() => {
                onTranslate('en')
            }}>翻译成英文</li>
            <li onClick={() => {
                onTranslate('zh')
            }}>翻译成中文</li>
        </ul>
    </div>
}



class translate {
    /**原始文本 */
    private static text: string = ''
    /**脚本 */
    private static cryptojs: any
    private static jq: any
    /**菜单节点 */
    private static dom: HTMLElement | null
    /**react 节点 */
    private static root: Root
    /**是否关闭 */
    private static isClose: boolean = false
    static open() {
        if (!this.jq) {
            this.cryptojs = document.createElement('script')
            this.cryptojs.src = 'https://cdn.bootcdn.net/ajax/libs/crypto-js/4.0.0/crypto-js.js'
            document.body.appendChild(this.cryptojs)
            this.jq = document.createElement('script')
            this.jq.src = 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js'
            document.body.appendChild(this.jq)
        }
        this.isClose = false
        this.init()
    }
    /**初始化 */
    private static init() {
        document.addEventListener('contextmenu', this.getText.bind(this))
    }
    private static getText(e: MouseEvent) {
        if (this.isClose) return
        if (window.getSelection()?.toString()) {
            e.preventDefault()
            this.text = window.getSelection()?.toString() as string
            this.render(e)
        } else {
            this.destroy()
        }
    }
    /**渲染菜单 */
    private static render(e: MouseEvent) {
        const { clientX, clientY } = e
        const clientWidth = window.innerWidth
        const clientHeight = window.innerHeight
        if (!this.dom) {
            this.dom = document.createElement('div')
            this.dom.className = 'c-translate'
            this.dom.style.left = clientX + 'px'
            this.dom.style.top = clientY + 'px'
            if (clientWidth - clientX < this.width) {
                this.dom.style.left = clientX - this.width + 'px'
            }
            if (clientHeight - clientY < this.height) {
                this.dom.style.top = clientY - this.height + 'px'
            }
            document.body.appendChild(this.dom)
            this.root = ReactDOM.createRoot(document.querySelector('.c-translate') as Element)
            this.root.render(<Menu q={this.originalText} destroy={this.destroy.bind(this)} />)
        } else {
            this.destroy()
            this.render(e)
        }
    }
    static close() {
        this.destroy()
        this.isClose = true
    }
    static get originalText() {
        return this.text
    }
    static get height(): number {
        return 77
    }
    static get width(): number {
        return 130
    }
    private static destroy() {
        try {
            if (this.dom) {
                this.root.unmount()
                document.body.removeChild(this.dom)
                document.removeEventListener('contextmenu', this.getText.bind(this))
                this.dom = null
            }
        } catch (error) {

        }
    }
}



export default translate