import mysql from 'mysql2';
 
const connection = mysql.createConnection({
   host:        'localhost',
   user:        'root',
   password:    '',
   database:    'nutech-backend-nodejs-iqrahabibi'
 });

connection.connect(function(error){
   if(!!error){
     console.log(error);
   }else{
     console.log('Koneksi Berhasil!');
   }
 })

 export default connection;