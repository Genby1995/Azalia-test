import MainContainer from "../components/main_container";
import Router from 'next/router'


const Messages = ({ data, message }) => {

    // Async functions

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
                Router.reload(window.location.pathname)
            } else if (data) {
                console.log("Ошибка: " + data.message)
            } else {
                console.log("Непредвиденная ошибка")
            }
        } catch (error) {
            console.log("Непредвиденная ошибка. Возможно сервер не включен.");
        }
    }

    async function addMessage(author, text) {
        try {
            const res = await fetch("http://localhost:5000/api/messages", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({
                    text: text,
                    author: author
                })
            });
            const data = await res.json()
            if (res.ok) {
                Router.reload(window.location.pathname)
            } else if (data) {
                console.log("Ошибка: " + data.message)
            } else {
                console.log("Непредвиденная ошибка")
            }
        } catch (error) {
            console.log("Непредвиденная ошибка. Возможно сервер не включен.");
        }
    }

    //Handlers

    function handleClearData(e) {
        // e.preventDefault();
        clearData()
    }

    function handleSubmit(e) {
        e.preventDefault()
        const author = e.target[0].value
        const text = e.target[1].value

        // console.log(author, text);
        addMessage(author, text)
    }


    //Variables

    const messagesHistory = data.map(message => {
        return (
            <li key={Math.floor(Math.random() * 100000)}>
                <b style={{ color: "orange" }}>{message?.author + ": "}</b>
                {message?.text}
            </li >
        )
    })

    return (

        <MainContainer>
            <form className="sectionContainer" onSubmit={handleSubmit}>
                <h1>Средние числа</h1>
                <div style={{ height: "75px" }}> <b>Информация:</b> <br />{message}</div>
                <input type={"text"} className={"textInput"} placeholder={"Введите автора сообщения"} />
                <input type={"text"} className={"textInput"} placeholder={"Введите сообщение"} />
                <input type={"submit"} className={"buttonInput"} value="Отправить сообщение" />
                <ul>
                    <li> Полученные сообщения:
                        <div style={{ border: "1px solid white", margin: "10px 0" }} />
                    </li>
                    {messagesHistory}
                </ul>
                <input type={"button"} onClick={handleClearData} className={"buttonInput"} style={{ background: "red" }} value="Очистить данные сообщений и чисел" />
            </form>
        </MainContainer>

    )
}

export default Messages

// SSR

export async function getServerSideProps() {
    try {
        const res = await fetch("http://localhost:5000/api/data");
        const data = await res.json()
        if (res.ok) {
            return { props: { data: data.data.messages, message: "В соответствующие поля введите автора сообщения и текст сообщения. Если одно из полей будет пустым, то сообщение не опубликуется." } }
        } else if (data) {
            return { props: { data: { data: { messages: [] } }, message: "Ошибка" + data.message } }
        } else {
            return { props: { data: { data: { messages: [] } }, message: "Непредвиденная ошибка" } }
        }
    } catch (error) {
        return { props: { data: { data: { messages: [] } }, message: "Непредвиденная ошибка. Возможно сервер не включен." } }
    }
}