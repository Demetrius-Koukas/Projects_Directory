const express = require('express');
const ejs = require('ejs');
const mongoose = require ('mongoose');
const path = require('path');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const Directory = require('./model/directory');

mongoose.connect('mongodb+srv://admin-dimitris:testDB123@cluster0.xw0cl.mongodb.net/projectsIB');
const app = express();




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
        owner: req.body.owner,
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
            owner: req.body.owner,
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




