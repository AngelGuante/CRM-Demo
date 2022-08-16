const DefaultInput = (proops) => {
    return (
        <input
            className="form-control form-control-sm"
            type={proops['type'] ? proops['type'] : 'text'}
            placeholder={proops['placeholder'] ? proops['placeholder'] : ''}
            value={proops['value']}
            name={proops['name']}
            onChange={proops['onChange']}/>
    )
}

export { DefaultInput }