import { useEffect, useState } from "react";
import MainContainer from "../components/main_container";


const Numbers = () => {
    const [results, setResults] = useState([])
    const [input, setInput] = useState('')
    const [precision, setPrecision] = useState('')
    const [message, setMessage] = useState('Введите число, чтобы получить среднее, между предыдущим и введённым вами числом. Можно ввести количество знаков после запятой у результата, но не больше 20 (по умолчанию результат - целое число)')

    // Async functions

    async function getData() {
        try {
            const res = await fetch("http://localhost:5000/api/data");
            const data = await res.json()
            if (res.ok) {
                setResults(data.data.numbers)
            } else if (data) {
                setMessage("Ошибка: " + data.message)
            } else {
                setMessage("Непредвиденная ошибка")
            }
        } catch (error) {
            setMessage("Непредвиденная ошибка. Возможно сервер не включен.");
        }
    }

    async function clearData() {
        try {
            const res = await fetch("http://localhost:5000/api/data", {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
            });
            const data = await res.json()
            if (res.ok) {
                setResults([])
                setMessage("Данные сообщений и чисел очищены")
            } else if (data) {
                setMessage("Ошибка: " + data.message)
            } else {
                setMessage("Непредвиденная ошибка")
            }
        } catch (error) {
            setMessage("Непредвиденная ошибка. Возможно сервер не включен.");
        }
    }

    async function addNumber(number, precision) {
        try {
            const res = await fetch("http://localhost:5000/api/numbers", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({
                    number: number,
                    precision: precision
                })
            });
            const data = await res.json()

            if (res.ok) {
                setResults([...results, data.data])
                setMessage("Результат получен")
            } else if (data) {
                setMessage("Ошибка: " + data.message)
            } else {
                setMessage("Непредвиденная ошибка")
            }
        } catch (error) {
            setMessage("Непредвиденная ошибка. Возможно сервер не включен.");
        }
    }

    //Handlers

    function handleClearData(e) {
        e.preventDefault();
        clearData()
    }

    function handleSubmit(e) {
        e.preventDefault()
        if (/^-?[0-9]\d*(\.\d+)?$/.test(input)) {
            addNumber(input, precision)
        } else if (input.length < 1) {
            setMessage("Заполните поле с числом")
        } else {
            setMessage("В поле числа введите только число. Число может быть отрицательным. Знак дроби - точка. Примеры: 12; -15, 12.7, -0,1758")
        }
    }

    function handleChangeNumber(e) {
        setInput(e.target.value)
    }

    function handleChangePrecision(e) {
        if (/^\d+$/.test(e.target.value) && +e.target.value < 21 || e.target.value == "") {
            setPrecision(e.target.value)
        }
        return
    }

    // CSR

    useEffect(() => {
        getData();
    }, [])

    // Variables

    const resultsHistory = results.map(result => {
        return (
            <li key={Math.floor(Math.random() * 100000)}>
                <>
                    (<b style={{ color: "yellow" }}> {result.first}</b> +
                    <b style={{ color: "orange" }}> {result.last}</b> ) / 2 =
                    <b style={{ color: "red" }}> {result.avr}</b>
                </>

            </li >
        )
    })

    return (

        <MainContainer>
            <form className="sectionContainer" onSubmit={handleSubmit}>
                <h1>Средние числа</h1>
                <div style={{ height: "75px" }}> <b>Информация:</b> <br />{message}</div>
                <input type={"text"} className={"textInput"} value={input} onChange={handleChangeNumber} placeholder={"Введите число"} />
                <input type={"text"} className={"textInput"} value={precision} onChange={handleChangePrecision} placeholder={"Знаки после запятой"} />
                <input type={"submit"} className={"buttonInput"} value="Отправить и получить среднее" />
                <ul>
                    <li> Цифры обозначают соответственно:
                        <b style={{ color: "yellow" }}> ранее полученное среднее, </b>
                        <b style={{ color: "orange" }}>введенное число, </b>
                        <b style={{ color: "red" }}>среднее между ними.</b>
                        <div style={{ border: "1px solid white", margin: "10px 0" }} />
                    </li>
                    {resultsHistory}
                </ul>
                <input type={"button"} onClick={handleClearData} className={"buttonInput"} style={{ background: "red" }} value="Очистить данные сообщений и чисел" />
            </form>
        </MainContainer>

    )
}

export default Numbers