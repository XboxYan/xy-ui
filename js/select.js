var $ = require('./Agility');
var Select = function(){
    this.opt = [];
}
Select.prototype.init = function(){
    var self = this;
    $('.ui_select select').each(function (i, el) {
        if (self.opt[i] === el.innerHTML) return;
        self.opt[i] = el.innerHTML;
        el.opt = '';
        el.sel = el.options[el.selectedIndex].text || el.options[0].text;
        $.toArray(el).each(function (j) {
            el.opt += '<li class="ui_select_li ' + ((j === el.selectedIndex) ? 'selected' : "") + '" data-value="' + (el.options[j].value || el.options[j].text) + '">' + el.options[j].text + '</li>\n'
        })
        if ($(el).next()) {
            el.parentNode.children[1].innerHTML = el.opt;
            el.parentNode.children[2].children[0].innerHTML = el.sel;
        } else {
            var ul = document.createElement('ul');
            var a = document.createElement('a');
            ul.className = 'ui_select_datalist';
            a.className = 'ui_select_button';
            a.innerHTML = '<span class="ui_select_text">' + el.sel + '</span><i class="ui_select_icon"></i>'
            ul.innerHTML = el.opt;
            el.parentNode.appendChild(ul);
            el.parentNode.appendChild(a);
        }
    })
    $('.ui_select select').on('change', function () {
        var index = this.selectedIndex;
        console.log('自定义change')
        $(this.parentNode.children[1].children[index]).addClass('selected').siblings().removeClass('selected');//1取一即可
        this.parentNode.children[2].children[0].innerHTML = this.options[index].text;//2取一即可    
    })
    $('.ui_select li').on('click', 'li', function (i, el) {
        var index = $(this).index();
        $(this.parentNode.parentNode).removeClass('active');
        $(this.parentNode.parentNode.children[0]).selectedIndex(index).trigger('change');
    })
    $('.ui_select a').on('click', function (i, el) {
        if (this.parentNode.children[0].disabled) return;
        $('.ui_select').removeClass('active');
        $(this.parentNode).addClass('active');
    })
}

module.exports = Select;