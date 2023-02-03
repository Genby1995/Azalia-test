import Head from "next/head"
import Link from "next/link"


const MainContainer = ({ children }) => {
    return (
        <>
        <Head>  
            <meta  keywords = "Azalia, Азалия"/>
        </Head>
            <nav className='navbar'>
                <h1>Навигация по сервису: </h1>
                <Link className="linkItem" href="/">Главная страница</Link>
                <Link className="linkItem" href="/messages"> Доска сообщений</Link>
                <Link className="linkItem" href="/numbers"> Средние числа </Link>
            </nav>
            <div>
                {children}
            </div>
        </>
    )
}

export default MainContainer