const User = require("../../models/User");

module.exports = app => {
  //API to get vendor names
  app.get("/api/vendor/getVendor", (req, res, next) => {
    const { query } = req;
    const { id } = query;
    User.find(
      {},
      {
        firstName: false,
        lastName: false,
        email: false,
        password: false,
        role: false,
        isActive: false
      }
    ).distinct("company", (err, result) => {
      if (err) {
        return res.send({
          success: false,
          message: "Error: Server Error"
        });
      }
      return res.send({
        success: true,
        data: result
      });
    });
  });
};
