import './reset.css'
import './foundation.css'
import './main.css'
import Perceptron from './modules/Perceptron'
import Trainer from './modules/Trainer'
import Canvas from './modules/Canvas'
import Graph from './modules/Graph'
import Variable from './modules/Variable'
import {create} from './modules/utils'

window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                               window.webkitRequestAnimationFrame || window.msRequestAnimationFrame
  
let canvas = new Canvas('main', '#graph-zone'),
    g      = new Graph(canvas.element.width, canvas.element.height),
    lineFunction = (x) => x


let state = new Variable('state', '#container-variables'),
    step = new Variable('step', '#container-variables'),
    time = new Variable('time', '#container-variables'),
    brainCanvas = new Canvas('brain', '#container-variables', {height: 250}),
    stepsAtTimeCanvas = new Canvas('stepsAtTime', '#container-variables', {width: 200, height: 200}),
    nTrainingPoints = 1000,
    runButton = document.getElementById('run')
    
document.getElementById('n-points').addEventListener('input', function(e){
  nTrainingPoints = e.target.valueAsNumber
})
document.getElementById('string-func').addEventListener('input', function(e){
  
  lineFunction = new Function('x', 'return '+e.target.value)
  
  canvas.clear()
  canvas.drawGraph()
  canvas.drawFunction(lineFunction)
})

runButton.addEventListener('click', run)

canvas.drawGraph()
canvas.drawFunction(lineFunction)

function run(e){
  runButton.setAttribute('disabled', 'disabled')
  
  canvas.clear()
  canvas.drawGraph()
  canvas.drawFunction(lineFunction)
  
  let neurin = new Perceptron(1,0),
      trainer = new Trainer({
    x: canvas.element.width,
    y: canvas.element.height
  }, nTrainingPoints, lineFunction )
  
  state.setValue('Training...')
  trainer.trainingPoints.forEach( data => neurin.train({ inputs: data.point, desired: data.answer}) )
  state.setValue('Trained!')

  let start = new Date()
  let work = new Promise(function(resolve, reject){
    state.setValue('Running... ')
    
    trainer.trainingPoints.forEach( (data, i) => setTimeout(function(){
        let guess = neurin.feedForward(data.point),
            color = guess == 1 ? 'white' : 'black',
            stroke = guess == data.answer ? 'green' : 'red'
        
        canvas.draw('circle', {
          at: g.point(data.point),
          radius: 3,
          attributes: {
            fillStyle: color,
            strokeStyle: stroke,
            lineWidth: 4
          }
        })
        
        brainCanvas.drawNeuron(neurin.weights, guess, 'neurin', {x:0, y:0}, 50)
        
        step.setProgress(i+1, trainer.trainingPoints.length)
        if (i+1 >= trainer.trainingPoints.length) {
          resolve()
        }
      }, i)
    )
  })
  
  work.then(function(){
    state.setValue('Finished!')
    time.setValue( (new Date().getTime() - start.getTime()) + 'ms' )
    runButton.removeAttribute('disabled')
  })
  
}

function drawTimeGraph(pCanvas) {
  
}