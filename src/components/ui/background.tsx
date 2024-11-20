import * as React from "react"
import {useEffect, useRef} from "react";

const Background = () => {

    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const resizeCanvas = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
            drawBackground()
        }

        const drawBackground = () => {
            const {width, height} = canvas

            // Clear canvas
            ctx.clearRect(0, 0, width, height)

            // Draw black background
            ctx.fillStyle = 'black'
            ctx.fillRect(0, 0, width, height)

            // Draw white grid
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)'
            ctx.lineWidth = 1

            const gridSize = 60
            for (let x = 0; x <= width; x += gridSize) {
                ctx.beginPath()
                ctx.moveTo(x, 0)
                ctx.lineTo(x, height)
                ctx.stroke()
            }

            for (let y = 0; y <= height; y += gridSize) {
                ctx.beginPath()
                ctx.moveTo(0, y)
                ctx.lineTo(width, y)
                ctx.stroke()
            }

            // Apply fading gradients to edges
            const gradientSize = 50
            const applyGradient = (x: number, y: number, w: number, h: number, isHorizontal: boolean, reverse: boolean) => {
                const gradient = ctx.createLinearGradient(
                    isHorizontal ? (reverse ? x + w : x) : x + w / 2,
                    isHorizontal ? y + h / 2 : (reverse ? y + h : y),
                    isHorizontal ? (reverse ? x : x + w) : x + w / 2,
                    isHorizontal ? y + h / 2 : (reverse ? y : y + h)
                )
                gradient.addColorStop(0, 'rgba(0, 0, 0, 0)')
                gradient.addColorStop(1, 'rgba(0, 0, 0, 1)')
                ctx.fillStyle = gradient
                ctx.fillRect(x, y, w, h)
            }

            applyGradient(0, 0, gradientSize, height, true, true) // Left
            applyGradient(width - gradientSize, 0, gradientSize, height, true, false) // Right
            applyGradient(0, 0, width, gradientSize, false, true) // Top
            applyGradient(0, height - gradientSize, width, gradientSize, false, false) // Bottom

            // Draw fading oval in the center
            const centerX = width / 2
            const centerY = height / 2
            const ovalWidth = width * 0.4
            const ovalHeight = height * 0.3

            const ovalGradient = ctx.createRadialGradient(
                centerX, centerY, 0,
                centerX, centerY, ovalWidth / 2
            )
            ovalGradient.addColorStop(0, 'rgba(0, 0, 0, 1)')
            ovalGradient.addColorStop(1, 'rgba(0, 0, 0, 0)')

            ctx.fillStyle = ovalGradient
            ctx.beginPath()
            ctx.ellipse(centerX, centerY, ovalWidth / 2, ovalHeight / 2, 0, 0, 2 * Math.PI)
            ctx.fill()
        }

        resizeCanvas()
        window.addEventListener('resize', resizeCanvas)

        return () => {
            window.removeEventListener('resize', resizeCanvas)
        }
    }, [])

    return (
        <canvas id="background" ref={canvasRef} style={{position: 'absolute', zIndex: '-1'}}/>
    )
}


Background.displayName = "Background"

export {Background}
