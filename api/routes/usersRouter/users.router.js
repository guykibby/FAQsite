const express = require("express");
const router = express.Router();

router.use("/", (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existingEmail = await repository.checkEmail(email);

    if (existingEmail.length > 0) {
      const error = new Error("Email already exists");
      error.status = 400;
      throw error;
    }

    //

    //create salt and hash to encrypt the password
    const hashedPassword = bcrypt.hashSync(password, 12);
    console.log(hashedPassword);

    const result = await repository.postNewUser(name, email, hashedPassword);
    // console.log(result);
    // newUser.password = hashedPassword;
    // const savedUser = await newUser.save();
    // // create a JWT token
    // const token = jwt.sign({ id: savedUser._id }, config.jwtsecret, {
    //   expiresIn: 3600,
    // });
    // console.log(token);
    // return response.status(200).json({
    //   token,
    //   user: {
    //     name: savedUser.name,
    //     email: savedUser.email,
    //     id: savedUser._id,
    //   },
    // });
    res.status(200).send({ message: "WOOOOHOOOOOOO" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
