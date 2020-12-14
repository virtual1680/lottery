<template>
    <div class="main">
        <div class="header">
            <div class="header-center fl">
                <div class="header-title">抽奖定制数据一体化平台</div>
                <div class="header-img"></div>
            </div>
            <div class="header-bottom fl"></div>
        </div>
        <div class="content">
            <div class="content-left">
                <!--<img src="images/d.png" alt="">-->
            </div>
            <div class="content-right">
                <div class="right-infp">
                    <div class="right-infp-name">
                        <input type="text" name="username" v-model="username" placeholder="请输入用户名" maxlength="12" autocomplete="off">
                    </div>
                    <div class="right-infp-name">
                        <input type="password" name="name" v-model="password" placeholder="请输入用户名" autocomplete="off">
                    </div>
                    <div class="right-infp-btn">
                        <button class="btn" @click="login">登录</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "login",
        data(){
            return{
                username:"",
                password:"",
            }
        },
        methods:{
            login(){
                this.$http.login(this.username,this.password).then(res=>{
                    window.localStorage.setItem("Token",res);
                    this.$router.push({path:"/index"})
                })
            },
            loginGet(){
                this.$http.loginGet(this.username,this.password).then(res=>{
                    window.localStorage.setItem("Token",res);
                    this.$router.push({path:"/index"})
                })
            }
        },
    }
</script>

<style scoped>
    .main{
        background: url("../../assets/images/bj.jpg") no-repeat;
        background-size: cover;
        font-size: .16rem;
        color: #ffffff;
        position: relative;
        width: 100%;
        height: 100%;
    }
    .main{
        margin: 0 auto;
        width: 100%;
        height: 100vh;
        position: relative;
    }

    /*头部*/
    .header{
        width: 100%;
        height: 200px;
        /*background: red;*/

    }

    .header .header-center{
        width: 50%;
        height: 200px;
        position: relative;
        margin: 0 auto;
    }
    .header .header-center .header-title{
        text-align: center;
        color: #ffffff;
        font-size: 32px;
        font-weight: bold;
        text-shadow: 0 0 .3rem #00d8ff;
        line-height: 120px;
    }
    .header .header-img{
        background: url("../../assets/images/head.gif") no-repeat center center;
        background-size: 100%;
        height: 100%;
        width: 100%;
        position: absolute;
        top: .8rem;
    }

    .content{
        width: 100%;
        height: 400px;
        /*background: green;*/
        margin: 1rem auto 0 auto;
        /*border: 1px solid green;*/
    }
    .content .content-left{
        width:400px;
        height: 400px;
        /*border: 1px solid red;*/
        background: url("../../assets/images/d.png") no-repeat;
        background-size: 400px 400px;
        padding: 0.4rem 0;
        box-sizing: border-box;
        margin-right: 2%;
        margin-left: 15%;
        float: left;
    }
    @-webkit-keyframes rotation {
        from {
            -webkit-transform: rotate(0deg);
        }
        to {
            -webkit-transform: rotate(360deg);
        }
    }

    .content .content-left {
        -webkit-transform: rotate(360deg);
        animation: rotation 15s linear infinite;
        -moz-animation: rotation 15s linear infinite;
        -webkit-animation: rotation 15s linear infinite;
        -o-animation: rotation 15s linear infinite;
    }

    .content .content-right{
        width: 400px;
        height: 400px;
        background: url("../../assets/images/e.png") no-repeat;
        background-size: 100% 100%;
        float: right;
        margin-right:15%;
        position: relative;
        top: -50px;
    }
    .right-infp{
        display:flex;
        flex-direction: column;
        margin: 0 auto;
        justify-content: center;
        width: 80%;
        height: 100%;
        /* border: 1px solid red;*/
        vertical-align: center;
    }
    .right-infp-name{
        background: url("../../assets/images/b.png") no-repeat;
        width: 100%;
        height: 40px;
        background-size: 100% 100%;
        line-height:0.45rem;
        margin-bottom: 20px;
        position: relative;
    }
    .right-infp-name input{
        width: 85%;
        border: none;
        box-sizing: border-box;
        height: 40px;
        margin-left: 0.5rem;
        line-height: 40px;
        background: none !important;
        color: #00eaff;
        padding-left: 0.15rem;
        /*box-shadow: 0 0 1px #00eaff;*/
        outline: none;
        -webkit-tap-highlight-color:rgba(255,0,0,0);
        position: absolute;


    }
    input::-webkit-input-placeholder {
        color: #ccc;
    }
    .right-infp-btn{
        background: url("../../assets/images/a.png") no-repeat;
        width: 100%;
        height: 40px;
        background-size: 100% 100%;
        line-height: 0.5rem;
        margin-bottom: 0.4rem;
        position: relative;
    }
    .right-infp-btn .btn{
        width: 95%;
        border: none;
        box-sizing: border-box;
        height: 40px;
        margin-left: 0.1rem;
        font-size: 16px;
        cursor: pointer;
        background: none;
        outline: none;
        color: #fff;
        position: absolute;
    }
    .right-infp-btn .btn:hover{

    }
</style>
