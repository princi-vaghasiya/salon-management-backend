const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const createUser = async(req,res)=>{

    try{

        const hashedPassword = await bcrypt.hash(req.body.password,10);
        req.body.password = hashedPassword;;

        
        const result = await User.create(req.body);

        res.status(201).send(result);

    }catch(err){

        res.status(500).send({
            message:err.message
        });

    }

}

const getAllUser= async(req,res)=>{

    try{
        const result = await User.find().select('-password');

        res.status(201).send(result)

    }catch(err){
        res.status(500).send({
            message:err.message

        });
    }
};

const getUserById = async(req,res)=>{

    try{

        const id = req.params.id

        const result = await User.findById(id);

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

const updateUser = async(req,res)=>{


    try{

    const id = req.params.id

    if(req.body.password){
        const hashedPassword = await bcrypt.hash(req.body.password,10);
        req.body.password = hashedPassword;
    }

    const result = await User.findByIdAndUpdate(
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

const deleteUser = async(req,res)=>{

    try{

    const id = req.params.id

    const result = await User.findByIdAndDelete(id)

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

const loginUser = async (req, res) => {

    try {

        const user = await User.findOne({
            email: req.body.email
        });

        if (!user) {
            return res.status(404).send({
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(
            req.body.password,
            user.password
        );

        if (!isMatch) {
            return res.status(401).send({
                message: "Invalid Password"
            });
        }

        const token = jwt.sign({
            id:user._id,
            role:user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "4d"
        }
    );


        res.status(200).send({
            message: "Login Successful",
            token: token
        });

    } catch (err) {

        res.status(500).send({
            message: err.message
        });

    }
};

module.exports = {
    loginUser,
    createUser,
    getAllUser,
    getUserById,
    updateUser,
    deleteUser
}
