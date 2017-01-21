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

	__webpack_require__(7);

	var _Perceptron = __webpack_require__(9);

	var _Perceptron2 = _interopRequireDefault(_Perceptron);

	var _Trainer = __webpack_require__(10);

	var _Trainer2 = _interopRequireDefault(_Trainer);

	var _Canvas = __webpack_require__(12);

	var _Canvas2 = _interopRequireDefault(_Canvas);

	var _Graph = __webpack_require__(11);

	var _Graph2 = _interopRequireDefault(_Graph);

	var _Variable = __webpack_require__(18);

	var _Variable2 = _interopRequireDefault(_Variable);

	var _utils = __webpack_require__(19);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

	var canvas = new _Canvas2.default('main', '#graph-zone'),
	    g = new _Graph2.default(canvas.element.width, canvas.element.height),
	    lineFunction = function lineFunction(x) {
	  return x;
	};

	var state = new _Variable2.default('state', '#container-variables'),
	    step = new _Variable2.default('step', '#container-variables'),
	    time = new _Variable2.default('time', '#container-variables'),
	    brainCanvas = new _Canvas2.default('brain', '#container-variables', { height: 250 }),
	    stepsAtTimeCanvas = new _Canvas2.default('stepsAtTime', '#container-variables', { width: 200, height: 200 }),
	    nTrainingPoints = 1000,
	    runButton = document.getElementById('run');

	document.getElementById('n-points').addEventListener('input', function (e) {
	  nTrainingPoints = e.target.valueAsNumber;
	});
	document.getElementById('string-func').addEventListener('input', function (e) {

	  lineFunction = new Function('x', 'return ' + e.target.value);

	  canvas.clear();
	  canvas.drawGraph();
	  canvas.drawFunction(lineFunction);
	});

	runButton.addEventListener('click', run);

	canvas.drawGraph();
	canvas.drawFunction(lineFunction);

	function run(e) {
	  runButton.setAttribute('disabled', 'disabled');

	  canvas.clear();
	  canvas.drawGraph();
	  canvas.drawFunction(lineFunction);

	  var neurin = new _Perceptron2.default(1, 0),
	      trainer = new _Trainer2.default({
	    x: canvas.element.width,
	    y: canvas.element.height
	  }, nTrainingPoints, lineFunction);

	  state.setValue('Training...');
	  trainer.trainingPoints.forEach(function (data) {
	    return neurin.train({ inputs: data.point, desired: data.answer });
	  });
	  state.setValue('Trained!');

	  var start = new Date();
	  var work = new Promise(function (resolve, reject) {
	    state.setValue('Running... ');

	    trainer.trainingPoints.forEach(function (data, i) {
	      return setTimeout(function () {
	        var guess = neurin.feedForward(data.point),
	            color = guess == 1 ? 'white' : 'black',
	            stroke = guess == data.answer ? 'green' : 'red';

	        canvas.draw('circle', {
	          at: g.point(data.point),
	          radius: 3,
	          attributes: {
	            fillStyle: color,
	            strokeStyle: stroke,
	            lineWidth: 4
	          }
	        });

	        brainCanvas.drawNeuron(neurin.weights, guess, 'neurin', { x: 0, y: 0 }, 50);

	        step.setProgress(i + 1, trainer.trainingPoints.length);
	        if (i + 1 >= trainer.trainingPoints.length) {
	          resolve();
	        }
	      }, i);
	    });
	  });

	  work.then(function () {
	    state.setValue('Finished!');
	    time.setValue(new Date().getTime() - start.getTime() + 'ms');
	    runButton.removeAttribute('disabled');
	  });
	}

	function drawTimeGraph(pCanvas) {}

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
			module.hot.accept("!!./../node_modules/css-loader/index.js?minimize!./foundation.css", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js?minimize!./foundation.css");
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
	exports.push([module.id, "/*! normalize-scss | MIT/GPLv2 License | bit.ly/normalize-scss */html{font-family:sans-serif;line-height:1.15;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}body{margin:0}article,aside,footer,header,nav,section{display:block}h1{font-size:2em;margin:.67em 0}figcaption,figure{display:block}figure{margin:1em 40px}hr{box-sizing:content-box;height:0;overflow:visible}main{display:block}pre{font-family:monospace,monospace;font-size:1em}a{background-color:transparent;-webkit-text-decoration-skip:objects}a:active,a:hover{outline-width:0}abbr[title]{border-bottom:none;text-decoration:underline;text-decoration:underline dotted}b,strong{font-weight:inherit;font-weight:bolder}code,kbd,samp{font-family:monospace,monospace;font-size:1em}dfn{font-style:italic}mark{background-color:#ff0;color:#000}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}audio,video{display:inline-block}audio:not([controls]){display:none;height:0}img{border-style:none}svg:not(:root){overflow:hidden}button,input,optgroup,select,textarea{font-family:sans-serif;font-size:100%;line-height:1.15;margin:0}button{overflow:visible}button,select{text-transform:none}[type=reset],[type=submit],button,html [type=button]{-webkit-appearance:button}[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner,button::-moz-focus-inner{border-style:none;padding:0}[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring,button:-moz-focusring{outline:1px dotted ButtonText}input{overflow:visible}[type=checkbox],[type=radio]{box-sizing:border-box;padding:0}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-cancel-button,[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}fieldset{border:1px solid silver;margin:0 2px;padding:.35em .625em .75em}legend{box-sizing:border-box;display:table;max-width:100%;padding:0;color:inherit;white-space:normal}progress{display:inline-block;vertical-align:baseline}textarea{overflow:auto}details{display:block}summary{display:list-item}menu{display:block}canvas{display:inline-block}[hidden],template{display:none}.foundation-mq{font-family:\"small=0em&medium=40em&large=64em&xlarge=75em&xxlarge=90em\"}html{box-sizing:border-box;font-size:100%}*,:after,:before{box-sizing:inherit}body{margin:0;padding:0;background:#fefefe;font-family:Helvetica Neue,Helvetica,Roboto,Arial,sans-serif;font-weight:400;line-height:1.5;color:#0a0a0a;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}img{display:inline-block;vertical-align:middle;max-width:100%;height:auto;-ms-interpolation-mode:bicubic}textarea{height:auto;min-height:50px}select,textarea{border-radius:3px}select{width:100%}.map_canvas embed,.map_canvas img,.map_canvas object,.mqa-display embed,.mqa-display img,.mqa-display object{max-width:none!important}button{padding:0;-webkit-appearance:none;-moz-appearance:none;appearance:none;border:0;border-radius:3px;background:transparent;line-height:1}[data-whatinput=mouse] button{outline:0}.is-visible{display:block!important}.is-hidden{display:none!important}blockquote,dd,div,dl,dt,form,h1,h2,h3,h4,h5,h6,li,ol,p,pre,td,th,ul{margin:0;padding:0}p{margin-bottom:1rem;font-size:inherit;line-height:1.6;text-rendering:optimizeLegibility}em,i{font-style:italic}b,em,i,strong{line-height:inherit}b,strong{font-weight:700}small{font-size:80%;line-height:inherit}h1,h2,h3,h4,h5,h6{font-family:Helvetica Neue,Helvetica,Roboto,Arial,sans-serif;font-style:normal;font-weight:400;color:inherit;text-rendering:optimizeLegibility}h1 small,h2 small,h3 small,h4 small,h5 small,h6 small{line-height:0;color:#cacaca}h1{font-size:1.5rem}h1,h2{line-height:1.4;margin-top:0;margin-bottom:.5rem}h2{font-size:1.25rem}h3{font-size:1.1875rem}h3,h4{line-height:1.4;margin-top:0;margin-bottom:.5rem}h4{font-size:1.125rem}h5{font-size:1.0625rem}h5,h6{line-height:1.4;margin-top:0;margin-bottom:.5rem}h6{font-size:1rem}@media print,screen and (min-width:40em){h1{font-size:3rem}h2{font-size:2.5rem}h3{font-size:1.9375rem}h4{font-size:1.5625rem}h5{font-size:1.25rem}h6{font-size:1rem}}a{line-height:inherit;color:#2ba6cb;text-decoration:none;cursor:pointer}a:focus,a:hover{color:#258faf}a img{border:0}hr{clear:both;max-width:75rem;height:0;margin:1.25rem auto;border-top:0;border-right:0;border-bottom:1px solid #cacaca;border-left:0}dl,ol,ul{margin-bottom:1rem;list-style-position:outside;line-height:1.6}li{font-size:inherit}ul{list-style-type:disc}ol,ul{margin-left:1.25rem}ol ol,ol ul,ul ol,ul ul{margin-left:1.25rem;margin-bottom:0}dl{margin-bottom:1rem}dl dt{margin-bottom:.3rem;font-weight:700}blockquote{margin:0 0 1rem;padding:.5625rem 1.25rem 0 1.1875rem;border-left:1px solid #cacaca}blockquote,blockquote p{line-height:1.6;color:#8a8a8a}cite{display:block;font-size:.8125rem;color:#8a8a8a}cite:before{content:\"\\2014   \"}abbr{border-bottom:1px dotted #0a0a0a;color:#0a0a0a;cursor:help}figure{margin:0}code{padding:.125rem .3125rem .0625rem;border:1px solid #cacaca;font-weight:400}code,kbd{background-color:#e6e6e6;font-family:Consolas,Liberation Mono,Courier,monospace;color:#0a0a0a}kbd{margin:0;padding:.125rem .25rem 0;border-radius:3px}.subheader{margin-top:.2rem;margin-bottom:.5rem;font-weight:400;line-height:1.4;color:#8a8a8a}.lead{font-size:125%;line-height:1.6}.stat{font-size:2.5rem;line-height:1}p+.stat{margin-top:-1rem}.no-bullet{margin-left:0;list-style:none}.text-left{text-align:left}.text-right{text-align:right}.text-center{text-align:center}.text-justify{text-align:justify}@media print,screen and (min-width:40em){.medium-text-left{text-align:left}.medium-text-right{text-align:right}.medium-text-center{text-align:center}.medium-text-justify{text-align:justify}}@media print,screen and (min-width:64em){.large-text-left{text-align:left}.large-text-right{text-align:right}.large-text-center{text-align:center}.large-text-justify{text-align:justify}}.show-for-print{display:none!important}@media print{*{background:transparent!important;box-shadow:none!important;color:#000!important;text-shadow:none!important}.show-for-print{display:block!important}.hide-for-print{display:none!important}table.show-for-print{display:table!important}thead.show-for-print{display:table-header-group!important}tbody.show-for-print{display:table-row-group!important}tr.show-for-print{display:table-row!important}td.show-for-print,th.show-for-print{display:table-cell!important}a,a:visited{text-decoration:underline}a[href]:after{content:\" (\" attr(href) \")\"}.ir a:after,a[href^=\"#\"]:after,a[href^=\"javascript:\"]:after{content:\"\"}abbr[title]:after{content:\" (\" attr(title) \")\"}blockquote,pre{border:1px solid #8a8a8a;page-break-inside:avoid}thead{display:table-header-group}img,tr{page-break-inside:avoid}img{max-width:100%!important}@page{margin:.5cm}h2,h3,p{orphans:3;widows:3}h2,h3{page-break-after:avoid}}[type=color],[type=date],[type=datetime-local],[type=datetime],[type=email],[type=month],[type=number],[type=password],[type=search],[type=tel],[type=text],[type=time],[type=url],[type=week],textarea{display:block;box-sizing:border-box;width:100%;height:2.4375rem;margin:0 0 1rem;padding:.5rem;border:1px solid #cacaca;border-radius:3px;background-color:#fefefe;box-shadow:inset 0 1px 2px hsla(0,0%,4%,.1);font-family:inherit;font-size:1rem;font-weight:400;color:#0a0a0a;transition:box-shadow .5s,border-color .25s ease-in-out;-webkit-appearance:none;-moz-appearance:none;appearance:none}[type=color]:focus,[type=date]:focus,[type=datetime-local]:focus,[type=datetime]:focus,[type=email]:focus,[type=month]:focus,[type=number]:focus,[type=password]:focus,[type=search]:focus,[type=tel]:focus,[type=text]:focus,[type=time]:focus,[type=url]:focus,[type=week]:focus,textarea:focus{outline:none;border:1px solid #8a8a8a;background-color:#fefefe;box-shadow:0 0 5px #cacaca;transition:box-shadow .5s,border-color .25s ease-in-out}textarea{max-width:100%}textarea[rows]{height:auto}input::-webkit-input-placeholder,textarea::-webkit-input-placeholder{color:#cacaca}input::-moz-placeholder,textarea::-moz-placeholder{color:#cacaca}input:-ms-input-placeholder,textarea:-ms-input-placeholder{color:#cacaca}input::placeholder,textarea::placeholder{color:#cacaca}input:disabled,input[readonly],textarea:disabled,textarea[readonly]{background-color:#e6e6e6;cursor:not-allowed}[type=button],[type=submit]{-webkit-appearance:none;-moz-appearance:none;appearance:none;border-radius:3px}input[type=search]{box-sizing:border-box}[type=checkbox],[type=file],[type=radio]{margin:0 0 1rem}[type=checkbox]+label,[type=radio]+label{display:inline-block;vertical-align:baseline;margin-left:.5rem;margin-right:1rem;margin-bottom:0}[type=checkbox]+label[for],[type=radio]+label[for]{cursor:pointer}label>[type=checkbox],label>[type=radio]{margin-right:.5rem}[type=file]{width:100%}label{display:block;margin:0;font-size:.875rem;font-weight:400;line-height:1.8;color:#0a0a0a}label.middle{margin:0 0 1rem;padding:.5625rem 0}.help-text{margin-top:-.5rem;font-size:.8125rem;font-style:italic;color:#0a0a0a}.input-group{display:table;width:100%;margin-bottom:1rem}.input-group>:first-child{border-radius:3px 0 0 3px}.input-group>:last-child>*{border-radius:0 3px 3px 0}.input-group-button,.input-group-button a,.input-group-button button,.input-group-button input,.input-group-button label,.input-group-field,.input-group-label{margin:0;white-space:nowrap;display:table-cell;vertical-align:middle}.input-group-label{padding:0 1rem;border:1px solid #cacaca;background:#e6e6e6;color:#0a0a0a;text-align:center;white-space:nowrap;width:1%;height:100%}.input-group-label:first-child{border-right:0}.input-group-label:last-child{border-left:0}.input-group-field{border-radius:0;height:2.5rem}.input-group-button{padding-top:0;padding-bottom:0;text-align:center;width:1%;height:100%}.input-group-button a,.input-group-button button,.input-group-button input,.input-group-button label{height:2.5rem;padding-top:0;padding-bottom:0;font-size:1rem}.input-group .input-group-button{display:table-cell}fieldset{margin:0;padding:0;border:0}legend{max-width:100%;margin-bottom:.5rem}.fieldset{margin:1.125rem 0;padding:1.25rem;border:1px solid #cacaca}.fieldset legend{margin:0;margin-left:-.1875rem;padding:0 .1875rem;background:#fefefe}select{height:2.4375rem;margin:0 0 1rem;padding:.5rem;-webkit-appearance:none;-moz-appearance:none;appearance:none;border:1px solid #cacaca;border-radius:3px;background-color:#fefefe;font-family:inherit;font-size:1rem;line-height:normal;color:#0a0a0a;background-image:url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' width='32' height='24' viewBox='0 0 32 24'><polygon points='0,0 32,0 16,24' style='fill: rgb%28138, 138, 138%29'></polygon></svg>\");background-origin:content-box;background-position:right -1rem center;background-repeat:no-repeat;background-size:9px 6px;padding-right:1.5rem;transition:box-shadow .5s,border-color .25s ease-in-out}@media screen and (min-width:0\\0){select{background-image:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAYCAYAAACbU/80AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAIpJREFUeNrEkckNgDAMBBfRkEt0ObRBBdsGXUDgmQfK4XhH2m8czQAAy27R3tsw4Qfe2x8uOO6oYLb6GlOor3GF+swURAOmUJ+RwtEJs9WvTGEYxBXqI1MQAZhCfUQKRzDMVj+TwrAIV6jvSUEkYAr1LSkcyTBb/V+KYfX7xAeusq3sLDtGH3kEGACPWIflNZfhRQAAAABJRU5ErkJggg==\")}}select:focus{outline:none;border:1px solid #8a8a8a;background-color:#fefefe;box-shadow:0 0 5px #cacaca;transition:box-shadow .5s,border-color .25s ease-in-out}select:disabled{background-color:#e6e6e6;cursor:not-allowed}select::-ms-expand{display:none}select[multiple]{height:auto;background-image:none}.is-invalid-input:not(:focus){border-color:#c60f13;background-color:#f8e6e7}.is-invalid-input:not(:focus)::-webkit-input-placeholder{color:#c60f13}.is-invalid-input:not(:focus)::-moz-placeholder{color:#c60f13}.is-invalid-input:not(:focus):-ms-input-placeholder{color:#c60f13}.form-error,.is-invalid-input:not(:focus)::placeholder,.is-invalid-label{color:#c60f13}.form-error{display:none;margin-top:-.5rem;margin-bottom:1rem;font-size:.75rem;font-weight:700}.form-error.is-visible{display:block}.float-left{float:left!important}.float-right{float:right!important}.float-center{display:block;margin-right:auto;margin-left:auto}.clearfix:after,.clearfix:before{display:table;content:\" \"}.clearfix:after{clear:both}.hide{display:none!important}.invisible{visibility:hidden}@media screen and (max-width:39.9375em){.hide-for-small-only{display:none!important}}@media screen and (max-width:0em),screen and (min-width:40em){.show-for-small-only{display:none!important}}@media print,screen and (min-width:40em){.hide-for-medium{display:none!important}}@media screen and (max-width:39.9375em){.show-for-medium{display:none!important}}@media screen and (min-width:40em) and (max-width:63.9375em){.hide-for-medium-only{display:none!important}}@media screen and (max-width:39.9375em),screen and (min-width:64em){.show-for-medium-only{display:none!important}}@media print,screen and (min-width:64em){.hide-for-large{display:none!important}}@media screen and (max-width:63.9375em){.show-for-large{display:none!important}}@media screen and (min-width:64em) and (max-width:74.9375em){.hide-for-large-only{display:none!important}}@media screen and (max-width:63.9375em),screen and (min-width:75em){.show-for-large-only{display:none!important}}.show-for-sr,.show-on-focus{position:absolute!important;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0)}.show-on-focus:active,.show-on-focus:focus{position:static!important;width:auto;height:auto;overflow:visible;clip:auto}.hide-for-portrait,.show-for-landscape{display:block!important}@media screen and (orientation:landscape){.hide-for-portrait,.show-for-landscape{display:block!important}}@media screen and (orientation:portrait){.hide-for-portrait,.show-for-landscape{display:none!important}}.hide-for-landscape,.show-for-portrait{display:none!important}@media screen and (orientation:landscape){.hide-for-landscape,.show-for-portrait{display:none!important}}@media screen and (orientation:portrait){.hide-for-landscape,.show-for-portrait{display:block!important}}.button{display:inline-block;vertical-align:middle;margin:0 0 1rem;padding:.85em 1em;-webkit-appearance:none;border:1px solid transparent;border-radius:3px;transition:background-color .25s ease-out,color .25s ease-out;font-size:.9rem;line-height:1;text-align:center;cursor:pointer;background-color:#2ba6cb;color:#fefefe}[data-whatinput=mouse] .button{outline:0}.button:focus,.button:hover{background-color:#258dad;color:#fefefe}.button.tiny{font-size:.6rem}.button.small{font-size:.75rem}.button.large{font-size:1.25rem}.button.expanded{display:block;width:100%;margin-right:0;margin-left:0}.button.primary{background-color:#2ba6cb;color:#0a0a0a}.button.primary:focus,.button.primary:hover{background-color:#2285a2;color:#0a0a0a}.button.secondary{background-color:#e9e9e9;color:#0a0a0a}.button.secondary:focus,.button.secondary:hover{background-color:#bababa;color:#0a0a0a}.button.alert{background-color:#c60f13;color:#fefefe}.button.alert:focus,.button.alert:hover{background-color:#9e0c0f;color:#fefefe}.button.success{background-color:#5da423;color:#0a0a0a}.button.success:focus,.button.success:hover{background-color:#4a831c;color:#0a0a0a}.button.warning{background-color:#ffae00;color:#0a0a0a}.button.warning:focus,.button.warning:hover{background-color:#cc8b00;color:#0a0a0a}.button.body-font{background-color:#222;color:#fefefe}.button.body-font:focus,.button.body-font:hover{background-color:#1b1b1b;color:#fefefe}.button.header{background-color:#222;color:#fefefe}.button.header:focus,.button.header:hover{background-color:#1b1b1b;color:#fefefe}.button.hollow{border:1px solid #2ba6cb;color:#2ba6cb}.button.hollow,.button.hollow:focus,.button.hollow:hover{background-color:transparent}.button.hollow:focus,.button.hollow:hover{border-color:#165366;color:#165366}.button.hollow.primary{border:1px solid #2ba6cb;color:#2ba6cb}.button.hollow.primary:focus,.button.hollow.primary:hover{border-color:#165366;color:#165366}.button.hollow.secondary{border:1px solid #e9e9e9;color:#e9e9e9}.button.hollow.secondary:focus,.button.hollow.secondary:hover{border-color:#757575;color:#757575}.button.hollow.alert{border:1px solid #c60f13;color:#c60f13}.button.hollow.alert:focus,.button.hollow.alert:hover{border-color:#63080a;color:#63080a}.button.hollow.success{border:1px solid #5da423;color:#5da423}.button.hollow.success:focus,.button.hollow.success:hover{border-color:#2f5212;color:#2f5212}.button.hollow.warning{border:1px solid #ffae00;color:#ffae00}.button.hollow.warning:focus,.button.hollow.warning:hover{border-color:#805700;color:#805700}.button.hollow.body-font{border:1px solid #222;color:#222}.button.hollow.body-font:focus,.button.hollow.body-font:hover{border-color:#111;color:#111}.button.hollow.header{border:1px solid #222;color:#222}.button.hollow.header:focus,.button.hollow.header:hover{border-color:#111;color:#111}.button.disabled,.button[disabled]{opacity:.25;cursor:not-allowed}.button.disabled:focus,.button.disabled:hover,.button[disabled]:focus,.button[disabled]:hover{background-color:#2ba6cb;color:#fefefe}.button.disabled.primary,.button[disabled].primary{opacity:.25;cursor:not-allowed}.button.disabled.primary:focus,.button.disabled.primary:hover,.button[disabled].primary:focus,.button[disabled].primary:hover{background-color:#2ba6cb;color:#fefefe}.button.disabled.secondary,.button[disabled].secondary{opacity:.25;cursor:not-allowed}.button.disabled.secondary:focus,.button.disabled.secondary:hover,.button[disabled].secondary:focus,.button[disabled].secondary:hover{background-color:#e9e9e9;color:#fefefe}.button.disabled.alert,.button[disabled].alert{opacity:.25;cursor:not-allowed}.button.disabled.alert:focus,.button.disabled.alert:hover,.button[disabled].alert:focus,.button[disabled].alert:hover{background-color:#c60f13;color:#fefefe}.button.disabled.success,.button[disabled].success{opacity:.25;cursor:not-allowed}.button.disabled.success:focus,.button.disabled.success:hover,.button[disabled].success:focus,.button[disabled].success:hover{background-color:#5da423;color:#fefefe}.button.disabled.warning,.button[disabled].warning{opacity:.25;cursor:not-allowed}.button.disabled.warning:focus,.button.disabled.warning:hover,.button[disabled].warning:focus,.button[disabled].warning:hover{background-color:#ffae00;color:#fefefe}.button.disabled.body-font,.button[disabled].body-font{opacity:.25;cursor:not-allowed}.button.disabled.body-font:focus,.button.disabled.body-font:hover,.button[disabled].body-font:focus,.button[disabled].body-font:hover{background-color:#222;color:#fefefe}.button.disabled.header,.button[disabled].header{opacity:.25;cursor:not-allowed}.button.disabled.header:focus,.button.disabled.header:hover,.button[disabled].header:focus,.button[disabled].header:hover{background-color:#222;color:#fefefe}.button.dropdown:after{display:block;width:0;height:0;border:.4em inset;content:\"\";border-bottom-width:0;border-top-style:solid;border-color:#fefefe transparent transparent;position:relative;top:.4em;display:inline-block;float:right;margin-left:1em}.button.arrow-only:after{top:-.1em;float:none;margin-left:0}.close-button{position:absolute;color:#8a8a8a;cursor:pointer}[data-whatinput=mouse] .close-button{outline:0}.close-button:focus,.close-button:hover{color:#0a0a0a}.close-button.small{right:.66rem;top:.33em;font-size:1.5em;line-height:1}.close-button,.close-button.medium{right:1rem;top:.5rem;font-size:2em;line-height:1}.button-group{margin-bottom:1rem;font-size:0}.button-group:after,.button-group:before{display:table;content:\" \"}.button-group:after{clear:both}.button-group .button{margin:0;margin-right:1px;margin-bottom:1px;font-size:.9rem}.button-group .button:last-child{margin-right:0}.button-group.tiny .button{font-size:.6rem}.button-group.small .button{font-size:.75rem}.button-group.large .button{font-size:1.25rem}.button-group.expanded{margin-right:-1px}.button-group.expanded:after,.button-group.expanded:before{display:none}.button-group.expanded .button:first-child:nth-last-child(2),.button-group.expanded .button:first-child:nth-last-child(2):first-child:nth-last-child(2)~.button{display:inline-block;width:calc(50% - 1px);margin-right:1px}.button-group.expanded .button:first-child:nth-last-child(2):first-child:nth-last-child(2)~.button:last-child,.button-group.expanded .button:first-child:nth-last-child(2):last-child{margin-right:-6px}.button-group.expanded .button:first-child:nth-last-child(3),.button-group.expanded .button:first-child:nth-last-child(3):first-child:nth-last-child(3)~.button{display:inline-block;width:calc(33.33333% - 1px);margin-right:1px}.button-group.expanded .button:first-child:nth-last-child(3):first-child:nth-last-child(3)~.button:last-child,.button-group.expanded .button:first-child:nth-last-child(3):last-child{margin-right:-6px}.button-group.expanded .button:first-child:nth-last-child(4),.button-group.expanded .button:first-child:nth-last-child(4):first-child:nth-last-child(4)~.button{display:inline-block;width:calc(25% - 1px);margin-right:1px}.button-group.expanded .button:first-child:nth-last-child(4):first-child:nth-last-child(4)~.button:last-child,.button-group.expanded .button:first-child:nth-last-child(4):last-child{margin-right:-6px}.button-group.expanded .button:first-child:nth-last-child(5),.button-group.expanded .button:first-child:nth-last-child(5):first-child:nth-last-child(5)~.button{display:inline-block;width:calc(20% - 1px);margin-right:1px}.button-group.expanded .button:first-child:nth-last-child(5):first-child:nth-last-child(5)~.button:last-child,.button-group.expanded .button:first-child:nth-last-child(5):last-child{margin-right:-6px}.button-group.expanded .button:first-child:nth-last-child(6),.button-group.expanded .button:first-child:nth-last-child(6):first-child:nth-last-child(6)~.button{display:inline-block;width:calc(16.66667% - 1px);margin-right:1px}.button-group.expanded .button:first-child:nth-last-child(6):first-child:nth-last-child(6)~.button:last-child,.button-group.expanded .button:first-child:nth-last-child(6):last-child{margin-right:-6px}.button-group.primary .button{background-color:#2ba6cb;color:#0a0a0a}.button-group.primary .button:focus,.button-group.primary .button:hover{background-color:#2285a2;color:#0a0a0a}.button-group.secondary .button{background-color:#e9e9e9;color:#0a0a0a}.button-group.secondary .button:focus,.button-group.secondary .button:hover{background-color:#bababa;color:#0a0a0a}.button-group.alert .button{background-color:#c60f13;color:#fefefe}.button-group.alert .button:focus,.button-group.alert .button:hover{background-color:#9e0c0f;color:#fefefe}.button-group.success .button{background-color:#5da423;color:#0a0a0a}.button-group.success .button:focus,.button-group.success .button:hover{background-color:#4a831c;color:#0a0a0a}.button-group.warning .button{background-color:#ffae00;color:#0a0a0a}.button-group.warning .button:focus,.button-group.warning .button:hover{background-color:#cc8b00;color:#0a0a0a}.button-group.body-font .button{background-color:#222;color:#fefefe}.button-group.body-font .button:focus,.button-group.body-font .button:hover{background-color:#1b1b1b;color:#fefefe}.button-group.header .button{background-color:#222;color:#fefefe}.button-group.header .button:focus,.button-group.header .button:hover{background-color:#1b1b1b;color:#fefefe}.button-group.stacked-for-medium .button,.button-group.stacked-for-small .button,.button-group.stacked .button{width:100%}.button-group.stacked-for-medium .button:last-child,.button-group.stacked-for-small .button:last-child,.button-group.stacked .button:last-child{margin-bottom:0}@media print,screen and (min-width:40em){.button-group.stacked-for-small .button{width:auto;margin-bottom:0}}@media print,screen and (min-width:64em){.button-group.stacked-for-medium .button{width:auto;margin-bottom:0}}@media screen and (max-width:39.9375em){.button-group.stacked-for-small.expanded{display:block}.button-group.stacked-for-small.expanded .button{display:block;margin-right:0}}.slider{position:relative;height:.5rem;margin-top:1.25rem;margin-bottom:2.25rem;background-color:#e6e6e6;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-ms-touch-action:none;touch-action:none}.slider-fill{position:absolute;top:0;left:0;display:inline-block;max-width:100%;height:.5rem;background-color:#cacaca;transition:all .2s ease-in-out}.slider-fill.is-dragging{transition:all 0s linear}.slider-handle{top:50%;-ms-transform:translateY(-50%);transform:translateY(-50%);position:absolute;left:0;z-index:1;display:inline-block;width:1.4rem;height:1.4rem;border-radius:3px;background-color:#2ba6cb;transition:all .2s ease-in-out;-ms-touch-action:manipulation;touch-action:manipulation}[data-whatinput=mouse] .slider-handle{outline:0}.slider-handle:hover{background-color:#258dad}.slider-handle.is-dragging{transition:all 0s linear}.slider.disabled,.slider[disabled]{opacity:.25;cursor:not-allowed}.slider.vertical{display:inline-block;width:.5rem;height:12.5rem;margin:0 1.25rem;-ms-transform:scaleY(-1);transform:scaleY(-1)}.slider.vertical .slider-fill{top:0;width:.5rem;max-height:100%}.slider.vertical .slider-handle{position:absolute;top:0;left:50%;width:1.4rem;height:1.4rem;-ms-transform:translateX(-50%);transform:translateX(-50%)}.switch{height:2rem;position:relative;margin-bottom:1rem;outline:0;font-size:.875rem;font-weight:700;color:#fefefe;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.switch-input{position:absolute;margin-bottom:0;opacity:0}.switch-paddle{position:relative;display:block;width:4rem;height:2rem;border-radius:3px;background:#cacaca;transition:all .25s ease-out;font-weight:inherit;color:inherit;cursor:pointer}input+.switch-paddle{margin:0}.switch-paddle:after{position:absolute;top:.25rem;left:.25rem;display:block;width:1.5rem;height:1.5rem;transform:translateZ(0);border-radius:3px;background:#fefefe;transition:all .25s ease-out;content:\"\"}input:checked~.switch-paddle{background:#2ba6cb}input:checked~.switch-paddle:after{left:2.25rem}[data-whatinput=mouse] input:focus~.switch-paddle{outline:0}.switch-active,.switch-inactive{position:absolute;top:50%;-ms-transform:translateY(-50%);transform:translateY(-50%)}.switch-active{left:8%;display:none}input:checked+label>.switch-active{display:block}.switch-inactive{right:15%}input:checked+label>.switch-inactive{display:none}.switch.tiny{height:1.5rem}.switch.tiny .switch-paddle{width:3rem;height:1.5rem;font-size:.625rem}.switch.tiny .switch-paddle:after{top:.25rem;left:.25rem;width:1rem;height:1rem}.switch.tiny input:checked~.switch-paddle:after{left:1.75rem}.switch.small{height:1.75rem}.switch.small .switch-paddle{width:3.5rem;height:1.75rem;font-size:.75rem}.switch.small .switch-paddle:after{top:.25rem;left:.25rem;width:1.25rem;height:1.25rem}.switch.small input:checked~.switch-paddle:after{left:2rem}.switch.large{height:2.5rem}.switch.large .switch-paddle{width:5rem;height:2.5rem;font-size:1rem}.switch.large .switch-paddle:after{top:.25rem;left:.25rem;width:2rem;height:2rem}.switch.large input:checked~.switch-paddle:after{left:2.75rem}.menu{margin:0;list-style-type:none}.menu>li{display:table-cell;vertical-align:middle}[data-whatinput=mouse] .menu>li{outline:0}.menu>li>a{display:block;padding:.7rem 1rem;line-height:1}.menu a,.menu button,.menu input,.menu select{margin-bottom:0}.menu>li>a i,.menu>li>a i+span,.menu>li>a img,.menu>li>a img+span,.menu>li>a svg,.menu>li>a svg+span{vertical-align:middle}.menu>li>a i,.menu>li>a img,.menu>li>a svg{margin-right:.25rem;display:inline-block}.menu.horizontal>li,.menu>li{display:table-cell}.menu.expanded{display:table;width:100%;table-layout:fixed}.menu.expanded>li:first-child:last-child{width:100%}.menu.vertical>li{display:block}@media print,screen and (min-width:40em){.menu.medium-horizontal>li{display:table-cell}.menu.medium-expanded{display:table;width:100%;table-layout:fixed}.menu.medium-expanded>li:first-child:last-child{width:100%}.menu.medium-vertical>li{display:block}}@media print,screen and (min-width:64em){.menu.large-horizontal>li{display:table-cell}.menu.large-expanded{display:table;width:100%;table-layout:fixed}.menu.large-expanded>li:first-child:last-child{width:100%}.menu.large-vertical>li{display:block}}.menu.simple li{display:inline-block;margin-right:1rem;line-height:1}.menu.simple a{padding:0}.menu.align-right:after,.menu.align-right:before{display:table;content:\" \"}.menu.align-right:after{clear:both}.menu.align-right>li{float:right}.menu.icon-top>li>a{text-align:center}.menu.icon-top>li>a i,.menu.icon-top>li>a img,.menu.icon-top>li>a svg{display:block;margin:0 auto .25rem}.menu.icon-top.vertical a>span{margin:auto}.menu.nested{margin-left:1rem}.menu .active>a{background:#2ba6cb;color:#fefefe}.menu.menu-bordered li{border:1px solid #e6e6e6}.menu.menu-bordered li:not(:first-child){border-top:0}.menu.menu-hover li:hover{background-color:#e6e6e6}.menu-text{padding-top:0;padding-bottom:0;padding:.7rem 1rem;font-weight:700;line-height:1;color:inherit}.menu-centered{text-align:center}.menu-centered>.menu{display:inline-block}.no-js [data-responsive-menu] ul{display:none}.is-drilldown{position:relative;overflow:hidden}.is-drilldown li{display:block}.is-drilldown.animate-height{transition:height .5s}.is-drilldown-submenu{position:absolute;top:0;left:100%;z-index:-1;width:100%;background:#fefefe;transition:transform .15s linear}.is-drilldown-submenu.is-active{z-index:1;display:block;-ms-transform:translateX(-100%);transform:translateX(-100%)}.is-drilldown-submenu.is-closing{-ms-transform:translateX(100%);transform:translateX(100%)}.drilldown-submenu-cover-previous{min-height:100%}.is-drilldown-submenu-parent>a{position:relative}.is-drilldown-submenu-parent>a:after{display:block;width:0;height:0;border:6px inset;content:\"\";border-right-width:0;border-left-style:solid;border-color:transparent transparent transparent #2ba6cb;position:absolute;top:50%;margin-top:-6px;right:1rem}.js-drilldown-back>a:before{display:block;width:0;height:0;border:6px inset;content:\"\";border-right-style:solid;border-color:transparent #2ba6cb transparent transparent;display:inline-block;vertical-align:middle;margin-right:.75rem;border-left-width:0}.is-accordion-submenu-parent>a{position:relative}.is-accordion-submenu-parent>a:after{display:block;width:0;height:0;border:6px inset;content:\"\";border-bottom-width:0;border-top-style:solid;border-color:#2ba6cb transparent transparent;position:absolute;top:50%;margin-top:-3px;right:1rem}.is-accordion-submenu-parent[aria-expanded=true]>a:after{-ms-transform:rotate(180deg);transform:rotate(180deg);-ms-transform-origin:50% 50%;transform-origin:50% 50%}.dropdown.menu>li.opens-left>.is-dropdown-submenu{top:100%;right:0;left:auto}.dropdown.menu>li.opens-right>.is-dropdown-submenu{top:100%;right:auto;left:0}.dropdown.menu>li.is-dropdown-submenu-parent>a{position:relative;padding-right:1.5rem}.dropdown.menu>li.is-dropdown-submenu-parent>a:after{display:block;width:0;height:0;border:6px inset;content:\"\";border-bottom-width:0;border-top-style:solid;border-color:#2ba6cb transparent transparent;right:5px;margin-top:-3px}[data-whatinput=mouse] .dropdown.menu a{outline:0}.no-js .dropdown.menu ul{display:none}.dropdown.menu.vertical>li .is-dropdown-submenu{top:0}.dropdown.menu.vertical>li.opens-left>.is-dropdown-submenu{right:100%;left:auto}.dropdown.menu.vertical>li.opens-right>.is-dropdown-submenu{right:auto;left:100%}.dropdown.menu.vertical>li>a:after{right:14px}.dropdown.menu.vertical>li.opens-left>a:after{display:block;width:0;height:0;border:6px inset;content:\"\";border-left-width:0;border-right-style:solid;border-color:transparent #2ba6cb transparent transparent}.dropdown.menu.vertical>li.opens-right>a:after{display:block;width:0;height:0;border:6px inset;content:\"\";border-right-width:0;border-left-style:solid;border-color:transparent transparent transparent #2ba6cb}@media print,screen and (min-width:40em){.dropdown.menu.medium-horizontal>li.opens-left>.is-dropdown-submenu{top:100%;right:0;left:auto}.dropdown.menu.medium-horizontal>li.opens-right>.is-dropdown-submenu{top:100%;right:auto;left:0}.dropdown.menu.medium-horizontal>li.is-dropdown-submenu-parent>a{position:relative;padding-right:1.5rem}.dropdown.menu.medium-horizontal>li.is-dropdown-submenu-parent>a:after{display:block;width:0;height:0;border:6px inset;content:\"\";border-bottom-width:0;border-top-style:solid;border-color:#2ba6cb transparent transparent;right:5px;margin-top:-3px}.dropdown.menu.medium-vertical>li .is-dropdown-submenu{top:0}.dropdown.menu.medium-vertical>li.opens-left>.is-dropdown-submenu{right:100%;left:auto}.dropdown.menu.medium-vertical>li.opens-right>.is-dropdown-submenu{right:auto;left:100%}.dropdown.menu.medium-vertical>li>a:after{right:14px}.dropdown.menu.medium-vertical>li.opens-left>a:after{display:block;width:0;height:0;border:6px inset;content:\"\";border-left-width:0;border-right-style:solid;border-color:transparent #2ba6cb transparent transparent}.dropdown.menu.medium-vertical>li.opens-right>a:after{display:block;width:0;height:0;border:6px inset;content:\"\";border-right-width:0;border-left-style:solid;border-color:transparent transparent transparent #2ba6cb}}@media print,screen and (min-width:64em){.dropdown.menu.large-horizontal>li.opens-left>.is-dropdown-submenu{top:100%;right:0;left:auto}.dropdown.menu.large-horizontal>li.opens-right>.is-dropdown-submenu{top:100%;right:auto;left:0}.dropdown.menu.large-horizontal>li.is-dropdown-submenu-parent>a{position:relative;padding-right:1.5rem}.dropdown.menu.large-horizontal>li.is-dropdown-submenu-parent>a:after{display:block;width:0;height:0;border:6px inset;content:\"\";border-bottom-width:0;border-top-style:solid;border-color:#2ba6cb transparent transparent;right:5px;margin-top:-3px}.dropdown.menu.large-vertical>li .is-dropdown-submenu{top:0}.dropdown.menu.large-vertical>li.opens-left>.is-dropdown-submenu{right:100%;left:auto}.dropdown.menu.large-vertical>li.opens-right>.is-dropdown-submenu{right:auto;left:100%}.dropdown.menu.large-vertical>li>a:after{right:14px}.dropdown.menu.large-vertical>li.opens-left>a:after{display:block;width:0;height:0;border:6px inset;content:\"\";border-left-width:0;border-right-style:solid;border-color:transparent #2ba6cb transparent transparent}.dropdown.menu.large-vertical>li.opens-right>a:after{display:block;width:0;height:0;border:6px inset;content:\"\";border-right-width:0;border-left-style:solid;border-color:transparent transparent transparent #2ba6cb}}.dropdown.menu.align-right .is-dropdown-submenu.first-sub{top:100%;right:0;left:auto}.is-dropdown-menu.vertical{width:100px}.is-dropdown-menu.vertical.align-right{float:right}.is-dropdown-submenu-parent{position:relative}.is-dropdown-submenu-parent a:after{position:absolute;top:50%;right:5px;margin-top:-6px}.is-dropdown-submenu-parent.opens-inner>.is-dropdown-submenu{top:100%;left:auto}.is-dropdown-submenu-parent.opens-left>.is-dropdown-submenu{right:100%;left:auto}.is-dropdown-submenu-parent.opens-right>.is-dropdown-submenu{right:auto;left:100%}.is-dropdown-submenu{position:absolute;top:0;left:100%;z-index:1;display:none;min-width:200px;border:1px solid #cacaca;background:#fefefe}.is-dropdown-submenu .is-dropdown-submenu-parent>a:after{right:14px}.is-dropdown-submenu .is-dropdown-submenu-parent.opens-left>a:after{display:block;width:0;height:0;border:6px inset;content:\"\";border-left-width:0;border-right-style:solid;border-color:transparent #2ba6cb transparent transparent}.is-dropdown-submenu .is-dropdown-submenu-parent.opens-right>a:after{display:block;width:0;height:0;border:6px inset;content:\"\";border-right-width:0;border-left-style:solid;border-color:transparent transparent transparent #2ba6cb}.is-dropdown-submenu .is-dropdown-submenu{margin-top:-1px}.is-dropdown-submenu>li{width:100%}.is-dropdown-submenu.js-dropdown-active{display:block}.title-bar{padding:.5rem;background:#0a0a0a;color:#fefefe}.title-bar:after,.title-bar:before{display:table;content:\" \"}.title-bar:after{clear:both}.title-bar .menu-icon{margin-left:.25rem;margin-right:.25rem}.title-bar-left{float:left}.title-bar-right{float:right;text-align:right}.title-bar-title{display:inline-block;vertical-align:middle;font-weight:700}.top-bar{padding:.5rem}.top-bar:after,.top-bar:before{display:table;content:\" \"}.top-bar:after{clear:both}.top-bar,.top-bar ul{background-color:#e6e6e6}.top-bar input{max-width:200px;margin-right:1rem}.top-bar .input-group-field{width:100%;margin-right:0}.top-bar input.button{width:auto}.top-bar .top-bar-left,.top-bar .top-bar-right{width:100%}@media print,screen and (min-width:40em){.top-bar .top-bar-left,.top-bar .top-bar-right{width:auto}}@media screen and (max-width:63.9375em){.top-bar.stacked-for-medium .top-bar-left,.top-bar.stacked-for-medium .top-bar-right{width:100%}}@media screen and (max-width:74.9375em){.top-bar.stacked-for-large .top-bar-left,.top-bar.stacked-for-large .top-bar-right{width:100%}}.top-bar-title{display:inline-block;float:left;padding:.5rem 1rem .5rem 0}.top-bar-title .menu-icon{bottom:2px}.top-bar-left{float:left}.top-bar-right{float:right}.breadcrumbs{margin:0 0 1rem;list-style:none}.breadcrumbs:after,.breadcrumbs:before{display:table;content:\" \"}.breadcrumbs:after{clear:both}.breadcrumbs li{float:left;font-size:.6875rem;color:#0a0a0a;cursor:default;text-transform:uppercase}.breadcrumbs li:not(:last-child):after{position:relative;top:1px;margin:0 .75rem;opacity:1;content:\"/\";color:#cacaca}.breadcrumbs a{color:#2ba6cb}.breadcrumbs a:hover{text-decoration:underline}.breadcrumbs .disabled{color:#cacaca;cursor:not-allowed}.pagination{margin-left:0;margin-bottom:1rem}.pagination:after,.pagination:before{display:table;content:\" \"}.pagination:after{clear:both}.pagination li{margin-right:.0625rem;border-radius:3px;font-size:.875rem;display:none}.pagination li:first-child,.pagination li:last-child{display:inline-block}@media print,screen and (min-width:40em){.pagination li{display:inline-block}}.pagination a,.pagination button{display:block;padding:.1875rem .625rem;border-radius:3px;color:#0a0a0a}.pagination a:hover,.pagination button:hover{background:#e6e6e6}.pagination .current{padding:.1875rem .625rem;background:#2ba6cb;color:#fefefe;cursor:default}.pagination .disabled{padding:.1875rem .625rem;color:#cacaca;cursor:not-allowed}.pagination .disabled:hover{background:transparent}.pagination .ellipsis:after{padding:.1875rem .625rem;content:\"\\2026\";color:#0a0a0a}.pagination-previous.disabled:before,.pagination-previous a:before{display:inline-block;margin-right:.5rem;content:\"\\AB\"}.pagination-next.disabled:after,.pagination-next a:after{display:inline-block;margin-left:.5rem;content:\"\\BB\"}.accordion{margin-left:0;background:#fefefe;list-style-type:none}.accordion-item:first-child>:first-child{border-radius:3px 3px 0 0}.accordion-item:last-child>:last-child{border-radius:0 0 3px 3px}.accordion-title{position:relative;display:block;padding:1.25rem 1rem;border:1px solid #e6e6e6;border-bottom:0;font-size:.75rem;line-height:1;color:#2ba6cb}:last-child:not(.is-active)>.accordion-title{border-bottom:1px solid #e6e6e6;border-radius:0 0 3px 3px}.accordion-title:focus,.accordion-title:hover{background-color:#e6e6e6}.accordion-title:before{position:absolute;top:50%;right:1rem;margin-top:-.5rem;content:\"+\"}.is-active>.accordion-title:before{content:\"\\2013\"}.accordion-content{display:none;padding:1rem;border:1px solid #e6e6e6;border-bottom:0;background-color:#fefefe;color:#0a0a0a}:last-child>.accordion-content:last-child{border-bottom:1px solid #e6e6e6}.dropdown-pane{position:absolute;z-index:10;display:block;width:300px;padding:1rem;visibility:hidden;border:1px solid #cacaca;border-radius:3px;background-color:#fefefe;font-size:1rem}.dropdown-pane.is-open{visibility:visible}.dropdown-pane.tiny{width:100px}.dropdown-pane.small{width:200px}.dropdown-pane.large{width:400px}.is-off-canvas-open{overflow:hidden}.js-off-canvas-overlay{position:absolute;top:0;left:0;width:100%;height:100%;transition:opacity .5s ease,visibility .5s ease;background:hsla(0,0%,100%,.25);opacity:0;visibility:hidden;overflow:hidden}.js-off-canvas-overlay.is-visible{opacity:1;visibility:visible}.js-off-canvas-overlay.is-closable{cursor:pointer}.js-off-canvas-overlay.is-overlay-absolute{position:absolute}.js-off-canvas-overlay.is-overlay-fixed{position:fixed}.off-canvas-wrapper{position:relative;overflow:hidden}.off-canvas{position:fixed;z-index:1;transition:transform .5s ease;-webkit-backface-visibility:hidden;backface-visibility:hidden;background:#e6e6e6}[data-whatinput=mouse] .off-canvas{outline:0}.off-canvas.is-transition-overlap{z-index:10}.off-canvas.is-transition-overlap.is-open{box-shadow:0 0 10px hsla(0,0%,4%,.7)}.off-canvas.is-open{-ms-transform:translate(0);transform:translate(0)}.off-canvas-absolute{position:absolute;z-index:1;transition:transform .5s ease;-webkit-backface-visibility:hidden;backface-visibility:hidden;background:#e6e6e6}[data-whatinput=mouse] .off-canvas-absolute{outline:0}.off-canvas-absolute.is-transition-overlap{z-index:10}.off-canvas-absolute.is-transition-overlap.is-open{box-shadow:0 0 10px hsla(0,0%,4%,.7)}.off-canvas-absolute.is-open{-ms-transform:translate(0);transform:translate(0)}.position-left{top:0;left:0;width:250px;height:100%;-ms-transform:translateX(-250px);transform:translateX(-250px);overflow-y:auto}.position-left.is-open~.off-canvas-content{-ms-transform:translateX(250px);transform:translateX(250px)}.position-left.is-transition-push:after{position:absolute;top:0;right:0;height:100%;width:1px;box-shadow:0 0 10px hsla(0,0%,4%,.7);content:\" \"}.position-left.is-transition-overlap.is-open~.off-canvas-content{-ms-transform:none;transform:none}.position-right{top:0;right:0;width:250px;height:100%;-ms-transform:translateX(250px);transform:translateX(250px);overflow-y:auto}.position-right.is-open~.off-canvas-content{-ms-transform:translateX(-250px);transform:translateX(-250px)}.position-right.is-transition-push:after{position:absolute;top:0;left:0;height:100%;width:1px;box-shadow:0 0 10px hsla(0,0%,4%,.7);content:\" \"}.position-right.is-transition-overlap.is-open~.off-canvas-content{-ms-transform:none;transform:none}.position-top{top:0;left:0;width:100%;height:250px;-ms-transform:translateY(-250px);transform:translateY(-250px);overflow-x:auto}.position-top.is-open~.off-canvas-content{-ms-transform:translateY(250px);transform:translateY(250px)}.position-top.is-transition-push:after{position:absolute;bottom:0;left:0;height:1px;width:100%;box-shadow:0 0 10px hsla(0,0%,4%,.7);content:\" \"}.position-top.is-transition-overlap.is-open~.off-canvas-content{-ms-transform:none;transform:none}.position-bottom{bottom:0;left:0;width:100%;height:250px;-ms-transform:translateY(250px);transform:translateY(250px);overflow-x:auto}.position-bottom.is-open~.off-canvas-content{-ms-transform:translateY(-250px);transform:translateY(-250px)}.position-bottom.is-transition-push:after{position:absolute;top:0;left:0;height:1px;width:100%;box-shadow:0 0 10px hsla(0,0%,4%,.7);content:\" \"}.position-bottom.is-transition-overlap.is-open~.off-canvas-content{-ms-transform:none;transform:none}.off-canvas-content{transition:transform .5s ease;-webkit-backface-visibility:hidden;backface-visibility:hidden}@media print,screen and (min-width:40em){.position-left.reveal-for-medium{-ms-transform:none;transform:none;z-index:1}.position-left.reveal-for-medium~.off-canvas-content{margin-left:250px}.position-right.reveal-for-medium{-ms-transform:none;transform:none;z-index:1}.position-right.reveal-for-medium~.off-canvas-content{margin-right:250px}.position-top.reveal-for-medium{-ms-transform:none;transform:none;z-index:1}.position-top.reveal-for-medium~.off-canvas-content{margin-top:250px}.position-bottom.reveal-for-medium{-ms-transform:none;transform:none;z-index:1}.position-bottom.reveal-for-medium~.off-canvas-content{margin-bottom:250px}}@media print,screen and (min-width:64em){.position-left.reveal-for-large{-ms-transform:none;transform:none;z-index:1}.position-left.reveal-for-large~.off-canvas-content{margin-left:250px}.position-right.reveal-for-large{-ms-transform:none;transform:none;z-index:1}.position-right.reveal-for-large~.off-canvas-content{margin-right:250px}.position-top.reveal-for-large{-ms-transform:none;transform:none;z-index:1}.position-top.reveal-for-large~.off-canvas-content{margin-top:250px}.position-bottom.reveal-for-large{-ms-transform:none;transform:none;z-index:1}.position-bottom.reveal-for-large~.off-canvas-content{margin-bottom:250px}}.tabs{margin:0;border:1px solid #e6e6e6;background:#fefefe;list-style-type:none}.tabs:after,.tabs:before{display:table;content:\" \"}.tabs:after{clear:both}.tabs.vertical>li{display:block;float:none;width:auto}.tabs.simple>li>a{padding:0}.tabs.simple>li>a:hover{background:transparent}.tabs.primary{background:#2ba6cb}.tabs.primary>li>a{color:#0a0a0a}.tabs.primary>li>a:focus,.tabs.primary>li>a:hover{background:#299ec1}.tabs-title{float:left}.tabs-title>a{display:block;padding:1.25rem 1.5rem;font-size:.75rem;line-height:1;color:#2ba6cb}.tabs-title>a:hover{background:#fefefe;color:#258faf}.tabs-title>a:focus,.tabs-title>a[aria-selected=true]{background:#e6e6e6;color:#2ba6cb}.tabs-content{border:1px solid #e6e6e6;border-top:0;background:#fefefe;color:#0a0a0a;transition:all .5s ease}.tabs-content.vertical{border:1px solid #e6e6e6;border-left:0}.tabs-panel{display:none;padding:1rem}.tabs-panel[aria-hidden=false]{display:block}.callout{position:relative;margin:0 0 1rem;padding:1rem;border:1px solid hsla(0,0%,4%,.25);border-radius:3px;background-color:#fff;color:#0a0a0a}.callout>:first-child{margin-top:0}.callout>:last-child{margin-bottom:0}.callout.primary{background-color:#def2f8;color:#0a0a0a}.callout.secondary{background-color:#fcfcfc;color:#0a0a0a}.callout.alert{background-color:#fcd6d6;color:#0a0a0a}.callout.success{background-color:#e6f7d9;color:#0a0a0a}.callout.warning{background-color:#fff3d9;color:#0a0a0a}.callout.body-font,.callout.header{background-color:#dedede;color:#0a0a0a}.callout.small{padding:.5rem}.callout.large{padding:3rem}.card{margin-bottom:1rem;border:1px solid #e6e6e6;border-radius:3px;background:#fefefe;box-shadow:none;overflow:hidden;color:#0a0a0a}.card>:last-child{margin-bottom:0}.card-divider{padding:1rem;background:#e6e6e6}.card-divider>:last-child{margin-bottom:0}.card-section{padding:1rem}.card-section>:last-child{margin-bottom:0}.media-object{display:block;margin-bottom:1rem}.media-object img{max-width:none}@media screen and (max-width:39.9375em){.media-object.stack-for-small .media-object-section{padding:0;padding-bottom:1rem;display:block}.media-object.stack-for-small .media-object-section img{width:100%}}.media-object-section{display:table-cell;vertical-align:top}.media-object-section:first-child{padding-right:1rem}.media-object-section:last-child:not(:nth-child(2)){padding-left:1rem}.media-object-section>:last-child{margin-bottom:0}.media-object-section.middle{vertical-align:middle}.media-object-section.bottom{vertical-align:bottom}body.is-reveal-open{overflow:hidden}html.is-reveal-open,html.is-reveal-open body{min-height:100%;overflow:hidden;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.reveal-overlay{position:fixed;top:0;right:0;bottom:0;left:0;z-index:1005;display:none;background-color:hsla(0,0%,4%,.45);overflow-y:scroll}.reveal{z-index:1006;-webkit-backface-visibility:hidden;backface-visibility:hidden;display:none;padding:1rem;border:1px solid #cacaca;border-radius:3px;background-color:#fefefe;position:relative;top:100px;margin-right:auto;margin-left:auto;overflow-y:auto}[data-whatinput=mouse] .reveal{outline:0}@media print,screen and (min-width:40em){.reveal{min-height:0}}.reveal .column,.reveal .columns{min-width:0}.reveal>:last-child{margin-bottom:0}@media print,screen and (min-width:40em){.reveal{width:600px;max-width:75rem}}@media print,screen and (min-width:40em){.reveal .reveal{right:auto;left:auto;margin:0 auto}}.reveal.collapse{padding:0}@media print,screen and (min-width:40em){.reveal.tiny{width:30%;max-width:75rem}}@media print,screen and (min-width:40em){.reveal.small{width:50%;max-width:75rem}}@media print,screen and (min-width:40em){.reveal.large{width:90%;max-width:75rem}}.reveal.full{top:0;left:0;width:100%;max-width:none;height:100%;height:100vh;min-height:100vh;margin-left:0;border:0;border-radius:0}@media screen and (max-width:39.9375em){.reveal{top:0;left:0;width:100%;max-width:none;height:100%;height:100vh;min-height:100vh;margin-left:0;border:0;border-radius:0}}.reveal.without-overlay{position:fixed}table{width:100%;margin-bottom:1rem;border-radius:3px}table tbody,table tfoot,table thead{border:1px solid #f1f1f1;background-color:#fefefe}table caption{padding:.5rem .625rem .625rem;font-weight:700}table thead{background:#f8f8f8;color:#0a0a0a}table tfoot{background:#f1f1f1;color:#0a0a0a}table tfoot tr,table thead tr{background:transparent}table tfoot td,table tfoot th,table thead td,table thead th{padding:.5rem .625rem .625rem;font-weight:700;text-align:left}table tbody td,table tbody th{padding:.5rem .625rem .625rem}table tbody tr:nth-child(2n){border-bottom:0;background-color:#f1f1f1}table.unstriped tbody{background-color:#fefefe}table.unstriped tbody tr{border-bottom:0;border-bottom:1px solid #f1f1f1;background-color:#fefefe}@media screen and (max-width:63.9375em){table.stack tfoot,table.stack thead{display:none}table.stack td,table.stack th,table.stack tr{display:block}table.stack td{border-top:0}}table.scroll{display:block;width:100%;overflow-x:auto}table.hover thead tr:hover{background-color:#f3f3f3}table.hover tfoot tr:hover{background-color:#ececec}table.hover tbody tr:hover{background-color:#f9f9f9}table.hover:not(.unstriped) tr:nth-of-type(2n):hover{background-color:#ececec}.table-scroll{overflow-x:auto}.table-scroll table{width:auto}.badge{display:inline-block;min-width:2.1em;padding:.3em;border-radius:50%;font-size:.6rem;text-align:center;background:#2ba6cb;color:#fefefe}.badge.primary{background:#2ba6cb;color:#0a0a0a}.badge.secondary{background:#e9e9e9;color:#0a0a0a}.badge.alert{background:#c60f13;color:#fefefe}.badge.success{background:#5da423;color:#0a0a0a}.badge.warning{background:#ffae00;color:#0a0a0a}.badge.body-font,.badge.header{background:#222;color:#fefefe}.label{display:inline-block;padding:.33333rem .5rem;border-radius:3px;font-size:.8rem;line-height:1;white-space:nowrap;cursor:default;background:#2ba6cb;color:#fefefe}.label.primary{background:#2ba6cb;color:#0a0a0a}.label.secondary{background:#e9e9e9;color:#0a0a0a}.label.alert{background:#c60f13;color:#fefefe}.label.success{background:#5da423;color:#0a0a0a}.label.warning{background:#ffae00;color:#0a0a0a}.label.body-font,.label.header{background:#222;color:#fefefe}.progress{height:1rem;margin-bottom:1rem;border-radius:3px;background-color:#cacaca}.progress.primary .progress-meter{background-color:#2ba6cb}.progress.secondary .progress-meter{background-color:#e9e9e9}.progress.alert .progress-meter{background-color:#c60f13}.progress.success .progress-meter{background-color:#5da423}.progress.warning .progress-meter{background-color:#ffae00}.progress.body-font .progress-meter,.progress.header .progress-meter{background-color:#222}.progress-meter{position:relative;display:block;width:0;height:100%;background-color:#2ba6cb;border-radius:3px}.progress-meter-text{top:50%;left:50%;-ms-transform:translate(-50%,-50%);transform:translate(-50%,-50%);position:absolute;margin:0;font-size:.75rem;font-weight:700;color:#fefefe;white-space:nowrap;border-radius:3px}.has-tip{position:relative;display:inline-block;border-bottom:1px dotted #8a8a8a;font-weight:700;cursor:help}.tooltip{position:absolute;top:calc(100% + .6495rem);z-index:1200;max-width:10rem;padding:.75rem;border-radius:3px;background-color:#0a0a0a;font-size:80%;color:#fefefe}.tooltip:before{border:.75rem inset;border-top-width:0;border-bottom-style:solid;border-color:transparent transparent #0a0a0a;position:absolute;bottom:100%;left:50%;-ms-transform:translateX(-50%);transform:translateX(-50%)}.tooltip.top:before,.tooltip:before{display:block;width:0;height:0;content:\"\"}.tooltip.top:before{border:.75rem inset;border-bottom-width:0;border-top-style:solid;border-color:#0a0a0a transparent transparent;top:100%;bottom:auto}.tooltip.left:before{border:.75rem inset;border-right-width:0;border-left-style:solid;border-color:transparent transparent transparent #0a0a0a;left:100%}.tooltip.left:before,.tooltip.right:before{display:block;width:0;height:0;content:\"\";top:50%;bottom:auto;-ms-transform:translateY(-50%);transform:translateY(-50%)}.tooltip.right:before{border:.75rem inset;border-left-width:0;border-right-style:solid;border-color:transparent #0a0a0a transparent transparent;right:100%;left:auto}.flex-video,.responsive-embed{position:relative;height:0;margin-bottom:1rem;padding-bottom:75%;overflow:hidden}.flex-video embed,.flex-video iframe,.flex-video object,.flex-video video,.responsive-embed embed,.responsive-embed iframe,.responsive-embed object,.responsive-embed video{position:absolute;top:0;left:0;width:100%;height:100%}.flex-video.widescreen,.responsive-embed.widescreen{padding-bottom:56.25%}.orbit,.orbit-container{position:relative}.orbit-container{height:0;margin:0;list-style:none;overflow:hidden}.orbit-slide{width:100%}.orbit-slide.no-motionui.is-active{top:0;left:0}.orbit-figure{margin:0}.orbit-image{width:100%;max-width:100%;margin:0}.orbit-caption{bottom:0;width:100%;margin-bottom:0;background-color:hsla(0,0%,4%,.5)}.orbit-caption,.orbit-next,.orbit-previous{position:absolute;padding:1rem;color:#fefefe}.orbit-next,.orbit-previous{top:50%;-ms-transform:translateY(-50%);transform:translateY(-50%);z-index:10}[data-whatinput=mouse] .orbit-next,[data-whatinput=mouse] .orbit-previous{outline:0}.orbit-next:active,.orbit-next:focus,.orbit-next:hover,.orbit-previous:active,.orbit-previous:focus,.orbit-previous:hover{background-color:hsla(0,0%,4%,.5)}.orbit-previous{left:0}.orbit-next{left:auto;right:0}.orbit-bullets{position:relative;margin-top:.8rem;margin-bottom:.8rem;text-align:center}[data-whatinput=mouse] .orbit-bullets{outline:0}.orbit-bullets button{width:1.2rem;height:1.2rem;margin:.1rem;border-radius:50%;background-color:#cacaca}.orbit-bullets button.is-active,.orbit-bullets button:hover{background-color:#8a8a8a}.thumbnail{display:inline-block;max-width:100%;margin-bottom:1rem;border:4px solid #fefefe;border-radius:3px;box-shadow:0 0 0 1px hsla(0,0%,4%,.2);line-height:0}a.thumbnail{transition:box-shadow .2s ease-out}a.thumbnail:focus,a.thumbnail:hover{box-shadow:0 0 6px 1px rgba(43,166,203,.5)}a.thumbnail image{box-shadow:none}.sticky,.sticky-container{position:relative}.sticky{z-index:0;transform:translateZ(0)}.sticky.is-stuck{position:fixed;z-index:5}.sticky.is-stuck.is-at-top{top:0}.sticky.is-stuck.is-at-bottom{bottom:0}.sticky.is-anchored{position:relative;right:auto;left:auto}.sticky.is-anchored.is-at-bottom{bottom:0}.row{max-width:75rem;margin-right:auto;margin-left:auto}.row:after,.row:before{display:table;content:\" \"}.row:after{clear:both}.row.collapse>.column,.row.collapse>.columns{padding-right:0;padding-left:0}.row .row{margin-right:-.9375rem;margin-left:-.9375rem}@media print,screen and (min-width:40em){.row .row{margin-right:-.9375rem;margin-left:-.9375rem}}@media print,screen and (min-width:64em){.row .row{margin-right:-.9375rem;margin-left:-.9375rem}}.row .row.collapse{margin-right:0;margin-left:0}.row.expanded{max-width:none}.row.expanded .row{margin-right:auto;margin-left:auto}.column,.columns{width:100%;float:left;padding-right:.9375rem;padding-left:.9375rem}.column:last-child:not(:first-child),.columns:last-child:not(:first-child){float:right}.column.end:last-child:last-child,.end.columns:last-child:last-child{float:left}.column.row.row,.row.row.columns{float:none}.row .column.row.row,.row .row.row.columns{margin-right:0;margin-left:0;padding-right:0;padding-left:0}.small-1{width:8.33333%}.small-push-1{position:relative;left:8.33333%}.small-pull-1{position:relative;left:-8.33333%}.small-offset-0{margin-left:0}.small-2{width:16.66667%}.small-push-2{position:relative;left:16.66667%}.small-pull-2{position:relative;left:-16.66667%}.small-offset-1{margin-left:8.33333%}.small-3{width:25%}.small-push-3{position:relative;left:25%}.small-pull-3{position:relative;left:-25%}.small-offset-2{margin-left:16.66667%}.small-4{width:33.33333%}.small-push-4{position:relative;left:33.33333%}.small-pull-4{position:relative;left:-33.33333%}.small-offset-3{margin-left:25%}.small-5{width:41.66667%}.small-push-5{position:relative;left:41.66667%}.small-pull-5{position:relative;left:-41.66667%}.small-offset-4{margin-left:33.33333%}.small-6{width:50%}.small-push-6{position:relative;left:50%}.small-pull-6{position:relative;left:-50%}.small-offset-5{margin-left:41.66667%}.small-7{width:58.33333%}.small-push-7{position:relative;left:58.33333%}.small-pull-7{position:relative;left:-58.33333%}.small-offset-6{margin-left:50%}.small-8{width:66.66667%}.small-push-8{position:relative;left:66.66667%}.small-pull-8{position:relative;left:-66.66667%}.small-offset-7{margin-left:58.33333%}.small-9{width:75%}.small-push-9{position:relative;left:75%}.small-pull-9{position:relative;left:-75%}.small-offset-8{margin-left:66.66667%}.small-10{width:83.33333%}.small-push-10{position:relative;left:83.33333%}.small-pull-10{position:relative;left:-83.33333%}.small-offset-9{margin-left:75%}.small-11{width:91.66667%}.small-push-11{position:relative;left:91.66667%}.small-pull-11{position:relative;left:-91.66667%}.small-offset-10{margin-left:83.33333%}.small-12{width:100%}.small-offset-11{margin-left:91.66667%}.small-up-1>.column,.small-up-1>.columns{float:left;width:100%}.small-up-1>.column:nth-of-type(1n),.small-up-1>.columns:nth-of-type(1n){clear:none}.small-up-1>.column:nth-of-type(1n+1),.small-up-1>.columns:nth-of-type(1n+1){clear:both}.small-up-1>.column:last-child,.small-up-1>.columns:last-child{float:left}.small-up-2>.column,.small-up-2>.columns{float:left;width:50%}.small-up-2>.column:nth-of-type(1n),.small-up-2>.columns:nth-of-type(1n){clear:none}.small-up-2>.column:nth-of-type(odd),.small-up-2>.columns:nth-of-type(odd){clear:both}.small-up-2>.column:last-child,.small-up-2>.columns:last-child{float:left}.small-up-3>.column,.small-up-3>.columns{float:left;width:33.33333%}.small-up-3>.column:nth-of-type(1n),.small-up-3>.columns:nth-of-type(1n){clear:none}.small-up-3>.column:nth-of-type(3n+1),.small-up-3>.columns:nth-of-type(3n+1){clear:both}.small-up-3>.column:last-child,.small-up-3>.columns:last-child{float:left}.small-up-4>.column,.small-up-4>.columns{float:left;width:25%}.small-up-4>.column:nth-of-type(1n),.small-up-4>.columns:nth-of-type(1n){clear:none}.small-up-4>.column:nth-of-type(4n+1),.small-up-4>.columns:nth-of-type(4n+1){clear:both}.small-up-4>.column:last-child,.small-up-4>.columns:last-child{float:left}.small-up-5>.column,.small-up-5>.columns{float:left;width:20%}.small-up-5>.column:nth-of-type(1n),.small-up-5>.columns:nth-of-type(1n){clear:none}.small-up-5>.column:nth-of-type(5n+1),.small-up-5>.columns:nth-of-type(5n+1){clear:both}.small-up-5>.column:last-child,.small-up-5>.columns:last-child{float:left}.small-up-6>.column,.small-up-6>.columns{float:left;width:16.66667%}.small-up-6>.column:nth-of-type(1n),.small-up-6>.columns:nth-of-type(1n){clear:none}.small-up-6>.column:nth-of-type(6n+1),.small-up-6>.columns:nth-of-type(6n+1){clear:both}.small-up-6>.column:last-child,.small-up-6>.columns:last-child{float:left}.small-up-7>.column,.small-up-7>.columns{float:left;width:14.28571%}.small-up-7>.column:nth-of-type(1n),.small-up-7>.columns:nth-of-type(1n){clear:none}.small-up-7>.column:nth-of-type(7n+1),.small-up-7>.columns:nth-of-type(7n+1){clear:both}.small-up-7>.column:last-child,.small-up-7>.columns:last-child{float:left}.small-up-8>.column,.small-up-8>.columns{float:left;width:12.5%}.small-up-8>.column:nth-of-type(1n),.small-up-8>.columns:nth-of-type(1n){clear:none}.small-up-8>.column:nth-of-type(8n+1),.small-up-8>.columns:nth-of-type(8n+1){clear:both}.small-up-8>.column:last-child,.small-up-8>.columns:last-child{float:left}.small-collapse>.column,.small-collapse>.columns{padding-right:0;padding-left:0}.expanded.row .small-collapse.row,.small-collapse .row{margin-right:0;margin-left:0}.small-uncollapse>.column,.small-uncollapse>.columns{padding-right:.9375rem;padding-left:.9375rem}.small-centered{margin-right:auto;margin-left:auto}.small-centered,.small-centered:last-child:not(:first-child){float:none;clear:both}.small-pull-0,.small-push-0,.small-uncentered{position:static;float:left;margin-right:0;margin-left:0}@media print,screen and (min-width:40em){.medium-1{width:8.33333%}.medium-push-1{position:relative;left:8.33333%}.medium-pull-1{position:relative;left:-8.33333%}.medium-offset-0{margin-left:0}.medium-2{width:16.66667%}.medium-push-2{position:relative;left:16.66667%}.medium-pull-2{position:relative;left:-16.66667%}.medium-offset-1{margin-left:8.33333%}.medium-3{width:25%}.medium-push-3{position:relative;left:25%}.medium-pull-3{position:relative;left:-25%}.medium-offset-2{margin-left:16.66667%}.medium-4{width:33.33333%}.medium-push-4{position:relative;left:33.33333%}.medium-pull-4{position:relative;left:-33.33333%}.medium-offset-3{margin-left:25%}.medium-5{width:41.66667%}.medium-push-5{position:relative;left:41.66667%}.medium-pull-5{position:relative;left:-41.66667%}.medium-offset-4{margin-left:33.33333%}.medium-6{width:50%}.medium-push-6{position:relative;left:50%}.medium-pull-6{position:relative;left:-50%}.medium-offset-5{margin-left:41.66667%}.medium-7{width:58.33333%}.medium-push-7{position:relative;left:58.33333%}.medium-pull-7{position:relative;left:-58.33333%}.medium-offset-6{margin-left:50%}.medium-8{width:66.66667%}.medium-push-8{position:relative;left:66.66667%}.medium-pull-8{position:relative;left:-66.66667%}.medium-offset-7{margin-left:58.33333%}.medium-9{width:75%}.medium-push-9{position:relative;left:75%}.medium-pull-9{position:relative;left:-75%}.medium-offset-8{margin-left:66.66667%}.medium-10{width:83.33333%}.medium-push-10{position:relative;left:83.33333%}.medium-pull-10{position:relative;left:-83.33333%}.medium-offset-9{margin-left:75%}.medium-11{width:91.66667%}.medium-push-11{position:relative;left:91.66667%}.medium-pull-11{position:relative;left:-91.66667%}.medium-offset-10{margin-left:83.33333%}.medium-12{width:100%}.medium-offset-11{margin-left:91.66667%}.medium-up-1>.column,.medium-up-1>.columns{float:left;width:100%}.medium-up-1>.column:nth-of-type(1n),.medium-up-1>.columns:nth-of-type(1n){clear:none}.medium-up-1>.column:nth-of-type(1n+1),.medium-up-1>.columns:nth-of-type(1n+1){clear:both}.medium-up-1>.column:last-child,.medium-up-1>.columns:last-child{float:left}.medium-up-2>.column,.medium-up-2>.columns{float:left;width:50%}.medium-up-2>.column:nth-of-type(1n),.medium-up-2>.columns:nth-of-type(1n){clear:none}.medium-up-2>.column:nth-of-type(odd),.medium-up-2>.columns:nth-of-type(odd){clear:both}.medium-up-2>.column:last-child,.medium-up-2>.columns:last-child{float:left}.medium-up-3>.column,.medium-up-3>.columns{float:left;width:33.33333%}.medium-up-3>.column:nth-of-type(1n),.medium-up-3>.columns:nth-of-type(1n){clear:none}.medium-up-3>.column:nth-of-type(3n+1),.medium-up-3>.columns:nth-of-type(3n+1){clear:both}.medium-up-3>.column:last-child,.medium-up-3>.columns:last-child{float:left}.medium-up-4>.column,.medium-up-4>.columns{float:left;width:25%}.medium-up-4>.column:nth-of-type(1n),.medium-up-4>.columns:nth-of-type(1n){clear:none}.medium-up-4>.column:nth-of-type(4n+1),.medium-up-4>.columns:nth-of-type(4n+1){clear:both}.medium-up-4>.column:last-child,.medium-up-4>.columns:last-child{float:left}.medium-up-5>.column,.medium-up-5>.columns{float:left;width:20%}.medium-up-5>.column:nth-of-type(1n),.medium-up-5>.columns:nth-of-type(1n){clear:none}.medium-up-5>.column:nth-of-type(5n+1),.medium-up-5>.columns:nth-of-type(5n+1){clear:both}.medium-up-5>.column:last-child,.medium-up-5>.columns:last-child{float:left}.medium-up-6>.column,.medium-up-6>.columns{float:left;width:16.66667%}.medium-up-6>.column:nth-of-type(1n),.medium-up-6>.columns:nth-of-type(1n){clear:none}.medium-up-6>.column:nth-of-type(6n+1),.medium-up-6>.columns:nth-of-type(6n+1){clear:both}.medium-up-6>.column:last-child,.medium-up-6>.columns:last-child{float:left}.medium-up-7>.column,.medium-up-7>.columns{float:left;width:14.28571%}.medium-up-7>.column:nth-of-type(1n),.medium-up-7>.columns:nth-of-type(1n){clear:none}.medium-up-7>.column:nth-of-type(7n+1),.medium-up-7>.columns:nth-of-type(7n+1){clear:both}.medium-up-7>.column:last-child,.medium-up-7>.columns:last-child{float:left}.medium-up-8>.column,.medium-up-8>.columns{float:left;width:12.5%}.medium-up-8>.column:nth-of-type(1n),.medium-up-8>.columns:nth-of-type(1n){clear:none}.medium-up-8>.column:nth-of-type(8n+1),.medium-up-8>.columns:nth-of-type(8n+1){clear:both}.medium-up-8>.column:last-child,.medium-up-8>.columns:last-child{float:left}.medium-collapse>.column,.medium-collapse>.columns{padding-right:0;padding-left:0}.expanded.row .medium-collapse.row,.medium-collapse .row{margin-right:0;margin-left:0}.medium-uncollapse>.column,.medium-uncollapse>.columns{padding-right:.9375rem;padding-left:.9375rem}.medium-centered{margin-right:auto;margin-left:auto}.medium-centered,.medium-centered:last-child:not(:first-child){float:none;clear:both}.medium-pull-0,.medium-push-0,.medium-uncentered{position:static;float:left;margin-right:0;margin-left:0}}@media print,screen and (min-width:64em){.large-1{width:8.33333%}.large-push-1{position:relative;left:8.33333%}.large-pull-1{position:relative;left:-8.33333%}.large-offset-0{margin-left:0}.large-2{width:16.66667%}.large-push-2{position:relative;left:16.66667%}.large-pull-2{position:relative;left:-16.66667%}.large-offset-1{margin-left:8.33333%}.large-3{width:25%}.large-push-3{position:relative;left:25%}.large-pull-3{position:relative;left:-25%}.large-offset-2{margin-left:16.66667%}.large-4{width:33.33333%}.large-push-4{position:relative;left:33.33333%}.large-pull-4{position:relative;left:-33.33333%}.large-offset-3{margin-left:25%}.large-5{width:41.66667%}.large-push-5{position:relative;left:41.66667%}.large-pull-5{position:relative;left:-41.66667%}.large-offset-4{margin-left:33.33333%}.large-6{width:50%}.large-push-6{position:relative;left:50%}.large-pull-6{position:relative;left:-50%}.large-offset-5{margin-left:41.66667%}.large-7{width:58.33333%}.large-push-7{position:relative;left:58.33333%}.large-pull-7{position:relative;left:-58.33333%}.large-offset-6{margin-left:50%}.large-8{width:66.66667%}.large-push-8{position:relative;left:66.66667%}.large-pull-8{position:relative;left:-66.66667%}.large-offset-7{margin-left:58.33333%}.large-9{width:75%}.large-push-9{position:relative;left:75%}.large-pull-9{position:relative;left:-75%}.large-offset-8{margin-left:66.66667%}.large-10{width:83.33333%}.large-push-10{position:relative;left:83.33333%}.large-pull-10{position:relative;left:-83.33333%}.large-offset-9{margin-left:75%}.large-11{width:91.66667%}.large-push-11{position:relative;left:91.66667%}.large-pull-11{position:relative;left:-91.66667%}.large-offset-10{margin-left:83.33333%}.large-12{width:100%}.large-offset-11{margin-left:91.66667%}.large-up-1>.column,.large-up-1>.columns{float:left;width:100%}.large-up-1>.column:nth-of-type(1n),.large-up-1>.columns:nth-of-type(1n){clear:none}.large-up-1>.column:nth-of-type(1n+1),.large-up-1>.columns:nth-of-type(1n+1){clear:both}.large-up-1>.column:last-child,.large-up-1>.columns:last-child{float:left}.large-up-2>.column,.large-up-2>.columns{float:left;width:50%}.large-up-2>.column:nth-of-type(1n),.large-up-2>.columns:nth-of-type(1n){clear:none}.large-up-2>.column:nth-of-type(odd),.large-up-2>.columns:nth-of-type(odd){clear:both}.large-up-2>.column:last-child,.large-up-2>.columns:last-child{float:left}.large-up-3>.column,.large-up-3>.columns{float:left;width:33.33333%}.large-up-3>.column:nth-of-type(1n),.large-up-3>.columns:nth-of-type(1n){clear:none}.large-up-3>.column:nth-of-type(3n+1),.large-up-3>.columns:nth-of-type(3n+1){clear:both}.large-up-3>.column:last-child,.large-up-3>.columns:last-child{float:left}.large-up-4>.column,.large-up-4>.columns{float:left;width:25%}.large-up-4>.column:nth-of-type(1n),.large-up-4>.columns:nth-of-type(1n){clear:none}.large-up-4>.column:nth-of-type(4n+1),.large-up-4>.columns:nth-of-type(4n+1){clear:both}.large-up-4>.column:last-child,.large-up-4>.columns:last-child{float:left}.large-up-5>.column,.large-up-5>.columns{float:left;width:20%}.large-up-5>.column:nth-of-type(1n),.large-up-5>.columns:nth-of-type(1n){clear:none}.large-up-5>.column:nth-of-type(5n+1),.large-up-5>.columns:nth-of-type(5n+1){clear:both}.large-up-5>.column:last-child,.large-up-5>.columns:last-child{float:left}.large-up-6>.column,.large-up-6>.columns{float:left;width:16.66667%}.large-up-6>.column:nth-of-type(1n),.large-up-6>.columns:nth-of-type(1n){clear:none}.large-up-6>.column:nth-of-type(6n+1),.large-up-6>.columns:nth-of-type(6n+1){clear:both}.large-up-6>.column:last-child,.large-up-6>.columns:last-child{float:left}.large-up-7>.column,.large-up-7>.columns{float:left;width:14.28571%}.large-up-7>.column:nth-of-type(1n),.large-up-7>.columns:nth-of-type(1n){clear:none}.large-up-7>.column:nth-of-type(7n+1),.large-up-7>.columns:nth-of-type(7n+1){clear:both}.large-up-7>.column:last-child,.large-up-7>.columns:last-child{float:left}.large-up-8>.column,.large-up-8>.columns{float:left;width:12.5%}.large-up-8>.column:nth-of-type(1n),.large-up-8>.columns:nth-of-type(1n){clear:none}.large-up-8>.column:nth-of-type(8n+1),.large-up-8>.columns:nth-of-type(8n+1){clear:both}.large-up-8>.column:last-child,.large-up-8>.columns:last-child{float:left}.large-collapse>.column,.large-collapse>.columns{padding-right:0;padding-left:0}.expanded.row .large-collapse.row,.large-collapse .row{margin-right:0;margin-left:0}.large-uncollapse>.column,.large-uncollapse>.columns{padding-right:.9375rem;padding-left:.9375rem}.large-centered{margin-right:auto;margin-left:auto}.large-centered,.large-centered:last-child:not(:first-child){float:none;clear:both}.large-pull-0,.large-push-0,.large-uncentered{position:static;float:left;margin-right:0;margin-left:0}}.column-block{margin-bottom:1.875rem}.column-block>:last-child{margin-bottom:0}.menu-icon{position:relative;display:inline-block;vertical-align:middle;width:20px;height:16px;cursor:pointer}.menu-icon:after{position:absolute;top:0;left:0;display:block;width:100%;height:2px;background:#fefefe;box-shadow:0 7px 0 #fefefe,0 14px 0 #fefefe;content:\"\"}.menu-icon:hover:after{background:#cacaca;box-shadow:0 7px 0 #cacaca,0 14px 0 #cacaca}.menu-icon.dark{position:relative;display:inline-block;vertical-align:middle;width:20px;height:16px;cursor:pointer}.menu-icon.dark:after{position:absolute;top:0;left:0;display:block;width:100%;height:2px;background:#0a0a0a;box-shadow:0 7px 0 #0a0a0a,0 14px 0 #0a0a0a;content:\"\"}.menu-icon.dark:hover:after{background:#8a8a8a;box-shadow:0 7px 0 #8a8a8a,0 14px 0 #8a8a8a}.slide-in-down.mui-enter{transition-duration:.5s;transition-timing-function:linear;-ms-transform:translateY(-100%);transform:translateY(-100%);transition-property:transform,opacity;-webkit-backface-visibility:hidden;backface-visibility:hidden}.slide-in-down.mui-enter.mui-enter-active{-ms-transform:translateY(0);transform:translateY(0)}.slide-in-left.mui-enter{transition-duration:.5s;transition-timing-function:linear;-ms-transform:translateX(-100%);transform:translateX(-100%);transition-property:transform,opacity;-webkit-backface-visibility:hidden;backface-visibility:hidden}.slide-in-left.mui-enter.mui-enter-active{-ms-transform:translateX(0);transform:translateX(0)}.slide-in-up.mui-enter{transition-duration:.5s;transition-timing-function:linear;-ms-transform:translateY(100%);transform:translateY(100%);transition-property:transform,opacity;-webkit-backface-visibility:hidden;backface-visibility:hidden}.slide-in-up.mui-enter.mui-enter-active{-ms-transform:translateY(0);transform:translateY(0)}.slide-in-right.mui-enter{transition-duration:.5s;transition-timing-function:linear;-ms-transform:translateX(100%);transform:translateX(100%);transition-property:transform,opacity;-webkit-backface-visibility:hidden;backface-visibility:hidden}.slide-in-right.mui-enter.mui-enter-active{-ms-transform:translateX(0);transform:translateX(0)}.slide-out-down.mui-leave{transition-duration:.5s;transition-timing-function:linear;-ms-transform:translateY(0);transform:translateY(0);transition-property:transform,opacity;-webkit-backface-visibility:hidden;backface-visibility:hidden}.slide-out-down.mui-leave.mui-leave-active{-ms-transform:translateY(100%);transform:translateY(100%)}.slide-out-right.mui-leave{transition-duration:.5s;transition-timing-function:linear;-ms-transform:translateX(0);transform:translateX(0);transition-property:transform,opacity;-webkit-backface-visibility:hidden;backface-visibility:hidden}.slide-out-right.mui-leave.mui-leave-active{-ms-transform:translateX(100%);transform:translateX(100%)}.slide-out-up.mui-leave{transition-duration:.5s;transition-timing-function:linear;-ms-transform:translateY(0);transform:translateY(0);transition-property:transform,opacity;-webkit-backface-visibility:hidden;backface-visibility:hidden}.slide-out-up.mui-leave.mui-leave-active{-ms-transform:translateY(-100%);transform:translateY(-100%)}.slide-out-left.mui-leave{transition-duration:.5s;transition-timing-function:linear;-ms-transform:translateX(0);transform:translateX(0);transition-property:transform,opacity;-webkit-backface-visibility:hidden;backface-visibility:hidden}.slide-out-left.mui-leave.mui-leave-active{-ms-transform:translateX(-100%);transform:translateX(-100%)}.fade-in.mui-enter{transition-duration:.5s;transition-timing-function:linear;opacity:0;transition-property:opacity}.fade-in.mui-enter.mui-enter-active{opacity:1}.fade-out.mui-leave{transition-duration:.5s;transition-timing-function:linear;opacity:1;transition-property:opacity}.fade-out.mui-leave.mui-leave-active{opacity:0}.hinge-in-from-top.mui-enter{transition-duration:.5s;transition-timing-function:linear;transform:perspective(2000px) rotateX(-90deg);-ms-transform-origin:top;transform-origin:top;transition-property:transform,opacity;opacity:0}.hinge-in-from-top.mui-enter.mui-enter-active{transform:perspective(2000px) rotate(0deg);opacity:1}.hinge-in-from-right.mui-enter{transition-duration:.5s;transition-timing-function:linear;transform:perspective(2000px) rotateY(-90deg);-ms-transform-origin:right;transform-origin:right;transition-property:transform,opacity;opacity:0}.hinge-in-from-right.mui-enter.mui-enter-active{transform:perspective(2000px) rotate(0deg);opacity:1}.hinge-in-from-bottom.mui-enter{transition-duration:.5s;transition-timing-function:linear;transform:perspective(2000px) rotateX(90deg);-ms-transform-origin:bottom;transform-origin:bottom;transition-property:transform,opacity;opacity:0}.hinge-in-from-bottom.mui-enter.mui-enter-active{transform:perspective(2000px) rotate(0deg);opacity:1}.hinge-in-from-left.mui-enter{transition-duration:.5s;transition-timing-function:linear;transform:perspective(2000px) rotateY(90deg);-ms-transform-origin:left;transform-origin:left;transition-property:transform,opacity;opacity:0}.hinge-in-from-left.mui-enter.mui-enter-active{transform:perspective(2000px) rotate(0deg);opacity:1}.hinge-in-from-middle-x.mui-enter{transition-duration:.5s;transition-timing-function:linear;transform:perspective(2000px) rotateX(-90deg);-ms-transform-origin:center;transform-origin:center;transition-property:transform,opacity;opacity:0}.hinge-in-from-middle-x.mui-enter.mui-enter-active{transform:perspective(2000px) rotate(0deg);opacity:1}.hinge-in-from-middle-y.mui-enter{transition-duration:.5s;transition-timing-function:linear;transform:perspective(2000px) rotateY(-90deg);-ms-transform-origin:center;transform-origin:center;transition-property:transform,opacity;opacity:0}.hinge-in-from-middle-y.mui-enter.mui-enter-active,.hinge-out-from-top.mui-leave{transform:perspective(2000px) rotate(0deg);opacity:1}.hinge-out-from-top.mui-leave{transition-duration:.5s;transition-timing-function:linear;-ms-transform-origin:top;transform-origin:top;transition-property:transform,opacity}.hinge-out-from-top.mui-leave.mui-leave-active{transform:perspective(2000px) rotateX(-90deg);opacity:0}.hinge-out-from-right.mui-leave{transition-duration:.5s;transition-timing-function:linear;transform:perspective(2000px) rotate(0deg);-ms-transform-origin:right;transform-origin:right;transition-property:transform,opacity;opacity:1}.hinge-out-from-right.mui-leave.mui-leave-active{transform:perspective(2000px) rotateY(-90deg);opacity:0}.hinge-out-from-bottom.mui-leave{transition-duration:.5s;transition-timing-function:linear;transform:perspective(2000px) rotate(0deg);-ms-transform-origin:bottom;transform-origin:bottom;transition-property:transform,opacity;opacity:1}.hinge-out-from-bottom.mui-leave.mui-leave-active{transform:perspective(2000px) rotateX(90deg);opacity:0}.hinge-out-from-left.mui-leave{transition-duration:.5s;transition-timing-function:linear;transform:perspective(2000px) rotate(0deg);-ms-transform-origin:left;transform-origin:left;transition-property:transform,opacity;opacity:1}.hinge-out-from-left.mui-leave.mui-leave-active{transform:perspective(2000px) rotateY(90deg);opacity:0}.hinge-out-from-middle-x.mui-leave{transition-duration:.5s;transition-timing-function:linear;transform:perspective(2000px) rotate(0deg);-ms-transform-origin:center;transform-origin:center;transition-property:transform,opacity;opacity:1}.hinge-out-from-middle-x.mui-leave.mui-leave-active{transform:perspective(2000px) rotateX(-90deg);opacity:0}.hinge-out-from-middle-y.mui-leave{transition-duration:.5s;transition-timing-function:linear;transform:perspective(2000px) rotate(0deg);-ms-transform-origin:center;transform-origin:center;transition-property:transform,opacity;opacity:1}.hinge-out-from-middle-y.mui-leave.mui-leave-active{transform:perspective(2000px) rotateY(-90deg);opacity:0}.scale-in-up.mui-enter{transition-duration:.5s;transition-timing-function:linear;-ms-transform:scale(.5);transform:scale(.5);transition-property:transform,opacity;opacity:0}.scale-in-up.mui-enter.mui-enter-active{-ms-transform:scale(1);transform:scale(1);opacity:1}.scale-in-down.mui-enter{transition-duration:.5s;transition-timing-function:linear;-ms-transform:scale(1.5);transform:scale(1.5);transition-property:transform,opacity;opacity:0}.scale-in-down.mui-enter.mui-enter-active,.scale-out-up.mui-leave{-ms-transform:scale(1);transform:scale(1);opacity:1}.scale-out-up.mui-leave{transition-duration:.5s;transition-timing-function:linear;transition-property:transform,opacity}.scale-out-up.mui-leave.mui-leave-active{-ms-transform:scale(1.5);transform:scale(1.5);opacity:0}.scale-out-down.mui-leave{transition-duration:.5s;transition-timing-function:linear;-ms-transform:scale(1);transform:scale(1);transition-property:transform,opacity;opacity:1}.scale-out-down.mui-leave.mui-leave-active{-ms-transform:scale(.5);transform:scale(.5);opacity:0}.spin-in.mui-enter{transition-duration:.5s;transition-timing-function:linear;-ms-transform:rotate(-270deg);transform:rotate(-270deg);transition-property:transform,opacity;opacity:0}.spin-in.mui-enter.mui-enter-active,.spin-out.mui-leave{-ms-transform:rotate(0);transform:rotate(0);opacity:1}.spin-out.mui-leave{transition-duration:.5s;transition-timing-function:linear;transition-property:transform,opacity}.spin-in-ccw.mui-enter,.spin-out.mui-leave.mui-leave-active{-ms-transform:rotate(270deg);transform:rotate(270deg);opacity:0}.spin-in-ccw.mui-enter{transition-duration:.5s;transition-timing-function:linear;transition-property:transform,opacity}.spin-in-ccw.mui-enter.mui-enter-active,.spin-out-ccw.mui-leave{-ms-transform:rotate(0);transform:rotate(0);opacity:1}.spin-out-ccw.mui-leave{transition-duration:.5s;transition-timing-function:linear;transition-property:transform,opacity}.spin-out-ccw.mui-leave.mui-leave-active{-ms-transform:rotate(-270deg);transform:rotate(-270deg);opacity:0}.slow{transition-duration:.75s!important}.fast{transition-duration:.25s!important}.linear{transition-timing-function:linear!important}.ease{transition-timing-function:ease!important}.ease-in{transition-timing-function:ease-in!important}.ease-out{transition-timing-function:ease-out!important}.ease-in-out{transition-timing-function:ease-in-out!important}.bounce-in{transition-timing-function:cubic-bezier(.485,.155,.24,1.245)!important}.bounce-out{transition-timing-function:cubic-bezier(.485,.155,.515,.845)!important}.bounce-in-out{transition-timing-function:cubic-bezier(.76,-.245,.24,1.245)!important}.short-delay{transition-delay:.3s!important}.long-delay{transition-delay:.7s!important}.shake{animation-name:shake-7}@keyframes shake-7{0%,10%,20%,30%,40%,50%,60%,70%,80%,90%{transform:translateX(7%)}5%,15%,25%,35%,45%,55%,65%,75%,85%,95%{transform:translateX(-7%)}}.spin-ccw,.spin-cw{animation-name:spin-cw-1turn}@keyframes spin-cw-1turn{0%{transform:rotate(0)}to{transform:rotate(1turn)}}.wiggle{animation-name:wiggle-7deg}@keyframes wiggle-7deg{40%,50%,60%{transform:rotate(7deg)}35%,45%,55%,65%{transform:rotate(-7deg)}0%,30%,70%,to{transform:rotate(0)}}.shake,.spin-ccw,.spin-cw,.wiggle{animation-duration:.5s}.infinite{animation-iteration-count:infinite}.slow{animation-duration:.75s!important}.fast{animation-duration:.25s!important}.linear{animation-timing-function:linear!important}.ease{animation-timing-function:ease!important}.ease-in{animation-timing-function:ease-in!important}.ease-out{animation-timing-function:ease-out!important}.ease-in-out{animation-timing-function:ease-in-out!important}.bounce-in{animation-timing-function:cubic-bezier(.485,.155,.24,1.245)!important}.bounce-out{animation-timing-function:cubic-bezier(.485,.155,.515,.845)!important}.bounce-in-out{animation-timing-function:cubic-bezier(.76,-.245,.24,1.245)!important}.short-delay{animation-delay:.3s!important}.long-delay{animation-delay:.7s!important}", ""]);

	// exports


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(8);
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
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, "#app,body,html{width:100%;height:100%;font-size:14px;height:100vh;overflow:hidden}html *{font-family:monospace}h2.title{text-transform:uppercase;font-size:1.5em;font-weight:700;margin:0}.row.full{max-width:none}#graph-zone,#info-zone{height:100vh}#info-zone{box-shadow:0 0 3px #333}.content{padding:1rem}progress{color:#1779ba;width:100%}progress::-webkit-progress-value{background:#1779ba;width:100%}progress::-moz-progress-bar{background:#1779ba;width:100%}.variable{padding:0 .5em;border:1px solid #ddd;margin-bottom:1rem}.variable .name{font-weight:700;font-size:1.2em}.variable .info{padding-left:1rem}#inputs{margin-bottom:1rem;border-bottom:2px solid #555}.discreet{color:#aaa;font-style:italic;font-size:.9em}", ""]);

	// exports


/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var LEARNING_RATE = 0.01;

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
	        this.weights[id] += error * data.inputs[id] * LEARNING_RATE;
	      }

	      return guess;
	    }
	  }]);

	  return Perceptron;
	}();

	exports.default = Perceptron;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Graph = __webpack_require__(11);

	var _Graph2 = _interopRequireDefault(_Graph);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Trainer = function () {
	  function Trainer(graphSize, numberOfPoints, lineFunction) {
	    _classCallCheck(this, Trainer);

	    this.trainingPoints = [];
	    this.func = lineFunction;
	    this.g = new _Graph2.default(graphSize.x, graphSize.y);

	    for (var i = 0; i < numberOfPoints; i++) {
	      var x = this.random(this.g.keywords.xmin, this.g.keywords.xmax),
	          y = this.random(this.g.keywords.ymin, this.g.keywords.ymax),
	          answer = y > this.func(x) ? 1 : -1;

	      this.trainingPoints.push({
	        point: { x: x, y: y },
	        answer: answer
	      });
	    }
	  }

	  // methods


	  _createClass(Trainer, [{
	    key: 'random',
	    value: function random(floor, ceil) {
	      return Math.floor(Math.random() * (ceil - floor + 1)) + floor;
	    }
	  }]);

	  return Trainer;
	}();

	exports.default = Trainer;

/***/ },
/* 11 */
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
	      return -_y + this.height / 2;
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
	    key: 'fullF',
	    value: function fullF(f) {
	      var path = [];
	      for (var i = this.keywords.xmin; i <= this.keywords.xmax; i++) {
	        path.push(this.point({ x: i, y: f(i) }));
	      }

	      return path;
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
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Line = __webpack_require__(13);

	var _Line2 = _interopRequireDefault(_Line);

	var _Free = __webpack_require__(15);

	var _Free2 = _interopRequireDefault(_Free);

	var _Circle = __webpack_require__(16);

	var _Circle2 = _interopRequireDefault(_Circle);

	var _Rectangle = __webpack_require__(17);

	var _Rectangle2 = _interopRequireDefault(_Rectangle);

	var _Graph = __webpack_require__(11);

	var _Graph2 = _interopRequireDefault(_Graph);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Canvas = function () {
	  function Canvas(id, containerSelector, fixedSize) {
	    _classCallCheck(this, Canvas);

	    this.element = this.createCanvas(id);
	    this.container = document.querySelector(containerSelector);
	    this.container.append(this.element);
	    this.ctx = this.element.getContext('2d');
	    this.shapes = [];
	    this.fixedSize = fixedSize ? fixedSize : {};

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
	      var data = undefined;
	      if (this.element.style.width) {
	        data = this.ctx.getImageData(0, 0, this.element.width, this.element.height);
	      }

	      var computedStyle = getComputedStyle(this.container),
	          elementHeight = this.container.clientHeight,
	          elementWidth = this.container.clientWidth;

	      elementHeight -= parseFloat(computedStyle.paddingTop) + parseFloat(computedStyle.paddingBottom);
	      elementWidth -= parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight);

	      // Element width and height minus padding and border
	      this.element.style.width = this.fixedSize.width ? this.fixedSize.width + 'px' : elementWidth + 'px';
	      this.element.style.height = this.fixedSize.height ? this.fixedSize.height + 'px' : elementHeight + 'px';
	      this.element.width = this.fixedSize.width ? this.fixedSize.width : elementWidth;
	      this.element.height = this.fixedSize.height ? this.fixedSize.height : elementHeight;

	      this.g = new _Graph2.default(this.element.width, this.element.height);

	      if (data) {
	        this.ctx.putImageData(data, 0, 0);
	        this.update();
	      }
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

	      if (shape.attributes.close) {
	        this.ctx.closePath();
	      }

	      this.ctx.stroke();
	      if (this.ctx.fillStyle && (shape.type == 'circle' || shape.type == 'rectangle')) {
	        this.ctx.fill();
	      }

	      if (shape.attributes.text) {
	        this.ctx.restore();
	        this.ctx.save();
	        this.ctx.font = shape.attributes.text.font;
	        this.ctx.fillStyle = shape.attributes.text.color;
	        this.ctx.textAlign = 'center';
	        this.ctx.fillText(shape.attributes.text.text, shape.coor.start.x, shape.coor.start.y);
	      }
	    }
	  }, {
	    key: 'drawGraph',
	    value: function drawGraph() {
	      this.draw('line', {
	        from: this.g.point({ x: 0, y: 'ymax' }),
	        to: this.g.point({ x: 0, y: 'ymin' }),
	        attributes: {
	          strokeStyle: '#333',
	          lineWidth: 2
	        }
	      });
	      this.draw('line', {
	        from: this.g.point({ x: 'xmin', y: 0 }),
	        to: this.g.point({ x: 'xmax', y: 0 }),
	        attributes: {
	          strokeStyle: '#333',
	          lineWidth: 2
	        }
	      });
	    }
	  }, {
	    key: 'drawStraightFunction',
	    value: function drawStraightFunction(f) {
	      var functionLine = this.g.f(f);
	      functionLine.attributes = {
	        strokeStyle: '#FF0000',
	        lineWidth: 4
	      };
	      this.draw('line', functionLine);
	    }
	  }, {
	    key: 'drawFunction',
	    value: function drawFunction(f) {
	      this.draw('free', {
	        path: this.g.fullF(f),
	        attributes: {
	          strokeStyle: '#FF0000',
	          lineWidth: 4
	        }
	      });
	    }
	  }, {
	    key: 'drawNeuron',
	    value: function drawNeuron(weights, output, name, position, radius) {

	      this.draw('circle', {
	        at: this.g.point(position),
	        radius: radius,
	        attributes: {
	          fillStyle: '#98FB98',
	          strokeStyle: '#9ACD32',
	          text: { font: '12px monospace', color: 'black', text: name },
	          lineWidth: radius / 10,
	          volatile: true
	        }
	      }, false);

	      var totalInputs = Object.keys(weights).length,
	          subRadius = radius / (totalInputs * 2),
	          index = 0,
	          separation = radius * 2 / totalInputs;

	      for (var id in weights) {
	        this.draw('circle', {
	          at: this.g.point({ x: position.x - radius, y: position.y - radius + index * separation + radius / totalInputs }),
	          radius: subRadius,
	          attributes: {
	            fillStyle: 'white',
	            strokeStyle: 'black',
	            text: { font: '12px monospace', color: 'black', text: id + '->' + weights[id].toFixed(2) },
	            lineWidth: subRadius / 10,
	            volatile: true
	          }
	        }, false);

	        index++;
	      }

	      this.update();
	    }
	  }]);

	  return Canvas;
	}();

	exports.default = Canvas;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Shape2 = __webpack_require__(14);

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
/* 14 */
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
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Shape2 = __webpack_require__(14);

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
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Shape2 = __webpack_require__(14);

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
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Shape2 = __webpack_require__(14);

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
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _utils = __webpack_require__(19);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Variable = function () {
	  function Variable(name, containerSelector) {
	    _classCallCheck(this, Variable);

	    this.name = name;
	    this.container = document.querySelector(containerSelector);
	    this.elements = {
	      main: (0, _utils.create)('div', { 'data-variable': this.name, class: 'variable' }),
	      info: (0, _utils.create)('div', { class: 'info' }),
	      name: (0, _utils.create)('div', { class: 'name' }),
	      value: (0, _utils.create)('div', { class: 'value' }),
	      progress: (0, _utils.create)('progress', { class: 'progress', max: '100', value: '0' })
	    };
	    this.elements.name.innerText = this.name;

	    this.append(this.elements.info, this.elements.value);
	    this.append(this.elements.main, this.elements.name);
	    this.append(this.elements.main, this.elements.info);
	    this.append(this.container, this.elements.main);
	  }

	  _createClass(Variable, [{
	    key: 'setValue',
	    value: function setValue(value) {
	      this.elements.value.innerText = value;
	    }
	  }, {
	    key: 'setProgress',
	    value: function setProgress(value, max, shouldSetValue) {
	      var setValue = shouldSetValue === undefined ? true : shouldSetValue;

	      if (setValue) {
	        this.setValue(value + '/' + max);
	      }

	      if (!this.elements.progress.appended) {
	        this.append(this.elements.info, this.elements.progress);
	      }

	      this.elements.progress.setAttribute('value', value * 100 / max);
	    }
	  }, {
	    key: 'append',
	    value: function append(parent, elements) {
	      parent.append(elements);
	      elements.appended = true;
	    }

	    // methods

	  }]);

	  return Variable;
	}();

	exports.default = Variable;

/***/ },
/* 19 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function create(tagname, attrs) {
	  var element = document.createElement(tagname);

	  for (var attr in attrs) {
	    element.setAttribute(attr, attrs[attr]);
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

	exports.create = create;
	exports.str2rgb = str2rgb;

/***/ }
/******/ ]);