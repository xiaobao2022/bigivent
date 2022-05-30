$(function () {
    // 登录和注册的按需切换
    $("#link_reg").click(function () {
        // 点击去注册账号让 登录框隐藏，注册框显示
        $(".login-box").hide();
        $(".reg-box").show();
    })
    $("#link_login").click(function () {
        // 点击去登录让 注册框隐藏，登录框显示
        $(".login-box").show();
        $(".reg-box").hide();
    })

    // 从 LayUI 中获取 form 对象
    const form = layui.form;

    // 通过 form.verify() 方法自定义校验规则
    form.verify({
        // 自定义一个叫 pwd 的校验规则
        pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
        repwd: (val) => {
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败,则return一个提示消息即可
            const pwd = $(".reg-box [name=password]").val();
            if (pwd !== val) return "两次密码不一致"
        },
    })

    // 获取 layui 弹窗
    const layer = layui.layer;
    // 设置请求根路径
    const baseUrl = "http://www.liulongbin.top:3007";
    //注册功能
    $("#form_reg").on("submit", (e) => {
        //阻止默认提交事件
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/api/reguser",
            data: {
                username: $("#form_reg [name=username]").val(),
                password: $("#form_reg [name=password]").val(),
            },
            success: (res) => {
                if (res.status !== 0) return layer.msg(res.message);
                layer.msg("恭喜你注册成功！");
                // 注册成功后模拟点击跳转到登录界面
                $("#link_login").click();
            },
        });
    });

    //登入功能
    $('#form_login').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: "/api/login",
            data: $(this).serialize(),
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) return layer.msg(res.message);
                layer.msg("登录成功！");
                // 将登录成功得到的 token 字符串，保存到 localStorage 中
                localStorage.setItem("token", res.token);
                // 跳转到主页
                location.href = "/index.html";
            }
        })
    })
})