import React from 'react'
import useCanvas from '../hooks/useCanvas';
import Point from '../classes/Point';

interface GridData {
  col: number;
  row: number;
  points: number[][];
  offset: number;
}

// Draws a grid with points, with optional offset
const Grid = ({ col, row, points, offset }: GridData) => {

  const drawGrid = (c:CanvasRenderingContext2D , col: number, row: number, offset:number) => {

    let xCell = Math.floor((c.canvas.width - offset * 2) / col);
    let yCell = Math.floor((c.canvas.height - offset * 2) / row);

    c.beginPath();
    c.strokeStyle = 'rgba(75, 75, 75, 0.9)';
    c.lineWidth = 1;
    for (let i = 0; i <= col; i++) {
      c.moveTo(i * xCell + offset, offset);
      c.lineTo(i * xCell + offset, c.canvas.height - offset);
    }
    for (let i = 0; i <= row; i++) {
      c.moveTo(offset, i * yCell + offset);
      c.lineTo(c.canvas.width - offset, i * yCell + offset);
    }
    c.stroke();
  }

  const drawPoints = (c:CanvasRenderingContext2D, points: number[][], offset: number) => {
    
    let xCell = Math.floor((c.canvas.width - offset * 2) / col);
    let yCell = Math.floor((c.canvas.height - offset * 2) / row);

    

    if (points?.length > 0) {
      for (let i = 0; i < points.length; i++) {
        let p = new Point(points[i][0], points[i][1]);
        p.draw(c, xCell, yCell, offset);
      }
    }
  }

  const draw = (c: CanvasRenderingContext2D, drawParams: GridData) => {
    c.clearRect(0, 0, c.canvas.width, c.canvas.height);
    drawGrid(c, drawParams.col, drawParams.row, drawParams.offset);
    drawPoints(c, drawParams.points, drawParams.offset);
  }

  const canvasRef = useCanvas(draw, { col, row, points, offset }, false);

  return (
    <>
      <canvas ref={canvasRef} />
    </>
  )
}

export default Grid