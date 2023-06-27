const User = require("../model/User");

exports.deleteTodoTask = async (req, res) => {
    try {
        const user = await User.findOne({ 'appwriteId': req.body.appwriteId })
        const index = user.todos.findIndex(x => x._id.toString() === req.params.id);
        const todo = user.todos[index];
        const taskIndex = req.body.taskIndex;
        todo.tasks.splice(taskIndex, 1)
        await user.save();

        res.status(200).json({
            sucess: true,
            todo
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}