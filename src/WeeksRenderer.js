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

    useEffect(() => {
        let [weeksLived, weeksTotal] = calcWeeks(countryState, sexState, dateBorn)
        if (!weeksLived || !weeksTotal)
            return
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        const space = 3
        const radius = 3
        const perRow = (canvas.width - space) / (radius * space)
        // Clear the canvas
        let wantHeight = (weeksTotal / perRow + 1) * space * 3
        canvas.style.height = (Math.max(300, wantHeight)) + 'px'
        context.clearRect(0, 0, canvas.style.width, canvas.style.height);

        let row = 0
        let currentInRow = 0
        for (let i = 0; i < weeksTotal; i++) {
            if (currentInRow === perRow) {
                row++
                currentInRow = 0
            } else {
                currentInRow++
            }

            let color = undefined
            if (weeksLived > 0) {
                color = 'black'
                weeksLived--
            } else {
                color = 'white'
            }
            drawCircle(
                context,
                (i % perRow) * radius * space + 2 * space,
                5 + 3 * space * row,
                radius, color, "black", 1
            )
        }
    }, [countryState, sexState, dateBorn])

    return (
        <div>
            {/* <span>{weeksLived} {weeksTotal}</span> */}
            <canvas ref={canvasRef} id="canvas" className={"w-full border border-gray-300"}></canvas>
        </div>
    )
}