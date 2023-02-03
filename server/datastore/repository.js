import * as fs from 'fs';


class Repository {
    constructor(filename) {
        if (!filename) {
            throw new Error(
                'Filename is required to create a datastore!')
        }
        this.filename = filename
        try {
            fs.accessSync(this.filename)
        } catch (err) {
            fs.writeFileSync(this.filename, '{ "messages": [], "numbers": [] }')
        }
    }

    async addMessage(data) {
        // Read filecontents of the datastore
        const jsonRecords = await
            fs.promises.readFile(this.filename, {
                encoding: 'utf8'
            })
        const objRecord = JSON.parse(jsonRecords)
        objRecord.messages.push(data)

        await fs.promises.writeFile(
            this.filename,
            JSON.stringify(objRecord, null, 2)
        )
        return objRecord;
    }

    async addNumber(data) {
        const jsonRecords = await
            fs.promises.readFile(this.filename, {
                encoding: 'utf8'
            })
        const objRecord = JSON.parse(jsonRecords)
        objRecord.numbers.push(data)

        await fs.promises.writeFile(
            this.filename,
            JSON.stringify(objRecord, null, 2)
        )
        return objRecord;
    }

    async getData() {
        const jsonRecords = await
            fs.promises.readFile(this.filename, {
                encoding: 'utf8'
            })

        const objRecord = JSON.parse(jsonRecords)
        return objRecord;
    }

    async clearData() {
        await fs.promises.writeFile(
            this.filename,
            JSON.stringify({ "messages": [], "numbers": [] }, null, 2)
        )
        return;
    }
}

export default new Repository('datastore/datastore.json')