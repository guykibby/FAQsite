const jwt = require("jsonwebtoken");
const config = require("../config");

//JWT verification ideas compliments of https://github.com/auth0/node-jsonwebtoken/issues/288

const checkJWT = (req, res, next) => {
  const token = req.headers.token;
  console.log(typeof token);

  if (!token) {
    return res.status(401).json({ message: "Must have JWT." });
  }

  jwt.verify(token, config.secret, (err, verifiedJwt) => {
    if (err) {
      console.log(err.message);

      res.status(401).send(err.message);
    } else {
      next();
    }
  });

  // Verify the status of user's JWT.

  //   jwt.verify(token.replace(/^JWT\s/, ""), config.secret, (err, decoded) => {
  //     if (err) {
  //       console.log(decoded);

  //       // If status = expired, prompt user to login again.
  //       if (err.name === "TokenExpiredError") {
  //         return res.status(422).json({
  //           message:
  //             "JWT has expired. Please login again, this is for your security!",
  //         });
  //       }
  //       // If this can't be done return error message.
  //       return res.status(422).json({
  //         message: "JWT Verification Issue.",
  //       });
  //     }

  // // Find user in db and generate a new JWT.
  // User.findById(decoded.sub)
  //   .then((user) =>
  //     res.status(201).json({
  //       success: true,
  //       message: "JWT Refreshed.",
  //       token: `JWT ${generateToken(user)}`,
  //       user: setUserInfo(user),
  //     })
  //   )
  //   // If this can't be done return error message.
  //   .catch((error) =>
  //     res.status(401).json({
  //       success: false,
  //       message: "JWT Refresh Issue.",
  //       error,
  //     })
  //   );
  //   });
};

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNjY4NTczOTAyLCJleHAiOjE2Njg1NzQwODJ9.siVZKN6WG50jEol_Wf24L7LK70sW6PGMsrADp7aySLo

module.exports = checkJWT;
