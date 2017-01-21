function create(tagname, attrs){
  let element = document.createElement(tagname)
  
  for (let attr in attrs) {
    element.setAttribute(attr, attrs[attr])
  }
  
  return element
}

function str2rgb(string){
  let trimmed = string.trim(),
      values  = trimmed.substring(trimmed.indexOf('(')+1, trimmed.indexOf(')')).split(',')
  
  return {
    r: values[0],
    g: values[1],
    b: values[2]
  }
}

export { create, str2rgb }