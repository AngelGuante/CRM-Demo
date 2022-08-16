const OptionsButtons = (proops) => {
    return (
        <a className={proops['className'] ? proops['className'] : "btn btn-app"} onClick={proops['onclick']}>
            <i className={proops['icon']}></i> {proops['text']}
        </a>
    )
}

export { OptionsButtons }