function checkAll(id) {
    var check_all = $('.check_all', id);
    var check_list = $('.check_item', id);
    check_all.on('change', function () {
        if (this.checked) {
            //check_list.attr('checked',true);
            check_list.each(function (i, el) {
                el.checked = true;
            })
        } else {
            //check_list.attr('checked','');
            check_list.each(function (i, el) {
                el.checked = false;
            })
        }
    })

    check_list.on('change', function () {
        if (this.checked) {
            check_all.get(0).checked = true;
            check_list.each(function (i, el) {
                if (el.checked === false) {
                    check_all.get(0).checked = false;
                    return;
                }
            })
        } else {
            check_all.get(0).checked = false;
        }
    })
}

var check_form = $('check_form').get(0);
checkAll(check_form);
