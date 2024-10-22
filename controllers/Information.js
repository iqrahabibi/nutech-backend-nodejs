import connection from '../config/Database.js';

export const banner = async(req, res) => {
    try {
        const banner = await connection.promise().query(`SELECT banner_name,banner_image,description FROM banner;`); 

        res.json({
            status : 0,
            message : "Sukses",
            data : banner[0]
        })

    } catch (error) {
        res.json({msg:error});
    }
}

export const services = async(req, res) => {
    try {
        const services = await connection.promise().query(`SELECT service_code,service_name,service_icon,service_tarif FROM services;`); 

        res.json({
            status : 0,
            message : "Sukses",
            data : services[0]
        })

    } catch (error) {
        res.json({msg:error});
    }
}