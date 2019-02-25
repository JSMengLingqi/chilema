var express = require('express');
var router = express.Router();
var dbTool = require('../dbtools/index')
var moment = require('moment')

router.get('/keywords', function(req, res, next) {
  var arr = ["肯德基", "汉堡王", "麦当劳", "必胜客", "大鸭梨", "我饿了", "大猪蹄子铭"];
  res.json(arr);
});

router.get('/foodentry', function(req, res, next) {
  var sql = 'select * from food_entry';
  dbTool.select(sql, (err, results) => {
    if(err) {
      console.log(err);
      res.send("查询失败");
      return;
    }
    res.json(results);
  })
});

router.get('/shops', function(req, res, next) {
  var arr = [];
  for(var i=0 ; i<10 ;i++) {
    arr.push({
      id: ("000000" + (i + 1)).substr(-6),
      logo: 'https://fuss10.elemecdn.com/e/da/c4e5abab06dea4b64d041495a9381png.png?imageMogr/format/webp/thumbnail/!130x130r/gravity/Center/crop/130x130/',
      name: '店铺'+i,
      rate: 5,
      distance: 3.9 + i + "km",
      time: 5 + i*3 + "分钟"
    })
  }
  res.json(arr);
});

router.get('/sendOnepasscod', function(req, res, next) {
  var tel = req.query.tel;

  // 先查询数据库中有没有该用户的验证码
  dbTool.select(`select * from one_pass_code where number = '${req.query.tel}'`,(err,results)=>{
    if(err) {
      res.send("查询失败",err)
      return;
    }
    var onepasscode = ("000000" + Math.floor(10000 * Math.random())).substr(-6);
    // 如果没有就重新发送验证码
    if(null == results || 0 == results.length) {
      var nowTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
      var sql = 'INSERT INTO one_pass_code SET ?';
      //let sql = 'insert into one_pass_code(number,passcode,timestamp) values(\''+tel+'\',\''+onepasscode+'\',now())';
      var data = {
        number: tel,
        passcode: onepasscode,
        timestamp: nowTime
      }
      dbTool.insert(sql,data, (err) => {
        if(err) {
          console.log(err);
          res.send("验证码发送失败");
          return;
        }
        res.send("验证码发送成功");  
      })
    } else {
      debugger;
      var nowTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
      var sql = `UPDATE one_pass_code SET passcode = '${onepasscode}', timestamp = '${nowTime}' where number = '${tel}'`;
      dbTool.update(sql, (err) => {
        if(err) {
          console.log(err);
          res.send("验证码发送失败");
          return;
        }
        res.send("验证码发送成功");  
      })
    }
  })
});

router.get('/login', function(req, res, next) {
  var sql = `select * from one_pass_code where number = '${req.query.tel}' 
  order by timestamp desc LIMIT 1 `;
  dbTool.select(sql, (err, results) => {
    if(err) {
      console.log(err);
      res.send("查询失败");
      return;
    }
    if(req.query.passcode == results[0].passcode) {
      res.send("登录成功")
    } else {
      res.send("您输入的验证码有误，请重新输入")
    }
  })
});

router.get('/getDetailCategory', function(req, res, next) {
  var sampleData = [];
  for(var i = 1 ; i <= 10 ; i++ ) {
    var data = {
      id: "00000" +i,
      name: "大分类" + i, 
      subCategory: []
    };
    for(var j = 0; j <= 6 ; j++) {
      data.subCategory.push({
        id: i + "00000" + j,
        name: "子分类：" + i + "_" + j,
        price: Math.ceil(100 * Math.random())
      })
    }
    sampleData.push(data)
  }
  res.json(sampleData);
});

module.exports = router;
