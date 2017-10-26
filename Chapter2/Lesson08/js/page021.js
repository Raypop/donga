$(function(){
    var itemLeft;
    var itemTop;
    $('.imgChoiceBox .drag').draggable({
        start : function(){
            itemLeft = $(this).css('left');
            itemTop = $(this).css('top');
            console.log(itemLeft,itemTop);
        },
        stop : onStop
    });

    function onStop(){
        var dt = $(this).attr('data-target');
        if(dt == "ca2"){
            var w = $('.ca1').width();
            var h = $('.ca1').height();
            var tl = $('.ca1').offset().left;
            var tt = $('.ca1').offset().top;
            var left = $('.ca1').css('left');
            var top = $('.ca1').css('top');
        }else{
            var w = $('.ca2').width();
            var h = $('.ca2').height();
            var tl = $('.ca2').offset().left;
            var tt = $('.ca2').offset().top;
            var left = $('.ca2').css('left');
            var top = $('.ca2').css('top');
        }

        var ol = $(this).offset().left;
        var ot = $(this).offset().top;

        var minLeft = tl - w;
        var minTop = tt - h;
        var maxLeft = tl + w;
        var maxTop = tt + h;
        if(ol > minLeft && ol < maxLeft && ot > minTop && ot < maxTop){
            $(this).draggable('destroy');
        }else{
            $(this).animate({left:itemLeft, top:itemTop},500);
        }
    }
});
