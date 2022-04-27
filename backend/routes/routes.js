const express = require('express');
const router = express.Router();

const ObjectId = require('mongoose').Types.ObjectId;

const Employee = require('../models/employee.js');


// Get Api
router.get('/', (req, res)=> {
    Employee.find( (err, doc) =>{
        if(err){
            console.log('Error in Get Data'+err)
        }else{
            res.send(doc);
        }
    })
});

// Get Single Employee Api
router.get('/:id', (req, res)=> {
    if(ObjectId.isValid(req.params.id)){
        Employee.findById(req.params.id, (err, doc) =>{
            if(err){
                console.log('Error in Get Employee by id '+ err)
            }else{
                res.send(doc);
            }
        });
    }else{
        return res.status(400).send('No record found with id' + req.params.id)
    }
});

// Post Api
router.post('/', (req, res)=> {
    let emp = new Employee({
        name : req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary
    });

    emp.save( (err, doc)=>{
        if(err){
            console.log('Error in Post Data'+err)
        }else{
            res.send(doc);
        }
    })
});


// Put Api
router.put('/:id', (req, res)=> {
    if(ObjectId.isValid(req.params.id)){

        let emp = {
            name : req.body.name,
            position: req.body.position,
            office: req.body.office,
            salary: req.body.salary
        };

        Employee.findByIdAndUpdate(req.params.id, {$set :emp}, {new:true}, (err, doc) =>{
            if(err){
                console.log('Error in Update Employee by id '+ err)
            }else{
                res.send(doc);
            }
        });
    }else{
        return res.status(400).send('No record found with id' + req.params.id)
    }
});


// Delete Api
router.delete('/:id', (req, res)=> {
    if(ObjectId.isValid(req.params.id)){
        Employee.findByIdAndRemove(req.params.id, (err, doc) =>{
            if(err){
                console.log('Error in Delete Employee by id '+ err)
            }else{
                res.send(doc);
            }
        });
    }else{
        return res.status(400).send('No record found with id' + req.params.id)
    }
});

module.exports = router;
