const User = require("../../models/User");

module.exports = app => {
  /* Register */
  //API to create/save user details
  app.post("/api/account/register", (req, res, next) => {
    const { body } = req;
    const { firstName, lastName, password, role, company } = body;
    let { email } = body;
    if (!firstName) {
      return res.send({
        success: false,
        message: "Error: First name cannot be blank"
      });
    }
    if (!lastName) {
      return res.send({
        success: false,
        message: "Error: Last name cannot be blank"
      });
    }
    if (!email) {
      return res.send({
        success: false,
        message: "Error: Email  cannot be blank"
      });
    }
    if (!password) {
      return res.send({
        success: false,
        message: "Error: password cannot be blank"
      });
    }
    if (!role) {
      return res.send({
        success: false,
        message: "Error: Select role"
      });
    }
    email = email.toLowerCase();

    User.find(
      {
        email: email
      },
      (err, previousUser) => {
        if (err) {
          return res.send({
            success: false,
            message: "Error: Server Error"
          });
        } else if (previousUser.length > 0) {
          return res.send({
            success: false,
            message: "Error: Account Already Exists"
          });
        }

        // save the new user
        const newUser = new User();
        newUser.email = email;
        newUser.firstName = firstName;
        newUser.lastName = lastName;
        newUser.password = newUser.generateHash(password);
        newUser.role = role;
        newUser.company = company;
        newUser.save((err, user) => {
          if (err) {
            return res.send({
              success: false,
              message: "Error: Server Error"
            });
          }
          return res.send({
            success: true,
            message: "Registered Successfully!"
          });
        });
      }
    );
  });
};
