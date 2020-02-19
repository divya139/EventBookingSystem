const User = require("../../models/User");
const UserSession = require("../../models/UserSession");

module.exports = app => {
  //API to logout
  //Makes User Session token invalid
  app.get("/api/account/logout", (req, res, next) => {
    //get the token and verify
    const { query } = req;
    const { token } = query;

    UserSession.findOneAndUpdate(
      {
        _id: token,
        isActive: true
      },
      {
        $set: { isActive: false }
      },
      null,
      (err, sessions) => {
        if (err) {
          return res.send({
            success: false,
            message: "Error: Server Error"
          });
        }

        return res.send({
          success: true,
          message: "Logged Out Successfully!"
        });
      }
    );
  });
};
