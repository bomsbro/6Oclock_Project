const mysql = require("mysql");

var yourLocalMySQLUsername = 'root';
var yourLocalMySQLPassword = 'wlcm2dev@';


var sql_createUser = "create user if not exists votemanager identified by '1234';";
var sql_grantPrivileges = "grant all privileges on VOTE_DB.* to 'votemanager'@'%';";
var sql_flush = "flush privileges;";
var sql_alterUser = "alter user votemanager identified with mysql_native_password by '1234';";
var sqls1 = sql_createUser + sql_grantPrivileges + sql_flush + sql_alterUser;

var sql_createDB = "create database if not exists VOTE_DB;";

var sql_createTable = "create table if not exists VOTE_TB(VOTE_ID int not null auto_increment PRIMARY KEY, CHOOSE int not null);";
var sql_insertValues1 = "insert into VOTE_TB(CHOOSE) values(0);"
var sql_insertValues2 = "insert into VOTE_TB(CHOOSE) values(1);"
var sqls2 = sql_createTable + sql_insertValues1+sql_insertValues2;

function db_initSetting() {

    const conn_init1 = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: yourLocalMySQLUsername,
        password: yourLocalMySQLPassword,
        multipleStatements: true,
    })
    conn_init1.connect();
    conn_init1.query(sqls1, (err) => {
        conn_init1.destroy();
        if (err) {
            throw err;
            return;
        }
        const conn_init2 = mysql.createConnection({
            host: 'localhost',
            port: 3306,
            user: 'votemanager',
            password: '1234',
            multipleStatements: true,
        })
        conn_init2.connect()
        conn_init2.query(sql_createDB, (err) => {
            conn_init2.destroy();
            if (err) {
                throw err;
                return;
            }
            const conn_init3 = mysql.createConnection({
                host: 'localhost',
                port: 3306,
                user: 'votemanager',
                password: '1234',
                database: 'vote_db',
                multipleStatements: true,
            })
            conn_init3.connect()
            conn_init3.query(sqls2, (err) => {
                conn_init3.destroy()
                if (err) {
                    throw err;
                    return;
                }
            })
        })
    })
}

db_initSetting();
