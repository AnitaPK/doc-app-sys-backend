const Appointment = require("../models/appointmentModel");

function createAppointment(req, res) {
  try {
    const {dateTime, doctorId} = req.body 
     createdBy = req.user.id

     const newAppoint = Appointment.create({dateTime, doctorId,createdBy})
    if(!newAppoint){
    res.status(200).send({ msg: "appointment not created", success:false });
    }
    res.status(200).send({ msg: "appointment created successfully", success:true });
  } catch (error) {
    res.status(500).send({ msg: "Server Error" });
  }
}

async function statusUpdateByDoctor(req, res) {
    const {ID} = req.params
    console.log(ID,"________id_______")
  try {
    const updatedAppointment = await Appointment.update({
        status:req.body.status,
        updatedBy:req.user.id
    },{
        where:{id:ID}
    })
    console.log(updatedAppointment,"updatedAppointment")
    if(updatedAppointment.length == 0){
    res.status(200).send({ msg: "appointment not updated", success:false });
    }
    res.status(200).send({ msg: "appointments status updated successfully",success:true });
  } catch (error) {
    res.status(500).send({ msg: "Server Error" });
  }
}

function updateAppointment(req, res) {
  try {
    res.status(200).send({ msg: "appointments updated successfully" });
  } catch (error) {
    res.status(500).send({ msg: "Server Error" });
  }
}

function deleteAppointment(req, res) {
  try {
    res.status(200).send({ msg: "appointments deleted successfully" });
  } catch (error) {
    res.status(500).send({ msg: "Server Error" });
  }
}

async function getAppointmentsByUser(req, res) {
  try {
    const appointments =await Appointment.findAll({
        where:{createdBy: req.user.id}
    })
    if(appointments.length == 0){
        res.status(400).send({msg:"No appointments yet"})
    }
    res.status(200).send({ appointments:appointments,success:true });
  } catch (error) {
    res.status(500).send({ msg: "Server Error" });
  }
}

async function showAppointmentsOfDoctor(req, res) {
  try {
    // req.userid (docotr id )

     const appointments =await Appointment.findAll({
        where:{doctorId: req.user.id}
    })
    if(appointments.length == 0){
        res.status(400).send({msg:"No appointments yet"})
    }
    res.status(200).send({ appointments:appointments,success:true });

  } catch (error) {
    res.status(500).send({ msg: "Server Error" });
  }
}

module.exports = {
  createAppointment,
  statusUpdateByDoctor,
  updateAppointment,
  deleteAppointment,
  getAppointmentsByUser,
  showAppointmentsOfDoctor,
};
