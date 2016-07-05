var aInput = $('input[placeholder]');

aInput.each(function (i, el) {
    $(el.parentNode).attr('placeholder', $(el).attr('placeholder'));
})
aInput.on('focus', function (i, el) {
    $(el.parentNode).attr('placeholder', ' ');
})
aInput.on('blur', function (i, el) {
    if (this.value === '') {
        $(el.parentNode).attr('placeholder', $(el).attr('placeholder'));
    }
})