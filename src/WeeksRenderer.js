import { useRef, useState, useEffect, useLayoutEffect, useCallback } from 'react'
import { WEEK_MS } from './calcWeeks'
import { useLocale } from './i18n/index'

const WEEKS_PER_ROW = 52
const CELL_MARGIN = 1
const LABEL_WIDTH = 28
// AxisHeader высота (16) + marginBottom (4) + paddingBottom на обёртке (4)
const AXIS_OVERHEAD = 24
const YEARS_LABEL_AREA = 28  // ширина вертикального лейбла «Годы» + gap
const MIN_CONTAINER_WIDTH = LABEL_WIDTH + WEEKS_PER_ROW * (10 + CELL_MARGIN * 2) + YEARS_LABEL_AREA

function formatDate(date, months) {
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
}

function cellStyle(past, current) {
    if (past)    return { borderColor: '#999', backgroundColor: '#aaa' }
    if (current) return { borderColor: '#1a7a1a', backgroundColor: '#2db52d' }
    return               { borderColor: '#ccc', backgroundColor: '#fff' }
}

export default function WeeksRenderer({ weeks, dateBorn }) {
    const t = useLocale()
    const containerRef = useRef(null)
    const gridAreaRef = useRef(null)
    const [cellSize, setCellSize] = useState(10)
    const [tooltip, setTooltip] = useState(null)

    const [weeksLived, weeksTotal] = weeks ?? [-1, 0]
    const weeksLeft = Math.max(0, weeksTotal - Math.max(0, weeksLived))
    const totalYearsCount = Math.ceil(weeksTotal / WEEKS_PER_ROW)
    const slot = cellSize + CELL_MARGIN * 2

    // Вычисляем размер ячейки из реально измеренной высоты контейнера
    const computeSize = useCallback(() => {
        const el = gridAreaRef.current
        if (!el || !weeksTotal) return
        const separators = Math.floor((totalYearsCount - 1) / 10) * 14
        const rowsH = el.clientHeight - AXIS_OVERHEAD - separators
        const size = Math.max(2, Math.min(10, Math.floor(rowsH / totalYearsCount) - CELL_MARGIN * 2))
        setCellSize(size)
    }, [weeksTotal, totalYearsCount])

    // Синхронно до первого рендера, чтобы не было мигания
    useLayoutEffect(() => { computeSize() }, [computeSize])

    useEffect(() => {
        const el = gridAreaRef.current
        if (!el) return
        const observer = new ResizeObserver(computeSize)
        observer.observe(el)
        return () => observer.disconnect()
    }, [computeSize])

    function handleMouseEnter(e, index) {
        const rect = containerRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const rightHalf = x > rect.width * 0.65

        let text
        if (dateBorn) {
            const start = new Date(dateBorn.getTime() + index * WEEK_MS)
            const end = new Date(start.getTime() + WEEK_MS - 24 * 60 * 60 * 1000)
            text = `${formatDate(start, t.months)} — ${formatDate(end, t.months)}`
        } else {
            const yr = Math.floor(index / WEEKS_PER_ROW) + 1
            const wk = (index % WEEKS_PER_ROW) + 1
            text = t.tooltipYearWeek(yr, wk)
        }
        setTooltip({ x, y, text, rightHalf })
    }

    return (
        <div
            ref={containerRef}
            style={{
                position: 'relative',
                minWidth: MIN_CONTAINER_WIDTH,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {!weeks ? (
                <div style={{
                    border: '1px dashed #d8d8d8',
                    padding: '52px 32px',
                    textAlign: 'center',
                    color: '#c0c0c0',
                    fontSize: 13,
                    letterSpacing: '0.03em',
                }}>
                    {t.noGrid}
                </div>
            ) : (
                <>
                    <Counter weeksLived={weeksLived} weeksTotal={weeksTotal} weeksLeft={weeksLeft} />
                    <div style={{ display: 'flex', gap: 6, flex: 1, minHeight: 0 }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            writingMode: 'vertical-rl',
                            transform: 'rotate(180deg)',
                            fontSize: 10,
                            fontWeight: 500,
                            color: '#aaa',
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            userSelect: 'none',
                            paddingTop: 20,
                        }}>
                            {t.yearsAxis}
                        </div>
                        <div ref={gridAreaRef} style={{ minWidth: 0 }}>
                            <AxisHeader slot={slot} />
                            <div style={{ paddingBottom: 4 }}>
                                {Array.from({ length: totalYearsCount }, (_, year) => (
                                    <div
                                        key={year}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            marginTop: year > 0 && year % 10 === 0 ? 7 : 0,
                                            borderTop: year > 0 && year % 10 === 0 ? '1px solid #ebebeb' : 'none',
                                            paddingTop: year > 0 && year % 10 === 0 ? 6 : 0,
                                        }}
                                    >
                                        <div style={{
                                            width: LABEL_WIDTH,
                                            lineHeight: `${slot}px`,
                                            overflow: 'hidden',
                                            fontSize: 10,
                                            textAlign: 'right',
                                            paddingRight: 5,
                                            color: '#aaa',
                                            flexShrink: 0,
                                        }}>
                                            {year % 5 === 0 ? year : ''}
                                        </div>
                                        {Array.from({ length: WEEKS_PER_ROW }, (_, week) => {
                                            const index = year * WEEKS_PER_ROW + week
                                            if (index >= weeksTotal) return null
                                            const past = weeksLived >= 0 && index < weeksLived
                                            const current = weeksLived >= 0 && index === weeksLived
                                            const { borderColor, backgroundColor } = cellStyle(past, current)
                                            return (
                                                <div
                                                    key={week}
                                                    onMouseEnter={e => handleMouseEnter(e, index)}
                                                    onMouseLeave={() => setTooltip(null)}
                                                    style={{
                                                        width: cellSize,
                                                        height: cellSize,
                                                        margin: CELL_MARGIN,
                                                        border: `1px solid ${borderColor}`,
                                                        backgroundColor,
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
                    </div>
                </>
            )}
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
    const t = useLocale()
    const pct = Math.min(100, (weeksLived / weeksTotal * 100).toFixed(1))
    const yearsLeft = (weeksLeft / 52).toFixed(1)
    const yearsTotal = (weeksTotal / 52).toFixed(0)

    return (
        <div style={{ marginBottom: 20, fontSize: 13, lineHeight: 1.3, color: '#555', flexShrink: 0 }}>
            {weeksLived >= 0 ? (
                <>
                    {t.counterLived}{' '}
                    <strong style={{ color: '#222' }}>{weeksLived.toLocaleString(t.localeCode)}</strong>{' '}
                    {t.counterWeeks}{' '}
                    <span style={{ color: '#aaa' }}>({pct}%)</span>
                    {' '}·{' '}{t.counterLeft}{' '}
                    <strong style={{ color: '#222' }}>{weeksLeft.toLocaleString(t.localeCode)}</strong>{' '}
                    <span style={{ color: '#aaa' }}>{t.counterYearsLeft(yearsLeft)}</span>
                </>
            ) : (
                <>
                    {t.lifeExpLabel}{' '}
                    <strong style={{ color: '#222' }}>{weeksTotal.toLocaleString(t.localeCode)}</strong>{' '}
                    {t.counterWeeks}{' '}
                    <span style={{ color: '#aaa' }}>{t.lifeExpYears(yearsTotal)}</span>
                </>
            )}
        </div>
    )
}

function AxisHeader({ slot }) {
    const t = useLocale()
    const markers = [1, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50]
    return (
        <div style={{ display: 'flex', alignItems: 'flex-end', marginBottom: 4 }}>
            <div style={{ width: LABEL_WIDTH, flexShrink: 0, display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', paddingRight: 5 }}>
                <span style={{
                    fontSize: 10,
                    fontWeight: 500,
                    color: '#aaa',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap',
                    userSelect: 'none',
                }}>
                    {t.weeksAxis}
                </span>
            </div>
            <div style={{ position: 'relative', width: WEEKS_PER_ROW * slot, height: 16 }}>
                {markers.map(w => (
                    <span key={w} style={{
                        position: 'absolute',
                        left: (w - 1) * slot,
                        fontSize: 10,
                        color: '#aaa',
                        lineHeight: 1,
                    }}>
                        {w}
                    </span>
                ))}
            </div>
        </div>
    )
}
