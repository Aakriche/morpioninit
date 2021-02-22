import React, { useState } from 'react'
import Cell from '../Cell'

import styles from './styles.module.css'

const getInitialState = (props) => {
    return { ...props }
}

const REVERSE_MAP = {
    cross: 'circle',
    circle: 'cross',
}

const reverse = (turn) => REVERSE_MAP[turn]

const isEnd = (cells) => {
    return cells.every((c) => c)
}

const FULL_CIRCLE = 'circlecirclecircle'
const FULL_CROSS = 'crosscrosscross'

const isWin = (cells) => {

     const r1 = `${cells[0]}${cells[1]}${cells[2]}`;
     const r2 = `${cells[3]}${cells[4]}${cells[5]}`;
     const r3 = `${cells[6]}${cells[7]}${cells[8]}`;

     const c1 = `${cells[0]}${cells[3]}${cells[6]}`;
     const c2 = `${cells[1]}${cells[4]}${cells[7]}`;
     const c3 = `${cells[2]}${cells[5]}${cells[8]}`;

     const d1 = `${cells[0]}${cells[4]}${cells[8]}`;
     const d2 = `${cells[6]}${cells[4]}${cells[2]}`;

return [r1, r2, r3, c1, c2, c3, d1, d2].some((v) => v === FULL_CIRCLE || v === FULL_CROSS)

}

const Grid = (props) => {
    const [{ turn, cells, end, win}, setState] = useState(getInitialState(props))

    const onClick = (index, e) => {
        setState((prev) => {
            const updatedCells = [
                ...prev.cells.map((v, i) => (i === index ? prev.turn : v)),
            ]

            const updated = {
                ...prev,
                turn: reverse(prev.turn),
                cells: updatedCells,
                end: isEnd(updatedCells),
                win: isWin(updatedCells),
            }
            return updated
        })
    }
    if (end && !win) {
        return <span>That's the end !</span>
    }
        if (win) {
          return <span>Gagné, bien joué</span>
    }
    return (
        <>
            <span>Turn: {turn}</span>
            <div className={styles.Grid}>
                {cells.map((v, i) => {
                    return (
                        <Cell value={v} index={i} key={i} onClick={onClick} />
                    )
                })}
            </div>{' '}
        </>
    )
}

Grid.defaultProps = {
    turn: 'cross',
    cells: new Array(9).fill(''),
    end: false,
}
export default Grid
