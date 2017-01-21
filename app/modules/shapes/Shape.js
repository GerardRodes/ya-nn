export default class Shape {
  
  constructor(id, attributes, x, y) {
    this.id = id
    this.attributes = attributes
    this.coor = {
      start: {
        x: x,
        y: y
      }
    }
    
  }
  
}