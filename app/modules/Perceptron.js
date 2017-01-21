const LEARNING_RATE = 0.01

export default class Perceptron {
  
  
  /*
  Every Perceptron will have an id designed by the layer where it is
  and the index which it occupies in the layer.
  
  Weights will register the weight of every input
  identified by the id of the sender Perceptron
  */
  constructor(layer, index) {
    this.id = layer+'-'+index
    this.weights = {}
  }
  

  /*
  Receives inputs, multiplies values by weight ( if no defined gets a random value
  between -1 and 1 ) and pass value throught activation function
  */
  feedForward(inputs) {
    let sum = 0
    
    for (let id in inputs) {
      
      if (this.weights[id] == undefined) {
        this.weights[id] = (Math.random() * 2) - 1
      }
      
      sum += inputs[id] * this.weights[id]
    }
    
    return this.activation(sum)
  }
  
  
  /*
  Receives a value and determines an output
  */
  activation(value) {
    return value > 0 ? 1 : -1
  }
  
  
  /*
  Adjust the weights according the the error and learning rate constant
  */
  train(data) {
    let guess = this.feedForward(data.inputs),
        error = data.desired - guess
        
    for (let id in this.weights) {
      this.weights[id] += error * data.inputs[id] * LEARNING_RATE
    }
    
    return guess
  }

  
}