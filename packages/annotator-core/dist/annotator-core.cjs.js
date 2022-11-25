'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

class Store {
    root;
    constructor(root) {
        this.root = root;
    }
}

class Text {
    textContent;
    parentNode;
    needsBR;
    className;
    isLabeled;
    currentNode;
    constructor(parentNode, textContent, needsBR = false, className, isLabeled) {
        this.currentNode = null;
        this.parentNode = parentNode;
        this.isLabeled = isLabeled;
        this.textContent = textContent;
        this.className = className;
        this.needsBR = needsBR;
        this.generateTextNode();
        // generator BR
        // const brNode = document.createElement(HTML_NODE_ENUMS.BR)
        // this.parentNode.appendChild(brNode)
    }
    generateTextNode() {
        const divNode = document.createElement(exports.HTML_NODE_ENUMS.DIV);
        const spanNode = document.createElement(exports.HTML_NODE_ENUMS.SPAN);
        spanNode.className = this.className;
        spanNode.innerText = this.textContent;
        this.currentNode = divNode;
        this.currentNode.style.display = "inline";
        this.currentNode.appendChild(spanNode);
        if (this.needsBR) {
            console.log(this.needsBR);
            const brNode = document.createElement(exports.HTML_NODE_ENUMS.BR);
            this.currentNode.appendChild(brNode);
        }
        this.parentNode.appendChild(divNode);
    }
    addChildNodeToText(parentNode, textContent, className) {
        const textNode = document.createElement(exports.HTML_NODE_ENUMS.SPAN);
        textNode.innerText = textContent;
        textNode.className = className;
        parentNode.appendChild(textNode);
    }
}

class View {
    root;
    textNodeList;
    constructor(root) {
        this.root = root;
        this.textNodeList = [];
        this.generatorTextNode();
        this.registerViewEventHandler();
    }
    generatorTextNode() {
        console.log("view generator");
        const parentNode = this.root.element;
        const spanTextArr = this.root.data.split(this.root.splitRegExp);
        for (let i = 0; i < spanTextArr.length; i++) {
            const textNode = new Text(parentNode, spanTextArr[i], true, "", false);
            this.textNodeList.push({
                text: textNode,
                _molar_text_id: i
            });
        }
    }
    registerViewEventHandler() {
        this.root.element.onmouseup = function (e) {
            this.root.textSelectionHandler.textSelection(e);
        }.bind(this);
    }
    renderViewByTextNodeList(textNodeList) {
        console.log(textNodeList);
        // remove all text
        for (let i = 0; i < this.root.element.children.length; i++) {
            this.root.element.removeChild(this.root.element.children[i]);
        }
        for (const item of textNodeList) {
            this.root.element.appendChild(item.text.currentNode);
        }
    }
    UpdateTextNodeListIndex(insertArr, id) {
        this.textNodeList.splice(id, 1, ...insertArr);
        for (let i = 0; i < this.textNodeList.length; i++) {
            this.textNodeList[i]._molar_text_id = i;
        }
        this.renderViewByTextNodeList(this.textNodeList);
    }
}

var domain;

// This constructor is used to store event handlers. Instantiating this is
// faster than explicitly calling `Object.create(null)` to get a "clean" empty
// object (tested with v8 v4.9).
function EventHandlers() {}
EventHandlers.prototype = Object.create(null);

function EventEmitter() {
  EventEmitter.init.call(this);
}

// nodejs oddity
// require('events') === require('events').EventEmitter
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.usingDomains = false;

EventEmitter.prototype.domain = undefined;
EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

EventEmitter.init = function() {
  this.domain = null;
  if (EventEmitter.usingDomains) {
    // if there is an active domain, then attach to it.
    if (domain.active ) ;
  }

  if (!this._events || this._events === Object.getPrototypeOf(this)._events) {
    this._events = new EventHandlers();
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || isNaN(n))
    throw new TypeError('"n" argument must be a positive number');
  this._maxListeners = n;
  return this;
};

function $getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return $getMaxListeners(this);
};

// These standalone emit* functions are used to optimize calling of event
// handlers for fast cases because emit() itself often has a variable number of
// arguments and can be deoptimized because of that. These functions always have
// the same number of arguments and thus do not get deoptimized, so the code
// inside them can execute faster.
function emitNone(handler, isFn, self) {
  if (isFn)
    handler.call(self);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self);
  }
}
function emitOne(handler, isFn, self, arg1) {
  if (isFn)
    handler.call(self, arg1);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1);
  }
}
function emitTwo(handler, isFn, self, arg1, arg2) {
  if (isFn)
    handler.call(self, arg1, arg2);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1, arg2);
  }
}
function emitThree(handler, isFn, self, arg1, arg2, arg3) {
  if (isFn)
    handler.call(self, arg1, arg2, arg3);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1, arg2, arg3);
  }
}

function emitMany(handler, isFn, self, args) {
  if (isFn)
    handler.apply(self, args);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].apply(self, args);
  }
}

EventEmitter.prototype.emit = function emit(type) {
  var er, handler, len, args, i, events, domain;
  var doError = (type === 'error');

  events = this._events;
  if (events)
    doError = (doError && events.error == null);
  else if (!doError)
    return false;

  domain = this.domain;

  // If there is no 'error' event listener then throw.
  if (doError) {
    er = arguments[1];
    if (domain) {
      if (!er)
        er = new Error('Uncaught, unspecified "error" event');
      er.domainEmitter = this;
      er.domain = domain;
      er.domainThrown = false;
      domain.emit('error', er);
    } else if (er instanceof Error) {
      throw er; // Unhandled 'error' event
    } else {
      // At least give some kind of context to the user
      var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
      err.context = er;
      throw err;
    }
    return false;
  }

  handler = events[type];

  if (!handler)
    return false;

  var isFn = typeof handler === 'function';
  len = arguments.length;
  switch (len) {
    // fast cases
    case 1:
      emitNone(handler, isFn, this);
      break;
    case 2:
      emitOne(handler, isFn, this, arguments[1]);
      break;
    case 3:
      emitTwo(handler, isFn, this, arguments[1], arguments[2]);
      break;
    case 4:
      emitThree(handler, isFn, this, arguments[1], arguments[2], arguments[3]);
      break;
    // slower
    default:
      args = new Array(len - 1);
      for (i = 1; i < len; i++)
        args[i - 1] = arguments[i];
      emitMany(handler, isFn, this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  if (typeof listener !== 'function')
    throw new TypeError('"listener" argument must be a function');

  events = target._events;
  if (!events) {
    events = target._events = new EventHandlers();
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (!existing) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] = prepend ? [listener, existing] :
                                          [existing, listener];
    } else {
      // If we've already got an array, just append.
      if (prepend) {
        existing.unshift(listener);
      } else {
        existing.push(listener);
      }
    }

    // Check for listener leak
    if (!existing.warned) {
      m = $getMaxListeners(target);
      if (m && m > 0 && existing.length > m) {
        existing.warned = true;
        var w = new Error('Possible EventEmitter memory leak detected. ' +
                            existing.length + ' ' + type + ' listeners added. ' +
                            'Use emitter.setMaxListeners() to increase limit');
        w.name = 'MaxListenersExceededWarning';
        w.emitter = target;
        w.type = type;
        w.count = existing.length;
        emitWarning(w);
      }
    }
  }

  return target;
}
function emitWarning(e) {
  typeof console.warn === 'function' ? console.warn(e) : console.log(e);
}
EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function _onceWrap(target, type, listener) {
  var fired = false;
  function g() {
    target.removeListener(type, g);
    if (!fired) {
      fired = true;
      listener.apply(target, arguments);
    }
  }
  g.listener = listener;
  return g;
}

EventEmitter.prototype.once = function once(type, listener) {
  if (typeof listener !== 'function')
    throw new TypeError('"listener" argument must be a function');
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      if (typeof listener !== 'function')
        throw new TypeError('"listener" argument must be a function');
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      if (typeof listener !== 'function')
        throw new TypeError('"listener" argument must be a function');

      events = this._events;
      if (!events)
        return this;

      list = events[type];
      if (!list)
        return this;

      if (list === listener || (list.listener && list.listener === listener)) {
        if (--this._eventsCount === 0)
          this._events = new EventHandlers();
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length; i-- > 0;) {
          if (list[i] === listener ||
              (list[i].listener && list[i].listener === listener)) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (list.length === 1) {
          list[0] = undefined;
          if (--this._eventsCount === 0) {
            this._events = new EventHandlers();
            return this;
          } else {
            delete events[type];
          }
        } else {
          spliceOne(list, position);
        }

        if (events.removeListener)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };
    
// Alias for removeListener added in NodeJS 10.0
// https://nodejs.org/api/events.html#events_emitter_off_eventname_listener
EventEmitter.prototype.off = function(type, listener){
    return this.removeListener(type, listener);
};

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events;

      events = this._events;
      if (!events)
        return this;

      // not listening for removeListener, no need to emit
      if (!events.removeListener) {
        if (arguments.length === 0) {
          this._events = new EventHandlers();
          this._eventsCount = 0;
        } else if (events[type]) {
          if (--this._eventsCount === 0)
            this._events = new EventHandlers();
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        for (var i = 0, key; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = new EventHandlers();
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners) {
        // LIFO order
        do {
          this.removeListener(type, listeners[listeners.length - 1]);
        } while (listeners[0]);
      }

      return this;
    };

EventEmitter.prototype.listeners = function listeners(type) {
  var evlistener;
  var ret;
  var events = this._events;

  if (!events)
    ret = [];
  else {
    evlistener = events[type];
    if (!evlistener)
      ret = [];
    else if (typeof evlistener === 'function')
      ret = [evlistener.listener || evlistener];
    else
      ret = unwrapListeners(evlistener);
  }

  return ret;
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
};

// About 1.5x faster than the two-arg version of Array#splice().
function spliceOne(list, index) {
  for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1)
    list[i] = list[k];
  list.pop();
}

function arrayClone(arr, i) {
  var copy = new Array(i);
  while (i--)
    copy[i] = arr[i];
  return copy;
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

class TextSelectionHandler {
    root;
    constructor(root) {
        this.root = root;
    }
    getSelectionInfo() {
        const selection = window.getSelection();
        let startElement = null;
        let endElement = null;
        try {
            startElement = selection.anchorNode.parentNode;
            endElement = selection.focusNode.parentNode;
        }
        catch (e) {
            return null;
        }
        return {
            startNode: startElement,
            endNode: endElement,
            startIndex: selection.anchorOffset,
            endIndex: selection.focusOffset
        };
    }
    RenderInlineText(lineNode, startIndex, endIndex) {
        console.log(lineNode);
        const editSpan = this.root.view.textNodeList.find(e => {
            return e.text.currentNode.children[0] == lineNode;
        });
        const spanText = editSpan.text.textContent;
        const fontNode = { text: new Text(editSpan.text.currentNode, spanText.substring(0, startIndex), false, "", true), _molar_text_id: -1 };
        const labelNode = { text: new Text(editSpan.text.currentNode, spanText.substring(startIndex, endIndex), false, "molar-annotator-text--labeled", true), _molar_text_id: -1 };
        const afterNode = { text: new Text(editSpan.text.currentNode, spanText.substring(endIndex), !editSpan.text.isLabeled || endIndex != spanText.length || spanText.substring(endIndex) == "", "", true), _molar_text_id: -1 };
        this.root.view.UpdateTextNodeListIndex([fontNode, labelNode, afterNode], editSpan._molar_text_id);
    }
    RenderOfflineText(startLineNode, endLineNode, startIndex, endIndex) {
        console.log("offline");
        // this.root.view.UpdateTextNodeListIndex()
    }
    RenderText(selection) {
        if (selection.startNode == selection.endNode) {
            console.log("inline");
            this.RenderInlineText(selection.startNode, selection.startIndex, selection.endIndex);
        }
        else {
            console.log("offline");
            this.RenderOfflineText(selection.startNode, selection.endNode, selection.startIndex, selection.endIndex);
        }
    }
    textSelection(event) {
        const selection = this.getSelectionInfo();
        this.RenderText(selection);
    }
}

exports.HTML_NODE_ENUMS = void 0;
(function (HTML_NODE_ENUMS) {
    HTML_NODE_ENUMS["SPAN"] = "SPAN";
    HTML_NODE_ENUMS["BR"] = "br";
    HTML_NODE_ENUMS["DIV"] = "div";
})(exports.HTML_NODE_ENUMS || (exports.HTML_NODE_ENUMS = {}));

class Core extends EventEmitter {
    // 1. dataContent
    data;
    // 2. dataElement
    element;
    // 3. dataRegExp
    splitRegExp;
    // 4. textSelectionHandler
    textSelectionHandler;
    // 5. view
    view;
    // 6. store
    store;
    constructor(data, element, splitRegExp = /\n/) {
        super();
        this.data = data;
        this.element = element;
        this.splitRegExp = splitRegExp;
        // init view
        this.view = new View(this);
        // init store
        this.store = new Store(this);
        // init textSelectionHandler
        this.textSelectionHandler = new TextSelectionHandler(this);
        // init labelSelectionHandler
    }
}

exports.Core = Core;
//# sourceMappingURL=annotator-core.cjs.js.map
