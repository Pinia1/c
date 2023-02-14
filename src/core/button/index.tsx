import React, { useEffect, useRef } from "react";
import './index.less'

interface BtnType {
    size: 'Large' | 'default' | 'small'
    style?: React.CSSProperties
    type?: 'primary' | 'default'
}

enum Size {
    BIG = 'Large',
    MEDIUM = 'default',
    SMALL = 'small'
}

const clas = { default: 'c-btn', primary: 'c-btn-primary' }
const mouserUp = { default: 'c-btn-root-shadow', primary: 'c-btn-root-shadow-primary' }

export default function Button(props: BtnType) {
    const { size = 'default', style, type = 'default' } = props
    const ref = useRef<HTMLButtonElement>(null)
    const rootRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if (ref.current) {
            switch (size) {
                case Size.BIG:
                    ref.current.style.transform = 'scale(1.2)'
                    break;
                case Size.SMALL:
                    ref.current.style.transform = 'scale(0.8)'
                    break;
            }
        }
    }, [])
    return <div ref={rootRef} style={style} className="c-btn-root">
        <button
            onMouseUp={() => {
                if (rootRef.current) {
                    rootRef.current.classList.add(mouserUp[type])
                    let timer = setTimeout(() => {
                        if (rootRef.current) rootRef.current.classList.remove(mouserUp[type])
                        clearTimeout(timer)
                    }, 200)
                }
            }}
            ref={ref} className={clas[type]}>
            点击
        </button>
    </div>
}