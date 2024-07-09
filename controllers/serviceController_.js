import ServicesModel from '../models/servicesModel_.js';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

class ServiceController{
    static async addServiceCtrl(req,res){
        let token = req.headers.authorization.split(' ')[1];
        let service = req.body.service;
        config();
        try{
            let result = jwt.verify(token,process.env.SECRET_KEY);
            if(result.userId){
                await ServicesModel.addService(service)
                .then(result =>{
                    res.status(201).json({ result: 'Create service successfully', data: { 'invoice': result } })
                }).catch(error=>{
                    res.status(404).json({result:"field",error:error,data:[]})
                })
            }else{
                res.status(404).json({result:"field",error:"Create service field",data:[]})
            }
        }catch{
            res.status(404).json({result:"field",error:"Create service field",data:[]})
        }
    }

    static async editServiceCtrl(req,res){
        let token = req.headers.authorization.split(' ')[1];
        let service = req.body.service;
        config();
        try{
            let result = jwt.verify(token,process.env.SECRET_KEY);
            if(result.userId){
                await ServicesModel.editService(service)
                .then(result =>{
                    res.status(200).json({ result: 'update service successfully', data: { 'service': result } })
                }).catch(error=>{
                    res.status(404).json({result:"field",error:error,data:[]})
                })
            }else{
                res.status(404).json({result:"field",error:"update service field",data:[]})
            }
        }catch{
            res.status(404).json({result:"field",error:"update service field",data:[]})
        }
    }

    static async deleteServiceCtrl(req,res){
        let token = req.headers.authorization.split(' ')[1];
        let service_id = req.params.service_id;
        config();
        try{
            let result = jwt.verify(token,process.env.SECRET_KEY);
            if(result.userId){
                await ServicesModel.deleteService(service_id)
                .then(result =>{
                    if(result)
                        res.status(200).json({result:'Deletting service successfully','data':[]})
                    else
                        res.status(404).json({result:"Deletting service field",error:"Error",data:[]})
                }).catch(error=>{
                    res.status(404).json({result:"Deletting service field",error:error,data:[]})
                })
            }else{
                res.status(404).json({result:"Deletting service field",error:"Error",data:[]})
            }
        }catch{
            res.status(404).json({result:"Deletting service field",error:"Error",data:[]})
        }
    }

    static async getAllServicesCtrl(req,res){
        let token = req.headers.authorization.split(' ')[1];
        config();
        try{
            let result = jwt.verify(token,process.env.SECRET_KEY);
            if(result.userId){
                await ServicesModel.getAllServices()
                .then(result=>{
                    res.status(200).json({result:"Successfully",data:result})
                }).catch(error=>{
                    res.status(404).json({result:'field',error:error,data:[]})
                })
            }else{
                res.status(404).json({result:'field',error:"field",data:[]})
            }
        }catch{
            res.status(404).json({result:'field',error:"field",data:[]})
        }
    }

    static async getSellectedServiceCtrl(req,res){
        let token = req.headers.authorization.split(' ')[1];
        let searchWord = req.params.searchWord;
        config();
        try{
            let result = jwt.verify(token,process.env.SECRET_KEY);
            if(result.userId){
                await ServicesModel.getSellectedService(searchWord)
                .then(result=>{
                    res.status(200).json({result:"Successfully",data:result})
                }).catch(error=>{
                    res.status(404).json({result:'field',error:error,data:[]})
                })
            }else{
                res.status(404).json({result:'field',error:"field",data:[]})
            }
        }catch{
            res.status(404).json({result:'field',error:"field",data:[]})
        }
    }
}

export default ServiceController;