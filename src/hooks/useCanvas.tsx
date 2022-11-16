import {useEffect, useRef} from 'react'

// draw will be called using the drawParams args, animated will determine if the canvas refreshes or not.

const useCanvas = (draw: (c: CanvasRenderingContext2D, drawParams: any) => void, drawParams={}, animated=true) => {

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {

    let animationFrameId: number;

    const canvas = canvasRef.current;
    if (canvas) {
      const c = canvas.getContext('2d');
      if (c) {
        if (animated) {
          const animate = () => {
            draw(c, drawParams);
            animationFrameId = window.requestAnimationFrame(animate);
          }
        animate()
        } else {
          draw(c, drawParams);
        }
      }
    }

    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [draw, drawParams, animated]);

  return canvasRef;
}

export default useCanvas;