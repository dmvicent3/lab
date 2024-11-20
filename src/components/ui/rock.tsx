'use client'

import React, {useState, useRef, forwardRef, useImperativeHandle} from 'react'
import Image from "next/image";

export interface RockProps {
    handleRock: ()=> void
}

const Rock = forwardRef<RockProps, any>((_props, ref) => {
    const [isVisible, setIsVisible] = useState(false)
    const [reload, setReload] = useState(0)
    const audioRef = useRef<HTMLAudioElement>(null)

    const handleRock = () => {
        setReload((r)=> r+1)
        setIsVisible(true)

        setTimeout(()=> {
            if (audioRef.current) {
                audioRef.current.currentTime = 0
                audioRef.current.play().then(_r => {
                    //
                })
            }
        }, 100)

        setTimeout(() => {
            setIsVisible(false)
        }, 1000)
    }

    useImperativeHandle(ref, ()=> {
        return {
            handleRock
        }
    })

    return (
        <div className="relative">
           <div className={`fixed inset-0 ${isVisible ? 'z-50' : '-z-10'} flex items-center justify-center`}>
                <Image
                    key={reload}
                    src={`https://media1.tenor.com/m/kHcmsxlKHEAAAAAd/rock-one-eyebrow-raised-rock-staring.gif?t=${reload}`}
                    className='max-w-[500px] w-full h-auto'
                    width={400}
                    height={400}
                    alt=''
                    priority
                />
            </div>

            <audio
                ref={audioRef}
                src="/audio/rock.mp3"
                className="hidden"
            />
        </div>
    )
})

Rock.displayName = "Rock"

export {Rock}