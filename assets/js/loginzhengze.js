$(function(){
    //正则
    //注册正则判断
    var regPasswordSpecial= /[~!@#%&=;':",./<>_\}\]\-\$\(\)\*\+\.\[\?\\\^\{\|]/; //密码中的特殊字符的正则判断
    var regPasswordAlpha=/[a-zA-Z]/  //密码中的字符判断
    var regPasswordNum=/[0-9]/          //密码中的数字判断
    var regEmail=/^[a-zA-Z\d]+([-_.][A-Za-z\d]+)*@([a-zA-Z\d]+[-.])+[a-zA-Z\d]{2,5}$/
    var password;
    var check=[false,false,false,false,false];

     //校验成功函数  符合注册要求
    function success(Obj, counter) {
        Obj.parent().parent().removeClass('has-error').addClass('has-success');
        $('.tip').eq(counter).hide();
        check[counter] = true;

    }
// 校验失败函数
    function fail(Obj, counter, msg) {
        Obj.parent().parent().removeClass('has-success').addClass('has-error');
        $('.tip').eq(counter).text(msg).show();
        check[counter] = false;
    }
    //邮箱地址匹配--

    $('.container').find('input').eq(0).change(function() {
        if (regEmail.test($(this).val())) {
            success($(this), 0);
        } else {
            fail($(this), 0, '邮箱错误，请重新输入');
        }
    });

    //密码匹配---密码的判断规则
    // 匹配字母、数字、特殊字符至少两种的函数-
       function atLeastTwo(password) {
        var a = regPasswordSpecial.test(password) ? 1 : 0;
        var b = regPasswordAlpha.test(password) ? 1 : 0;
        var c = regPasswordNum.test(password) ? 1 : 0;
        return a + b + c;
    }

    $('.container').find('input').eq(1).change(function() {

        password = $(this).val();

        if ($(this).val().length < 8) {
            fail($(this), 1, '密码错误，请重新输入');
        } else {
            if (atLeastTwo($(this).val()) < 2) {
                fail($(this), 1, '密码中错误，请重新输入')
            } else {
                success($(this), 1);
            }
        }
    });

    btn.on('click',function(){
        CheckMail();CheckPwd();CheckYZM();
        if (CheckMail()&&CheckPwd()&&CheckYZM()) {
            //读出json
            var jsonstr1 =window.localStorage.getItem("register");
            var json = eval('(' + jsonstr1 + ')');
            if($(".email").val()==json.email&&$(".pwd1").val()==json.pwd1){
                location.href = "user.html"
            }else{
                alert("邮箱或者密码不对");
            }
        }
    });
      
});




