const roleMiddleware = (allowedRoles) =>{
    return(req,res,next)=>{

        if(!req.user){
            return res.status(401).send({
                message:"user not authenticated"
            });
        }

        if(!allowedRoles.includes(req.user.role)){
            return res.status(403).send({
                message:"Access denied"
            });
        }

        next();
    };
};

module.exports = roleMiddleware;