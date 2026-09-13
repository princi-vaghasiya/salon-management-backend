const Customer = require('../models/Customer');

const createCustomer  = async(req,res)=>{

    try{

    const result = await Customer.create(req.body);

    res.status(201).send(result);

    }catch(err){

        res.status(500).send({ 
        message:err.message

        });
    }
};


const getAllCustomers = async(req,res)=>{

    try{

    const result = await Customer.find();

    res.status(200).send(result);

    }catch(err){
        res.status(500).send({
            message:err.message
        });
    }
};

const getCustomerById = async(req,res)=>{

    try{

    const id = req.params.id; 

    const result = await Customer.findById(id);

    if(!result){

        return res.status(404).send({
            message:"customer not found"
        });   

    }
    res.status(200).send(result);
    
    }catch(err){
        res.status(500).send({
            message:err.message
        });
    }
};

const updateCustomer = async(req,res)=>{

    try{

    const id = req.params.id;

    const result = await Customer.findByIdAndUpdate(
        id,
        req.body,
        {new:true}
    );

    if(!result){

     return res.status(404).send({
        message:"customer not found"
     });

    }

     res.status(200).send(result);

    }catch(err){
        res.status(500).send({
            message:err.message
        });
    }

};

const deleteCustomer = async(req , res)=>{

    try{

    const id = req.params.id;

    const result = await Customer.findByIdAndDelete(id)

    if(!result){
        return res.status(404).send({
            message:"customer not found"
        })
    }

    res.status(200).send({
        message:"customer deleted Successfully",
        deleteCustomer:result
    });

    }catch(err){
        res.status(500).send({
            message:err.message
        });
    }
};

module.exports = {
    createCustomer,
    getAllCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer,
}

