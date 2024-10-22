import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import connection from '../config/Database.js';
import Joi from 'joi';
import emailValidator from 'deep-email-validator';
import path from "path";

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