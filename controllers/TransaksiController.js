import connection from '../config/Database.js';

export const transaksi = async(req, res) => {
    try {
        const cekService = await connection.promise().query(`SELECT * FROM services where service_code = ?`,[req.body.service_code]); 
        var resp = [];

        if(!cekService[0][0])
        {
            res.status(400).json({
                status : 102,
                message : "Service atau Layanan tidak ditemukan",
                data : cekService[0]
            })
            return;
        }

        const today = new Date();
        let year = today.getFullYear();
        let month = today.getMonth() + 1;
        let date = today.getDate();
        let mls = today.getTime();
        const invoiceNumber = 'INV'+date+month+year+'-'+mls;

        await connection.promise().query(
            `INSERT INTO transaction (invoice_number, transaction_type, description, total_amount, email) 
                VALUES (?,?,?,?,?)`,
            [invoiceNumber, 'PAYMENT', cekService[0][0].service_name,cekService[0][0].service_tarif,req.email]
        );

        var user = await connection.promise().query(`SELECT id,balance FROM users where email = ?`, [req.email]); 

        await connection.promise().query(`UPDATE users set balance = ? where email = ?`,
            [
                user[0][0].balance - cekService[0][0].service_tarif,
                req.email
            ]
        )

        const transaction = await connection.promise().query(`SELECT * FROM transaction where invoice_number = ?`, [invoiceNumber]); 

        resp = {
            "invoice_number" : invoiceNumber,
            "service_code"  : cekService[0][0].service_code,
            "service_name"  : cekService[0][0].service_name,
            "transaction_type" : "PAYMENT",
            "total_amount"  : cekService[0][0].service_tarif,
            "created_on"    : transaction[0][0].created_at
        }

        res.json({
            status : 0,
            message : "Transaksi berhasil",
            data : resp
        })

    } catch (error) {
        res.json({msg:error});
    }
}

export const historyTransaksi = async(req, res) => {
    try {
        const { offset,limit } = req.body;

        var trans = '';
        
        if(offset && limit)
        {
            trans = await connection.promise().query(`SELECT invoice_number,transaction_type,description,total_amount,created_at FROM transaction where email = ? order by created_at desc limit ? offset ? `,[req.email,limit,offset]); 

        }else{
            trans = await connection.promise().query(`SELECT invoice_number,transaction_type,description,total_amount,created_at FROM transaction where email = ? order by created_at desc`,[req.email]); 
        }


        var resp = {
            "offset" : offset,
            "limit" : limit,
            "record" : transaction[0]
        }

        res.json({
            status : 0,
            message : "Get History Berhasil",
            data : resp
        })

    } catch (error) {
        res.json({msg:error});
    }
}