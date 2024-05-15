import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getCartTotalPrice, getCartTotalQuantity } from './cartSlice'
import { formatCurrency } from '../../utilities/helpers'

function CartOverview() {
    const totalCartQuantity = useSelector(getCartTotalQuantity)
    const totalCartPrice = useSelector(getCartTotalPrice)

    if (!totalCartQuantity) return null
    return (
        <div className=" flex items-center justify-between bg-stone-800 px-4 py-4 text-sm uppercase text-stone-200 sm:px-6 sm:text-base">
            <p className="space-x-4 font-semibold text-stone-300 sm:space-x-6">
                <span>{totalCartQuantity} pizzas</span>
                <span>{formatCurrency(totalCartPrice)}</span>
            </p>
            <Link to="/cart">Open cart &rarr;</Link>
        </div>
    )
}

export default CartOverview
