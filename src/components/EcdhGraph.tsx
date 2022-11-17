import React, { useEffect, useState } from 'react'
import Grid from './Grid'

interface EcdhGraphData {
  a: string;
  b: string;
  p: string;
}

/* 
  Generates an elliptic curve graph over a finite field p, with a and b as parameters
  form is y^2 = x^3 + ax + b mod p
  This is not optimised at all, it only serves to show an easy way of generating the graph
  and won't perform well for larger values of p 
*/
const EcdhGraph = ({ a, b, p}: EcdhGraphData) => {

  const [points, setPoints] = useState<number[][]>([]);

  /**
   * Generates possible y values, remembering that the form for the graph is y^2 = x^3 + ax + b mod p
   * 
   * @param p prime number
   * @returns Array of all squares in Zp
   */
  function calcSquares(p: number) {
    let squares = [];
    for (let i = 0; i < p; i++) {
      squares.push([i, (i ** 2) % p]);
    }
    return squares;
  }

  /**
   * Returns an array of points on the EC within the finite field p.
   * Each possible x value is run through the EC equation and the y values are calculated.
   * If this y value is a square in Zp, then the point is added to the array.
   * 
   * @param p prime number
   * @param a a parameter of the curve
   * @param b b parameter of the curve
   * @returns 2D array of points on the curve, in the form [x, y]
   */
  function calcEC(a: number, b: number, p: number) {
    let squares = calcSquares(p);
    let ecPoints = [];
    for (let x = 0; x < p; x++) {
      let ysquare = (x ** 3 + a * x + b) % p;
      for (let i = 0; i < p; i++) {
        if (ysquare === squares[i][1]) {
          ecPoints.push([x, squares[i][0]]);
        }
      }
    }
    setPoints(ecPoints);
  }

  useEffect(() => {
    try {
      let aInt = parseInt(a);
      let bInt = parseInt(b);
      let pInt = parseInt(p);
      calcEC(aInt, bInt, pInt);
    } catch (e) {
      console.log(e);
    }
  }, [a, b, p]);


  return (
    <Grid col={parseInt(p)} row={parseInt(p)} points={points} labels={true} offset={40} />
  )
}

export default EcdhGraph