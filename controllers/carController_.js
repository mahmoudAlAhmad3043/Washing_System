import CarModel from '../models/carsModel_.js';
import jwt from 'jsonwebtoken'; 
import { config } from 'dotenv';
import moment from 'moment';


// {
//     car_id:car_id,
//     car_plate,
//     car_size:car_size,
//     car_description:car_description
// }


class CarController{
    static async addCarCtrl(req,res){
        let token = req.headers.authorization.split(' ')[1];
        let car = req.body.car;
        config();
        try{
            let result = jwt.verify(token,process.env.SECRET_KEY);
            if(result.userId){
                await CarModel.addCar(car)
                .then(result=>{
                    if(result)
                        res.status(201).json({result:'Adding car successfully','data':{'car':result}})
                    else
                        res.status(404).json({result:'field',error:"Adding car field",data:[]})
                }).catch(error =>{
                    res.status(404).json({result:'field',error:error,data:[]})
                })
            }else{
                res.status(404).json({result:'field',error:'Adding car field',data:[]})
            }
        }catch{
            res.status(404).json({result:'field',error:'Adding car field',data:[]})
        }
    }

    static async editCarCtrl(req,res){
        let token = req.headers.authorization.split(' ')[1];
        let car = req.body.car;
        config();
        try{
            let result = jwt.verify(token,process.env.SECRET_KEY);
            if(result.userId){
                await CarModel.editCar(car)
                .then(result=>{
                    if(result)
                        res.status(200).json({result:'Editting car successfully','data':{'car':result}})
                    else
                        res.status(404).json({result:'field',error:"Editting car field",data:[]})
                }).catch(error =>{
                    res.status(404).json({result:'field',error:error,data:[]})
                })
            }else{
                res.status(404).json({result:'field',error:'Editting car field',data:[]})
            }
        }catch{
            res.status(404).json({result:'field',error:'Editting car field',data:[]})
        }
    }

    static async deleteCarCtrl(req,res){
        let token = req.headers.authorization.split(' ')[1];
        let car_id = req.params.car_id;
        config();
        try{
            let result = jwt.verify(token,process.env.SECRET_KEY);
            if(result.userId){
                await CarModel.deleteCar(car_id)
                .then(result =>{
                    if(result)
                        res.status(200).json({result:'Deletting car successfully','data':[]})
                    else
                        res.status(404).json({result:"Deletting car field",error:"Error",data:[]})
                }).catch(error=>{
                    res.status(404).json({result:"Deletting car field",error:error,data:[]})
                })
            }else{
                res.status(404).json({result:"Deletting car field",error:"Error",data:[]})
            }
        }catch{
            res.status(404).json({result:"Deletting car field",error:"Error",data:[]})
        }
    }

    static async getSellectedCarCtrl(req,res){
        let token = req.headers.authorization.split(' ')[1];
        let car_plate = req.params.car_plate;
        let car_description = req.params.car_description;
        let car = {
            car_id : null,
            car_plate : car_plate,
            car_size : "None",
            car_description:car_description
        }
        config();
        try{
            let result = jwt.verify(token,process.env.SECRET_KEY);
            if(result.userId){
                await CarModel.getSellectedCar(car)
                .then(result=>{
                    if(result){
                        res.status(200).json({result:"Successfully",data:{cars:result}})
                    }else{
                        res.status(404).json({result:"field",error:"Not found results",data:[]})
                    }
                }).catch(error=>{
                    res.status(404).json({result:"field",error:error,data:[]})
                })
            }else{
                res.status(404).json({result:"field",error:"Not found results",data:[]})
            }
        }catch{
            res.status(404).json({result:"field",error:"Not found results",data:[]})
        }    
    }
}


export default CarController