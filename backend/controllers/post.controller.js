const activeCheck = async (req,res) => {
    res.status(200).json({message:"Running"})
}

export default activeCheck;


const register = async (req,res) => {
    try{
        const {name,email,password,userName} = req.body;
        if(!name || !email || !password || !userName ){
            res.status(400).json( {message :"user exist"} )
        }
    }
    catch(error){
        res.status(500).json({message:"something went wrong!",error})
    }

}