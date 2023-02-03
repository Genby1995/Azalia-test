import Link from "next/link";

const Messages = () => {
    return (
        <div>
            <nav className='navbar'>
                <h1>Навигация по сервису</h1>
                <Link className="linkItem" href="/">Главная страница</Link>
                <Link className="linkItem" href="/messages"> Доска сообщений</Link>
                <Link className="linkItem" href="/numbers"> Средние числа </Link>
            </nav>
            <h1>Доска сообщений</h1>
        </div>
    )
}

export default Messages