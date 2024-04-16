import { Link } from 'react-router-dom'

function Button({ children, disabled, to }) {
    const className =
        'inline-block rounded-full bg-yellow-400 px-4 py-3 font-semibold uppercase tracking-wide transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-100 focus:ring-offset-2 disabled:cursor-not-allowed sm:px-6 sm:py-4'
    if (to)
        return (
            <Link className={className} to={to}>
                {children}
            </Link>
        )
    return (
        <div disabled={disabled} className={className}>
            {children}
        </div>
    )
}

export default Button