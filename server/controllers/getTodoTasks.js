
const User = require("../model/User");

exports.getTodoTasks = async (req, res) => {
    try {
        const user = await User.findOne({ 'appwriteId': req.params.appwriteId })
        const index = user.todos.findIndex(x => x._id.toString() === req.params.id);
        const todo = user.todos[index];

        const tasks = todo.tasks;

        res.status(200).json({
            success: true,
            tasks,
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}