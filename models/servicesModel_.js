import db from '../config/db.js';

class ServicesModel{
    static async addService(service){
        return new Promise((resolve,reject)=>{
            db('Services').insert(service)
            .then(result =>{
                if(result){
                    return db('Services').select('*')
                    .where('service_id',function () {
                        this.select(db.raw('max(service_id)')).from('Services');
                    }).then(result =>{
                        if(result) {console.log(result);resolve(result);}
                        else {console.log('dss');reject("create service field")};
                    }).catch(error =>{
                        console.log(error);
                        reject(error);
                    })
                }else{
                    console.log('dswa')
                    reject("create service field")
                }
            }).catch(error =>{
                reject(error);
            })
        })
    }

    static async editService(service){
        return new Promise((resolve,reject)=>{
            db('Services').update(service)
            .where('service_id',service.service_id)
            .then(result =>{
                if(result){
                    return db('Services').select('*')
                    .where('service_id',service.service_id)
                    .then(result =>{
                        if(result) resolve(result);
                        else reject("update service field");
                    }).catch(error =>{
                        reject(error);
                    })
                }else{
                    reject("update service field")
                }
            }).catch(error =>{
                reject(error);
            })
        })
    }

    static async deleteService(service_id){
        return new Promise((resolve,reject)=>{
            db('Services').delete()
            .where('service_id',service_id)
            .then(result =>{
                if(result) resolve(result);
                else reject("delete service field")
            }).catch(error =>{
                reject(error);
            })
        })
    }

    static async getAllServices(){
        return new Promise((resolve,reject)=>{
            db('Services').select('*')
            .then(result =>{
                resolve(result);
            }).catch(error=>{
                reject(error);
            })
        })
    }

    static async getSellectedService(searchWord){
        return new Promise((resolve,reject)=>{
            db('Services').select('*')
            .where('service_name','like',`%${searchWord}%`)
            .orWhere('service_description','like',`%${searchWord}%`)
            .then(result=>{
                console.log(result)
                resolve(result);
            }).catch(error=>{
                reject(error);
            })
        })
    }
}

export default ServicesModel;