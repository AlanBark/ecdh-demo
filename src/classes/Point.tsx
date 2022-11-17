class Point {

  x: number;
  y: number;
  radius: number;

  constructor(x: number, y: number, radius: number) {
    this.x = x;
    this.y = y;
    this.radius = radius;
  }
  
  draw(c: CanvasRenderingContext2D, xCell: number, yCell: number, offset: number): void {
    c.beginPath();
    c.arc(this.x * xCell + offset, this.y * yCell + offset, this.radius, 0, 2 * Math.PI);
    c.fillStyle = '#A2D729'
    c.fill();
    c.arc(this.x * xCell + offset, this.y * yCell + offset, (this.radius * 1.3), 0, 2 * Math.PI);
    c.fillStyle = 'rgba(142, 173, 71, 0.7)'
    c.fill();
  }
}

export default Point;