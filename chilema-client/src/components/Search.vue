 <template>
     <div class="search">
         <div class="main-contain">
             <!-- <router-link to='/msite'>返回</router-link> -->
             <button @click="goBack()">返回</button>
             查询
        </div>
     </div>
 </template>
 <script>
 export default {
     name: "search",
     data: function() {
         return{
         }
     },
     mounted: function () {
     },
     methods: {
         goBack: function (params) {
             this.$router.history.go(-1);
         }
     }
 }
 </script>
 <style scoped>
 .search .main-contain{
     position: absolute;
     left: 0;
     top: 0;
     height: 100%;
     width: 100%;
     animation: moveIn 0.6s;
 }
 @keyframes moveIn {
     0% {
         left: 100%;
     }
     100% {
         left: 0;
     }
 }
 </style>
 
 