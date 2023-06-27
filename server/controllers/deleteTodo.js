const User = require("../model/User");

exports.deleteTodo = async (req, res) => {
    try {
        const user = await User.findOne({ 'appwriteId': req.body.appwriteId })
        const index = user.todos.findIndex(x => x._id.toString() === req.params.id);
        user.todos.splice(index, 1)
        // If Todo not found
        if (index === -1) {
            res.status(401).json({
                success: false,
                message: "Todo not found"
            })
        }

        await user.save();
        res.status(200).json({
            success: true,
            user,
            message: "Todo deleted successfully"
        })

    } catch (error) {
        console.log(error.message);
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}