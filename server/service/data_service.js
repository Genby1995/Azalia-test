import repository from "../datastore/repository.js";


class DataService {
    async addMessage(req, res, next) {
        try {

            return res.status(200).json("Message");
        } catch (e) {
            next(e)
        }
    }

    async addNumber(req, res, next) {
        try {

            return res.status(200).json("Number");
        } catch (e) {
            next(e)
        }
    }

    async getData() {
        const data = await repository.getData()
        return data;
    }
}

export default new DataService();