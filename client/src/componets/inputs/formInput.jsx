const FormInput = (proops) => {
    return (
        <div className="input-group mb-3">
            <input
                className="form-control"
                value={proops['value']}
                name={proops['name']}
                placeholder={proops['placeholder']}
                maxLength={proops['maxLength']}
                onChange={proops['onChange']}
                type={proops['type'] ? proops['type'] : 'text'}
            />
            <div className="input-group-append">
                <div className="input-group-text">
                    <span className={proops['icon']} />
                </div>
            </div>
        </div>
    )
}

export { FormInput }