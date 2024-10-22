import mysql from 'mysql2';
 
const connection = mysql.createConnection({
   host:        'autorack.proxy.rlwy.net',
   user:        'root',
   password:    'MGcVDpPRIgBqydBdilBUFklqJdcfIqqY',
   database:    'nutech-backend-nodejs-iqrahabibi',
   port: 46758
 });
//  mysql://root:MGcVDpPRIgBqydBdilBUFklqJdcfIqqY@autorack.proxy.rlwy.net:46758/railway

connection.connect(function(error){
   if(!!error){
     console.log(error);
   }else{
     console.log('Koneksi Berhasil!');
   }
 })

 export default connection;