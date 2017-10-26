$(function(){
    var w_vdo = $('#w_videoContainer video')[0],
        w_close = $('#w_videoContainer .w_close');
    w_vdo.removeAttribute('autoplay');
    w_vdo.removeAttribute('controls');
    $(w_vdo).hover(function(){
        w_vdo.setAttribute('controls', true);
    }, function(){
        w_vdo.removeAttribute('controls');
    });
    w_vdo.onplay = function(){$('#w_videoContainer').addClass('on'); w_close.css('opacity', '1');};
    w_vdo.onended = function(){w_vdo.load(); $('#w_videoContainer').removeClass('on');}; //poster img 보여주기 위한 로드
    w_vdo.addEventListener('loadedmetadata', function(){w_close.css('opacity', '0'); $('#w_videoContainer').removeClass('on');});
    w_vdo.addEventListener('timeupdate', function(){$('#w_videoContainer').addClass('on'); w_close.css('opacity', '1'); });
    w_close.click(function(){w_vdo.pause(); w_vdo.load(); $(this).css('opacity', '0'); $('#w_videoContainer').removeClass('on');});
    loadVideo('videoPop1');
    loadVideo('videoPop2');
});

function loadVideo(popId){
    var video = $('#'+popId+' video');

    video[0].removeAttribute("controls");
    video[0].removeAttribute("autoplay");

    video.on('loadedmetadata', function() {
        $('#'+popId+' .progress-bar').css('width', 0);
    });

    video[0].onplay = function () {
        $('#'+popId+' .play').hide();
        $('#'+popId+' .pause').show();
    };

    video.on('ended',function(){
        $('#'+popId+' .pause').hide();
        $('#'+popId+' .play').show();
    });

    var playPause = function() {
        if(video[0].paused || video[0].ended) {
            video[0].play();
            $('#'+popId+' .play').hide();
            $('#'+popId+' .pause').show();
            $('#'+popId+' .playCover').fadeOut('fast');
        } else {
            video[0].pause();
            $('#'+popId+' .pause').hide();
            $('#'+popId+' .play').show();
            $('#'+popId+' .playCover').fadeIn('fast');
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
        var progress = $('#'+popId+' .progress');
        var maxduration = video[0].duration;
        var position = x - progress.offset().left;
        var percentage = 100 * position / progress.width();
        if(percentage > 100) {
            percentage = 100;
        }
        if(percentage < 0) {
            percentage = 0;
        }
        $('#'+popId+' .progress-bar').css('width',percentage+'%');
        video[0].currentTime = maxduration * percentage / 100;
    };

    var timeDrag = false;

    $('#'+popId+' .progressGroup').on('mousedown', function(e) {
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
        $('#'+popId+' .progress-bar').css('width',perc+'%');
    });

    video.on('click', function(e){
        playPause();
    });

    // 위젯 비디오 커버
    $('#'+popId+' .playCover').on('click', function(e) {
        $(this).fadeOut('fast');
        var vid = $(this).parent().find('video');
        vid[0].play();
    });

    // 재생, 일시정지
    $('#'+popId+' .playPauseBtn button').on('click', function(e) {
        $(this).hide();
        playPause();
    });

    $('#'+popId+' .stopBtn button').on('click',function(e){
        $('#'+popId+' .playPauseBtn .play').show();
        $('#'+popId+' .playPauseBtn .pause').hide();
        video[0].pause();
        video[0].currentTime = 0;
        updatebar($('#'+popId+' .progress').offset().left);
    });

    //10초전
    $('#'+popId+".bwdBtn .bwd").click(function(){
        video[0].currentTime -= 10;
    });

    //10초후
    $('#'+popId+".fwdBtn .fwd").click(function(){
        video[0].currentTime += 10;
    });

    //전체화면
    var fullScreen = function(e){
        var divObj = video[0];
        /*var divObj = document.getElementsByClassName('videoContainer')[0];*/
        divObj.classList.add('full');
        $('#'+popId+' .fullBtn .full').addClass('on');
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
        var divObj = video[0];
        /*var divObj = document.getElementsByClassName('videoContainer')[0];*/
        divObj.classList.remove('full');
        $('#'+popId+' .fullBtn .full').removeClass('on');
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

    $('#'+popId+' .fullBtn .full').click(function(e){
        if(!$(this).hasClass('disable')){
            var fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
            if(fullscreenElement){
                exitFullscreen(e);
            }else{
                fullScreen(e);
            }
        }
    });

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

}
