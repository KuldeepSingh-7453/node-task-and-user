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

const user = connection.define("user",{

    name:Sequelize.STRING,
    email:Sequelize.STRING,
    password:Sequelize.STRING

})


//Creating A User
route.post('/user', async (req,res) => {

    try {
        user.create(req.body).then((data) => {

            // console.log(data);
            res.send(data);
    
        })
    } catch (error) {
       console.log('Error')
       res.send(error) 
    }

})

//Delete A User
route.delete('/user/:id', async (req,res) => {

    try {
        
        const value = await user.destroy({ where: { id: req.params.id } })
        .then(() => {res.send(value);})
        .catch((e) => { res.send(e)});
        
  
    }
    catch (error) {

        res.send(error);
        
    }



})


//Updating the user
route.patch('/user/:id', async (req, res) => {

    try {
        
        const value = await user.findOne({ where: { id: req.params.id } });

        if(!value){
            throw new Error('Sorry');
        }

        value.update({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password
        }).then(() => {
            console.log('Value Updated');
            res.send('Data Updated')
        })
  
    }
    catch (error) {

        res.send(error);
        
    }

})


//Getting all users
route.get('/users', async (req,res) => {

    try {
        user.findAll().then((data) => {

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

    console.log('Hello World!!!!!!');

})