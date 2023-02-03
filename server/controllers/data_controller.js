import dataService from "../service/data_service.js";

class DataController {
    async addMessage(req, res, next) {
        const {author, text} = req.body
        try {
            await dataService.addMessage(text, author)
            return res
                .status(200)
                .json({ message: "Сообщение добавлено в базу" });
        } catch (e) {
            next(e)
        }
    }

    async addNumber(req, res, next) {
        const {number, precision} = req.body
        try {
            const calculation = await dataService.addNumber(number, precision)
            return res
                .status(200)
                .json({ message: "Новое число и расчёт с ним добавлены в базу", data: calculation });
        } catch (e) {
            next(e)
        }
    }

    async getData(req, res, next) {
        try {
            const data = await dataService.getData()
            return res
                .status(200)
                .json({ message: "Отправлены последние данные о сообшениях и числах", data: data });
        } catch (e) {
            next(e)
        }
    }

    async clearData(req, res, next) {
        try {
            await dataService.clearData()
            return res
                .status(200)
                .json({ message: "Данные о сообшениях и числах очищены", });
        } catch (e) {
            next(e)
        }
    }
}

export default new DataController();