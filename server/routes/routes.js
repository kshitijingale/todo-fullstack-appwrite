const express = require('express')
const router = express.Router();
// Auth middleware
const auth = require('../middleware/auth')

const { home } = require('../controllers/home')
const { createTodo } = require('../controllers/createTodo')
const { getTodos } = require('../controllers/getTodos');
const { deleteTodo } = require('../controllers/deleteTodo');
const { editTodo } = require('../controllers/editTodo');
const { createTodoTask } = require('../controllers/createTodoTask');
const { getTodoTasks } = require('../controllers/getTodoTasks');
const { deleteTodoTask } = require('../controllers/deleteTodoTask');
const { editTodoTask } = require('../controllers/editTodoTask');
const { searchTodos } = require('../controllers/searchTodos');
const { register } = require('../controllers/register');

// Path
router.get('/', home)
router.post('/createTodo', createTodo)
router.get('/getTodos/:userId', getTodos)
router.put('/editTodo/:id', editTodo)
router.delete('/deleteTodo/:id', deleteTodo)
router.post('/createTodoTask/:id', createTodoTask)
router.get('/getTodoTasks/:appwriteId&:id', getTodoTasks)
router.put('/deleteTodoTask/:id', deleteTodoTask)
router.put('/editTodoTask/:id', editTodoTask)
router.post('/api/searchTodos/:text', searchTodos)
router.post('/api/register', register)

module.exports = router;