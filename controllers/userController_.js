import UserModel from '../models/userModel_.js';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import bcrypt from 'bcrypt';
import Joi from 'joi';

const passwordSchema = Joi.string().min(8).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required();
const userNameSchema = Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required();

export default class UserController {
    static async signUpCtrl(req, res) {
        res.setHeader('authorization', `Bearer ${null}`);
        //input
        let userName = req.body.userName;
        let password = req.body.password;
        // validation
        let { passworErr } = passwordSchema.validate(password);
        let { usernameErr } = userNameSchema.validate(userName);

        if (passworErr || usernameErr) {
            res.status(404).json({ result: 'field', error: 'password or username invalid', data: [] })
        }
        // hashing password
        bcrypt.hash(password, 10, async (err, hashPassword) => {
            if (err) {
                res.status(400).json({ result: 'field', error: 'Server side error!', data: [] })
            } else if (hashPassword) {
                // create user 
                await UserModel.signUp(userName, hashPassword)
                    .then(result => {
                        if (result) {
                            config();
                            const user = { userId: result, username: userName }
                            const token = jwt.sign(user, process.env.SECRET_KEY)
                            res.setHeader('authorization', `Bearer ${token}`);
                            res.status(201).json({ result: 'successfully', data: user.username })
                        }
                    })
                    .catch(error => {
                        res.status(400).json({ result: 'field', error: error, data: [] })
                    })
            }
        })
    }
    static async loginCtrl(req, res) {
        res.setHeader('authorization', `Bearer ${null}`);
        //input
        let userName = req.body.userName;
        let password = req.body.password;
        // validation
        let { passwordErr } = passwordSchema.validate(password);
        let { usernameErr } = userNameSchema.validate(userName);
        if (passwordErr || usernameErr) {
            res.status(404).json({ result: 'field', error: 'password or username incurrect', data: [] })
        }
        await UserModel.login(userName)
            .then(result => {
                if (result) {
                    config();
                    let user_id = null, userName = null, hashPassword = null;
                    result.forEach(row => {
                        user_id = row.user_id
                        userName = row.userName
                        hashPassword = row.password
                    })
                    bcrypt.compare(password, hashPassword, async (error, result) => {
                        if (error) {
                            res.status(404).json({ result: 'field', error: error, data: [] })
                        } else if (result) {
                            const user = { userId: user_id, username: userName }
                            const token = jwt.sign(user, process.env.SECRET_KEY)
                            res.setHeader('authorization', `Bearer ${token}`);
                            res.status(200).json({ result: 'successfully', data: user.username })
                        }
                    });
                } else {
                    res.status(404).json({ result: 'field', error: error, data: [] })
                }
            })
            .catch(error => {
                res.status(400).json({ result: 'field', error: error, data: [] })
            })
    }
    static async deleteAccountCtrl(req, res) {
        // input:
        let token = req.headers.authorization.split(' ')[1].split(' ')[1];
        console.log(token);
        try {
            config();
            let result = jwt.verify(token, process.env.SECRET_KEY)
            if (result) {
                await UserModel.deleteAccount(result.userId)
                    .then(result => {
                        res.status(200).json({ result: 'Deleted account successfully', data: [{ 'result': result }] })
                    }).catch(() => {
                        res.status(404).json({ result: 'field', error: 'deleted account field', data: [] })
                    })
            }
        }
        catch {
            res.status(404).json({ result: 'field', error: 'deleted account field', data: [] })
        }
    }
}

