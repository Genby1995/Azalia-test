import Link from "next/link";
import { useState } from "react";


const Numbers = () => {
    const [ results, setResults ] = useState([
        "Последний результат: 5, Ваше число: 6, Результат: 5.5",
        "Последний результат: 5, Ваше число: 6, Результат: 5.5",
        "Последний результат: 5, Ваше число: 6, Результат: 5.5",
        "Последний результат: 5, Ваше число: 6, Результат: 5.5",
        "Последний результат: 5, Ваше число: 6, Результат: 5.5",
    ])

    return (
        <div>
            <nav className='navbar'>
                <h1>Навигация по сервису</h1>
                <Link className="linkItem" href="/">Главная страница</Link>
                <Link className="linkItem" href="/messages"> Доска сообщений</Link>
                <Link className="linkItem" href="/numbers"> Средние числа </Link>
            </nav>
            <h1>Средние числа</h1>
            <ul>
                {results.map(result => {
                    return (
                        <li>
                            {result}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Numbers