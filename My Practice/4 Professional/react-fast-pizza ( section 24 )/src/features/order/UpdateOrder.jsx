import { useFetcher } from 'react-router-dom'
import Button from '../../ui/Button'
import { updateOrder } from '../../services/apiRestaurant'

function UpdateOrder({ order }) {
    const fetcher = useFetcher()
    return (
        <fetcher.Form method="PATCH" className="text-right">
            <Button type="primary">Make Priority</Button>
        </fetcher.Form>
    )
}

export default UpdateOrder

export async function action({ request, params }) {
    console.log('update')
    const data = { priority: true }
    await updateOrder(params.orderId, data)
    return null
}

//! why request parameter in action function is not used this time
//* Usually, when handling data updates, we have input fields in the form. However, in this case, we only have a button.
//* Unlike the CreateOrder component, we don't need to read any data from the request here.
