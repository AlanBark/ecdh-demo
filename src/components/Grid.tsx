import React from 'react'
import useCanvas from '../hooks/useCanvas';
import Point from '../classes/Point';

interface GridData {
  col: number;
  row: number;
  points: number[][];
  offset: number;
  labels?: boolean;
}

// Draws a grid with points, with optional offset and labels
const Grid = ({ col, row, points, offset, labels=true }: GridData) => {

  const drawGrid = (c:CanvasRenderingContext2D , col: number, row: number, offset:number, labels?: boolean) => {

    let xCell = (c.canvas.width - offset * 2) / col;
    let yCell = (c.canvas.height - offset * 2) / row;

    c.beginPath();
    c.strokeStyle = 'rgba(75, 75, 75, 1)';
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

    if (labels) {
      c.beginPath();
      c.font = '13px Arial';
      c.fillStyle = 'rgba(120, 120, 120, 1)';
      for (let i = 0; i <= col; i++) {
        c.fillText(i.toString(), i * xCell + offset + 5, col * yCell + offset + 25);
      }
      c.textAlign = 'end';
      for (let i = 0; i <= row; i++) {
        c.fillText(i.toString(), offset - 15, (row - i) * yCell + offset + 5);
      }
      c.stroke();
      if (points.length > 0) {
        c.beginPath();
        c.strokeStyle = 'rgba(255, 255, 255, 1)';
        c.moveTo(offset, offset);
        c.lineTo(offset, c.canvas.height - offset);
        c.lineTo(c.canvas.width - offset, c.canvas.height - offset);
        c.stroke();
      }
    }
  }

  const drawPoints = (c:CanvasRenderingContext2D, points: number[][], offset:number) => {
    
    let xCell = (c.canvas.width - offset * 2) / col;
    let yCell = (c.canvas.height - offset * 2) / row;

    if (points?.length > 0) {
      for (let i = 0; i < points.length; i++) {
        let p = new Point(points[i][0], points[i][1], offset / 6);
        p.draw(c, xCell, yCell, offset);
      }
    }
  }

  const draw = (c: CanvasRenderingContext2D, drawParams: GridData) => {
    c.clearRect(0, 0, c.canvas.width, c.canvas.height);
    drawGrid(c, drawParams.col, drawParams.row, drawParams.offset, labels);
    drawPoints(c, drawParams.points, drawParams.offset);
  }

  const canvasRef = useCanvas(draw, { col, row, points, offset }, false);

  return (
    <>
      <canvas ref={canvasRef} height={500} width={500}/>
    </>
  )
}

export default Grid