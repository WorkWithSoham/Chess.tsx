import React from "react";
import './chessboard.css'

const verticalAxis = ['1', '2', '3', '4', '5', '6', '7', '8']
const horizontalAxis = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

export default function Chessboard() {

    let board = []

    for (let j = verticalAxis.length - 1; j >= 0; j--) {
        for (let i = 0; i < horizontalAxis.length; i++) {
            board.push(
                <div 
                className='tile'
                style={ ( (i+j)%2 !== 0 ) ? {backgroundColor: 'bisque'}: {backgroundColor: 'oliverab'}}
                >
                </div>
            )
        }
    }




    return (
        <div id='chessboard'>
            {board}
        </div>
    )
}