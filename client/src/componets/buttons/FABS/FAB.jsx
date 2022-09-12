import "../../../styles/FAB.css"

const FAB = (params) => {
    return (
        <a href="# " className="float" onClick={params['action']}>
            <i className="fa fa-plus my-float"></i>
        </a>
    )
}

export { FAB }