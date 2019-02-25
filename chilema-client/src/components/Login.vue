 <template>
     <div class="login">
        <div class="row">
            <input type="text" v-model="tel" placeholder="手机号"/><br/>
            <span :class="{disabled: tel.length != 11}" @click="sendPassCode()">发送验证码</span>
        </div>
        <div class="row">
            <input type="text" v-model="passcode" placeholder="验证码"/><br/>
        </div>
        <button @click="login()" :class="{disabled: passcode.length != 6}">登录</button>
     </div>
 </template>
 <script>
 import axios from 'axios';
 export default {
     name: "login",
     data: function() {
         return{
             tel: '',
             passcode: ""
         }
     },
     methods: {
         sendPassCode: function (params) {
             axios.get('/api/sendOnepasscod?tel=' + this.tel)
             .then((res)=>{
                 console.log(res,"验证码发送成功")
             })
         },
         login: function (params) {
             axios.get('/api/login?tel=' + this.tel +'&passcode=' + this.passcode)
             .then((res)=> {
                console.log(res)
             })
         }
     }
 }
 </script>
 <style scoped lang="less">
    .row {
        width: 80%;
        margin: 20px auto;
        position: relative;
        input {
            width: 100%;
            height: 48px;
            padding: 0 10px;
        }
        span {
            position: absolute;
            right: -3px;
            top: 14px
        }
    }
    .disabled {
        color: #999;
    }

 </style>
 
 