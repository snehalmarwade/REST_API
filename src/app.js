const { application } = require("express");
const express = require("express");
const connectToDB = require("./db/conn");
const Student = require('./models/students')
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req,res)=>{
    res.send("Hello from the other side")
})

// change commit 

// create student data


// old method 
// app.post("/students",(req,res)=>{

//     const user =new Student(req.body)
//     console.log(req.body)                        //send the response 
//     // res.send("Hello from the other side")
//     user.save().then(() =>{                       // save the data to database
//         res.status(201).send(user);
//     }).catch((e) =>{
//         res.status(400).send(e);
//     })
   
// })
 

// through async await new method send the data and insert into database
app.post("/students", async (req,res)=>{
    try {
        const user =new Student(req.body);
        const createUser =await user.save();
        res.status(201).send(createUser);
    } catch (error) {
        res.status(400).send(e);
    }
})
//  Read the data of registered users

app.get("/students",async(req,res)=>{

    try {
        const studentsData = await Student.find();
        res.send(studentsData);
    } catch (error) {
        res.send(error)
    }
})

app.get("/students/:id", async (req,res)=>{

try {
    const _id = req.params.id;
    const dataStudents = await Student.findById(_id);
    if(!dataStudents){
        res.status(404).send()
    }else{
        res.send(dataStudents);
        console.log(dataStudents)
    }
    
} catch (error) {
    res.status(500).send(error);
}

})


app.get("/students/:name", async (req,res)=>{

    try {
        const name = req.params.name;
        const nameStudents = await Student.findById(name);
        if(!nameStudents){
            res.status(404).send()
        }else{
            res.send(nameStudents);
            console.log(nameStudents)
        }
        
    } catch (error) {
        res.status(500).send(error)
    }
    
    })

// update students by its Id

app.patch("/students/:id", async (req,res) =>{
    try {
        const _id =req.params.id;
        const updateStudents = await Student.findByIdAndUpdate(_id, req.body,{
            new :true
        });
        res.send(updateStudents);
    } catch (error) {
        res.status(400).send(error);
    }
})

// Delete students by its Id
app.delete("/students/:id", async (req,res) => {
    try {
        const id = req.params.id;
        const delteStudents = await Student.findByIdAndDelete(id);
        if(!id) {
            return res.status(400).send();
        } else {
            res.send(delteStudents);
        }

    } catch (error) {
        res.status(500).send(error);
    }
})



app.listen(port,() =>{
    console.log(`connection is setup at${port}`);
    connectToDB();
})