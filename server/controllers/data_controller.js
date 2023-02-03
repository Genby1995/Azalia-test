import dataService from "../service/data_service.js";

class DataController {
    async addMessage(req, res, next) {
        try {
            
            return res.status(200).json("Message");
        } catch (e) {
            next(e)
        }
    }

    async addNumber(req, res, next) {
        try {
            const data = await dataService.getData()
            return res.status(200).json("Numbers");
        } catch (e) {
            next(e)
        }
    }

    async getData(req, res, next) {
        try {
            const data = await dataService.getData()
            return res.status(200).json(data);
        } catch (e) {
            next(e)
        }
    }
}

export default new DataController();