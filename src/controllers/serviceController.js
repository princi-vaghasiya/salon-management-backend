const Service = require("../models/Service");

const createService = async(req,res)=>{

    try{

        const result = await Service.create(req.body);

        res.status(201).send(result);

    }catch(err){

        res.status(500).send({
            message:err.message
        });

    }

}

const getAllService = async(req,res)=>{

    try{
        const result = await Service.find();

        res.status(201).send(result)

    }catch(err){
        res.status(500).send({
            message:err.message

        });
    }
};

const getServiceById = async(req,res)=>{

    try{

        const id = req.params.id

        const result = await Service.findById(id);

        if(!result){

            res.status(404).send({
                message:"user not found"
            })
        }

        res.status(200).send(result)

    }catch(err){

        res.status(500).send({
            message:err.message
        });
    }

};

const updateService = async(req,res)=>{


     try{
    const id = req.params.id

    const result = await Service.findByIdAndUpdate(
         id,
        req.body,
        {new:true}
    )

    if(!result){
        res.status(404).send({
            message:"user not found"
        })
    }

    res.status(200).send(result)
   
    }catch(err){

        res.status(500).send({
            message:err.message
        });
    }

};

const deleteService = async(req,res)=>{

    try{

    const id = req.params.id

    const result = await Service.findByIdAndDelete(id)

    if(!result){

        res.status(404).send({
            message:"user not found"
        })
    }

        res.status(200).send(result)

    }catch(err){
        res.status(500).send({
            message:err.message
        })
    }
};

module.exports = {
    createService,
    getAllService,
    getServiceById,
    updateService,
    deleteService
}
