const handleRegister=(req,res,db,bcrypt,saltRounds)=>{
    const {name,email,password}=req.body;
    if(!name||!email||!password)
    return res.status('400').json("incorrect form submission");
    const hash = bcrypt.hashSync(password, saltRounds);
    db.transaction(trx=>{
        trx.insert({
            email:email,
            password:hash,
        }).into('login').returning('email')
        .then(loginEmail=>{

            return trx('users').returning('*').insert({
                email:loginEmail[0],
                name:name,
                joined:new Date(),})
                .then(user=>res.json(user[0]))
                .catch(trx.rollback)
                

        }).then(trx.commit);
    }).catch(err=>res.status(400).json('unable to register'));
    
     
}

module.exports= {handleRegister:handleRegister};