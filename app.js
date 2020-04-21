const express = require('express');
const MongoClient = require('mongodb')

const app = express()

let db;
let todo;

MongoClient.connect("mongodb://localhost:27017/employeelist", 
{ useUnifiedTopology: true }, (error, client)=>{
    if(!error){
      console.log("DB Connected");
       db = client.db('employeelist')
       todo = db.collection('Todo')
    } else{
      console.log("DB not connected")
    }
});



app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

const employee = [
  {
    employeeID: "ESC666",
    name: "William Aboagye",
    position: "Finance Manager"
  },
  {
    employeeID: "ESC667",
    name: "Samuel Affum",
    position: "IT Manager"
  },
  {
    employeeID: "ESC668",
    name: "Thomas Lea",
    position: "Production Manager"
  },
  {
    employeeID: "ESC669",
    name: "Manuela Sika",
    position: "HR Manager"
  }

]

app.get('/',  (req, res) => {
  res.render('workers forum', {employee
  });
})

app.get('/todolist', async (req, res) => {
 const todolist = await todo.find({}).toArray()
 console.table(todolist)
  res.render('todolist', {
    todolist
  });
})

app.post('/todolist', async (req, res) =>{
let info = {
 name: req.body.name, 
employeeID: req.body.employeeID
};
const todolist = await todo.insertOne(info);
res.redirect('/todolist')  
});
  
const port = 3300 
app.listen(port,()=>{
    console.log("running on port " +port)
});

