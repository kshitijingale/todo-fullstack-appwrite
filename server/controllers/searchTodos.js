const User = require('../model/User');

exports.searchTodos = async (req, res) => {
    try {
        const user = await User.findOne({ 'appwriteId': req.body.appwriteId })
        const searchText = req.params.text.toLowerCase();
        const todos = user.todos.filter((todo) => {
            const todoTitle = todo.title.toLowerCase();
            if (todoTitle.includes(searchText)) {
                return todo;
            }
        })

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