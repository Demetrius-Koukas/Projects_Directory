const express = require('express');
const ejs = require('ejs');
const mongoose = require ('mongoose');
const path = require('path');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const Directory = require('./model/directory');
const { redirect } = require('express/lib/response');
mongoose.connect('mongodb+srv://admin-dimitris:testDB123@cluster0.xw0cl.mongodb.net/projectsIB');
const app = express();
const Schema = mongoose.Schema;

const directorySchema = new Schema({
    name: String,
    address: String,
    owner: [
         {
            firstname: String,
            surname: String,
        }
    ],

    projectManager: String,
    subcontractors: [
        {
        plumber: String,
    },
    { 
        electrical: String,
    },
    {
        mechanical: String,
    }
],

startingDate: Date,
endingDate: Date,
estimate: String,
collectedAmount: String,
changeOrder: String,
architect: String

});


const Directory = mongoose.model('Directory', directorySchema);

const directory = new Directory ({
    name: "40 East 88th Street, Apt3A",
    address: "40 East 88th Street, Apt3A",
    estimate:610.291,
    startingDate:18/10/2021,
    endingDate: 31/05/2022,
    collectedAmount: 612.694,
    changeOrder: 55.991
})





app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));


/// index with all projects ///

app.get('/projects', async(req, res)=>{
    const projects = await Directory.find();
    res.render('projects/all', {projects});

})


/// list new projects ///

app.get("/projects/new", (req, res)=>{
    res.render('projects/new');
})

app.post('/projects', async(req, res)=>{
    const newProject = new Directory({
        name: req.body.name,
        address: req.body.address,
        projectManager: req.body.projectManager,
        estimate: req.body.estimate,
        collectedAmount: req.body.collectedAmount,
        changeOrder: req.body.changeOrder,
        architect: req.body.architect,
        startingDate: req.body.startingDate,
        endingDate: req.body.endingDate
        
    })

    await newProject.save()

    res.redirect('projects')
})

/// show details for selected project ///

app.get('/projects/:id', async(req, res)=>{
    
    const selectedProject = await Directory.findById(req.params.id);
    res.render('projects/select', {selectedProject});
})


/// edit the submitted forms ///

app.get ('/projects/:id/edit', async(req, res)=>{
    const selectedProject = await Directory.findById(req.params.id);
  
    res.render('projects/edit', {selectedProject});

});

app.put ('/projects/:id', async(req, res) =>{
    // res.send('It worked!!!!');
    const editedProject = await Directory.findByIdAndUpdate(req.params.id, 
        {
            name: req.body.name,
            address: req.body.address,
            projectManager: req.body.projectManager,
            estimate: req.body.estimate,
            collectedAmount: req.body.collectedAmount,
            changeOrder: req.body.changeOrder,
            architect: req.body.architect,
            startingDate: req.body.startingDate,
            endingDate: req.body.endingDate
        
        }, 
            {new:true});
    res.redirect(`/projects/${editedProject._id}`)
    

})

/// delete existing projects ///

app.delete('/projects/:id', async(req, res)=>{
    const deletedProject = await Directory.findByIdAndDelete(req.params.id);
    res.redirect('/projects');
})




let port = process.env.PORT;
if(port==null || port == ""){
    port = 3000;
}

app.listen(port, ()=>{
    console.log('Server started!')
})




