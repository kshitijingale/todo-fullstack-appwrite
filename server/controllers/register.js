const User = require('../model/User');

exports.register = async (req, res) => {
    try {
        const { name, email, password, appwriteId } = req.body;

        // Validate data if exist
        if (!(name && email && password && appwriteId)) {
            return res.status(401).json({
                success: false,
                message: "All fields are required"
            })
        }

        // Check user already exist or not
        const doesExist = await User.findOne({ email })
        if (doesExist) {
            return res.status(401).json({
                success: false,
                message: "User already exists"
            })
        }

        //check if email is in correct format
        if (!(validateEmail(email))) {
            return res.status(401).json({
                success: false,
                message: "Invalid Email"
            })
        }

        // Save to DB
        const user = await User.create({
            name,
            email,
            appwriteId
        })

        return res.status(200).json({
            success: true,
            user
        })

    } catch (error) {
        console.log(`Error :: register route :: ${error}`);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}