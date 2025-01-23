import Review from "../models/review.js";

export function addReview(req,res){
    if(req.user==null){
        res.status(401).json({
            message:"please login and try again",
        });
        return;
    }

    const data =req.body;

    data.name = req.user.firstName+" "+req.user.lastName;
    data.profilePicture = req.user.profilePicture;
    data.email = req.user.email;

    const newReview = new Review(data)

    newReview.save().then(()=>{
        res.json({message:"review added successfully"});
    }).catch(()=>{
        res.status(500).json({message:"review addition failed"})
    });
}

    export async function getReviews(req,res){

        const user =req.user;

        /* before add the await and async function
        if (user==null || user.role !="admin"){
            Review.find({isApproved :true}).then((reviews)=>{
                res.json(reviews);
            })
            return
        }
        if(user.role=="admin"){
            Review.find().then((reviews)=>{
                res.json(reviews);
            })
        }*/

        try{
            if(user.role=="admin"){
                const reviews = await Review.find();
                res.json(reviews);
            }else{
                const reviews = await Review.find({isApproved:true});
                res.json(reviews);
            }
        }catch(error){
            res.status(500).json({error:"failed to get reviews"});
        }
    }

    export function deleteReview (req,res){

        const email=req.params.email;

        if(req.user==null){
            res.status(401).json ({message:"please login and try again"});
            return
        }

        if(req.user.role =="admin"){
            Review.deleteOne
            ({email:email}).then(()=>{
                res.json({message:"review deleted successfully"})
            }).catch(()=>{
                res.status(500).json({message:"review deletion failed"});
            })
            return
        }

        if(req.user.role=="customer"){
            if(req.user.email==email){
                Review.deleteOne
                ({email:email}).then(()=>{
                    res.json({message:"review deleted successfully"});
        
                }).catch(()=>{
                    res.status(500).json({message:"review deletion failed"})
                });
        }else{
            res.status(403).json({message:"you are not authorized for perform this action"})
        }
      
    }
    }

    export function approveReview(req,res){
        const email=req.params.email;

        if(req.user == null){
            res.status(401).json ({message:"please login and try again"});
            return
        }

        if(req.user.role=="admin"){
            Review.updateOne({
                email:email,
            },{
                isApproved:true,
            }).then(()=>{
                res.json({message:"review approved successfully"});
            }).catch(()=>{
                res.status(500).json({error:"review approvel failed"});
                })
            }else{
                res.status(403).json({message:"you are not and admin. only admins can approve the reviews"})
            }
    }
    