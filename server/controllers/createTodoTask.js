const User = require("../model/User");

exports.createTodoTask = async (req, res) => {
    try {
        const task = req.body.task;

        // if task doesn't exist
        if (!task || (task.length == 0)) {
            res.status(400).json({
                success: false,
                message: "Task is required"
            })
        }
        else {
            const user = await User.findOne({ 'appwriteId': req.body.appwriteId })
            const index = user.todos.findIndex(x => x._id.toString() === req.params.id);
            const todo = user.todos[index];
            todo.tasks.push(task)
            await user.save();

            res.status(200).json({
                sucess: true,
                todo
            })
        }

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }

}