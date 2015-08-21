//###########################################
//## SAMS (SECRET AGENT MESSAGING SERVICE) ##
//###########################################
//not glitched by default
var glitched = 0;
//document ready
$(document).ready(function(){
    //cheat code
    cheet('↑ ↑ ↓ ↓ ← → ← → b a',function(){
        //cheat code activated
        //if in normal mode, glitch out
        if(glitched==0){
            //enter glitch mode
            ftInterface();
            return
        //if in glitch mode, go normal
        }else{
            //exit glitch mode
            tInterface();
            return
        };
    });//end cheet
    //send button
    $('#send-button').click(function(){
        //clear inputs
        clearInputs();
        //hide read form
        $('#read-form-div').hide();
        //show send form
        $('#send-form-div').show();
        return;
    });
    //read button
    $('#read-button').click(function(){
        //clear inputs
        clearInputs();
        //hide send form
        $('#send-form-div').hide();
        //show read form
        $('#read-form-div').show();
        //show confirm button for read form
        $('#confirm-button-read').show();
        return;
    });
    //escape to exit
    $(document).keyup(function(e){
        //escape key up
        if(e.keyCode==27){
            if(glitched==1){
                //fast toggle interface
                tInterface();
                return
            };
        };//end escape keypress
    });//end keypress
    //send form submission
    $('#send-form').submit(function(){
        //inputs to vars
        var agentName = escape($('#agent-name').val()),
            keyCode = escape($('#key').val()),
            msg = escape($('#message').val());
        //client-side validation
        if(agentName.length<1||agentName.length>255||keyCode.length<1||keyCode.length>255||msg.length<1||msg.length>255){
            console.log('invalid fields');
            //flash invld fields
            $('#invalid-fields').fadeIn(100).delay(300).fadeOut(100);
            return false;
        }else{
            //concatinate url variable
            var urlVar = "index.php/SamsDatabase/saveMessage/" + agentName + "/" + keyCode + "/" + msg;
            //ajax call
            $.ajax({
                url: urlVar,
                method: 'get',
                success: function(data){
                    //success function
                    console.log('JS AJAX SUCCESS!');
                }//close success function
            });//close ajax call
            //clear inputs
            clearInputs();
            //flash message send confirmation
            $("#sent-message").fadeIn(100).delay(1000).fadeOut(100);
            //dont redirect page
            return false;
        }//end conditional test
    });//end send form submission 
    //read form submission
    $('#read-form').submit(function(){
        //inputs to vars
        var agentName = escape($('#agent-name-read').val()),
            keyCode = escape($('#key-read').val());
        //client-side validation
        if(agentName.length<1||agentName.length>255||keyCode.length<1||keyCode.length>255){
            //flash invld fields
            $('#invalid-fields-read').fadeIn(100).delay(300).fadeOut(100);
            //dont redirect page
            return false;
        }else{
            //create object to pass to php
            readObj = {agentName:agentName,keyCode:keyCode};
            //run checkForMessages function
            checkForMessages(readObj);
            //show msg-body div and warning
            $('#msg-body').toggle();
            $('#confirm-button-read').toggle();
            //flash message deleted confirmation
            $("#warning").fadeIn(100).delay(3000).fadeOut(100);
            //dont redirect page
            return false;
        }//end conditional test
    });//end read form submission
});//end document ready

//functions

//clear inputs
function clearInputs(){
    $('#agent-name').val('');
    $('#key').val('');
    $('#message').val('');
    $('#agent-name-read').val('');
    $('#key-read').val('');
};
//enter glitch mode
function ftInterface(){
    //change pseudo text
    $('#pseudo-text').text('༼ つ ◕_◕ ༽つ༼ つ ◕_◕ ༽つ༼ つ ◕_◕ ༽つ༼ つ ◕_◕ ༽つ༼ つ ◕_◕ ༽つ༼ つ ◕_◕ ༽つ༼ つ ◕_◕ ༽つ༼ つ ◕_◕ ༽つ༼ つ ◕_◕ ༽つ༼ つ ◕_◕ ༽つ༼ つ ◕_◕ ༽つ༼ つ ◕_◕ ༽つ༼ つ ◕_◕ ༽つ༼ つ ◕_◕ ༽つ༼ つ ◕_◕ ༽つ༼ つ ◕_◕ ༽つ༼ つ ◕_◕ ༽つ༼ つ ◕_◕ ༽つ༼ つ ◕_◕ ༽つ༼ つ ◕_◕ ༽つ༼ つ ◕_◕ ༽つ༼ つ ◕_◕ ༽つ༼ つ ◕_◕ ༽つ༼ つ ◕_◕ ༽つ༼ つ ◕_◕ ༽つ༼ つ ◕_◕ ༽つ༼ つ ◕_◕ ༽つ༼ つ ◕_◕ ༽つ༼ つ ◕_◕ ༽つ༼ つ ◕_◕ ༽つ༼ つ ◕_◕ ༽つ༼ つ ◕_◕ ༽つ༼ つ ◕_◕ ༽つ༼ つ ◕_◕ ༽つ').attr('class', 'pseudo-text-glitched');
    //change background to glitched
    $('body').css('background-image','url(../../public/img/background6-glitched.png)');
    //activate title glitch
    $('#pseudo-title').toggleClass("glitch");
    //hide normal image
    $('#pseudo-image').toggle();
    //show glitched image
    $('#glitched-image').toggle();
    //fade toggle sams content
    $('#sams-content').fadeToggle();
    //change counter
    glitched = 1;
};
//exit glitch mode
function tInterface(){
    //change text back
    $('.pseudo-text-glitched').text("Hi! I'm Eric. This is my super awesome website. Here you can find out about my hobbies, interests, and links to other great sites! Check out the stuff below.").attr('class', 'pseudo-text');
    //change background back
    $('body').css('background-image','url(../../public/img/background6.gif)');
    //deactivate title glitch
    $('#pseudo-title').toggleClass("glitch");
    //show normal image
    $('#pseudo-image').toggle();
    //hide glitched image
    $('#glitched-image').toggle();
    //fast toggle sams content
    $('#sams-content').toggle();
    //change counter
    glitched = 0;
};
//check for messages
function checkForMessages(readObj){
    //use ajax to run the check  
    $.post("index.php/SamsDatabase/readMessage", {'agentName':readObj.agentName,'keyCode':readObj.keyCode},
        //success function
        function(data, textStatus){
            //decode data
            var decodedMsg = decodeURIComponent(data.msg);
            //display message
            $('#msg-body').html(decodedMsg);
        },
        "json"
    );//end post
};