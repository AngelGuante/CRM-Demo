const LoginContainer = () => {
    return (
        <div>
            <input placeholder="company number" maxLength={6} />
            <input placeholder="username" maxLength={15} />
            <input placeholder="password" maxLength={30} type="password" />
            <button>send</button>
        </div>
    )
}

export { LoginContainer }