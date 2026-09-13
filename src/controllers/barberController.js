const Barber = require('../models/Barber');

const createBarber = async(req,res)=>{

    try{

        const result = await Barber.create(req.body);

        res.status(201).send(result)

    }catch(err){
        res.status(500).send({
            message:err.message
        });
    }
};

const getAllBarbers = async(req,res)=>{

    try{
        const result = await Barber.find();

        res.status(201).send(result)

    }catch(err){
        res.status(500).send({
            message:err.message

        });
    }
};

const getBarberById = async(req,res)=>{

    try{

        const id = req.params.id

        const result = await Barber.findById(id);

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

const updateBarber = async(req,res)=>{


     try{
    const id = req.params.id

    const result = await Barber.findByIdAndUpdate(
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

const deleteBarber = async(req,res)=>{

    try{

    const id = req.params.id

    const result = await Barber.findByIdAndDelete(id)

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
    createBarber,
    getAllBarbers,
    getBarberById,
    updateBarber,
    deleteBarber
}
