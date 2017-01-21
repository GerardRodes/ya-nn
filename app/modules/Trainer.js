import Graph from './Graph'

export default class Trainer {
  
  constructor(graphSize, numberOfPoints, lineFunction) {
    
    this.trainingPoints = []
    this.func = lineFunction
    this.g = new Graph(graphSize.x, graphSize.y)
    
    for (let i = 0; i < numberOfPoints; i++) {
      let x = this.random( this.g.keywords.xmin, this.g.keywords.xmax),
          y = this.random( this.g.keywords.ymin, this.g.keywords.ymax),
          answer = y > this.func(x) ? 1 : -1
          
      this.trainingPoints.push({
        point: {x: x, y: y},
        answer: answer
      })
    }
  }

  // methods
  random(floor, ceil){
    return Math.floor(Math.random() * (ceil-floor+1) ) + floor
  }
}