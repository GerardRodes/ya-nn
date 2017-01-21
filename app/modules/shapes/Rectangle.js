import Shape from './Shape'

export default class Rectangle extends Shape {
  
  constructor(id, attributes, fromX, fromY, toX, toY){
    super(id, attributes, fromX, fromY)
    
    this.type = 'rectangle'
    this.coor.end = {
      x: toX,
      y: toY
    }
    
  }
  
}