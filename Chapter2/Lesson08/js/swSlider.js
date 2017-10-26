// sw슬라이더 js
$(document).ready(function(){
    var slider = $('#body').find('.swSlider');
    slider.each(function(){
        swSlider($(this));
    });
});

function swSlider(t){
    var leftArray = [];
    var sliderWrap = t;
    var slider = sliderWrap.find('ul.imgslider');
    var slideItems = slider.find('li[data-num]');
    var slideItemsWidth = slideItems.width();
    var firstItem = slider.find('li[data-num="0"]');
    var lastItem = slider.find('li[data-num="'+(slideItems.length-1)+'"]');

    slider.prepend(lastItem.clone().removeAttr('data-num'));
    slider.append(firstItem.clone().removeAttr('data-num'));
    slider.css({
        'marginLeft': -slideItemsWidth,
        'width' : 100 * (slideItems.length + 2) + '%'
    });
    slideItems = slider.find('li');
    slideItems.css('width', 100/(slideItems.length)+'%');
    slideItems.each(function(i){leftArray.push(slideItemsWidth * i);});

    sliderWrap.find(".next").click(function(){
        if (slider.is(':animated')) return false;
        var curPos = slider.css('marginLeft');
        curPos = Number(curPos.replace('px', ''));

        if( -curPos == leftArray[slideItems.length-2] ) {
            slider.animate({"margin-left":curPos-slideItemsWidth}, function(){
                slider.css({"margin-left": -leftArray[1]});
                var l = Number(slider.css('marginLeft').replace('px', '').replace('-', ''));
                var li = leftArray.indexOf(l) - 1;
                $('.navbtn li').removeClass('on').eq(li).addClass('on');
            });
        } else {
            slider.animate({"margin-left":curPos-slideItemsWidth},function(){
                var l = Number(slider.css('marginLeft').replace('px', '').replace('-', ''));
                var li = leftArray.indexOf(l) - 1;
                $('.navbtn li').removeClass('on').eq(li).addClass('on');
            });
        }
    });

    sliderWrap.find(".prev").click(function(){
        if (slider.is(':animated')) return false;
        var curPos = slider.css('marginLeft');
        curPos = Number(curPos.replace('px', ''));
        if( -curPos == leftArray[1] ) {
            slider.animate({"margin-left":curPos+slideItemsWidth}, function(){
                slider.css({"margin-left": -leftArray[slideItems.length-2]});
                var l = Number(slider.css('marginLeft').replace('px', '').replace('-', ''));
                var li = leftArray.indexOf(l) - 1;
                $('.navbtn li').removeClass('on').eq(li).addClass('on');
            });
        } else {
            slider.animate({"margin-left":curPos+slideItemsWidth}, function(){
                var l = Number(slider.css('marginLeft').replace('px', '').replace('-', ''));
                var li = leftArray.indexOf(l) - 1;
                $('.navbtn li').removeClass('on').eq(li).addClass('on');
            });
        }

    });

    sliderWrap.find('.navbtn li').click(function(){
        var idx = $(this).index() + 1;
        $('.navbtn li').removeClass('on');
        $(this).addClass('on');
        slider.animate({"margin-left": -leftArray[idx]});
    });

}
