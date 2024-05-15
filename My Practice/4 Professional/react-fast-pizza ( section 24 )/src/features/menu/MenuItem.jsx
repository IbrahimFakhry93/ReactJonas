import { formatCurrency } from '../../utilities/helpers'
import Button from '../../ui/Button'
import { useDispatch, useSelector } from 'react-redux'
import { addItem, getCurrentQuantity } from '../cart/cartSlice'
import DeleteItem from '../cart/DeleteItem'
import UpdateItemsQuantity from '../cart/updateItemsQuantity'
function MenuItem({ pizza }) {
    const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza
    const dispatch = useDispatch()
    const currentQuantity = useSelector(getCurrentQuantity(id))
    console.log(currentQuantity)
    const IsInCart = currentQuantity > 0
    function handleAddToCart() {
        console.log(id)

        const newItem = {
            pizzaId: id,
            name: name,
            quantity: 1,
            unitPrice,
            totalPrice: unitPrice * 1,
        }

        dispatch(addItem(newItem))
    }
    return (
        <li className="flex gap-4 py-2">
            <img
                src={imageUrl}
                alt={name}
                className={`h-24 ${soldOut ? 'opacity-70 grayscale' : ''}`}
            />
            <div className="flex grow flex-col pt-0.5">
                <p className="font-medium">{name}</p>
                <p className="text-sm capitalize italic text-stone-500">
                    {ingredients.join(', ')}
                </p>
                <div className="mt-auto flex items-center justify-between">
                    {!soldOut ? (
                        <p className="text-sm">{formatCurrency(unitPrice)}</p>
                    ) : (
                        <p className="text-sm font-medium uppercase text-stone-500">
                            Sold out
                        </p>
                    )}
                    {!soldOut && !IsInCart && (
                        <Button type="small" onClick={handleAddToCart}>
                            Add To Cart
                        </Button>
                    )}
                    {IsInCart && (
                        <div className="flex items-center gap-3 sm:gap-8">
                            <UpdateItemsQuantity
                                pizzaId={id}
                                currentQuantity={currentQuantity}
                            />
                            <DeleteItem pizzaId={id} />
                        </div>
                    )}
                </div>
            </div>
        </li>
    )
}

export default MenuItem
