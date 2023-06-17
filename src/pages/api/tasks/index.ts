const mysql = require('mysql2');
const ulid = require('ulid');

//本番はhostを変える
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'h23s_08'
});


export default function personHandler(req,res) {
  if (req.method == 'GET') {
    console.log('GET');
    connection.query(
      'SELECT * FROM tasks',
      (error, results) => {
        results.forEach(element => {
          console.log(element);
        });
        console.log(results);
        res.status(200).send(results);
      }
    );
  }else if(req.method == 'POST'){
    connection.query(
      'INSERT INTO tasks(id,author_id,title) VALUES(?,?,?)',
      [ulid.ulid(),req.body.username,req.body.taskname],
      (error,results) => {
        console.log(results);
        res.status(200).send(results);
      }
    )
  }
}
