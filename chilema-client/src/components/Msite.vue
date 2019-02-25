 <template>
     <div class="msite">
        <div class="header">
            <div id="location">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 31" class="index-okfdP_0" style="
                    width: 3.466667vw;
                    height: 4.133333vw;
                "><path fill="#FFF" fill-rule="evenodd" d="M22.116 22.601c-2.329 2.804-7.669 7.827-7.669 7.827-.799.762-2.094.763-2.897-.008 0 0-5.26-4.97-7.643-7.796C1.524 19.8 0 16.89 0 13.194 0 5.908 5.82 0 13 0s13 5.907 13 13.195c0 3.682-1.554 6.602-3.884 9.406zM18 13a5 5 0 1 0-10 0 5 5 0 0 0 10 0z"></path></svg>
                <span>{{location}}</span>
            </div>
            <div id="search">
                <router-link to="/search">搜索商家、商品名称</router-link>
            </div>
            <div id="keywords">
                <span v-for="item in keywords">{{item}}</span>
            </div>  
        </div>
        <div class="swipe">
            <mt-swipe :auto="0">
                <mt-swipe-item>
                    <div class="fentry" v-for="(item, index) in foodEntry" v-if="index < 8">
                        <img :src="item.icon_path"/>
                        <span>{{item.name}}</span>
                    </div>
                </mt-swipe-item>
                <mt-swipe-item>
                    <div class="fentry" v-for="(item, index) in foodEntry" v-if="index > 8 && index < 17">
                        <img :src="item.icon_path"/>
                        <span>{{item.name}}</span>
                    </div>
                </mt-swipe-item>
                <mt-swipe-item>
                    <div class="fentry" v-for="(item, index) in foodEntry" v-if="index > 16">
                        <img :src="item.icon_path"/>
                        <span>{{item.name}}</span>
                    </div>
                </mt-swipe-item>
            </mt-swipe>
        </div>
        <div class="banner"></div>
        <div class="shop-list">
            <h4 style="text-align:center;margin:6px 0 18px">推荐商家</h4>
            <ul>
                <li v-for="item in shops" @click="gotoDetail(item.id)">
                    <img :src="item.logo"/>
                    <div class="shop-instro">
                        <h4>{{item.name}}</h4>
                        <div>{{item.rate}}分</div>
                        <div>{{item.distance}} | {{item.time}}</div>
                    </div>
                </li>
            </ul>
        </div>
     </div>
 </template>
 <script>
 import axios from 'axios';
 export default {
    name: "msite",
    data: function() {
        return{
            location: "",
            keywords: [],
            shops: [],
            foodEntry: []
        }
    },
    mounted: function() {
        //  取得位置
        this.getLocation();
        // 获取关键字
        this.getThisKeywords();
        // 取得外卖分类
        this.getFoodEntry();
        // 取得推荐商家
        this.getShops();

        document.querySelector('.msite.main-body')
        .addEventListener('scroll', function (params) {
            if(params.target.scrollTop > 100) {
               document.getElementById("search").className = "fixPos";
            } else {
               document.getElementById('search').className = '';
            }
        })

    },
    methods: {
        gotoDetail: function(sid){
            this.$router.history.push({name: 'Detail', params: {sid: sid}})
        },
        getLocation: function(){
            var that = this;
            var geolocation = new BMap.Geolocation();
            geolocation.getCurrentPosition(function(r){
                if(this.getStatus() == BMAP_STATUS_SUCCESS){
                    var geoc = new BMap.Geocoder();    
                    geoc.getLocation(r.point, function(rs){
                        var addComp = rs.addressComponents;
                        that.location = addComp.district + "" + addComp.street;
                    });   
                }
                else {
                    alert('failed'+this.getStatus());
                }        
            },{enableHighAccuracy: true})
        
        },
        getThisKeywords: function() {
            var that = this;
            axios.get("/api/keywords")
            .then(function(res){
                that.keywords = res.data;
            })
        },
        getFoodEntry: function() {
            var that = this;
            axios.get("/api/foodentry")
            .then(function(res){
                that.foodEntry = res.data;
            })
        },
        getShops: function() {
            var that = this;
            axios.get("/api/shops")
            .then(function(res){
                that.shops = res.data;
            })
        },
    }
 }
 </script>
 <style scoped lang="less">
    .header {
        background: #0097ff;
    }
    ul,li{ padding:0;margin:0;list-style:none}
    #location {
        line-height: 60px;
        color: white;
        height: 60px;
    }
    #search a {
        display: block;
        width: 100%;
        height: 44px;
        background: #fff;
        text-decoration: none;
        color: #999;
        line-height: 44px;
        text-align: center;
        font-family: simsun;
    }
    #keywords {
        line-height: 44px;
        height: 44px;
        color: white;
        overflow-x: auto;
        white-space:nowrap;
        span {
            margin-right: 10px;
        }
    }
    #keywords::webkit-scrollbar{
        display: none;
    }
    #location, #search, #keywords {
        padding: 0 20px;
    }
     #search {
         background: #0097ff;
     }
    .fixPos {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 999;
        padding: 0 20px;
    }
    .swipe {
        height: 180px;
    }
    .fentry {
        float: left;
        width: 25vw;
        overflow: hidden;
        text-align: center;
        img {
            width: 60%;
            display: inline-block;
        }
        span {
            display: block;
            font-size: 12px;
        }
    }
    .shop-list {
        li {
            height: 30vw;
            margin: 4vw 0;
            padding: 0 2.666667vw;
        }
    }
    .shop-list .shop-instro, .shop-list img {
        height: 17.3vw;
        float: left;
    }
    .shop-instro {
        padding-left: 2.666667vw;
        display: inline-block;
        width: 60%;
        h4 {
            margin: 0;
        }
    }
 </style>
 
 