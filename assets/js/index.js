//获取用户基本信息
function getUserInfo() {
    $.ajax({
        type: "GET",
        url: "/my/userinfo",
        headers: {
            Authorization: localStorage.getItem("token"),
        },
        success: function (res) {
            // console.log(res);
            if (res.status !== 0) return layer.msg("获取用户信息失败！");
            layer.msg("获取用户信息成功！");
            readerAvatar(res.data)
        }
    })
}

//渲染用户信息
const readerAvatar = (user) => {
    // console.log(user);
    let uname = user.nickname || user.username
    //渲染欢迎语
    $("#welcome").html(`欢迎 ${uname}`);
    //按需渲染头像
    if (user.user_pic !== null) {
        // 渲染图片头像
        $(".layui-nav-img").attr("src", user.user_pic)
        $(".text-avatar").hide();
    } else {
        //设置文本头像
        $(".layui-nav-img").hide()
        $(".text-avatar").html(uname[0].toUpperCase())
    }
}
//退出功能
$("#btnLogout").on("click", function () {
    layui.layer.confirm("是否退出", { icon: 3, title: "" }, function (index) {
        // 清空本地存储里面的 token
        localStorage.removeItem("token");
        // 重新跳转到登录页面
        location.href = "/login.html";
    })
})

getUserInfo()//调佣函数