import Line from './shapes/Line'
import Free from './shapes/Free'
import Circle from './shapes/Circle'
import Rectangle from './shapes/Rectangle'
import Graph from './Graph'

export default class Canvas {
  
  constructor(id, containerSelector, fixedSize) {
    this.element = this.createCanvas(id)
    this.container = document.querySelector(containerSelector)
    this.container.append(this.element)
    this.ctx = this.element.getContext('2d')
    this.shapes = []
    this.fixedSize = fixedSize ? fixedSize : {}
    
    this.bindEvents()
    this.resizeCanvas()
    this.update()
  }

  createCanvas(id){
    let canvas = document.createElement('canvas')
    canvas.setAttribute('id', id)
    canvas.classList.add('is-canvas')
    return canvas
  }
  
  resizeCanvas(){
    let data = undefined
    if (this.element.style.width) {
      data = this.ctx.getImageData(0, 0, this.element.width, this.element.height)
    }
    
    let computedStyle = getComputedStyle(this.container),
        elementHeight = this.container.clientHeight,
        elementWidth = this.container.clientWidth
        
    elementHeight -= parseFloat(computedStyle.paddingTop) + parseFloat(computedStyle.paddingBottom)
    elementWidth -= parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight)

    // Element width and height minus padding and border
    this.element.style.width  = this.fixedSize.width ? this.fixedSize.width+'px' : elementWidth+'px'
    this.element.style.height = this.fixedSize.height ? this.fixedSize.height+'px' : elementHeight+'px'
    this.element.width  = this.fixedSize.width ? this.fixedSize.width : elementWidth
    this.element.height = this.fixedSize.height ? this.fixedSize.height : elementHeight
    
    this.g = new Graph(this.element.width, this.element.height)
    
    if (data) {
      this.ctx.putImageData(data, 0, 0)
      this.update()
    }
  }
  
  bindEvents(){
    window.addEventListener('load', () => this.resizeCanvas())
    window.addEventListener('resize', () => this.resizeCanvas())
  }
  
  draw(type, params, shouldUpdate){
    let shape = null,
        update = shouldUpdate !== undefined ? shouldUpdate : true,
        id = this.shapes.length,
        attributes = params.attributes ? params.attributes : {}
  
    switch(type){
      case 'line':
        shape = new Line(id, attributes, params.from.x, params.from.y, params.to.x, params.to.y)
        break
      
      case 'circle':
        shape = new Circle(id, attributes, params.at.x, params.at.y, params.radius)
        break
        
      case 'rectangle':
        shape = new Rectangle(id, attributes, params.from.x, params.from.y, params.to.x, params.to.y)
        break
      
      case 'free':
        shape = new Free(id, attributes, params.path)
        break
    }
    
    this.shapes.push(shape)
    
    if (update) {
      this.update() 
    }
  }
  
  update(shouldClear){
    let clear = shouldClear !== undefined ? shouldClear : true
    
    if (clear) {
      this.ctx.clearRect(0, 0, this.element.width, this.element.height)
    }
    
    this.shapes.forEach((shape) => this.process(shape))
    
    this.shapes = this.shapes.filter(shape => shape.attributes.volatile != true)
  }
  
  clear(){
    this.shapes = []
    this.update()
  }
  
  process(shape){
    this.ctx.restore()
    if (shape.attributes) {
      this.ctx.save()
      for (let attr in shape.attributes) {
        this.ctx[attr] = shape.attributes[attr]
      }
    }
    this.ctx.beginPath()
    switch(shape.type){
      case 'line':
        this.ctx.moveTo(shape.coor.start.x, shape.coor.start.y)
        this.ctx.lineTo(shape.coor.end.x, shape.coor.end.y)
        break
      
      case 'circle':
        this.ctx.arc(shape.coor.start.x, shape.coor.start.y, shape.radius, 0, 2*Math.PI)
        break
        
      case 'rectangle':
        this.ctx.rect(shape.coor.start.x, shape.coor.start.y, shape.coor.end.x - shape.coor.start.x, shape.coor.end.y - shape.coor.start.y)
        break
        
      case 'free':
        this.ctx.moveTo(shape.coor.start.x, shape.coor.start.y)
        shape.coor.path.forEach(dot => {
          this.ctx.lineTo(dot.x, dot.y)
        })
        break
        
      case 'combinedLayers':
        this.ctx.putImageData(shape.data, 0, 0)
        break
    }
    
    if (shape.attributes.close) {
      this.ctx.closePath() 
    }
    
    this.ctx.stroke()
    if (this.ctx.fillStyle && (shape.type == 'circle' || shape.type == 'rectangle') ) {
      this.ctx.fill()
    }
    
    if (shape.attributes.text) {
      this.ctx.restore()
      this.ctx.save()
      this.ctx.font = shape.attributes.text.font
      this.ctx.fillStyle = shape.attributes.text.color
      this.ctx.textAlign = 'center'
      this.ctx.fillText(shape.attributes.text.text, shape.coor.start.x, shape.coor.start.y)
    }
    
  }
  
  drawGraph(){
    this.draw('line', {
      from: this.g.point({x:0, y:'ymax'}),
      to: this.g.point({x:0, y:'ymin'}),
      attributes: {
        strokeStyle: '#333',
        lineWidth: 2
      }
    })
    this.draw('line', {
      from: this.g.point({x:'xmin', y:0}),
      to: this.g.point({x:'xmax', y:0}),
      attributes: {
        strokeStyle: '#333',
        lineWidth: 2
      }
    })
  }
  
  drawStraightFunction(f){
    let functionLine = this.g.f(f)
    functionLine.attributes = {
      strokeStyle: '#FF0000',
      lineWidth: 4
    }
    this.draw('line', functionLine)
  }
  
  drawFunction(f){
    this.draw('free', {
      path: this.g.fullF(f),
      attributes: {
        strokeStyle: '#FF0000',
        lineWidth: 4
      }
    })
  }
  
  drawNeuron(weights, output, name, position, radius){
    
    this.draw('circle', {
      at: this.g.point(position),
      radius: radius,
      attributes: {
        fillStyle: '#98FB98',
        strokeStyle: '#9ACD32',
        text: {font: '12px monospace', color: 'black', text: name},
        lineWidth: radius / 10,
        volatile: true
      }
    }, false)
    
    let totalInputs = Object.keys(weights).length,
        subRadius = radius / (totalInputs * 2),
        index = 0,
        separation = (radius * 2) / totalInputs
        
    for (let id in weights) {
      this.draw('circle', {
        at: this.g.point( {x: position.x - radius, y: (position.y - radius) + (index * separation) + (radius / totalInputs) }),
        radius: subRadius,
        attributes: {
          fillStyle: 'white',
          strokeStyle: 'black',
          text: {font: '12px monospace', color: 'black', text: id+'->'+ weights[id].toFixed(2) },
          lineWidth: subRadius / 10,
          volatile: true
        }
      }, false)
      
      index++
    }
    
    this.update()
    
  }
  
}