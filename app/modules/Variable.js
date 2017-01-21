import {create} from './utils'

export default class Variable {
  constructor(name, containerSelector) {
    this.name = name
    this.container = document.querySelector(containerSelector)
    this.elements = {
      main : create('div', {'data-variable': this.name, class: 'variable'}),
      info : create('div', {class: 'info'}),
      name : create('div', {class: 'name'}),
      value: create('div', {class: 'value'}),
      progress: create('progress', {class: 'progress', max: '100', value: '0'})
    }
    this.elements.name.innerText = this.name
    
    this.append(this.elements.info, this.elements.value)
    this.append(this.elements.main, this.elements.name)
    this.append(this.elements.main, this.elements.info)
    this.append(this.container, this.elements.main)
    
  }
  
  setValue (value) {
    this.elements.value.innerText = value
  }
  
  setProgress (value, max, shouldSetValue) {
    let setValue = shouldSetValue === undefined ? true : shouldSetValue
    
    if (setValue) {
      this.setValue(value+'/'+max)
    }
    
    if (!this.elements.progress.appended) {
      this.append(this.elements.info, this.elements.progress)
    }
    
    this.elements.progress.setAttribute('value', (value * 100) / max )
  }
  
  append(parent, elements){
    parent.append(elements)
    elements.appended = true
  }

  // methods
}