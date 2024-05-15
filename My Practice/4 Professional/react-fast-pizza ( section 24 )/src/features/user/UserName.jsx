import { useSelector } from 'react-redux'

function UserName() {
    //* remember user is the name of the slice, and username is the state inside the user slice
    //!  state.user.username

    //* Remember that the way we get some state from Redux
    //* inside a React component is by using the "useSelector" hook.
    const username = useSelector((state) => state.user.username)
    if (!username) return null
    return (
        <div className="hidden text-sm font-semibold md:block">{username}</div>
    )
}

export default UserName
