class Point {

  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  
  draw(c: CanvasRenderingContext2D, xCell: number, yCell: number, offset: number): void {
    console.log(this.x, this.y)
    c.beginPath();
    c.arc(this.x * xCell + offset, this.y * yCell + offset, 10, 0, 2 * Math.PI);
    c.fillStyle = '#A2D729'
    c.fill();
    c.arc(this.x * xCell + offset, this.y * yCell + offset, 12, 0, 2 * Math.PI);
    c.fillStyle = 'rgba(142, 173, 71, 0.7)'
    c.fill();
  }
}

export default Point;