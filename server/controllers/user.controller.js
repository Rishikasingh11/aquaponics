const { Op } = require("sequelize");
const db = require("../models");
const User = db.user;

exports.assignRole = async (req, res) => {
  const { userId, roleName } = req.params;

  try {
    // Check if the user exists
    const user = await db.user.findByPk(userId);
    if (!user) {
      return res.status(404).send({ message: "User not found!" });
    }

    // Check if the role exists
    const role = await db.role.findOne({ where: { name: roleName } });
    if (!role) {
      return res.status(404).send({ message: "Role not found!" });
    }

    // Assign the role to the user
    await user.addRole(role);

    res.status(200).send({ message: `Role ${roleName} assigned successfully to the user!` });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Controller function to fetch users by partial email
exports.fetchUsersByEmailPartial = async (req, res) => {
  const { emailPartial } = req.query;

  try {
    const users = await User.findAll({
      where: {
        email: {
          [Op.like]: `%${emailPartial}%`
        }
      },
      attributes: ['id', 'email'], // Specify the attributes to include
      limit: 5 // Limit the results to at most 5 users
    });

    if (users.length === 0) {
      return res.status(404).send({ message: "No users found with matching email!" });
    }

    res.status(200).send(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};

exports.userBoard = (req, res) => {
  const username = req.params.username;
  res.status(200).send(`"Hello User ${username}"`);
};

exports.adminBoard = (req, res) => {
  const username = req.params.username;
  res.status(200).send(`"Hello Admin ${username}"`);
};

exports.managerBoard = (req, res) => {
  const username = req.params.username;
  res.status(200).send(`"Hello Manager ${username}"`);
};

