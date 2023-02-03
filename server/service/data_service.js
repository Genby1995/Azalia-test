import repository from "../datastore/repository.js";
import ApiError from "../exeptions/api_error.js";

class DataService {
    async addMessage(text, author) {
        if (!text || !author) {
            throw ApiError.BadRequest("Message must have text and autor");
        }
        if (typeof text !== "string" || typeof author !== "string") {
            throw ApiError.BadRequest("Text and autor in message must be strings");
        }
        repository.addMessage({ text, author })
        const data = await repository.getData()
        return data;
    }

    async addNumber(number, precision) {
        const rounder = 10**precision || 1
        const lastNumber = +number
        let firstNumber

        if (!lastNumber || typeof lastNumber !== "number") {
            throw ApiError.BadRequest("Request must have a number with number type");
        }
        const data = await repository.getData()
        if (!data.numbers) {
            throw ApiError.DBProblem("Error with database");
        } else if (data.numbers.length < 1) {
            firstNumber = +number
        } else {
            firstNumber = data.numbers[data.numbers.length -1].avr
        }

        const calculation = {
            first: firstNumber,
            last: lastNumber,
            avr: Math.round(((firstNumber + lastNumber) / 2) *rounder)/rounder
        }
        repository.addNumber(calculation)

        return calculation
    }

    async getData() {
        const data = await repository.getData()
        return data;
    }
}

export default new DataService();