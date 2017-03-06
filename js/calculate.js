$(function() {
  "use strict";

    $('document').ready(function() {
/* -------------------------------------------------------------------bind fast-click*/

    $('body').bind('touchstart', function() {
       FastClick.attach(document.body);
    });

/* -------------------------------------------------------------------variable definition*/

      var q, k, m; //q for questions; k for question number in JSON; m for answer scores
      var p = 0; //p for progress
      var t = 0; //t for total scores
      var n = 1; //n for question number in test
      var b_1 = 5; //b_1 for quickly find bonus
      var b_2 = 5; //b_2 for repeating music bonus
      var qar = []; //qar for questions array
      var playN = 0, eye_score = 0 , ear_score = 0 ;
      var eye_star , ear_star ; // genre stars
      var b , z , x;
      var isPlaying = false, lasting_time = 20, count_t , startButton , c , intervalHandle;

    function first() {
       var q = qar;
       k = 0;
       $('.eye_test_intro > p').html(q[k].describe).append(q[k].photo);
    }

    function delay() { 
      if (n < 11) {
        setTimeout(function() {
          $('.choice').prop('disabled', false);
        }, 2000);
      }
    }

/* ------------------------------------------------------------append first photo onto the board */

    $('#start_').click(function() {
       $('#cover').fadeIn(200);
       $('#hint').text('请点击开始，并在屏幕右上角显示的时间内完成选择，若在30秒内选择正确，有额外奖励！');
       $('.header_title').hide(200);
       $('.begin_intro').hide(200);
       setTimeout(function() {
         $('.test_content_1').show(200);
         $('.progress').show(200);
       },200)
       first();
       counting();
    });

    $('.choice').click(function () {
       if (k < 5) {
          clearInterval(intervalHandle);
          $('#inputMin').css('display','none');
          $('#slide_down').fadeOut(200);
          q = qar;
          var y = $(this).attr('data-choice');
          n += 1;
          p += 10;
          b = q[k];
          m = b[y].bonus || 0;
          t += m;
          z = b[y].eye_score || 0;
          eye_score += z;
         
          if (lasting_time - count_t.innerHTML <= 30 && b[y].hasOwnProperty('bonus')) {
               t += b_1;
          } else {
               t += 0;
          }
 
          $('.progress > div').css('width',p + '%');
          $('.progress > div').text(p + '%');
          $('.progress > div').prop('aria-valuenow', p);
          if ($('.test_content_1').hasClass('fadeInRight animated')) {$('.test_content_1').removeClass('fadeInRight animated')};
          $('.test_content_1').addClass('fadeOutLeft animatedFast');
          $('.choice').prop('disabled', true);
          setTimeout( function () {
             k += 1;
             if (k === 5) {
               k = 5;
               cover();
               return;
             }
             $('.eye_test_intro > p').html(q[k].describe).append(q[k].photo);
             cover();
             $('#hint').text('您的可用时间缩短了！');
             $('#start_bnt').text('开始下一题');
             if (q[k].hasOwnProperty('C')) {$('#choiceC').css('display', 'inline')} else {$('#choiceC').css('display', 'none')};
             if (q[k].hasOwnProperty('D')) {$('#choiceD').css('display', 'inline')} else {$("#choiceD").css('display', 'none')};
             $("#choiceA").html(q[k].A.describe);
             $("#choiceB").html(q[k].B.describe);
             if (q[k].hasOwnProperty('C')) {$('#choiceC').html(q[k].C.describe)};
             if (q[k].hasOwnProperty('D')) {$('#choiceD').html(q[k].D.describe)};
             $('.test_content_1').removeClass('fadeOutLeft animatedFast').addClass('fadeInRight animated');
          },200);
        }
        if (k > 4 && k < 10) {

             q = qar;
             var y = $(this).attr('data-choice');
             n += 1;
             p += 10;
             b = q[k];
             m = b[y].bonus || 0;
             t += m;
             x = b[y].ear_score || 0;
             ear_score += x;
             if (playN === 1 && b[y].hasOwnProperty('bonus')) {
                t += b_2;
             } else {
                t += 0;
             }
             $('.progress > div').css('width',p + '%');
             $('.progress > div').text(p + '%');
             $('.progress > div').prop('aria-valuenow', p);
             if ($('.test_content_1').hasClass('fadeInRight animated')) {$('.test_content_1').removeClass('fadeInRight animated')};
             $('.test_content_1').addClass('fadeOutLeft animatedFast');
             $('.choice').prop('disabled', true);
             setTimeout( function () {
               k += 1;
                if (q[k].hasOwnProperty('C')) {$('#choiceC').css('display', 'inline')} else {$('#choiceC').css('display', 'none')};
                if (q[k].hasOwnProperty('D')) {$('#choiceD').css('display', 'inline')} else {$("#choiceD").css('display', 'none')};
                $("#choiceA").html(q[k].A.describe);
                $("#choiceB").html(q[k].B.describe);
                if (q[k].hasOwnProperty('C')) {$('#choiceC').html(q[k].C.describe)};
                if (q[k].hasOwnProperty('D')) {$('#choiceD').html(q[k].D.describe)};
                $('.test_content_1').removeClass('fadeOutLeft animatedFast').addClass('fadeInRight animated');
                delay();
             },200);  
          }
          if (n > 10) {
             $('.test_content_1').css('display','none').addClass('fadeOutLeft animatedFast');
             $('.result').show(200);
          } 
    });
          
/* -------------------------------------------------------------------倒计时 */
    
    function zero() {
      c = lasting_time;
      count_t.innerHTML = c;
      lasting_time -= 5;
    }

    function counting() {
       var startButton = document.getElementById('start_bnt');
       count_t = document.createElement("span");
       var para = document.getElementById('para');
       count_t.setAttribute("id" , "inputMin");
       count_t.style.width = 20 + 'px';
       count_t.style.height = 20 + 'px';
       count_t.style.position = 'absolute';
       count_t.style.top = .5 + '%';
       count_t.style.right = 5 + '%';
       count_t.style.fontSize = 20 + 'px';
       count_t.style.fontWeight = 'bolder';
       count_t.style.color = '#FE9F00';
       document.getElementById('test_1').appendChild(count_t);
       startButton.onclick = function() {
            zero();
            countDown();
            document.getElementById('cover').setAttribute("class", "fadeOutLeft animatedFast");
            document.getElementById('inputMin').style.display = 'inline';
            delay();
            if (k > 4) {
              $('#inputMin').css('display','none');
              $('#_intro > p').css('marginTop',340 + 'px');            
              $('.music_spinner').css('display','block');
              $('#spinner').addClass('spinning'); 
              $('#bar').addClass('rotate_bar'); 
            }
       };

      function countDown() {
         intervalHandle = setInterval(tick,1000);
      }

      function tick() { 
         c--;
         count_t.innerHTML = c;
         if (c === 0) {
           clearInterval(intervalHandle);
           document.getElementById('inputMin').style.display = 'none';
           slide_down();
         }
      }
    }

/* -------------------------------------------------------------------get JSON*/

    $.getJSON('data/data.json',function(result) {
      $.extend(qar,result);           
    });
    function errorFn(xhr,status,strErr) {
      alert(strErr);
    }

/* -------------------------------------------------------------------mask for start*/
    
    function slide_down() {
       $('.slide').show(200);
       $('#door').addClass('slideDown');
    }

    function cover() {
       $('#cover').addClass('fadeInRight animated');
       if (k === 5) {
          $('#hint').css('top','20%');
          $('#hint').html("<b id='title2'>第二关</b><br><p>请区别两段音乐的不同，音乐只能播放两次，中途不可停止播放！</p>");
          $('#start_bnt').html('开始下一关');
          $('.eye_test_intro > p').html(q[k].describe).append(q[k].photo);
          if (q[k].hasOwnProperty('C')) {$('#choiceC').css('display', 'inline')} else {$('#choiceC').css('display', 'none')};
          if (q[k].hasOwnProperty('D')) {$('#choiceD').css('display', 'inline')} else {$("#choiceD").css('display', 'none')};
          $("#choiceA").html(q[k].A.describe);
          $("#choiceB").html(q[k].B.describe);
          if (q[k].hasOwnProperty('C')) {$('#choiceC').html(q[k].C.describe)};
          if (q[k].hasOwnProperty('D')) {$('#choiceD').html(q[k].D.describe)};
          $('.test_content_1').removeClass('fadeOutLeft animatedFast').addClass('fadeInRight animated');
       }
    }

/* -------------------------------------------------------------------mask for developer details*/

    function mask() {
       var lay = document.createElement('div');
       document.body.appendChild(lay);
       lay.id = 'overLay'; 
       lay.style.position = 'absolute';
       lay.style.width = window.innerWidth + 'px';
       lay.style.height = window.innerHeight + 'px';
       lay.style.top = window.pageYOffset + 'px';
       lay.style.left = window.pageXOffset + 'px';
       lay.style.zIndex = 666;
       lay.style.opacity = 0.6;
       lay.style.backgroundColor = '#000';
    }
  });
});
