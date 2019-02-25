 <template>
     <div class="profile">
        <div class="login">
            <div class="header-icon" @click="gotoLogin()">
                <i></i>
            </div>
            <div>
                <a href="">登录/注册</a><br/>
                <a href="">登录后享受更多特权</a>
            </div>
        </div>
        <div class="coin">

        </div>
        <ul>
            <li></li>
        </ul>
        <ul>
            <li></li>
            <li></li>
        </ul>
        <ul>
            <li></li>
            <li></li>
        </ul>
     </div>
 </template>
 <script>
 export default {
     name: "profile",
     data: function() {
         return{

         }
     },
     methods: {
         gotoLogin: function () {
            //  编程式跳转
             this.$router.history.push("/login");
         }
     }
 }
 </script>
 <style scoped lang="less">
 .login {
     height: 35vw;
     background: #008eff;
     div {
         float: left;
     }
     div.header-icon {
         width: 35vw;
     }
    .header-icon i{
        height: 25vw;
        width: 25vw;
        border-radius: 50%;
        background: grey;
        margin: 5vw;
        display: block;
    }
 }
    
 </style>
 
 