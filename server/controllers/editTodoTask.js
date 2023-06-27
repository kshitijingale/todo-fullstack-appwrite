const User = require("../model/User");

exports.editTodoTask = async (req, res) => {
    try {
        const taskIndex = req.body.taskIndex;
        const editedTask = req.body.editedTask;
        const user = await User.findOne({ 'appwriteId': req.body.appwriteId })
        const index = user.todos.findIndex(x => x._id.toString() === req.params.id);
        const todo = user.todos[index];
        todo.tasks[taskIndex] = editedTask;
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