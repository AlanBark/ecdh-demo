class Point {

  x: number;
  y: number;
  radius: number;
  coords: {
    x: number;
    y: number;
  }

  constructor(x: number, y: number, radius: number, coords: { x: number; y: number; }) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.coords = coords;
  }

  isClicked(clickedCoords: { x: number; y: number; }): boolean {
    return Math.abs(this.x * clickedCoords.x - this.coords.x) < this.radius && Math.abs(this.y * clickedCoords.y - this.coords.y) < this.radius;
  }
  
  draw(c: CanvasRenderingContext2D, xCell: number, yCell: number, offset: number): void {
    c.beginPath();
    c.arc(this.x * xCell + offset, this.y * yCell + offset, this.radius, 0, 2 * Math.PI);
    c.fillStyle = '#A2D729'
    c.fill();
    c.arc(this.x * xCell + offset, this.y * yCell + offset, (this.radius * 1.3), 0, 2 * Math.PI);
    c.fillStyle = 'rgba(142, 173, 71, 0.7)'
    c.fill();
    if (Math.abs(this.x * xCell - this.coords.x) < this.radius && Math.abs(this.y * yCell - this.coords.y) < this.radius) {
      c.beginPath();
      c.strokeStyle = 'rgba(255, 255, 255, 1)';
      c.arc(this.x * xCell + offset, this.y * yCell + offset, this.radius * 1.3, 0, 2 * Math.PI);
      c.stroke();
      c.canvas.style.cursor = 'pointer';
    }
  }
}

export default Point;