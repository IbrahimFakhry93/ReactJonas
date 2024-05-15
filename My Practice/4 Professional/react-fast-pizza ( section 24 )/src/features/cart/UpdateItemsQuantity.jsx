import { useDispatch } from 'react-redux'
import Button from '../../ui/Button'
import { decreaseItemQuantity, increaseItemQuantity } from './cartSlice'

function UpdateItemsQuantity({ pizzaId, currentQuantity }) {
    const dispatch = useDispatch()

    return (
        //* when we reach a bigger point let's make the gap a little bit bigger
        <div className="flex items-center gap-1 md:gap-3">
            <Button
                type="round"
                onClick={() => dispatch(decreaseItemQuantity(pizzaId))}
            >
                -
            </Button>
            <span>{currentQuantity}</span>
            <Button
                type="round"
                onClick={() => dispatch(increaseItemQuantity(pizzaId))}
            >
                +
            </Button>
        </div>
    )
}

export default UpdateItemsQuantity
