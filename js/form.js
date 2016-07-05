

$('input[type=radio]').on('propertychange',function() {    
    ischecked('input[type=radio]');
})


$('input[type=checkbox]').on('propertychange',function() {   
    ischecked('input[type=checkbox]');
})


function ischecked(obj){
    
    $(obj).each(function(i,el){
        if(this.checked){
            $(el).attr('checked',true);
            $(el.parentNode).css('visibility','visible');
        }else{
            $(el).attr('checked','');
            $(el.parentNode).css('visibility','inherit');
        }
    })
}