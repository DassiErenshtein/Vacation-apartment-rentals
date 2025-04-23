import { configDotenv, decrypt } from "dotenv";
import Advertiser from "../models/Advertiser.js"
import Apartment from "../models/Apartment.js";
import nodemailer from 'nodemailer'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
export const register = async (req, res) => {
    const { email, password, phone, anotherPhone } = req.body;
    if (email && password && phone) {
        try {
            const existingAdvertiser = await Advertiser.find({ email: { $eq: email } });
            if (existingAdvertiser.length > 0) {
                return res.status(400).send({ error: "email exists" });
            }
        } catch (error) {
            return res.status(500).send({ error: "Database error during email validation" });
        }

        try {
            bcrypt.hash(password, 10, async (error, hash) => {
                if (error) {
                    return res.status(500).send({ error: error.message })
                }
                const newAdvertiser = new Advertiser({
                    email,
                    password: hash,
                    phone,
                    anotherPhone,
                    apartments: []
                });
                await newAdvertiser.save();
                const token = await jwt.sign(
                    { email, phone },
                    process.env.TOKEN,
                    { expiresIn: '1hr' })
                res.status(200).send({ message: "You have successfully registered.", token, advertiser: newAdvertiser });
            })
            //const jwtPass = jwt.sign(password, process.env.MY_SECRET);



        } catch (error) {
            return res.status(500).send({ error: "Error saving advertiser: " + error.message });
        }
    }
    else
        res.status(500).send({ error: "you didnot fill all the fields" })
}
export const login = async (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
        try {
            let x = await Advertiser.findOne({ "email": { $eq: email } })
            if (!x) {
                res.status(405).send({ error: "you need to register" })
            }
            bcrypt.compare(password, x.password, (err, result) => {
                if (err) {
                    // Handle error
                    return res.status(405).send({ error: "you need to register" });
                }

                if (result) {

                    console.log(x);
                    let phone = x.phone;
                    const token = jwt.sign(
                        { email, phone },
                        process.env.TOKEN,
                        { expiresIn: '1hr' })
                    return res.status(200).send({ message: "you're inside!", token, user: x })
                }
                // Passwords match, authentication successful

                else {
                    // Passwords don't match, authentication failed
                    return res.status(405).send({ error: "you need to register" });
                }
            })

        }
        catch (err) {
            res.status(500).send({ error: "couldnt connect, try later: " + err })
        }
    }
    else
        res.status(400).send({error:"Fill all the fields (email and password)"})
}

// # 200- בקשה הצליחה
// # 400- בקשה לא חוקית או שחסר בה מידע
// # 403- למשתמש אין הרשאת גישה
// # 404- נקודת הקצה אינה קיימת
// # 405- נקודת הקצה קיימת אך לא לסוג הבקשה
// # 500- שגיאה פנימית בשרת. יכולה להיגרם מבאג
// # 503- שרת לא זמין או עמוס

