import { useLoaderData } from 'react-router-dom'
import { getMenu } from '../../services/apiRestaurant'
import MenuItem from './MenuItem'

function Menu() {
    //& provide the data to the page (menu component) by a custom hook (useLoader)
    const menu = useLoaderData()
    console.log(menu)
    return (
        <ul>
            {menu.map((pizza) => (
                <MenuItem pizza={pizza} key={pizza.id} />
            ))}
        </ul>
    )
}

//& Create Loader
export async function loader() {
    const menu = await getMenu()
    return menu
}
export default Menu
