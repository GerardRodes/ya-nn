export default class Graph {
  constructor(width, height) {
    this.width = width
    this.height = height
    this.keywords = {
      xmax: this.width / 2,
      xmin: -(this.width / 2),
      ymax: this.height / 2,
      ymin: -(this.height / 2)
    }
  }

  point(point){
    return {
      x: this.x(point.x),
      y: this.y(point.y)
    }
  }
  
  x(x){
    if (typeof x == 'string') {
      x = this.replace(x)
    }
    return x + (this.width / 2)
  }
  
  y(y){
    if (typeof y == 'string') {
      y = this.replace(y)
    }
    return -y  + (this.height / 2)
  }
  
  f(f){
    return {
      from: this.point({x: 'xmin', y: -f(this.keywords.xmin) }),
      to: this.point({x: 'xmax', y: -f(this.keywords.xmax) })
    }
  }
  
  fullF(f){
    let path = []
    for (let i = this.keywords.xmin; i <= this.keywords.xmax; i++) {
      path.push( this.point({x: i, y:f(i)}) )
    }
    
    return path
  }
  
  replace(string){
    return this.keywords[string] !== undefined ? this.keywords[string] : string
  }
  
}