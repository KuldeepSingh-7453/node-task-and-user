const express = require('express');
const Sequelize = require('sequelize');
const route = new express.Router();
// require('mysql')
// const userRoute = require('./user_route');

const connection = new Sequelize('mydbdata', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});
connection.sync()

const port = 3200;

const app = express();

app.use(express.json());

app.use(route);

const todo = connection.define("todos",{

    task:Sequelize.STRING

})


//Creating A User
route.post('/todo', async (req,res) => {

    try {
        todo.create(req.body).then((data) => {

            // console.log(data);
            res.send(data);
    
        })
    } catch (error) {
       console.log('Error')
       res.send(error) 
    }

})

//Deleting A Task
route.delete('/todo/:id', async (req,res) => {

    try {
        
        const value = await todo.destroy({ where: { id: req.params.id } })
        .then(() => {res.send(value);})
        .catch((e) => { res.send(e)});
        
  
    }
    catch (error) {

        res.send(error);
        
    }



})


//Updating the user
route.patch('/todo/:id', async (req, res) => {

    try {
        
        const value = await todo.findOne({ where: { id: req.params.id } });

        if(!value){
            throw new Error('Sorry');
        }

        value.update({
            task:req.body.task
        }).then((value) => {
            console.log('Value Updated');
            res.send('Data Updated' + value)
        })
  
    }
    catch (error) {

        res.send(error);
        
    }

})


//Getting all users
route.get('/todos', async (req,res) => {

    try {
        todo.findAll().then((data) => {

            // console.log(data);
            res.send(data);
    
        })
    } catch (error) {
       console.log('Error')
       res.send(error) 
    }

})


// module.exports = user;

app.listen(port, () => {

    console.log('Connected to the server');

})