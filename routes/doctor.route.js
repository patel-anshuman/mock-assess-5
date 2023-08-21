const {DoctorModel} = require('../models/doctor.model');
const {Router} = require('express');

const doctorRouter = Router();

// Add doctor details
doctorRouter.post('/appointments', async (req,res) => {
    const {name,image,specialization,experience,location,date,slots,fee} = req.body;
    try {
        const payload = {name,image,specialization,experience,location,date,slots,fee};
        const doctor = new DoctorModel(payload);
        await doctor.save();
        res.status(200).json({msg: "Doctor data uploaded", data: doctor});
    } catch (err) {
        res.status(400).json({msg: err.message});
    }
});

// GET Doctor Dashboard All doctors with filter , sort
doctorRouter.get('/appointments', async (req,res) => {
    const {specialization, date, name, sort} = req.query;
    try {
        let query = {}, sortBy={};
        if(specialization){
            query.specialization = specialization;
        }
        if(date){
            query.date = date;
        }
        if(name){
            query.name = `/${name}/i`;
        }
        if(sort=='latest'){
            sortBy.date = -1;
        } else if('oldest') {
            sortBy.date = 1;
        }
        if(sort){
            const data = await DoctorModel.find(query).sort(sortBy);
            res.status(200).json({data: data});
        } else {
            const data = await DoctorModel.find(query);
            res.status(200).json({data: data});
        }
    } catch (err) {
        res.status(400).json({msg: err.message});
    }
});

doctorRouter.patch('/appointments/:id', async (req,res) => {
    const {id} = req.params;
    const payload = req.body;
    try {
        await DoctorModel.findByIdAndUpdate(id,payload);
        res.status(200).json({msg: "Data updated"});
    } catch (err) {
        res.status(400).json({msg: err.message});
    }
})

doctorRouter.delete('/appointments/:id', async (req,res) => {
    const {id} = req.params;
    try {
        await DoctorModel.findByIdAndDelete(id);
        res.status(200).json({msg: "Data deleted"});
    } catch (err) {
        res.status(400).json({msg: err.message});
    }
})



module.exports = doctorRouter;