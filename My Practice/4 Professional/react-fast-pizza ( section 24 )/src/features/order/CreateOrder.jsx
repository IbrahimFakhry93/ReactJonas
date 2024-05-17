import { useState } from 'react'
import { Form, redirect, useActionData, useNavigation } from 'react-router-dom'
import { createOrder } from '../../services/apiRestaurant'
import Button from '../../ui/Button'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart, getCart, getCartTotalPrice } from '../cart/cartSlice'
import EmptyCart from '../cart/EmptyCart'
import store from '../../store'
import { formatCurrency } from '../../utilities/helpers'
import { fetchAddress } from '../user/userSlice'

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
    /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
        str
    )

// const fakeCart = [
//     {
//         pizzaId: 12,
//         name: 'Mediterranean',
//         quantity: 2,
//         unitPrice: 16,
//         totalPrice: 32,
//     },
//     {
//         pizzaId: 6,
//         name: 'Vegetale',
//         quantity: 1,
//         unitPrice: 13,
//         totalPrice: 13,
//     },
//     {
//         pizzaId: 11,
//         name: 'Spinach and Mushroom',
//         quantity: 1,
//         unitPrice: 15,
//         totalPrice: 15,
//     },
// ]

function CreateOrder() {
    const [withPriority, setWithPriority] = useState(false)
    // const cart = fakeCart
    const dispatch = useDispatch()
    const cart = useSelector(getCart)
    const totalCartPrice = useSelector(getCartTotalPrice)
    const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0
    const totalPrice = totalCartPrice + priorityPrice
    const {
        username,
        status: addressStatus,
        position,
        address,
        error: errorAddress,
    } = useSelector((state) => state.user)
    const isLoadingAddress = addressStatus === 'loading'
    const formErrors = useActionData()
    console.log(formErrors)
    const navigate = useNavigation()
    const isSubmitting = navigate.state === 'submitting'

    if (!cart.length) return <EmptyCart />
    return (
        <div className="px-4 py-6">
            <h2 className="mb-8 text-xl font-semibold">
                Ready to order? Let's go!
            </h2>
            {/* <button onClick={() => dispatch()}></button> */}

            {/* <form> */}
            {/* <Form method="POST" action="/order/new"> */}
            <Form method="POST">
                <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
                    <label className="sm:basis-40">First Name</label>
                    <input
                        className="input grow"
                        type="text"
                        name="customer"
                        defaultValue={username}
                        required
                    />
                </div>

                <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
                    <label className="sm:basis-40">Phone number</label>
                    <div className="grow">
                        <input
                            className="input w-full"
                            type="tel"
                            name="phone"
                            required
                        />
                        {formErrors?.phone && (
                            <p className="mx-auto mt-2 w-fit rounded-md bg-red-100 p-2 text-xs text-red-700">
                                {formErrors.phone}
                            </p>
                        )}
                    </div>
                </div>

                <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
                    <label className="sm:basis-40">Address</label>
                    <div className="grow">
                        <input
                            className="input w-full "
                            type="text"
                            name="address"
                            disabled={isLoadingAddress}
                            defaultValue={address}
                            required
                        />
                        {addressStatus === 'error' && (
                            <p className="mx-auto mt-2 w-fit rounded-md bg-red-100 p-2 text-xs text-red-700">
                                {errorAddress}
                            </p>
                        )}
                    </div>
                    {!position.latitude && !position.longitude && (
                        <span className="absolute right-[3px]">
                            <Button
                                disabled={isLoadingAddress}
                                type="small"
                                onClick={(e) => {
                                    e.preventDefault()
                                    dispatch(fetchAddress())
                                }}
                            >
                                Get Position
                            </Button>
                        </span>
                    )}
                </div>

                <div className="mb-12 flex items-center gap-5">
                    <input
                        type="checkbox"
                        name="priority"
                        id="priority"
                        className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-offset-2"
                        value={withPriority}
                        onChange={(e) => setWithPriority(e.target.checked)}
                    />
                    <label htmlFor="priority" className="font-medium">
                        Want to yo give your order priority?
                    </label>
                </div>

                <div>
                    <input
                        type="hidden"
                        name="cart"
                        value={JSON.stringify(cart)}
                    />
                    <input
                        type="hidden"
                        name="position"
                        value={
                            position.latitude && position.longitude
                                ? `${position.latitude} , ${position.longitude}`
                                : ''
                        }
                    />
                    <Button
                        disabled={isSubmitting || isLoadingAddress}
                        type="primary"
                    >
                        {isSubmitting
                            ? 'Placing order...'
                            : `Order now from ${formatCurrency(totalPrice)} `}
                    </Button>
                </div>
                {/* </form> */}
            </Form>
        </div>
    )
}

export async function action({ request }) {
    const formData = await request.formData() //* formData is a web api provided by the browser
    console.log(formData)
    const data = Object.fromEntries(formData)
    console.log(data)

    //& model the raw data in the action:

    const order = {
        ...data,
        cart: JSON.parse(data.cart),
        // priority: data.priority === 'on',
        //* after convert the input checkbox to controlled element and priority becomes a reactive boolean state
        //* so it is true or false not on or off
        priority: data.priority === 'true',
    }
    console.log(order)

    //& Error Handling
    const errors = {}

    if (!isValidPhone(order.phone))
        errors.phone = 'Please enter correct number to contact you Sir'

    if (Object.keys(errors).length > 0) return errors

    //& getting the new order and redirect the url to show the order info page
    // if everything is okay, create new order and redirect it
    //! just comment below and uncomment return null for testing purpose and check console.og(order)
    const newOrder = await createOrder(order)
    //* don't overuse
    store.dispatch(clearCart())
    return redirect(`/order/${newOrder.id}`)

    // return null
}

export default CreateOrder
