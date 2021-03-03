const Clarifai= require('clarifai');

const app = new Clarifai.App({
    apiKey: '85c182b597a54221b53c891b37dae806'
   });

const handleImageUrl=(req,res)=>{
    app.models.predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
    .then(data=>res.json(data))
    .catch(err=>res.statu('400').json("unable to work with api"));
}   

const handleImage=(req,res,db)=>{

    const {id}=req.body;
        db('users')
        .where('id', '=', id)
        .increment('entries',1)
        .returning('entries')
        .then(entries=>res.json(entries[0]))
        .catch(err=>res.json('cannot get entries'));

}

module.exports={
    handleImage:handleImage,
    handleImageUrl:handleImageUrl
}