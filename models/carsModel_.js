import db from '../config/db.js';

class CarModel {
    // {
    //     car_id:car_id,
    //     car_size:car_size,
    //     car_description:car_description
    // }
    static async addCar(car) {
        return new Promise((resolve,reject)=>{
            db('Cars').select('car_plate')
            .where('car_plate','like',`%${car.car_plate}%`)
            .then(rows => {
                if(!rows.length){
                    return db('Cars').insert(car)
                    .then(result =>{
                        if(result){
                            return db('Cars')
                            .select('*')
                            .where('car_plate',car.car_plate)
                            .then(row =>{
                                if(row)
                                    resolve(row);
                                else
                                    reject("Adding car field");
                            }).catch(error =>{
                                reject(error);
                            })
                        }else{
                            reject("Adding car field");
                        }
                    }).catch(error =>{
                        reject(error);
                    })
                }else{
                    db('Cars').select('*')
                    .where('car_plate','like',`%${car.car_plate}%`)
                    .then(car=>{
                        resolve(car)
                    }).catch(error=>{
                        reject(error);
                    })
                }
            }).catch(error=>{
                reject(error)
            })
        })
    }

    static async editCar(car) {
        return new Promise((resolve, reject) => {
            db('Cars').where('car_id',car.car_id).update(
                car
            )
                .then((result) => {
                    if (result) {
                        return db('Cars')
                            .select('*')
                            .where('car_id', car.car_id)
                            .then(result => {
                                if (result) {
                                    resolve(result);
                                } else {
                                    reject("updated car field");
                                }
                            }).catch(err => {
                                reject(err);
                            })
                    } else {
                        reject("created car field")
                    }
                })
                .catch(error => {
                    reject(error);
                })
        })
    }

    static async deleteCar(car_id) {
        return new Promise((resolve, reject) => {
            db('Cars').delete().where('car_id', car_id)
                .then((result) => {
                    resolve(result);
                })
                .catch((error) => {
                    reject(error);
                })
        })
    }

    static async getSellectedCar(car) {
        // 'column', 'like', `%${searchTerm}%`
        return new Promise((resolve,reject)=>{
            db('Cars').select('*')
            .where('car_plate','like',`%${car.car_plate}%`)
            .orWhere('car_description','like',`%${car.car_description}%`)
            .then(result=>{
                resolve(result);
            })
            .catch(error=>{
                reject(error);
            })
        })
    }
}


export default CarModel;