import { Link } from 'react-router-dom'
import SearchOrder from '../features/order/SearchOrder'
import UserName from '../features/user/UserName'

function Header() {
    return (
        <header className="font-pizza flex items-center justify-between border-b-8 border-stone-700 bg-yellow-500 px-4 py-3 uppercase sm:px-6">
            <Link className="tracking-widest" to="/">
                Fast React Pizza co.
            </Link>
            <SearchOrder />
            <UserName />
        </header>
    )
}

export default Header
