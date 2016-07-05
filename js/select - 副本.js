var opt = []
$('.ui_select select').each(function(i,el){
    opt[i] = ''
    var ul = document.createElement('ul');
    var a = document.createElement('a');
    ul.className = 'ui_select_datalist';
    a.className = 'ui_select_button';
    $.toArray(el).each(function(j){
        opt[i] += '<li class="ui_select_datalist_li" data-index="'+j+'">'+el.options[j].text+'</li>\n'
    })
    a.innerHTML = '<span class="ui_select_text">请选择</span><i class="ui_select_icon"></i>'
    ul.innerHTML = opt[i];
    el.parentNode.appendChild(a);
    el.parentNode.appendChild(ul);
})


$('.ui_select select').on('change', function () {
    /*var index = this.selectedIndex;
    $('.ui_select_datalist_li').css('color', '#333');
    $('.ui_select_datalist_li').eq(index).css('color', 'red');*/
})

$('.ui_select_datalist_li').on('click', function (i) {
    $('.ui_select select').selectedIndex(i).trigger('change')
    $('.ui_select_datalist_li').css('color', '#333');
    $('.ui_select_datalist_li').eq(i).css('color', 'red');

})
$('#butn').on('click', function () {
    $('.ui_select select').get(0).options[3].selected = true;
    $('.ui_select select').trigger('change');
})

$('.ui_select_datalist_li').on('click',function() {
    $(this).next().css('background','red')
})
/*<a href="javascript:;" class="ui_select_button">
            <span class="ui_select_text">请选择</span>
            <i class="ui_select_icon"></i>
        </a>
        <ul class="ui_select_datalist">
            <li class="ui_select_datalist_li" data-index="0">请选择</li>
            <li class="ui_select_datalist_li " data-index="1">深圳</li>
            <li class="ui_select_datalist_li " data-index="2">上海</li>
            <li class="ui_select_datalist_li " data-index="3">北京</li>
            <li class="ui_select_datalist_li " data-index="4">成都</li>
            <li class="ui_select_datalist_li " data-index="5">武汉</li>
        </ul>*/