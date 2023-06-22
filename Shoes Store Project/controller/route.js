app.get("/api/users",(req,res)=>{
    const pagenumber=parseInt(req.query.page)||1;
    const pagesize=10;
    Product.paginate({},{page:pagenumber,limit:pagesize})
    .then((result)=>{
        const { docs,total,limit,page,pages}=result;
        res.json({products:docs,total,limit,page,pages});
    })
    .catch((error)=>{
        console.log(error);
        res.status(500).json({message:'error occured while fetching users'});
        });
});