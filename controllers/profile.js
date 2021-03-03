const handleProfile=(req,res,db)=>{
    const {id}=req.params;
    let found=false;
    db.select('*').from('users').where('id',id).then(user=>{if(user.length)res.json(user[0])
    else
    res.status('400').json('not found');
    }).catch(err=>console.log(err));
}

module.exports={
    handleProfile:handleProfile
}