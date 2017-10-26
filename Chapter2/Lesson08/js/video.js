var video;

$(document).ready(function(){
    video = $('#video');
    video[0].removeAttribute("controls");
    video[0].removeAttribute("autoplay");

    video.on('loadedmetadata', function() {
        $('.progress-bar').css('width', 0);
    });

    video[0].onplay = function () {
        $('.play').hide();
        $('.pause').show();
    };

    video.on('ended',function(){
        $('.pause').hide();
        $('.play').show();
    });

    var playPause = function() {
        if(video[0].paused || video[0].ended) {
            video[0].play();
            $('.play').hide();
            $('.pause').show();
            $('.playCover').fadeOut('fast');
        } else {
            video[0].pause();
            $('.pause').hide();
            $('.play').show();
            $('.playCover').fadeIn('fast');
        }
    }

    //video 상태
    var startBuffer = function() {
        var currentBuffer = video[0].buffered.end(0);
        var maxduration = video[0].duration;
        var perc = 100 * currentBuffer / maxduration;
        if(currentBuffer < maxduration) {
            setTimeout(startBuffer, 500);
        }
    };

    //프로그래스 바
    var updatebar = function(x) {
        var progress = $('.progress');
        var maxduration = video[0].duration;
        var position = x - progress.offset().left;
        var percentage = 100 * position / progress.width();
        if(percentage > 100) {
            percentage = 100;
        }
        if(percentage < 0) {
            percentage = 0;
        }
        $('.progress-bar').css('width',percentage+'%');
        video[0].currentTime = maxduration * percentage / 100;
    };

    var timeDrag = false;

    $('.progressGroup').on('mousedown', function(e) {
        timeDrag = true;
        updatebar(e.pageX);
    });

    $(document).on('mouseup', function(e) {
        if(timeDrag) {
            timeDrag = false;
            updatebar(e.pageX);
        }
    });

    $(document).on('mouseout', function(e) {
        if(timeDrag) {
            timeDrag = false;
            updatebar(e.pageX);
        }
    });

    $(document).on('mousemove', function(e) {
        if(timeDrag) {
            updatebar(e.pageX);
        }
    });

    //플레이 시간
    video.on('timeupdate', function() {
        var currentPos = video[0].currentTime;
        var maxduration = video[0].duration;
        var perc = 100 * currentPos / maxduration;
        if (perc>100) {
            perc=100;
        }
        if (perc<0) {
            perc=0;
        }
        $('.progress-bar').css('width',perc+'%');
    });

    video.on('click', function(e){
        playPause();
    });

    // 위젯 비디오 커버
    $('.playCover').on('click', function(e) {
        $(this).fadeOut('fast');
        var vid = $(this).parent().find('video');
        vid[0].play();
    });

    // 재생, 일시정지
    $('.playPauseBtn button').on('click', function(e) {
        $(this).hide();
        playPause();
    });

    $('.stopBtn button').on('click',function(e){
        video[0].pause();
        updatebar($('.progress').offset().left);
    });

    //10초전
    $(".bwdBtn .bwd").click(function(){
        video[0].currentTime -= 10;
    });

    //10초후
    $(".fwdBtn .fwd").click(function(){
        video[0].currentTime += 10;
    });

    //전체화면
    var fullScreen = function(e){
        var divObj = document.getElementById('video');
        /*var divObj = document.getElementsByClassName('videoContainer')[0];*/
        divObj.classList.add('full');
        $('.fullBtn .full').addClass('on');
        if(divObj.requestFullscreen) {
            divObj.requestFullscreen();
        } else if(divObj.mozRequestFullScreen) {
            divObj.mozRequestFullScreen();
        } else if(divObj.webkitRequestFullscreen) {
            divObj.webkitRequestFullscreen();
        } else if(divObj.msRequestFullscreen) {
            divObj.msRequestFullscreen();
        }else{
            alert('지원하지 않는 브러우저 입니다.');
            $('.fullBtn .full').removeClass('on');
        }
        e.stopPropagation();
    };

    var exitFullscreen = function(e){
        var divObj = document.getElementById('video');
        /*var divObj = document.getElementsByClassName('videoContainer')[0];*/
        divObj.classList.remove('full');
        $('.fullBtn .full').removeClass('on');
        if(document.exitFullscreen) {
            document.exitFullscreen();
        } else if(document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if(document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if(document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }

    $('.fullBtn .full').click(function(e){
        if(!$(this).hasClass('disable')){
            var fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
            if(fullscreenElement){
                exitFullscreen(e);
            }else{
                fullScreen(e);
            }
        }
    });

    // 자막
    var trackDisplay = $('.trackDisplay').text();
    var track = document.getElementById("track");
    var disp = document.getElementById("display");
    if(trackDisplay == "on"){
        if(track == null){

        } else {
            track.addEventListener("cuechange", function () {
                var myTrack = this.track;             // track element is "this"
                var myCues = myTrack.activeCues;      // activeCues is an array of current cues.
                if (myCues.length > 0) {
                    disp.innerText = myCues[0].text;   // write the text
                }
            });
        }
    }
    // 단축키 이벤트
    $(document).keydown(function(e){
        var tag = e.target.tagName.toLowerCase();
        if(tag == 'input' || tag == 'textarea'){
        }else{
            if(e.keyCode == 32){//space
                playPause();
            }else if(e.keyCode == 27){//esc

            }else if(e.keyCode == 38){//위

            }else if(e.keyCode == 40){//아래

            }else if(e.keyCode == 37){//왼쪽
                video[0].currentTime -= 10;
            }else if(e.keyCode == 39){//오른쪽
                video[0].currentTime += 10;
            }else if(e.keyCode == 107){//속도 업

            }else if(e.keyCode == 109){//속도 다운

            }else if(e.altKey && e.which == 84){

            }else if(e.which == 33){

            }else if(e.which == 34){

            }
        }
    });

});
