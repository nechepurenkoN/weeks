import { useRef, useState, useEffect } from 'react'
import { WEEK_MS } from './calcWeeks'

const WEEKS_PER_ROW = 52
const CELL_MARGIN = 1
const LABEL_WIDTH = 28
const MONTHS = ['янв','фев','мар','апр','май','июн','июл','авг','сен','окт','ноя','дек']

function formatDate(date) {
    return `${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`
}


function useCellSize(ref) {
    const [cellSize, setCellSize] = useState(10)
    useEffect(() => {
        const el = ref.current
        if (!el) return
        const observer = new ResizeObserver(entries => {
            const w = entries[0].contentRect.width
            const size = Math.max(4, Math.min(10, Math.floor((w - LABEL_WIDTH) / WEEKS_PER_ROW) - CELL_MARGIN * 2))
            setCellSize(size)
        })
        observer.observe(el)
        return () => observer.disconnect()
    }, [ref])
    return cellSize
}

export default function WeeksRenderer({ weeks, dateBorn }) {
    const containerRef = useRef(null)
    const innerRef = useRef(null)
    const cellSize = useCellSize(innerRef)
    const [tooltip, setTooltip] = useState(null)

    if (!weeks) {
        return (
            <div style={{
                marginTop: 32,
                border: '1px dashed #d8d8d8',
                padding: '52px 32px',
                textAlign: 'center',
                color: '#c0c0c0',
                fontSize: 13,
                letterSpacing: '0.03em',
            }}>
                Выберите страну и пол, чтобы увидеть сетку недель
            </div>
        )
    }

    const [weeksLived, weeksTotal] = weeks
    const weeksLeft = Math.max(0, weeksTotal - Math.max(0, weeksLived))
    const totalYearsCount = Math.ceil(weeksTotal / WEEKS_PER_ROW)
    const slot = cellSize + CELL_MARGIN * 2

    function handleMouseEnter(e, index) {
        const rect = containerRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const rightHalf = x > rect.width * 0.65

        let text
        if (dateBorn) {
            const start = new Date(dateBorn.getTime() + index * WEEK_MS)
            const end = new Date(start.getTime() + WEEK_MS - 24 * 60 * 60 * 1000)
            text = `${formatDate(start)} — ${formatDate(end)}`
        } else {
            const yr = Math.floor(index / WEEKS_PER_ROW) + 1
            const wk = (index % WEEKS_PER_ROW) + 1
            text = `Год ${yr}, неделя ${wk}`
        }
        setTooltip({ x, y, text, rightHalf })
    }

    return (
        <div ref={containerRef} style={{ marginTop: 32, position: 'relative' }}>
            <Counter weeksLived={weeksLived} weeksTotal={weeksTotal} weeksLeft={weeksLeft} />
            <div style={{ display: 'flex', gap: 6 }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                writingMode: 'vertical-rl',
                transform: 'rotate(180deg)',
                fontSize: 9,
                color: '#aaa',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                userSelect: 'none',
                paddingTop: 20,
            }}>
                Годы
            </div>
            <div ref={innerRef} style={{ flex: 1, minWidth: 0 }}>
            <AxisHeader slot={slot} />
            {Array.from({ length: totalYearsCount }, (_, year) => (
                <div
                    key={year}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        lineHeight: 1,
                        marginTop: year > 0 && year % 10 === 0 ? 7 : 0,
                        borderTop: year > 0 && year % 10 === 0 ? '1px solid #ebebeb' : 'none',
                        paddingTop: year > 0 && year % 10 === 0 ? 6 : 0,
                    }}
                >
                    <div style={{
                        width: LABEL_WIDTH,
                        fontSize: 9,
                        textAlign: 'right',
                        paddingRight: 5,
                        color: '#aaa',
                        flexShrink: 0,
                        letterSpacing: '0.02em',
                    }}>
                        {year % 5 === 0 ? year : ''}
                    </div>
                    {Array.from({ length: WEEKS_PER_ROW }, (_, week) => {
                        const index = year * WEEKS_PER_ROW + week
                        if (index >= weeksTotal) return null
                        const past = weeksLived >= 0 && index < weeksLived
                        const current = weeksLived >= 0 && index === weeksLived
                        return (
                            <div
                                key={week}
                                onMouseEnter={e => handleMouseEnter(e, index)}
                                onMouseLeave={() => setTooltip(null)}
                                style={{
                                    width: cellSize,
                                    height: cellSize,
                                    margin: CELL_MARGIN,
                                    border: `1px solid ${past ? '#999' : current ? '#1a7a1a' : '#ccc'}`,
                                    backgroundColor: past ? '#aaa' : current ? '#2db52d' : '#fff',
                                    flexShrink: 0,
                                    boxSizing: 'border-box',
                                    cursor: 'default',
                                }}
                            />
                        )
                    })}
                </div>
            ))}
            </div>
            </div>
            {tooltip && (
                <div style={{
                    position: 'absolute',
                    left: tooltip.rightHalf ? tooltip.x - 14 : tooltip.x + 14,
                    top: tooltip.y - 30,
                    transform: tooltip.rightHalf ? 'translateX(-100%)' : 'none',
                    background: '#111',
                    color: '#fff',
                    padding: '4px 10px',
                    fontSize: 11,
                    pointerEvents: 'none',
                    whiteSpace: 'nowrap',
                    zIndex: 100,
                    letterSpacing: '0.02em',
                }}>
                    {tooltip.text}
                </div>
            )}
        </div>
    )
}

function Counter({ weeksLived, weeksTotal, weeksLeft }) {
    return (
        <div style={{ marginBottom: 20, fontSize: 14, color: '#555', fontFamily: 'Helvetica, Arial, sans-serif' }}>
            {weeksLived >= 0 ? (
                <>
                    Прожито{' '}
                    <strong style={{ color: '#222' }}>{weeksLived.toLocaleString('ru')}</strong>{' '}
                    недель{' '}
                    <span style={{ color: '#aaa' }}>({Math.min(100, (weeksLived / weeksTotal * 100).toFixed(1))}%)</span>
                    {' '}· Осталось{' '}
                    <strong style={{ color: '#222' }}>{weeksLeft.toLocaleString('ru')}</strong>{' '}
                    <span style={{ color: '#aaa' }}>({(weeksLeft / 52).toFixed(1)} лет)</span>
                </>
            ) : (
                <>
                    Ожидаемая продолжительность жизни:{' '}
                    <strong style={{ color: '#222' }}>{weeksTotal.toLocaleString('ru')}</strong>{' '}
                    недель <span style={{ color: '#aaa' }}>({(weeksTotal / 52).toFixed(0)} лет)</span>
                </>
            )}
        </div>
    )
}

function AxisHeader({ slot }) {
    const markers = [1, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50]
    return (
        <div style={{ display: 'flex', alignItems: 'flex-end', marginBottom: 4 }}>
            <div style={{ width: LABEL_WIDTH, flexShrink: 0, display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', paddingRight: 5 }}>
                <span style={{
                    fontSize: 9,
                    color: '#aaa',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap',
                    userSelect: 'none',
                }}>
                    Нед.
                </span>
            </div>
            <div style={{ position: 'relative', width: WEEKS_PER_ROW * slot, height: 16 }}>
                {markers.map(w => (
                    <span key={w} style={{
                        position: 'absolute',
                        left: (w - 1) * slot,
                        fontSize: 9,
                        color: '#aaa',
                        lineHeight: 1,
                        letterSpacing: '0.02em',
                    }}>
                        {w}
                    </span>
                ))}
            </div>
        </div>
    )
}
