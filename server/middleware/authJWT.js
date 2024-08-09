require("dotenv").config();
const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.user;
const Event = db.event;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.userId = decoded.id;
    next();
  });
};

isUser = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "user") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Requires User Role!",
      });
    });
  });
};

isCurrentUser = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    if (req.params.username === user.username) {
      next();
    } else {
      res.status(403).send({
        message:
          "Access Denied! You are not allowed to access other users' pages.",
      });
    }
  });
};

isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Admin Role!",
      });
      return;
    });
  });
};

isManager = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "manager") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Requires Manager Role!",
      });
    });
  });
};

isManagerOrAdmin = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "manager") {
          next();
          return;
        }

        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Manager or Admin Role!",
      });
    });
  });
};

isEventAdmin = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    Event.findByPk(req.params.eventId).then((event) => {
      if (user.id === event.userId) {
        next();
      } else {
        res.status(403).send({
          message: "Access Denied! You are not allowed to manage this event.",
        });
      }
    });
  });
};

isEventAdminOrManager = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    Event.findByPk(req.params.eventId).then((event) => {
      if (user.id === event.userId) {
        next();
        return;
      } else {
        Manager.findOne({
          where: {
            userId: user.id,
            eventId: event.id,
          },
        }).then((manager) => {
          if (manager) {
            next();
            return;
          } else {
            res.status(403).send({
              message:
                "Access Denied! You are not allowed to manage this event.",
            });
          }
        });
      }
    });
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isUser: isUser,
  isCurrentUser: isCurrentUser,
  isAdmin: isAdmin,
  isManager: isManager,
  isManagerOrAdmin: isManagerOrAdmin,
  isEventAdmin: isEventAdmin,
  isEventAdminOrManager: isEventAdminOrManager,
};
module.exports = authJwt;
