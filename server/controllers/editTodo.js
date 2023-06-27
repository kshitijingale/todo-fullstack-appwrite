const User = require('../model/User');

exports.editTodo = async (req, res) => {
    try {
        const { title, appwriteId } = req.body;

        const user = await User.findOne({ 'appwriteId': appwriteId })
        const index = user.todos.findIndex(x => x._id.toString() === req.params.id);
        // If Todo not found
        if (index === -1) {
            res.status(401).json({
                success: false,
                message: "Todo not found"
            })
        }
        user.todos[index] = {
            title,
            modifiedDate: Date.now()
        }

        await user.save();

        res.status(200).json({
            success: true,
            user,
            message: "Todo updated successfully"
        })
    } catch (error) {
        console.log(error.message);
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}