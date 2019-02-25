 <template>
     <div class="detail">
         <h2>详情</h2>
         <div class="flex">
             <div class="left">
                <ul>
                    <li v-for="item in listdata" class="b-1-border"><a :href="'#'+item.id">
                        {{item.name}}</a></li>
                </ul>
             </div>
             <div class="right">
                 <dl>
                    <template v-for="item in listdata">
                        <dt :id="item.id" class="b-1-border">{{item.name}}</dt>
                        <dd v-for="subItem in item.subCategory" class="b-1-border">
                            {{subItem.name}}
                            {{subItem.price}}
                            <button @click="addToCart(subItem)">+</button>
                        </dd>
                    </template>
                 </dl>
             </div>
         </div>
         <div class="cart">
            <div class="cart-icon" @click = "showDetail()">
                 {{$store.state.cart.length > 0 ? $store.state.cart.length : ""}}
            </div>
            <!-- <div :class="{datail-show: false}">
                <div v-for="item in $store.state.cart">
                    {{item.name}}
                    {{item.price}}
                </div>
            </div> -->
         </div>
     </div>
 </template>
 <script>
 import axios from 'axios';
 import {mapGetters} from 'vuex';
 export default {
     name: "detail",
     data: function() {
         return{
             listdata: [],
             showFlag: false
         }
     },
     mounted: function() {
         this.getData();
     },
     computed: mapGetters(["count"]),
     methods: {                                                                      addToCart: function (item) {
            this.$store.dispatch("addToCartC", item)
         },                                           
         getData: function () {
             axios.get('/api/getDetailCategory')
             .then((res)=> {
                 console.log(res);
                 this.listdata = res.data;
             })
         }
     }
 }
 </script>
 <style scoped lang="less">
 .cart {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    background: grey;
    .cart-icon {
        width: 46px;
        height: 46px;
        border-radius: 50%;
        background: red;
    }
 }
 .detail {
     display: flex;
     flex-direction: column;
 }
 .flex {
     display: flex;
     flex-direction: row;
     flex: 1;
 }
 .left {
     width: 25vw;
     height: 100%;
     background: pink;
     overflow-y: auto;
     li {
         height: 10vw;
         line-height: 10vw;
     }
 }
 .right {
    flex: 1;
    height: 100%;
    background: burlywood;
    overflow-y: auto;
    dt {
        height: 8vw;
        line-height: 8vw;
    }
    dd {
        height: 25vw;
    }
 }
 .b-1-border {
     position: relative;
 }
 .b-1-border:after {
         content: "";
         position: absolute;
         width: 100%;
         bottom: 0;
         left: 0;
         border-bottom: 1px solid #999;
         transform: scaleY(0.5);
 }
 </style>
 
 