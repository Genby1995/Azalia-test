import repository from "../datastore/repository.js";
import ApiError from "../exeptions/api_error.js";

class DataService {
    async addMessage(text, author) {
        if (!text || !author) {
            throw ApiError.BadRequest("Сообщени должно иметь поля 'text' и 'autor'");
        }
        if (typeof text !== "string" || typeof author !== "string") {
            throw ApiError.BadRequest("Текст и автор сообщения должны иметь тим 'String'.");
        }
        if (typeof text.length < 1 || typeof author.length < 1) {
            throw ApiError.BadRequest("Поля текста и автора сообщения не должны быть пустыми.");
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
            throw ApiError.BadRequest("У запроса должно быть поле NUMBER с типом 'number'");
        }
        const data = await repository.getData()
        if (!data.numbers) {
            throw ApiError.DBProblem("Ошибка с базой данных");
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

    async clearData() {
        await repository.clearData();
        return;
    }
}

export default new DataService();