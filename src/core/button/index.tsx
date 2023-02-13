import React, { useEffect, useRef } from "react";
import './index.less'

interface BtnType {
    size: 'Large' | 'default' | 'small'
    style?: React.CSSProperties
}

enum typeENUM {
    BIG = 'Large',
    MEDIUM = 'default',
    SMALL = 'small'
}

export default function Button(props: BtnType = { size: 'default' }) {
    const { size, style } = props
    const ref = useRef<HTMLButtonElement>(null)
    const rootRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if (ref.current) {
            switch (size) {
                case typeENUM.BIG:
                    ref.current.style.transform = 'scale(1.2)'
                    break;
                case typeENUM.MEDIUM:

                    break;
                case typeENUM.SMALL:
                    ref.current.style.transform = 'scale(0.8)'
                    break;
            }
        }

    }, [])
    return <div ref={rootRef} style={style} className="c-btn-root">
        <button onMouseDown={() => {
            if (ref.current) {
                ref.current.classList.add('c-btn-down')
            }
        }}
            onMouseUp={() => {
                if (ref.current && rootRef.current) {
                    ref.current.classList.remove('c-btn-down')
                    rootRef.current.classList.add('c-btn-root-shadow')
                    let timer = setTimeout(() => {
                        if (rootRef.current) rootRef.current.classList.remove('c-btn-root-shadow')
                        clearTimeout(timer)
                    }, 200)
                }
            }}
            ref={ref} className="c-btn">
            点击
        </button>
    </div>
}