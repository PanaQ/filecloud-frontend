$(function(){
    //注册正则判断
    var regUsername=/^[a-zA-Z_][a-zA-Z0-9_]{4,19}$/ //大小写 数字0--9 4到19位
    var regPasswordSpecial= /[~!@#%&=;':",./<>_\}\]\-\$\(\)\*\+\.\[\?\\\^\{\|]/; //密码中的特殊字符的正则判断
    var regPasswordAlpha=/[a-zA-Z]/  //密码中的字符判断
    var regPasswordNum=/[0-9]/          //密码中的数字判断
    var regEmail=/^[a-zA-Z\d]+([-_.][A-Za-z\d]+)*@([a-zA-Z\d]+[-.])+[a-zA-Z\d]{2,5}$/
    var regPhoneNum = /^[0-9]{11}$/
    var password;

    var check=[false,false,false,false,false];

     //校验成功函数  符合注册要求
    function success(Obj, counter) {
        Obj.parent().parent().removeClass('has-error').addClass('has-success');
        $('.tips').eq(counter).hide();
        $('.glyphicon-ok').eq(counter).show(); //成功
        $('.glyphicon-remove').eq(counter).hide();
        check[counter] = true;
    }
// 校验失败函数
    function fail(Obj, counter, msg) {
        Obj.parent().parent().removeClass('has-success').addClass('has-error');
        $('.glyphicon-remove').eq(counter).show();
        $('.glyphicon-ok').eq(counter).hide();
        $('.tips').eq(counter).text(msg).show();
        check[counter] = false;
    }
//用户名匹配----用户名的规则判断 -0
    $('.container').find('input').eq(0).change(function(){

        if (regUsername.test($(this).val())) {
            success($(this), 0);
        } else if ($(this).val().length < 5) {
            fail($(this), 0, '用户名太短，不能少于5个字符');
        } else {
            fail($(this), 0, '用户名只能为英文数字和下划线,且不能以数字开头')
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
            fail($(this), 1, '密码太短，不能少于8个字符');
        } else {


            if (atLeastTwo($(this).val()) < 2) {
                fail($(this), 1, '密码中至少包含字母、数字、特殊字符的两种')
            } else {
                success($(this), 1);
            }
        }
    });

//手机号码匹配--

    $('.container').find('input').eq(4).change(function() {
        if (regPhoneNum.test($(this).val())) {
            success($(this), 3);
        } else {
            fail($(this), 3, '手机号码要11位数字');
        }
    });

    // 修改密码
    var jsonstr2 =window.localStorage.getItem("register");
    var json2 = eval('(' + jsonstr2 + ')');

    $('input[id=changepwd]').val(json2.pwd1);
    $("#cgpwd").on("click",function (){
        $('input[id=changepwd]').removeAttr("disabled");
    });
    $("#sure").on("click",function () {
        var pwd1 = $('input[id=changepwd]').val();
        json2.pwd1 = pwd1;
        $("input[id=changepwd]").attr("disabled",true);
        // alert("111")
    });



    $("#sub").on("click",function (){
        //读出json
        var jsonstr1 =window.localStorage.getItem("register");
        var json = eval('(' + jsonstr1 + ')');

        var username = $('input[id=username]').val();
        json['username'] = username;

        var phoneNum = $('input[id=phoneNum]').val();
        json['phoneNum'] = phoneNum;


        var birthTime = $("select").find("option:selected").text();
        json['birthTime'] = birthTime;

        var sex =$("input[name=sex]:checked").val();
        json['sex'] = sex;


window.localStorage.setItem("register",json);

        for(var i=0;i<check.length;i++){
            if(check[i]==true){
                location.href = "user.html";
                return;
            }else{
                alert("某些信息错误，请重新设置");
                return;
            }
        }
    });
});

