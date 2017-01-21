import Shape from './Shape'

export default class Free extends Shape {
  
  constructor(id, attributes, path){
    super(id, attributes, path[0].x, path[0].y)
    
    this.type = 'free'
    this.coor.path = path
  }
  
}