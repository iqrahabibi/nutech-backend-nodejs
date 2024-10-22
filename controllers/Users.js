import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connection from '../config/Database.js';
import emailValidator from 'deep-email-validator';
import path from "path";

async function isEmailValid(email) {
    return emailValidator.validate(email)
}

export const Register = async(req, res) => {
    const {
        email,
        first_name,
        last_name,
        password
    } = req.body;

    if (!email || !password){
        res.json({
            status : 102,
            message: "Email or password is missing ",
            data : null
        })
        return;
    }
    
    if(password.length < 8)
    {
        res.json({
            status : 102,
            message: "Password Harus 8 karakter.",
            data : null
        })

        return
    }

    const {valid, reason, validators} = await isEmailValid(email);

    if (valid)
    {
        console.log('not valid');
        
        res.json({
            status : 102,
            message: "Paramter email tidak sesuai format",
            data : null
        }) 
        
        return;
    }
    
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    
    try {
        var cekEmailExist = await connection.promise().query(`SELECT COUNT(*) as total FROM users where email = ?`, [email]);
        
        if(cekEmailExist[0][0].total != 0)
        {
            res.json({
                status : 102,
                message: "Email sudah ter-registrasi",
                data : null
            }) 
            // console.log(cekEmailExist);
            return ;
        }

        await connection.promise().query(
            `INSERT INTO users (email, first_name, last_name, password) 
                VALUES (?, ?,?, ?)`,
            [email, first_name, last_name,hashPassword]
            );

        res.json({
            status : 0,
            meessage: "Register Berhasil",
            data: null
        });
    } catch (error) {
        console.log(error);
    }
}

export const Login = async(req, res) => {
    try {
        
        const user = await connection.promise().query(`SELECT * FROM users where email = ?`, [req.body.email]); 

        const match = await bcrypt.compare(req.body.password, user[0][0].password);

        const {valid, reason, validators} = await isEmailValid(req.body.email);

        if (valid)
        {
            res.json({
                status : 102,
                message: "Paramter email tidak sesuai format",
                data : null
            }) 
            
            return;
        }

        if(!match)
        {
            res.json({
                status : 102,
                message: "Username atau password salah",
                data : null
            });
            return 1;  
        } 
        
        const first_namejwt = user[0][0].name;
        const emailjwt = user[0][0].email;
        const accessToken = jwt.sign({ emailjwt,first_namejwt }, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: '12h'
        });
        
        res.json({ 
            status : 0,
            message : "Login Sukses",
            data : { token : accessToken }
             
        });
    } catch (error) {
        res.json({msg:error});
    }
}

export const GetProfile = async(req, res) => {
    try {
        const user = await connection.promise().query(`SELECT email,first_name,last_name,profile_image FROM users where email = ?`, [req.email]); 

        res.json({
            status : 0,
            message : "Sukses",
            data : user[0][0]
        })

    } catch (error) {
        res.json({msg:error});
    }
}

export const GetBalance = async(req, res) => {
    try {
        const user = await connection.promise().query(`SELECT balance FROM users where email = ?`, [req.email]); 

        res.json({
            status : 0,
            message : "Get Balance Berhasil",
            data : user[0][0]
        })

    } catch (error) {
        res.json({msg:error});
    }
}

export const TopupBalance = async(req, res) => {
    try {
        // console.log(top_up_amount);
        if(typeof req.body.top_up_amount == 'string')
        {
            res.status(400).json({
                status : 102,
                message : "ini string",
                data : null
            })

            return;
        }
        
        if(req.body.top_up_amount < 0 || !req.body.top_up_amount)
        {
            res.status(400).json({
                status : 102,
                message : "Paramter amount hanya boleh angka dan tidak boleh lebih kecil dari 0",
                data : null
            })
            return;
        }
        

        var user = await connection.promise().query(`SELECT id,balance FROM users where email = ?`, [req.email]); 

        await connection.promise().query(`UPDATE users set balance = ? where email = ?`,
            [
                user[0][0].balance + req.body.top_up_amount,
                req.email
            ]
        )

        const today = new Date();
        let year = today.getFullYear();
        let month = today.getMonth() + 1;
        let date = today.getDate();
        let mls = today.getMilliseconds();

        await connection.promise().query(
            `INSERT INTO transaction (invoice_number, transaction_type, description, total_amount, email) 
                VALUES (?, ?,?, ?,?)`,
            ['INV'+date+month+year+'-'+mls, 'TOPUP', 'Top Up Balance',req.body.top_up_amount,req.email]
        );

        var user = await connection.promise().query(`SELECT balance FROM users where email = ?`, [req.email]); 

        res.status(200).json({
            status : 0,
            message : "Top Up Balance berhasil",
            data : user[0][0]
        })

    } catch (error) {
        res.status(500).json({
            status : 500,
            message : error
        })
    }
}

export const UpdateProfile = async(req, res) => {
    try {
        await connection.promise().query(`UPDATE users set first_name = ?, last_name = ? where email = ?`,
            [
                req.body.first_name,
                req.body.last_name,
                req.email
            ]
        )

        const user = await connection.promise().query(`SELECT email,first_name,last_name,profile_image FROM users where email = ?`, [req.email]); 

        res.status(200).json({
            status : 0,
            message : "Update Pofile berhasil",
            data : user[0][0]
        })

    } catch (error) {
        res.json({msg:error});
    }
}

export const uploadImageProfile = async(req, res) => {
    if(req.files === null) return res.status(400).json({msg: "Silahkan Pilih File Untuk di unggah"});
    
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = ['.png','.jpeg'];
 
    if(!allowedType.includes(ext.toLowerCase()))
    {
        res.status(400).json({
            status : 102,
            message: "Format Image tidak sesuai",
            data: null
        });
        return ;
    } 
        
    if(fileSize > 5000000)
    {
        res.status(400).json({
            status : 102,
            message: "ukuran file upload harus di bawah 5 MB",
            data: null
        });
        return ;
    }
        
 
    file.mv(`./public/images/${fileName}`, async(err)=>{
        if(err) return res.status(500).json({msg: err.message});
        try {

            await connection.promise().query(`UPDATE users set profile_image = ? where email = ?`,
                [
                    fileName,
                    req.email
                ]
            )

            const user = await connection.promise().query(`SELECT email,first_name,last_name,profile_image FROM users where email = ?`, [req.email]); 

            res.status(200).json({
                status: 0,
                message: "Update Profile Image berhasil",
                data : user[0][0]
            });
        } catch (error) {
            console.log(error.message);
        }
    })

    // try {
    //     await connection.promise().query(`UPDATE users set first_name = ?, last_name = ? where email = ?`,
    //         [
    //             req.body.first_name,
    //             req.body.last_name,
    //             req.email
    //         ]
    //     )

    //     const user = await connection.promise().query(`SELECT email,first_name,last_name,profile_image FROM users where email = ?`, [req.email]); 

    //     res.status(200).json({
    //         status : 0,
    //         message : "Update Pofile berhasil",
    //         data : user[0][0]
    //     })

    // } catch (error) {
    //     res.json({msg:error});
    // }
}