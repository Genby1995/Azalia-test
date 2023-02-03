

class DataController {
    async message(req, res, next) {
        try {
            
            return res.status(200).json(userData);
        } catch (e) {
            next(e)
        }
    }

    async number(req, res, next) {
        try {
            
            return res.status(200).json(userData);
        } catch (e) {
            next(e)
        }
    }

    async data(req, res, next) {
        try {
            
            return res.status(200).json(userData);
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new DataController();