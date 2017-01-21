import Shape from './Shape'

export default class Line extends Shape {
  
  constructor(id, attributes, fromX, fromY, toX, toY){
    super(id, attributes, fromX, fromY)
    
    this.type = 'line'
    this.coor.end = {
      x: toX,
      y: toY
    }
    
  }
  
}