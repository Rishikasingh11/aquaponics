const db = require("../models");
const Task = db.task;

exports.createTasks = (req, res) => {
    // Validate request
    if (!req.body.tasks || !Array.isArray(req.body.tasks)) {
      res.status(400).send({
        message: "Tasks must be an array!"
      });
      return;
    }
  
    // Map tasks to include eventId
    const tasks = req.body.tasks.map(task => ({
      ...task,
      eventId: req.params.eventId
    }));
  
    // Create Tasks in the database
    Task.bulkCreate(tasks)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || "Some error occurred while creating the Tasks."
        });
      });
  };  

exports.updateTaskStatus = (req, res) => {
  const id = req.params.taskId;

  Task.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Task status was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Task with id=${id}. Maybe Task was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Task with id=" + id
      });
    });
};

exports.getTasks = (req, res) => {
  const eventId = req.params.eventId;

  Task.findAll({ where: { eventId: eventId } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tasks with eventId=" + eventId
      });
    });
};
