const Notification = ({ message, error = false }) => {

    if (message === null || message === undefined) return null

    return <div className={error ? "error" : "notification"}>{message}</div>
}

export default Notification