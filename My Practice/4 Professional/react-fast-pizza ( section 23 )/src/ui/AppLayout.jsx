import Header from './Header'
import CartOverview from '../features/cart/CartOverview'
import { Outlet, useNavigation } from 'react-router-dom'
import Loader from './Loader'
function AppLayout() {
    const navigation = useNavigation()
    // console.log(navigation);
    const isLoading = navigation.state === 'loading'
    return (
        <div className="grid h-screen grid-rows-[auto_1fr_auto]">
            {isLoading && <Loader />}
            {/* {true && <Loader />} */}
            {/* <Loader /> */}
            {/*  we want the header to be visible and fixed while we navigating to other routes so we put it alone out of outline or children routes  */}
            <Header />
            <div className="overflow-scroll">
                <main className="mx-auto max-w-3xl ">
                    {/* <h1>Content</h1> */}
                    <Outlet />
                </main>
            </div>

            <CartOverview />
        </div>
    )
}

export default AppLayout
