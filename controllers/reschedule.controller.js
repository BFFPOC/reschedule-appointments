const rp = require('request-promise');
const rescheduleAppointment = (req, res, next) => {
  if (checkingForValidParams(req)) {
    var options = {
      method: 'PUT',
      url: 'https://appointmentserviceapp-1591774967422.azurewebsites.net/reschedule',
      headers: {
        "Content-Type": "application/json",
        "X-correlationid": req.get('X-correlationId')
      },
      body: {
        "id": req.body.id,
        "token": req.headers.authorization,
        "appointmentSlot": req.body.appointmentSlot

      },
      json: true
    };
    rp(options)
      .then(function (response) {
        var successObject = {
          "statusCode": 200,
          "Message":  "Rescheduled "
        }
        res.send(successObject)
      })
      .catch(function (err) {

        var errorObject = {
          "statusCode": err.statusCode,
          "Message": err.error.message ? err.error.message : "Some error occured with the service"
        }
        res.send(errorObject);

      })
  }
  else {
    var errorObject = {
      "statusCode": 400,
      "Message": "Missing Input"
    }
    res.send(errorObject);
  }

}
const checkingForValidParams = (req) => {
  const corelationid = req.get('X-correlationid');
  const token = req.headers.authorization;
  const appointmentSlot = req.body.appointmentSlot;
  if ((corelationid && corelationid != null) && (token && token != null) && (appointmentSlot && appointmentSlot != null)) {
    return true;
  } else {
    return false
  }
}



module.exports.rescheduleAppointment = rescheduleAppointment;