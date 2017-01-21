/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(1);

	__webpack_require__(5);

	var _Perceptron = __webpack_require__(7);

	var _Perceptron2 = _interopRequireDefault(_Perceptron);

	var _Trainer = __webpack_require__(8);

	var _Trainer2 = _interopRequireDefault(_Trainer);

	var _Canvas = __webpack_require__(9);

	var _Canvas2 = _interopRequireDefault(_Canvas);

	var _Graph = __webpack_require__(15);

	var _Graph2 = _interopRequireDefault(_Graph);

	var _utils = __webpack_require__(16);

	var utils = _interopRequireWildcard(_utils);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

	var canvas = new _Canvas2.default('main'),
	    g = new _Graph2.default(canvas.element.width, canvas.element.height),
	    neurin = new _Perceptron2.default(1, 0),
	    inputs = {
	  '0-0': 50,
	  '0-1': -12,
	  'bias': 1
	};

	document.getElementById('app').append(canvas.element);
	document.getElementById('layover').append();

	var lineFunction = function lineFunction(x) {
	  return 0.25 * x;
	};

	//Graph
	canvas.draw('line', {
	  from: g.point({ x: 0, y: 'ymax' }),
	  to: g.point({ x: 0, y: 'ymin' }),
	  attributes: {
	    strokeStyle: '#333',
	    lineWidth: 2
	  }
	});
	canvas.draw('line', {
	  from: g.point({ x: 'xmin', y: 0 }),
	  to: g.point({ x: 'xmax', y: 0 }),
	  attributes: {
	    strokeStyle: '#333',
	    lineWidth: 2
	  }
	});

	//True function
	var functionLine = g.f(lineFunction);
	functionLine.attributes = {
	  strokeStyle: '#FF0000',
	  lineWidth: 4
	};
	canvas.draw('line', functionLine);

	var trainer = new _Trainer2.default({
	  x: canvas.element.width,
	  y: canvas.element.height
	}, 1000, lineFunction);

	neurin.train(trainer.trainingPoints.map(function (data) {
	  return { inputs: data.point, desired: data.answer };
	}));
	console.dir(neurin);

	trainer.trainingPoints.forEach(function (data, i) {
	  return setTimeout(function () {
	    var guess = neurin.feedForward(data.point),
	        color = guess == 1 ? 'green' : 'blue';

	    canvas.draw('circle', {
	      at: g.point(data.point),
	      radius: 3,
	      attributes: {
	        fillStyle: color,
	        strokeStyle: color
	      }
	    });
	  }, i);
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js?minimize!./reset.css", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js?minimize!./reset.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, "a,abbr,acronym,address,applet,article,aside,audio,b,big,blockquote,body,canvas,caption,center,cite,code,dd,del,details,dfn,div,dl,dt,em,embed,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,html,i,iframe,img,ins,kbd,label,legend,li,mark,menu,nav,object,ol,output,p,pre,q,ruby,s,samp,section,small,span,strike,strong,sub,summary,sup,table,tbody,td,tfoot,th,thead,time,tr,tt,u,ul,var,video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}body{line-height:1}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote:after,blockquote:before,q:after,q:before{content:\"\";content:none}table{border-collapse:collapse;border-spacing:0}", ""]);

	// exports


/***/ },
/* 3 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(6);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js?minimize!./main.css", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js?minimize!./main.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, "#app,body,html{width:100%;height:100%}html *{font-family:monospace}#app{position:relative;overflow:hidden}.is-canvas{position:absolute;top:0;bottom:0;left:0;right:0;width:100%;height:100%;z-index:0}", ""]);

	// exports


/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var LEARNING_RATE = 0.03;

	var Perceptron = function () {

	  /*
	  Every Perceptron will have an id designed by the layer where it is
	  and the index which it occupies in the layer.
	  
	  Weights will register the weight of every input
	  identified by the id of the sender Perceptron
	  */
	  function Perceptron(layer, index) {
	    _classCallCheck(this, Perceptron);

	    this.id = layer + '-' + index;
	    this.weights = {};
	  }

	  /*
	  Receives inputs, multiplies values by weight ( if no defined gets a random value
	  between -1 and 1 ) and pass value throught activation function
	  */


	  _createClass(Perceptron, [{
	    key: 'feedForward',
	    value: function feedForward(inputs) {
	      var sum = 0;

	      for (var id in inputs) {
	        if (this.weights[id] == undefined) {
	          this.weights[id] = Math.random() * 2 - 1;
	        }

	        sum += inputs[id] * this.weights[id];
	      }

	      return this.activation(sum);
	    }

	    /*
	    Receives a value and determines an output
	    */

	  }, {
	    key: 'activation',
	    value: function activation(value) {
	      return value > 0 ? 1 : -1;
	    }

	    /*
	    Adjust the weights according the the error and learning rate constant
	    */

	  }, {
	    key: 'train',
	    value: function train(data) {
	      var guess = this.feedForward(data.inputs),
	          error = data.desired - guess;

	      for (var id in this.weights) {
	        this.weights[id] = error * inputs[id] * LEARNING_RATE;
	      }
	    }
	  }]);

	  return Perceptron;
	}();

	exports.default = Perceptron;

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Trainer = function () {
	  function Trainer(graphSize, numberOfPoints, lineFunction) {
	    _classCallCheck(this, Trainer);

	    this.trainingPoints = [];

	    for (var i = 0; i < numberOfPoints; i++) {
	      var x = this.random(-(graphSize.x / 2), graphSize.x / 2),
	          y = this.random(-(graphSize.y / 2), graphSize.y / 2),
	          answer = y > lineFunction(x) ? 1 : -1;

	      this.trainingPoints.push({
	        point: { x: x, y: y },
	        answer: answer
	      });
	    }
	  }

	  // methods


	  _createClass(Trainer, [{
	    key: "random",
	    value: function random(floor, ceil) {
	      return Math.floor(Math.random() * (ceil - floor + 1)) + floor;
	    }
	  }]);

	  return Trainer;
	}();

	exports.default = Trainer;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Line = __webpack_require__(10);

	var _Line2 = _interopRequireDefault(_Line);

	var _Free = __webpack_require__(12);

	var _Free2 = _interopRequireDefault(_Free);

	var _Circle = __webpack_require__(13);

	var _Circle2 = _interopRequireDefault(_Circle);

	var _Rectangle = __webpack_require__(14);

	var _Rectangle2 = _interopRequireDefault(_Rectangle);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Canvas = function () {
	  function Canvas(id) {
	    _classCallCheck(this, Canvas);

	    this.element = this.createCanvas(id);
	    this.ctx = this.element.getContext('2d');
	    this.shapes = [];

	    this.bindEvents();
	    this.resizeCanvas();
	    this.update();
	  }

	  _createClass(Canvas, [{
	    key: 'createCanvas',
	    value: function createCanvas(id) {
	      var canvas = document.createElement('canvas');
	      canvas.setAttribute('id', id);
	      canvas.classList.add('is-canvas');
	      return canvas;
	    }
	  }, {
	    key: 'resizeCanvas',
	    value: function resizeCanvas() {
	      var data = this.ctx.getImageData(0, 0, this.element.width, this.element.height);

	      this.element.style.width = document.documentElement.clientWidth + 'px';
	      this.element.style.height = document.documentElement.clientHeight + 'px';
	      this.element.width = document.documentElement.clientWidth;
	      this.element.height = document.documentElement.clientHeight;

	      this.ctx.putImageData(data, 0, 0);
	    }
	  }, {
	    key: 'bindEvents',
	    value: function bindEvents() {
	      var _this = this;

	      window.addEventListener('load', function () {
	        return _this.resizeCanvas();
	      });
	      window.addEventListener('resize', function () {
	        return _this.resizeCanvas();
	      });
	    }
	  }, {
	    key: 'draw',
	    value: function draw(type, params, shouldUpdate) {
	      var shape = null,
	          update = shouldUpdate !== undefined ? shouldUpdate : true,
	          id = this.shapes.length,
	          attributes = params.attributes ? params.attributes : {};

	      switch (type) {
	        case 'line':
	          shape = new _Line2.default(id, attributes, params.from.x, params.from.y, params.to.x, params.to.y);
	          break;

	        case 'circle':
	          shape = new _Circle2.default(id, attributes, params.at.x, params.at.y, params.radius);
	          break;

	        case 'rectangle':
	          shape = new _Rectangle2.default(id, attributes, params.from.x, params.from.y, params.to.x, params.to.y);
	          break;

	        case 'free':
	          shape = new _Free2.default(id, attributes, params.path);
	          break;
	      }

	      this.shapes.push(shape);

	      if (update) {
	        this.update();
	      }
	    }
	  }, {
	    key: 'update',
	    value: function update(shouldClear) {
	      var _this2 = this;

	      var clear = shouldClear !== undefined ? shouldClear : true;

	      if (clear) {
	        this.ctx.clearRect(0, 0, this.element.width, this.element.height);
	      }

	      this.shapes.forEach(function (shape) {
	        return _this2.process(shape);
	      });

	      this.shapes = this.shapes.filter(function (shape) {
	        return shape.attributes.volatile != true;
	      });
	    }
	  }, {
	    key: 'clear',
	    value: function clear() {
	      this.shapes = [];
	      this.update();
	    }
	  }, {
	    key: 'process',
	    value: function process(shape) {
	      var _this3 = this;

	      this.ctx.restore();
	      if (shape.attributes) {
	        this.ctx.save();
	        for (var attr in shape.attributes) {
	          this.ctx[attr] = shape.attributes[attr];
	        }
	      }
	      this.ctx.beginPath();
	      switch (shape.type) {
	        case 'line':
	          this.ctx.moveTo(shape.coor.start.x, shape.coor.start.y);
	          this.ctx.lineTo(shape.coor.end.x, shape.coor.end.y);
	          break;

	        case 'circle':
	          this.ctx.arc(shape.coor.start.x, shape.coor.start.y, shape.radius, 0, 2 * Math.PI);
	          break;

	        case 'rectangle':
	          this.ctx.rect(shape.coor.start.x, shape.coor.start.y, shape.coor.end.x - shape.coor.start.x, shape.coor.end.y - shape.coor.start.y);
	          break;

	        case 'free':
	          this.ctx.moveTo(shape.coor.start.x, shape.coor.start.y);
	          shape.coor.path.forEach(function (dot) {
	            _this3.ctx.lineTo(dot.x, dot.y);
	          });
	          break;

	        case 'combinedLayers':
	          this.ctx.putImageData(shape.data, 0, 0);
	          break;
	      }
	      this.ctx.closePath();
	      this.ctx.stroke();
	      if (this.ctx.fillStyle) {
	        this.ctx.fill();
	      }
	    }
	  }]);

	  return Canvas;
	}();

	exports.default = Canvas;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Shape2 = __webpack_require__(11);

	var _Shape3 = _interopRequireDefault(_Shape2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Line = function (_Shape) {
	  _inherits(Line, _Shape);

	  function Line(id, attributes, fromX, fromY, toX, toY) {
	    _classCallCheck(this, Line);

	    var _this = _possibleConstructorReturn(this, (Line.__proto__ || Object.getPrototypeOf(Line)).call(this, id, attributes, fromX, fromY));

	    _this.type = 'line';
	    _this.coor.end = {
	      x: toX,
	      y: toY
	    };

	    return _this;
	  }

	  return Line;
	}(_Shape3.default);

	exports.default = Line;

/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Shape = function Shape(id, attributes, x, y) {
	  _classCallCheck(this, Shape);

	  this.id = id;
	  this.attributes = attributes;
	  this.coor = {
	    start: {
	      x: x,
	      y: y
	    }
	  };
	};

	exports.default = Shape;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Shape2 = __webpack_require__(11);

	var _Shape3 = _interopRequireDefault(_Shape2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Free = function (_Shape) {
	  _inherits(Free, _Shape);

	  function Free(id, attributes, path) {
	    _classCallCheck(this, Free);

	    var _this = _possibleConstructorReturn(this, (Free.__proto__ || Object.getPrototypeOf(Free)).call(this, id, attributes, path[0].x, path[0].y));

	    _this.type = 'free';
	    _this.coor.path = path;
	    return _this;
	  }

	  return Free;
	}(_Shape3.default);

	exports.default = Free;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Shape2 = __webpack_require__(11);

	var _Shape3 = _interopRequireDefault(_Shape2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Circle = function (_Shape) {
	  _inherits(Circle, _Shape);

	  function Circle(id, attributes, centerX, centerY, radius) {
	    _classCallCheck(this, Circle);

	    var _this = _possibleConstructorReturn(this, (Circle.__proto__ || Object.getPrototypeOf(Circle)).call(this, id, attributes, centerX, centerY));

	    _this.type = 'circle';
	    _this.radius = radius;

	    return _this;
	  }

	  return Circle;
	}(_Shape3.default);

	exports.default = Circle;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Shape2 = __webpack_require__(11);

	var _Shape3 = _interopRequireDefault(_Shape2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Rectangle = function (_Shape) {
	  _inherits(Rectangle, _Shape);

	  function Rectangle(id, attributes, fromX, fromY, toX, toY) {
	    _classCallCheck(this, Rectangle);

	    var _this = _possibleConstructorReturn(this, (Rectangle.__proto__ || Object.getPrototypeOf(Rectangle)).call(this, id, attributes, fromX, fromY));

	    _this.type = 'rectangle';
	    _this.coor.end = {
	      x: toX,
	      y: toY
	    };

	    return _this;
	  }

	  return Rectangle;
	}(_Shape3.default);

	exports.default = Rectangle;

/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Graph = function () {
	  function Graph(width, height) {
	    _classCallCheck(this, Graph);

	    this.width = width;
	    this.height = height;
	    this.keywords = {
	      xmax: this.width / 2,
	      xmin: -(this.width / 2),
	      ymax: this.height / 2,
	      ymin: -(this.height / 2)
	    };
	  }

	  _createClass(Graph, [{
	    key: 'point',
	    value: function point(_point) {
	      return {
	        x: this.x(_point.x),
	        y: this.y(_point.y)
	      };
	    }
	  }, {
	    key: 'x',
	    value: function x(_x) {
	      if (typeof _x == 'string') {
	        _x = this.replace(_x);
	      }
	      return _x + this.width / 2;
	    }
	  }, {
	    key: 'y',
	    value: function y(_y) {
	      if (typeof _y == 'string') {
	        _y = this.replace(_y);
	      }
	      return _y + this.height / 2;
	    }
	  }, {
	    key: 'f',
	    value: function f(_f) {
	      return {
	        from: this.point({ x: 'xmin', y: -_f(this.keywords.xmin) }),
	        to: this.point({ x: 'xmax', y: -_f(this.keywords.xmax) })
	      };
	    }
	  }, {
	    key: 'replace',
	    value: function replace(string) {
	      return this.keywords[string] !== undefined ? this.keywords[string] : string;
	    }
	  }]);

	  return Graph;
	}();

	exports.default = Graph;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _utils = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"utils\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	Object.keys(_utils).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _utils[key];
	    }
	  });
	});
	function create(tagname, attrs) {
	  var element = document.createElement(tagname);

	  for (var attr in attrs) {
	    element.attributes[attr] = attrs[attr];
	  }

	  return element;
	}

	function str2rgb(string) {
	  var trimmed = string.trim(),
	      values = trimmed.substring(trimmed.indexOf('(') + 1, trimmed.indexOf(')')).split(',');

	  return {
	    r: values[0],
	    g: values[1],
	    b: values[2]
	  };
	}

/***/ }
/******/ ]);