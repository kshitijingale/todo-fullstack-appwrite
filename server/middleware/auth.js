
const auth = async (req, res, next) => {
    try {
    } catch (error) {
        console.error(`Auth middleware :: ${error}`);
        return res.status(401).json({
            success: false,
            message: error.message
        })
    }
    next();
}

module.exports = auth;