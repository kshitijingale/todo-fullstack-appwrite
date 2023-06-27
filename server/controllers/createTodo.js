const User = require('../model/User');

exports.createTodo = async (req, res) => {
    try {
        const { title, appwriteId } = req.body;
        const user = await User.findOne({ 'appwriteId': appwriteId })

        user.todos.push({
            title,
        });

        await user.save();

        res.status(200).json({
            success: true,
            user
        })

    } catch (error) {
        console.log(error.message);
        res.status(400).json({
            success: false,
            message: "Failed to create todo"
        })
    }
}