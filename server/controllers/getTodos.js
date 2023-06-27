const User = require('../model/User');

exports.getTodos = async (req, res) => {
    try {
        const appwriteId = req.params.userId;

        if (!appwriteId) {
            return res.status(400).json({
                success: false,
                message: 'Access Denied'
            })
        }

        const user = await User.findOne({ 'appwriteId': appwriteId })
        const todos = user.todos;
        res.status(200).json({
            success: true,
            todos
        })

    } catch (error) {
        console.log(error.message);
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}