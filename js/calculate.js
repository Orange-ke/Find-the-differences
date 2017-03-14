$(function() {
  "use strict";

    $('document').ready(function() {
/* -------------------------------------------------------------------bind fast-click*/

    $('body').bind('touchstart', function() {
     FastClick.attach(document.body);
    });

    $('#play_bt').bind('tap', function() {
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
      var b , z , x;
      var isPlaying = false, lasting_time = 70, count_t , startButton , c , intervalHandle;

    function first() {
       var q = qar;
       k = 0;
       $('.eye_test_intro > p').html(q[k].describe).append(q[k].photo);
       $('.popphoto').attr('src',q[k].big_photo);
    }

    function delay() { 
      if (n < 11) {
        setTimeout(function() {
          $('.choice').prop('disabled', false);
        }, 2000);
      }
    }

    function delay_() { 
      if (n < 11) {
        setTimeout(function() {
          $('.choice').prop('disabled', false);
        }, 200);
      }
    }

    var _1 = $("<a id='wrap' href='#title_'></a>");
    $('#start_').wrap(_1);
    $('#wrap').css({
         'textDecoration':'none',
         'color':'#202020'
    });

/* ------------------------------------------------------------append first photo onto the board */

    $('#start_').click(function() {
       $('#cover').css('display','block').addClass('fadeInRight animated');
       $('#hint').text('请在屏幕左上角显示的时间内完成选择，在20秒内选择正确，有额外奖励！');
       $('.header_title').hide(200);
       $('.begin_intro').hide(200);
       setTimeout(function() {
         $('.test_content_1').show(500);
         $('.progress').show(500);
       },300)
       first();
       over_();
       counting();
    });

/* ------------------------------------------------------------music_play_flow */
   
    document.getElementById('test').addEventListener('click',function() {
       document.getElementById('test_song').oncanplaythrough = document.getElementById('test_song').play();
    });
    
  function play() {
    $('#play_bt').click(function() {
      $('#spinner').addClass('spinning'); 
      $('#bar').addClass('rotate_bar');
      $('.choice').prop('disabled', true);
      
      document.getElementById('song').oncanplaythrough = document.getElementById('song').play();
     
      $('#play_bt').fadeOut(500);
      $('#play_bt').removeClass('play_bt_anim');
      isPlaying = true;
      document.getElementById('song').addEventListener('ended', function(){
        delay_(); 
        playN += 1;
        console.log(playN);      
        isPlaying = false;
        $('#spinner').removeClass('spinning'); 
        $('#bar').removeClass('rotate_bar');
        if (playN < 2) { 
          $('#play_bt').fadeIn(500);
          $('#play_bt').addClass('play_bt_anim');
        }   
      }); 
    });
  } 

/* ------------------------------------------------------------test_flow */

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
         
          if (lasting_time - count_t.innerHTML <= 20 && b[y].hasOwnProperty('bonus')) {
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
             console.log(k);
             if (k === 5) {
               cover();
               return k; 
             }
             $('.eye_test_intro > p').html(q[k].describe).append(q[k].photo);
             $('.popphoto').attr('src',q[k].big_photo);
             over_();
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
    });

    $('.choice').click(function () {    
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
             playN = 0;
             console.log(playN);
             $('#spinner').removeClass('spinning'); 
             $('#bar').removeClass('rotate_bar');
             $('#song').remove();
             $('.progress > div').css('width',p + '%');
             $('.progress > div').text(p + '%');
             $('.progress > div').prop('aria-valuenow', p);
             if ($('.test_content_1').hasClass('fadeInRight animated')) {$('.test_content_1').removeClass('fadeInRight animated')};
             $('.test_content_1').addClass('fadeOutLeft animatedFast');
             $('#play_bt').fadeIn(200);
             $('#play_bt').addClass('play_bt_anim');
             $('.choice').prop('disabled', true);
             setTimeout( function () {
                k += 1;
                console.log(k);
                if (k > 9) {
                  return;
                }
                $('.eye_test_intro > p').html(q[k].describe).append(q[k].music);
                play();
                if (q[k].hasOwnProperty('C')) {$('#choiceC').css('display', 'inline')} else {$('#choiceC').css('display', 'none')};
                if (q[k].hasOwnProperty('D')) {$('#choiceD').css('display', 'inline')} else {$("#choiceD").css('display', 'none')};
                $("#choiceA").html(q[k].A.describe);
                $("#choiceB").html(q[k].B.describe);
                if (q[k].hasOwnProperty('C')) {$('#choiceC').html(q[k].C.describe)};
                if (q[k].hasOwnProperty('D')) {$('#choiceD').html(q[k].D.describe)};
                $('.test_content_1').removeClass('fadeOutLeft animatedFast').addClass('fadeInRight animated');
             },200);  
          }

          if (n > 10) {  //**************************************************result*/
             $('a').attr('href','#title_');
             $('.test_content_1').css('display','none').addClass('fadeOutLeft animatedFast');
             $('.progress').hide(200);
             $('.header_title').show(200);
             $('.result').show(200);
             var pretex = '';
             var perc , score, final_txt, middle;
             if (t >= 140) {
                perc = 99;
                pretex = '牛逼哄哄！';
                middle = '您已经没有对手了';
                final_txt = '，请收下我的膝盖。';
             } else if (t >= 120 && t < 140) {
                perc = Math.floor(Math.random()*10) + 89;
                middle = '高！实在是高';
                final_txt = '，这位童鞋是飞行员的体格！';
             } else if (t >= 100 && t < 120) {
                perc = Math.floor(Math.random()*10) + 79;
                middle = '哎呦！';
                final_txt = '，一不小心拿了个第二名！';
             } else if (t >= 80 && t < 100) {
                perc = Math.floor(Math.random()*15) + 64;
                middle = '浪里个浪';
                final_txt = '，请叫我差不多先生！';
             } else if (t >= 60 && t < 80) {
                perc = Math.floor(Math.random()*15) + 49;
                middle = 'No! no! no!';
                final_txt = '，小伙子需要多练习呦！';
             } else if (t >= 40 && t < 60) {
                perc = Math.floor(Math.random()*15) + 34;
                middle = '很稳定';
                final_txt = '，又是倒数第二...';
             } else if (t >= 20 && t < 40) {
                perc = Math.floor(Math.random()*15) + 19;
                middle = '哇塞';
                final_txt = '，又垫底了!';
             } else if (t === 0) {
                perc = 0;
                middle = 'what！';
                final_txt = '，这智商没谁了!';
             } else {
                perc = Math.floor(Math.random()*15) + 4;
                middle = '哦买噶';
                final_txt = '，该吃吃脑白金了!';
             }
             score = t;
             $('.perct').show(2500);
             $('.perctenge').text(perc + '%');
             $('.final_score').text(score).prop('counter', 0).animate({
                counter: $('.final_score').text()
             }, {
               duration: 2000,
               easing: "swing",
               step: function(now) {
                   $(this).text(Math.ceil(now));
                 }
             });
             document.title = pretex + '我的得分' + ' ' + score + ' '+ middle + final_txt; 
             if (eye_score === 5) {
               $('.eye_3').addClass('highlighted');
             } else if (eye_score < 5 && eye_score >= 3) {
               $('.eye_2').addClass('highlighted');  
             } else {
               $('.eye_1').addClass('highlighted');  
             }
             if (ear_score == 5) {
               $('.ear_3').addClass('highlighted');
             } else if (ear_score < 5 && ear_score >= 3) {
               $('.ear_2').addClass('highlighted');  
             } else {
               $('.ear_1').addClass('highlighted');  
             }
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
       document.body.appendChild(count_t);
       count_t.setAttribute("id" , "inputMin");
       count_t.style.width = 10 + 'px';
       count_t.style.height = 10 + 'px';
       count_t.style.position = 'absolute';
       count_t.style.top = 15 + 'px';
       count_t.style.left = 6 + '%';
       count_t.style.fontSize = 20 + 'px';
       count_t.style.fontWeight = 'bolder';
       count_t.style.color = '#FE9F00';
       count_t.style.zIndex = 1000;
       startButton.onclick = function() {
            zero();
            countDown();
            document.getElementById('cover').setAttribute("class", "fadeOutLeft animatedFast");
            document.getElementById('inputMin').style.display = 'inline';
            if (k < 5) {
            delay();
            }
            if (k > 4) {
              clearInterval(intervalHandle);
              document.getElementById('test_song').pause();
              document.getElementById('test_song').remove();
              $('#inputMin').css('display','none');           
              $('.music_spinner').css('display','block');
              $('.eye_test_intro > p').html(q[k].describe).append(q[k].music);
              play();
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
           $('#overLay').remove();
           $('#popupParis').hide(5);
           $('#shut').hide(5);
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
       $('#slide_down').css('display','block');
       $('.slide').addClass('slideDown');
       $('.hint_2').css('display','block').addClass('hint_2_anim');
    }

    function cover() {
       $('#cover').addClass('fadeInRight animated');
       if (k === 5) {
          $('#hint').css('top','10%');
          $('#hint').html("<b id='title2'>第二关</b><br><p>请区别谁是原唱，音乐只能播放两次，中途不可停止播放！</p><br id='line_m'><p>在开始前建议试试音量</p>");
          $('#start_2').css('display','inline');
          $('#start_bnt').html('开始下一关');
          $('.eye_test_intro > p').html(q[k].describe).append(q[k].music);
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
       lay.style.height = 687 + 'px';
       lay.style.top = 0 + 'px';
       lay.style.left = window.pageXOffset + 'px';
       lay.style.zIndex = 990;
       lay.style.opacity = 0.9;
       lay.style.backgroundColor = '#000';
    }

    $('#follow').click(function() {
       mask();
       $('#QR').show(200);
       $('#overLay').click(function () {
          $(this).remove();
          $('#QR').hide(200);
       });
    });

/* -------------------------------------------------------------------beginning animation*/    

    $('.arrow1').click(function () {
       $('.blink_').toggleClass('blink_anim');
       $('.con_blink').toggleClass('con_blink_anim');
       $('.arrow1').toggleClass('arrow_anim');
    });

    $('.arrow2').click(function () {
       $('.ear_').toggleClass('ear_anim');
       $('.hover__').toggleClass('hover__anim');
       $('.arrow2').toggleClass('arrow_anim');
    });

    setInterval(function() {
       $('#play_bt').toggleClass('play_bt_anim')
    },1000);

    setInterval(function() {
       $('#start_').toggleClass('start_anim')
    },3000);

    function over_() {
       $('.photos').click(function() {
         mask();
         $('#shut').show(200);
         $('#popupParis').show(200);
         $('#overLay').click(function () {
            $(this).remove();
            $('#popupParis').hide(200);
            $('#shut').hide(200);
         });
       });
       $('#shut').click(function() {
         $('#overLay').remove();
         $(this).hide(200);
         $('#popupParis').hide(200);
       });
    }

  });

});