const User = require("../database/models/User");
const bcrypt = require("bcrypt");
const tokenizer = require("../tokenizer");
const errHandle = require("../errormsgclass");

module.exports = {
    POST: async function(request, response) {
        // find a user by username
        // if (request.body.email)
        // let user = request.body.user;

        // if (userByEmail) {
        //     var loginUser = userByEmail;
        // } else {
        //     let userByUsername = await User.findOne({
        //         username: user,
        //     });
        //     var loginUser = userByUsername;
        // }

        // // check input password against DB

        // passCheck = bcrypt.compareSync(request.body.password, loginUser.password);
        // if (passCheck) {
        //     response.json(new errHandle(200, `login succesful!`));
        // } else {
        //     response.send(new errHandle(200, `Sorry your login or password is incorrect`));
        // }
        const { user, password } = request.body;
        let retrievedUser = await User.findOne({ username: user });
        if (!retrievedUser) {
            retrievedUser = await User.findOne({ email: user });
            if (!retrievedUser) {
                response
                    .status(200)
                    .send({
                        success: false,
                        token: null,
                        errorMessage: "Username, email, or password is invalid.",
                    })
                    .end();
                return;
            }
        }
        if (!bcrypt.compareSync(password, retrievedUser.password)) {
            response
                .status(200)
                .send({
                    success: false,
                    token: null,
                    errorMessage: "Username, email, or password is invalid.",
                })
                .end();
            return;
        }
        response.status(200).send({
            success: true,
            token: tokenizer(retrievedUser),
            errorMessage: "",
        });
    },
};
