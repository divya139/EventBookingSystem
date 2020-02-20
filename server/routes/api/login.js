const User = require("../../models/User");
const UserSession = require("../../models/UserSession");

module.exports = app => {
  /* LogIn */

  /*----API to verify login credentials----*/
  app.post("/api/account/login", (req, res, next) => {
    const { body } = req;
    const { password } = body;
    console.log(body);
    let { email } = body;
    if (!email) {
      return res.send({
        success: false,
        message: "Error: Email  cannot be blank!"
      });
    }
    if (!password) {
      return res.send({
        success: false,
        message: "Error: password cannot be blank!"
      });
    }
    email = email.toLowerCase();
    User.find(
      {
        email: email
      },
      (err, users) => {
        if (err) {
          console.log(err);
          return res.send({
            success: false,
            message: "Error: Server Error!"
          });
        }
        if (users.length != 1) {
          return res.send({
            success: false,
            message: "Error: Invalid User Name or Password !"
          });
        }
        const user = users[0];
        /*--verifying password--*/
        if (!user.validPassword(password)) {
          return res.send({
            success: false,
            message: "Error: Invalid User Name or Password!"
          });
        }
        /*--correct user with vaild password--*/
        const userSession = new UserSession();
        userSession.userId = user._id;
        userSession.save((err, doc) => {
          if (err) {
            return res.send({
              success: false,
              message: "Error: Server Error"
            });
          }

          return res.send({
            success: true,
            message: "Valid Login!",
            token: doc._id,
            data: user
          });
        });
      }
    );
  });

  /*----API to get token and verify----*/
  app.get("/api/account/verify", (req, res, next) => {
    /* get the token and verify */
    const { query } = req;
    const { token } = query;

    UserSession.find(
      {
        _id: token,
        isActive: true
      },
      (err, sessions) => {
        if (err) {
          return res.send({
            success: false,
            message: "Error: Server Error"
          });
        }
        if (sessions.length != 1) {
          return res.send({
            success: false,
            message: "Error: Invalid!"
          });
        }

        return res.send({
          success: true,
          message: "valid"
        });
      }
    );
  });
};
