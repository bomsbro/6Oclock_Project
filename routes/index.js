var express = require('express');
var router = express.Router();
const mysql = require("mysql");
var url = require("url");
var urlJson;

/*connect to mysql*/
let client = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: 'dolcetic',
  password: 'wlcm2dev@',
  database: 'dolcetic',
  multipleStatements: true,
});

/* GET home page. */
router.get('/', function (req, res, next) {
  urlJson=url.parse(req.url, true);
  var chosen = urlJson.query.chosen;

  var sql1="insert into VOTE_TB(choose) values("+chosen+");";
  var sql2="select CHOOSE, count(*) as cnt from VOTE_TB group by choose;";
  var sql;

  if (typeof chosen == "undefined"){
    sql=sql2;

    client.query(sql, function(err, result, fields){
      if(err){
        console.log(err);
        console.log("쿼리문에 오류가 있습니다.");
      }
      else{
        res.render('index', { results: result});
        console.log(result);
      }
    });
  }else{
    sql=sql1+sql2;

    client.query(sql, function(err, result, fields){
      if(err){
        console.log(err);
        console.log("쿼리문에 오류가 있습니다.");
      }
      else{
        res.render('index', { results: result[1]});
        console.log(result);
      }
    });
  };
});



module.exports = router;
