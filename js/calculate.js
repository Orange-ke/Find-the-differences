$(function() {
  "use strict";

    $('document').ready(function() {
/* -------------------------------------------------------------------bind fast-click*/

    $('body').bind('touchstart', function() {
       FastClick.attach(document.body);
    });

/* -------------------------------------------------------------------variable definition*/

      var q, k, m; //q for questions; k for question number in JSON; m for answer scores
      var p = 10; //p for progress
      var t = 0; //t for total scores
      var n = 1; //n for question number in test
      var b_1 = 15; //b_1 for quickly find bonus
      var b_2 = 15; //b_2 for repeating music bonus
      var qar = []; //qar for questions array
      var playN = 0, eye_score = 0 , ear_score = 0 ;
      var eye_star , ear_star ; // genre stars
      var b , z , x;
      var isPlaying = false, lasting_time = 10, count_t , startButton , c , intervalHandle;

    function first() {
       var q = qar;
       k = 0;
       $('.eye_test_intro > p').html(q[k].describe).append(q[k].photo);
    }

/* ------------------------------------------------------------append first photo onto the board */

    $('#start_').click(function() {
       $('.header_title').hide(500);
       $('.begin_intro').hide(500);
       setTimeout(function() {
         $('.test_content_1').show(500);
         $('.progress').show(500);
       },500)
       first();
       cover();
       counting();
       setTimeout(function() {
         $('.choices button.choice').prop('disabled',false);
       },5000);
    })  

    $('.choice').click(function () {
        var y = $(this).attr('data-choice');
        n += 1;
        p += 10;
        b = q[k];
        if (k < 10) {
           m = b[y].bonus || 0;
           s += m;
           z = b[y].eye_score || 0;
           eye_score += z;
           x = b[y].ear_score || 0;
           ear_score += x;
        } 
        $('.progress > div').css('width',p + '%');
        $(".progress > div").text(p + '%');
        $(".progress > div").prop('aria-valuenow', p);
        
        $('.test_content_1').addClass('fadeOutLeft animatedFast');
        $('.choice').prop('disabled', true);
        setTimeout(function(){
           k += 1;
           $('.eye_test_intro > p').html(q[k].describe).append(q[k].photo);
        },200);
        counting();
    })

/* -------------------------------------------------------------------倒计时 */

    function counting() {
       c = lasting_time;
       var count_t = document.createElement("span");
       var startButton = document.createElement("button");
           startButton.setAttribute("type" , "button");
           startButton.setAttribute("value" , "text");
       var para = document.getElementById('para');
       count_t.setAttribute("id" , "inputMin");
       count_t.style.width = 20 + 'px';
       count_t.style.height = 20 + 'px';
       count_t.style.position = 'absolute';
       count_t.style.top = 10 + '%';
       count_t.style.right = 10 + '%';
       count_t.style.fontSize = 20 + 'px';
       count_t.style.fontWeight = 'bolder';
       count_t.style.color = '#FE9F00';
       count_t.innerHTML = lasting_time;
       startButton.style.position = 'absolute';
       startButton.style.top = 180 + 'px';
       startButton.style.left = 50 + '%';
       startButton.style.transform = 'translateX(-50%)';
       // startButton style by bootstrap;
       startButton.style.zIndex = 667;
       document.getElementById('test_1').appendChild(count_t);
       document.getElementById('_intro').appendChild(startButton);
       startButton.onclick = function() {
            countDown();
            document.getElementById('overCover').style.display = 'none';
       };
       startButton.innerHTML = "Start it" ;

      function countDown() {
         intervalHandle = setInterval(tick,1000);
         startButton.style.display = 'none';
      }

      function tick() {
         c--;
         count_t.innerHTML = c;
         if (c === 0) {
           clearInterval(intervalHandle);
           startButton.innerHTML = 'Times up, please choose a choice';
           startButton.style.color = '#FE9F00';
           startButton.style.backgroundColor = 'black';
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

    function cover() {
       var coverImg = document.createElement('div');
       var hintText = document.createElement('p')
       hintText.id = 'hint';
       coverImg.appendChild(hintText);
       document.getElementById('test_1').appendChild(coverImg);
       coverImg.id = 'overCover'; 
       coverImg.style.position = 'absolute';
       coverImg.style.top = 50 + 'px';
       coverImg.style.left = 50 + '%';
       coverImg.style.transform = 'translateX(-50%)';
       coverImg.style.width = 50 + '%';
       coverImg.style.height = 240 + 'px';
       coverImg.style.zIndex = 666;
       coverImg.style.opacity = 0.98;
       coverImg.style.backgroundColor = '#000';
       coverImg.style.borderRadius = 20 + 'px' + ' ' +  20 + 'px';
       hintText.innerHTML = '请在' + lasting_time + '秒内完成选择，若在30秒内回答正确的有额外得分！';
       hintText.style.paddingTop = 60 + 'px';
       hintText.style.color = 'yellow';
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

