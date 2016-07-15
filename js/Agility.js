/*
*
*Agility.js
*
*/

//构造函数

var $ = function (selector, context) {
    return new $.fn.init(selector, context);
};

$.fn = $.prototype;

//初始化
$.fn.init = function (selector, context) {
    var nodeList = [];
    switch (typeof selector) {
        case 'function':
            addEvent(window, 'load', selector);
            break;
        case 'string':
            //IE8+	**querySelectorAll	
            nodeList = (context || document).querySelectorAll(selector);
            break;
        case 'object':
            if (selector.constructor == Array) {
                nodeList = selector;
            }
            else {
                //document
                if (selector === document) {
                    nodeList.push(document.documentElement);
                } else {
                    nodeList.push(selector);
                }
            }
            break;
    }
    this.length = nodeList.length;
    for (var i = 0; i < this.length; i += 1) {
        this[i] = nodeList[i];
    }
    return this;
};

//each循环
$.fn.each = function (fn) {
    var i = 0, length = this.length;
    for (; i < length; i += 1) {
        fn.call(this[i], i, this[i]);
    }
    return this;
};

//添加事件
$.fn.on = function (events, selector, fn) {
    if (arguments.length === 2) {
        this.each(function (i, el) {
            addEvent(el, events, function () {
                selector.call(el, i, el)
            });
        })
    } else {
        this.each(function (i, el) {
            addEvent(el, events, function (ev) {
                var ev = ev || window.event;
                var target = ev.target || ev.srcElement;
                var tagName = target.tagName + '';
                if (tagName.toLowerCase() == selector) {
                    fn.call(target, i, el)
                }
            });
        })
    }
    return this;
};

//html()
$.fn.html = function (str) {

    if (str) {  //设置

        this.each(function (i, el) {

            el.innerHTML = str;
        })

    }
    else {   //获取
        return this[0].innerHTML;
    }
    return this;
};
//css()
$.fn.css = function (attr, value) {

    if (arguments.length == 2) {  //设置

        this.each(function (i, el) {
            el.style[attr] = value;
        })

    }
    else if (arguments.length == 1) { //获取
        if (typeof attr == 'object') {
            for (var j in attr) {
                this.each(function (i, el) {
                    el.style[j] = attr[j];
                })
            }
        }
        else {
            return getStyle(this[0], attr);
        }
    }
    return this;
};
//attr()
$.fn.attr = function (attr, value) {

    if (arguments.length == 2) {  //设置

        if (value === '') {//移除属性
            this.each(function (i, el) {
                el.removeAttribute(attr);
            })
        } else {
            this.each(function (i, el) {
                el.setAttribute(attr, value);
            })
        }

    }
    else if (arguments.length == 1) { //获取
        return this[0].getAttribute(attr);
    }
    return this;
};
//hasClass
$.fn.hasClass = function (className) {
    return this[0].className.match(new RegExp('(\\s|^)' + className + '(\\s|$)')) ? true : false;
}
//addClass
$.fn.addClass = function (className) {
    this.each(function (i, el) {
        if ($(el).hasClass(className)) return;
        if (el.classList) {
            el.classList.add(className);
        } else {
            el.className += ' ' + className;
        }
    })
    return this;
}
//removeClass
$.fn.removeClass = function (className) {
    this.each(function (i, el) {
        if ($(el).hasClass(className)) {
            el.className = el.className.replace(new RegExp('(\\s|^)' + className + '(\\s|$)'), ' ');
        }
    })
    return this;
}
//eq()
$.fn.eq = function (num) {
    return $(this[num]);
}
//index()
$.fn.index = function () {
    var el = this[0];
    var index = 0;
    var children = el.parentNode.children;
    if(!children) return index
    $.toArray(children).each(function (i) {
        if (el == children[i]) {
            index = i;
            return
        }
    })
    return index;
}
//parent()
$.fn.parent = function () {
    var parent = []
    this.each(function (i, el) {
        parent.push(el.parentNode)
    })
    if (parent.length) {
        return $(parent);
    } else {
        return false
        //throw new Error('已经是文档顶部了');
    }
}
//child()
$.fn.children = function () {
    var child = []
    this.each(function (i, el) {
        $.toArray(el.children).each(function (j, m) {
            child.push(m);
        })
    })
    if (child.length) {
        return $(child);
    } else {
        return false
        //throw new Error('没有找到子节点');
    }
}
//next
$.fn.next = function () {
    var next = []
    this.each(function (i, el) {
        while ((el = el.nextSibling)) {
            if (el.nodeType === 1) {
                next.push(el);
                break;
            }
        }
    })
    if (next.length) {
        return $(next);
    } else {
        //throw new Error('没有找到下一节点');
        return false
    }
}
//pre
$.fn.pre = function () {
    var pre = []
    this.each(function (i, el) {
        while ((el = el.previousSibling)) {
            if (el.nodeType === 1) {
                pre.push(el);
                break;
            }
        }
    })
    if (pre.length) {
        return $(pre);
    } else {
        return false
        //throw new Error('没有找到上一节点');
    }
}
//siblings
$.fn.siblings = function () {
    var siblings = []
    this.each(function (i, el) {
        var _el = el;
        while ((el = el.previousSibling)) {
            if (el.nodeType === 1) {
                siblings.push(el);
            }
        }
        el = _el;
        while ((el = el.nextSibling)) {
            if (el.nodeType === 1) {
                siblings.push(el);
            }
        }
    })
    if (siblings.length) {
        return $(siblings);
    } else {
        return false
        //throw new Error('没有找到相邻节点');
    }
}
//append
$.fn.append = function (node) {
    this.each(function (i, el) {
        el.appendChild(node);
    })
}
//selectedIndex
$.fn.selectedIndex = function (index) {
    if (index != -1) {//设置index选中
        this.each(function (i, el) {
            el.options[index].selected = true;
        })
        return this;
    } else {//返回当前选中的index
        return this[0].selectedIndex
    }
}

//get() 转原生js对象
$.fn.get = function (index) {
    return this[index]
}

$.fn.init.prototype = $.fn;

//扩展方法
$.extend = function (json) {
    for (var attr in json) {
        $[attr] = json[attr];
    }
};
//扩展接口
$.fn.extend = function (json) {
    for (var attr in json) {
        $.fn[attr] = json[attr];
    }
};
$.extend({
    //类数组->数组
    'toArray': function (elems) {
        var arr = [];
        for (var i = 0; i < elems.length; i++) {
            arr.push(elems[i]);
        }
        return arr;
    }
})
$.fn.extend({
    //trigger()触发事件
    'trigger': function (event) {
        this.each(function (i, el) {
            fireEvent(el, event)
        })
    }
})

/**
 * 功能函数
 */
// 绑定事件 
function addEvent(target, events, fn) {
    //自定义事件
    target.listeners = target.listeners || {};
    target.listeners[events] = target.listeners[events] || [];
    target.listeners[events].push(fn);
    if (target.addEventListener) {
        target.addEventListener(events, fn, false);
    }
    else {
        if (events === 'change') {
            // onpropertychange||onclick
            target.attachEvent('onclick', function () {
                fn.call(target);//改变this指向
            });
        } else {
            target.attachEvent('on' + events, function () {
                fn.call(target);
            });
        }
    }
}

//获取样式
function getStyle(obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    }
    else {
        return getComputedStyle(obj, false)[attr];
    }
}

//触发事件
function fireEvent(target, events) {
    if (document.createEventObject) {
        // IE浏览器支持fireEvent方法
        if (target.listeners) {//主动触发自定义事件	
            for (var i = 0; i < target.listeners[events].length; i++) {
                target.listeners[events][i]();
            }
        }
        var evt = document.createEventObject();
        return target.fireEvent('on' + events)
    }
    else {
        // 其他标准浏览器使用dispatchEvent方法IE11
        var evt = document.createEvent('HTMLEvents');
        // initEvent接受3个参数：
        // 事件类型，是否冒泡，是否阻止浏览器的默认行为
        evt.initEvent(events, true, true);
        return !target.dispatchEvent(evt);
    }
}

/**
 * 
 * 扩展数组方法
 * 
 */

//扩展数组each方法
Array.prototype.each = $.fn.each;
//扩展ie8数组indexof方法
if (!Array.prototype.indexOf) {
    // 新增indexOf方法
    Array.prototype.indexOf = function (item) {
        var result = -1, a_item = null;
        if (this.length == 0) {
            return result;
        }
        for (var i = 0, len = this.length; i < len; i++) {
            a_item = this[i];
            if (a_item === item) {
                result = i;
                break;
            }
        }
        return result;
    }
}

