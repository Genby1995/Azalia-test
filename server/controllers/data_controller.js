import dataService from "../service/data_service.js";

class DataController {
    async addMessage(req, res, next) {
        const {text, author} = req.body
        try {
            await dataService.addMessage(text, author)
            return res
                .status(200)
                .json({ message: "Message hsa been added" });
        } catch (e) {
            next(e)
        }
    }

    async addNumber(req, res, next) {
        const {number, precision} = req.body
        try {
            const data = await dataService.addNumber(number, precision)
            return res
                .status(200)
                .json({ message: "Number and calculation have been added", data: data });
        } catch (e) {
            next(e)
        }
    }

    async getData(req, res, next) {
        try {
            const data = await dataService.getData()
            return res
                .status(200)
                .json({ message: "Last data has been sent", data: data });
        } catch (e) {
            next(e)
        }
    }
}

export default new DataController();