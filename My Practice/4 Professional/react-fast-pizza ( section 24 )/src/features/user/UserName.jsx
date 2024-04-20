import { useSelector } from 'react-redux'

function UserName() {
    //* remember user is the name of the slice

    const username = useSelector((state) => state.user.username)
    if (!username) return null
    return (
        <div className="hidden text-sm font-semibold md:block">{username}</div>
    )
}

export default UserName
