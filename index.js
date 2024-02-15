const {sequelize,users,posts} = require("./models")

const express = require("express")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cors())

app.post("/users",async(req,res) => {
    try {
       const {id} =req.body
        const user = await users.findOne({
            where:{
                id
            }
        })

        if(user){
            res.status(200).json({msg:"user already created"})
        }else{
         
            const data = await users.create(req.body)

            res.status(200).json({
                msg:"user added successfully"
            })

        }

       

    } catch (error) {
        res.send(error.message)
    }
})


app.get("/users",async(req,res) =>{
    try {
        const data = await users.findAll()
        res.status(200).json({data})
    } catch (error) {
        res.send(error.message)
    }
})

app.post("/posts", async (req,res) => {
     try {
        const data = await posts.bulkCreate(req.body)
        res.status(200).json({msg:"post added successfully"})
     } catch (error) {
        res.send(error.message)
     }
})

app.get("/posts",async(req,res) =>{
    try {
        const data = await posts.findAll()
        res.status(200).json({data})
    } catch (error) {
        res.send(error.message)
    }
})


sequelize.sync().then(()=>{
    app.listen(8080,()=>{
        console.log("Server Started")
    });
})


