$(function(){
    $('.layerPop .close').on('click',function(e){
        e.preventDefault();
        $('.layerPopBtn').removeClass('on');
        $(this).parent().fadeOut();
    });

    $('.layerPopBtn').on('click',function(e){
        var layer = $(this).attr('data-layer');
        var layerPop = $(this).parents('body').find('#layer'+layer);
        $('.layerPopBtn').removeClass('on');
        if(layerPop.css('display') == 'block'){
            layerPop.fadeOut();
            return false;
        }
        $('.toastPop').fadeOut();
        $('.checkPop').fadeOut();
        $('.studyPop').fadeOut();
        $('.layerPop').fadeOut();
        $(this).addClass('on');
        layerPop.fadeIn();
    });

    $('.toast').on('click',function(e){
        var d = $(this).attr('data-pop');
        $(this).append($('.toastPop[data-pop='+d+']'));

        if($(this).find('.toastPop').css('display') == 'block'){
            $(this).find('.toastPop').fadeOut();
            return false;
        }

        $('.toastPop').fadeOut();
        $('.checkPop').fadeOut();
        $('.studyPop').fadeOut();
        $('.layerPop').fadeOut();
        $('.toastPop[data-pop='+d+']').fadeIn();

    });

    $('.toastPop .closeBtn').on('click',function(e){
        $(this).parents('.toastPop').fadeOut('fast');
        e.stopPropagation();
    });

    $('.checkPop .closeBtn').on('click',function(e){
        $(this).parents('.checkPop').fadeOut('fast');
        e.stopPropagation();
    });

    $('.widget.check').on('click',function(e){
        $('.checkPop').fadeIn();
        $('.studyPop').fadeOut();
        $('.toastPop').fadeOut();
    });

    $('.quizox.check input[type="radio"]').on('click',function(e){
        e.preventDefault();
    });
    $('.quizox.check label').on('click',function(e){
        e.preventDefault();
    });

    $('.widget.study').on('click',function(e){
        var pop =  $(this).next('.studyPop');
        $('.studyPop').fadeOut();

          if(!pop.is(':animated')){
            if(pop.css('display') == 'block') {
                pop.fadeOut();
            } else {
                pop.fadeIn();
            }
            $('.checkPop').fadeOut();
            $('.toastPop').fadeOut();
            $('.qnaPop').fadeOut();    
            $('.layerPop').fadeOut();
          }
        
    });


    $('.studyPop .close').on('click',function(e){
        $(this).parents('.studyPop').fadeOut();
    });

    $(".thinkPop .title").on('click',function(e){

        e.preventDefault();
        if($(this).parents(".thinkPop").hasClass('down')){
            $(this).parents(".thinkPop").attr('class','thinkPop up');
        }else{
            $(this).parents(".thinkPop").attr('class','thinkPop down');
        }
    });

    $(".selfcheckbox .titlebox").on('click',function(e){
        if($(this).parents(".selfcheckbox").hasClass('down')){
          $(this).parents(".selfcheckbox").attr('class','selfcheckbox up');
        }
        else{
            $(this).parents(".selfcheckbox").attr('class','selfcheckbox down');
        }
    });

    $('.star label').on('click',function(e){
        e.preventDefault();
        var idx = $(this).parents(".star").index();
        var star = $(this).parents(".star_wrap").find(".star");
        
        star.find("input[type='checkbox']").removeProp("checked");
        
        $(this).parents('.star_wrap').find('.star').each(function(i){
            if(i > idx){
                $(this).find("input").attr("value","");
                return false;
            }else{
                $(this).find("input[type='checkbox']").prop("checked","true");
                $(this).find("input").attr("value","check");
            }
        });
    });
    $('.pointPop .title').on('click',function(){
        if($(this).parents(".pointPop").hasClass('down')){
            $(this).parents(".pointPop").attr('class','pointPop up');
        }else{
            $(this).parents(".pointPop").attr('class','pointPop down');
        }
    });

    
    //개념체크 정답
    $('.checkPop .checkBtn').on('click',function(){
        var box = $(this).parent().find('.quizbox');
        var wid = $(".quiztext input").width();
        $(".ans").css({"width":wid});
        box.toggleClass('check');
        if(box.hasClass('check')){
            box.each(function(){
                if($(this).hasClass('quizox')){
                }

                if($(this).hasClass('quizinput')){
                    var ans = $(this).find('input').attr('data-answer');
                    $(this).find('input').attr('disabled',true)
                    $(this).find('input').parents(".ans-ps").append('<span class="ans">'+ans+'</span>');
                }
            });
        }else{
            box.each(function(){
                if($(this).hasClass('quizox')){
                }
                if($(this).hasClass('quizinput')){
                    $('.ans').remove();
                    $(this).find('input').removeAttr('disabled');
                }
            });
        }

    });
    
    
    
    
    
    
    $('.anscheckBtn').on('click',function(){
        var wrap = $(this).parents(".btn_wrap");
        var input = wrap.parent().find('input');

        if($(this).hasClass('check')){
            $(this).removeClass('check');
            if($(this).hasClass("act_input")){
                var act_ans = $(this).parents(".quizBox").find(".actText");
                act_ans.css({"display":"none"});
                return false;
            }
            input.each(function(){
                $(this).parent().find('.ansText').remove();
            });
        }else{
            $(this).addClass('check');
            if($(this).hasClass("act_input")){
                var act_ans = $(this).parents(".quizBox").find(".actText");
                act_ans.css({"display":"block"});
                return false;
            }
            else if($(this).hasClass('toast')){
                $(this).removeClass("check");
                return false;
            }
            input.each(function(){
                var ans = $(this).attr('data-ans');
                var spanAns = "<span class='ansText'>"+ ans +"</span>"
                $(this).parent().append(spanAns);
            });
        }

    });



    /*$('.anscheckBtn.ta').on('click',function(){
        $(this).toggleClass("chk");
        
        if($(this).hasClass("chk")){

            var input = $(this).parents(".quizBox").find('textarea');
            var ans = input.attr("data-answer");
            var spanAns = "<span>"+ans+"</span>";
            $(this).parents(".quizBox").find(spanAns).remove();
            
        }
        else{

            var input = $(this).parents(".quizBox").find('textarea');
            var ans = input.attr("data-answer");
            var spanAns = "<span>"+ans+"</span>";
            input.parent().append(spanAns);
        }
        console.log(spanAns);

    });*/



/*
    $('.studyPrev').on('click',function(){

    });

    $('.studyNext').on('click',function(){
        var on = $(".slider-nav li.on").index();
        var slide = $(this).parent().find('ul');
        var sWidth = $(this).parent().find('ul li').css('width');
        var idx = Number(slide.position().left) / Number(sWidth.replace('px',""));
        if(idx < 0 ) idx = -idx;
        var slideLegnth = $(this).parent().find('ul li').length;
        if(idx == slideLegnth-1){
            return false;
        }else{
            idx += 1;
            on += 1;
            $(".slider-nav li").removeClass("on");
            $(".slider-nav li").eq(on).addClass("on");
        }
        var sHeight = $(this).parent().find('ul li:eq('+idx+')').css('height');
        slide.css({
            position : 'absolute'
        });
        slide.parent().css({
            height : sHeight
        })
        if(!slide.is( ":animated" )){
            slide.stop().animate({
                left : '-'+ Number(sWidth.replace('px',"")) * idx
            });
        }

        $('.studyPrev').on('click',function(){
            var on = $(".slider-nav li.on").index();
            var slide = $(this).parent().find('ul');
            var slideLegnth = $(this).parent().find('ul li').length;
            var sWidth = $(this).parent().find('ul li').css('width');
            var idx = Number(slide.position().left) / Number(sWidth.replace('px',""));
            if(idx < 0 ) idx = -idx;
            if(idx == 0){
                return false;
            }else{
                idx -= 1;
                on -= 1;
                $(".slider-nav li").removeClass("on");
                $(".slider-nav li").eq(on).addClass("on");
            }
            var sHeight = $(this).parent().find('ul li:eq('+idx+')').css('height');
            slide.css({
                position : 'absolute'
            });
            slide.parent().css({
                height : sHeight
            })
            if(!slide.is( ":animated" )){
                slide.stop().animate({
                    left : '-'+ Number(sWidth.replace('px',"")) * idx
                });
            }
        });
    });
    */



    var on = $(".slider-nav li.on").index();

    $('.studyNext').on('click',function(){
        on = $(".slider-nav li.on").index();
        var wid = $(this).parent().find("ul li").width();
        var max = $(".slider-nav li").length - 1;
        console.log(max,on);

        if(on==max){

            on = max;
        }
        else{
            on++;
            $(".slide-list").animate({"margin-left":-wid*on});
        }

        $(".slider-nav li.on").removeClass("on");
        $(".slider-nav li").eq(on).addClass("on");

    });



    $('.studyPrev').on('click',function(){
        var wid = $(this).parent().find("ul li").width();
        on = $(".slider-nav li.on").index();

        if(on==0){
            on = 0;
        }
        else{
            on--;
            $(".slide-list").animate({"margin-left":-wid*on});
        }

        $(".slider-nav li.on").removeClass("on");
        $(".slider-nav li").eq(on).addClass("on");

    });
    $(".quizBox .anscheckBtn.actQuiz").on('click',function(){

        var quiz = $(this).parents(".quizBox").find(".quizInputAnswer");

        console.log(quiz);

        quiz.toggleClass("show");
    });

    $(".slider-nav li").click(function(){

        var wid = $(this).parents(".studyPop").find(".slide-con").width();
        var a = $(this).index();
        on = $(".slider-nav li.on").index();

        $(".slider-nav li").removeClass("on");
        $(this).addClass("on");

        $(".slide-list").animate({"margin-left":-wid*a});

    })




    $(".playbtn,.big_view").click(function(){
        var pop = $(this).attr('data-pop'),
            videoAll = $('video');

            $('button.pause').hide();
            $('button.play').show();
            videoAll.each(function(){this.pause();});
        $(".videoPop[data-pop=" + pop + "]").show();
    });

    $(".pop-close,.test_pop-close").click(function(){
        var videoAll = $('video');

        $('button.pause').hide();
        $('button.play').show();
        videoAll.each(function(){this.pause();});
        $(this).parents(".full").hide();
    });

    $(".test_pop-close").click(function(){

        $(".full").hide();

    });

    $(".test div").click(function(){

        var test = $(this).attr("data-pop");

        $(".full[data-pop=" + test + "]").show();

    });

    $(".tab").click(function(){

        var test = $(this).attr("data-pop");

        $(this).parents(".full").hide();
        $(".full[data-pop=" + test + "]").show();


    });
    

    $(".full .choice li").click(function(){

        $(this).siblings("li").removeClass("chk");
        $(this).addClass("chk");

    });


});
