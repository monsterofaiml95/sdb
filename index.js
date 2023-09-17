import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

mongoose.connect("mongodb+srv://Admin:Admi1234@cluster0.ivmippx.mongodb.net/SDB",{useNewUrlParser:true});
const connectionParams={userNewUrlParser:true,useUnifiedTopology:true,};
mongoose
// .connect(dbUrl,connectionParams)
// .then(()=>{
//     console.log("Connected to the Atlas");
// })
// .catch((e)=>{
// console.log("Error",e);
// });
const studentNameSchema= new mongoose.Schema({
    Name:String,
    RollNo:Number,
    Status:String,
    FatherName:String
});
const Student = new mongoose.model("Student",studentNameSchema);

const app= express();
const port =3000;
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", (req, res) => {

    res.render("index.ejs",{name:student});
    });
 
    app.post("/submit",  async(req, res) => {
        const rollno = req.body.input;
        console.log(rollno);
       
        try {
             const student = await Student.findOne({ RollNo: rollno }).select("Name RollNo Status FatherName");
            console.log(student);
            res.render("index.ejs", { name: student });
        } catch (err) {
            console.error(err);
            res.status(500).send("Internal Server Error");
        }
    });
app.listen(port,()=>{
    console.log(`Listen on port ${port}`);
});