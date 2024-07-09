import db from '../config/db.js';

export default class UserModel {
    static async signUp(username, password) {
        // in : username , hashpassword
        //out : user_id , error
        return new Promise((resolve, reject) => {
            db('Users').select('userName')
                .where('userName', username)
                .then(rows => {
                    if (!rows.length) {
                        return db('Users').insert({ userName: username, password: password })
                            .then(result => {
                                if (result) {
                                    return db('Users').select('user_id').where('userName', username)
                                        .then(rows => {
                                            resolve({ userId: rows[0].user_id })
                                        }).catch(error => {
                                            reject(error);
                                        })
                                } else {
                                    reject('The username or password incurrect');
                                }
                            })
                            .catch(error => {
                                reject(error)
                            })

                    } else {
                        reject('The username or password incurrect');
                    }
                })
                .catch(error => {
                    reject(error)
                })
        })
    }
    static async login(username) {
        // in : username , hashpassword
        //out : rows
        return new Promise((resolve, reject) => {
            db('Users').select('userName', 'user_id','password')
                .where('userName', username)
                .then(rows => {
                    resolve(rows)
                })
                .catch(error => {
                    reject(error)
                })
        })
    }

    static async deleteAccount(user_id) {
        //in :  username , userId from token in controller
        //out : result of process 
        return new Promise((resolve, reject) => {
            db('Users').delete()
                .where('user_id', user_id)
                .then(result => {
                    resolve(result)
                })
                .catch(error => {
                    reject(error);
                })
        })
    }
}
