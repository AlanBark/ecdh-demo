import React, { useEffect, useState } from 'react'
import useCanvas from '../hooks/useCanvas';
import Point from '../classes/Point';

interface GridData {
  col: number;
  row: number;
  points: number[][];
  offset: number;
  labels?: boolean;
  setClicked?: React.Dispatch<React.SetStateAction<number[]>>;
}

// Draws a grid with points, with optional offset and labels
const Grid = ({ col, row, points, offset, labels=true, setClicked }: GridData) => {

  const [mouse, setMouse] = useState({x: 0, y: 0});
  const [mouseClick, setMouseClick] = useState({x: 0, y: 0});

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
        if (col > 10 && (i -1)  % 2 === 0) continue;
        c.fillText(i.toString(), i * xCell + offset + 5, col * yCell + offset + 25);
      }
      c.textAlign = 'end';
      for (let i = 0; i <= row; i++) {
        if (row > 10 && (i -1)  % 2 === 0) continue;
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

  const drawPoints = (c:CanvasRenderingContext2D, points: number[][], offset:number, coords: { x: number, y: number }) => {
    
    let xCell = (c.canvas.width - offset * 2) / col;
    let yCell = (c.canvas.height - offset * 2) / row;

    if (points?.length > 0) {
      for (let i = 0; i < points.length; i++) {
        let p = new Point(points[i][0], points[i][1], offset / 6, coords);
        p.draw(c, xCell, yCell, offset);
      }
    }
  }

  const draw = (c: CanvasRenderingContext2D, drawParams: GridData) => {
    c.canvas.style.cursor = 'default';
    c.clearRect(0, 0, c.canvas.width, c.canvas.height);
    drawGrid(c, drawParams.col, drawParams.row, drawParams.offset, labels);
    let coords = {
      x: mouse.x - canvasRef.current!.offsetLeft - offset,
      y: mouse.y - canvasRef.current!.offsetTop - offset
    }
    drawPoints(c, drawParams.points, drawParams.offset, coords);
    if (!(coords.x < 0 || coords.y < 0 || coords.x > canvasRef.current!.width - offset || coords.y > canvasRef.current!.height - offset * 2)) {
      c.beginPath();
      c.strokeStyle = 'rgba(255, 255, 255, 1)';
      c.moveTo(coords.x + offset, 0);
      c.lineTo(coords.x + offset, canvasRef.current!.height);
      c.moveTo(0, coords.y + offset);
      c.lineTo(canvasRef.current!.width, coords.y + offset);
      c.stroke();
    }
  }

  const canvasRef = useCanvas(draw, { col, row, points, offset }, true);

  useEffect(() => {
    if (canvasRef.current !== null) {
      canvasRef.current.addEventListener('mousemove', (e) => {
        setMouse({x: e.pageX, y: e.pageY});
      });
      canvasRef.current.addEventListener('mousedown', (e) => {
        setMouseClick({x: e.pageX, y: e.pageY});
      });
    }
  }, []);
  
  useEffect(() => {
    let coords = {
      x: mouseClick.x - canvasRef.current!.offsetLeft - offset,
      y: (mouseClick.y - canvasRef.current!.offsetTop - offset)
    }

    let xCell = (500 - offset * 2) / col;
    let yCell = (500 - offset * 2) / row;

    let x = Math.round(coords.x / xCell);
    let y = Math.round(coords.y / yCell) * -1 + row;

    setClicked!([x, y]);

  }, [mouseClick]);

  return (
    <>
      <canvas ref={canvasRef} height={500} width={500}/>
    </>
  )
}

export default Grid