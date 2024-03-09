import React, { useRef, useEffect } from 'react';
import { countryToSexToAge } from "./data"

function calcWeeks(country, sex, dateBorn) {
    if (!country || !sex || !dateBorn)
        return ""

    let weeksLived = Math.ceil(Math.abs(Date.now() - dateBorn) / (1000.0 * 60 * 60 * 24 * 7))
    let totalYears = parseFloat(countryToSexToAge[country][sex].replaceAll(',', '.'))
    let weeksTotal = Math.ceil(totalYears * 365 / 7.)
    return [weeksLived, weeksTotal]
}

function drawCircle(ctx, x, y, radius, fill, stroke, strokeWidth) {
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false)
    if (fill) {
        ctx.fillStyle = fill
        ctx.fill()
    }
    if (stroke) {
        ctx.lineWidth = strokeWidth
        ctx.strokeStyle = stroke
        ctx.stroke()
    }
}


export default function WeeksRenderer({ countryState, sexState, dateBorn }) {
    const canvasRef = useRef(null)
    const [weeksLived, weeksTotal] = calcWeeks(countryState, sexState, dateBorn)

    useEffect(() => {
        if (!countryState || !sexState || !dateBorn)
            return
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        const space = 3
        const radius = 3
        const perRow = (canvas.width - space) / (radius * space)
        // Clear the canvas
        context.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < perRow; i++) {
            drawCircle(context, i * radius * space + 2 * space, 5, radius, "white", "black", 0.2)
        }
    }, [countryState, sexState, dateBorn])

    return (
        <div>
            <span>{weeksLived} {weeksTotal}</span>
            <canvas ref={canvasRef} id="canvas" className={"w-full h-64 border border-gray-300"}></canvas>
        </div>
    )
}