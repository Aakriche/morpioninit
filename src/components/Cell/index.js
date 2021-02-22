import React from 'react'
import Circle from '../Circle'
import Cross from '../Cross'

import styles from './styles.module.css'

const Cell = ({ value, index, onClick }) => {
    switch (value) {
        case 'cross':
            return <Cross />

        case 'circle':
            return <Circle />

        default:
            return <span onClick={(e) => onClick(index, e)} className={styles.Cell}></span>
    }
}

export default Cell
