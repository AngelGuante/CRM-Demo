const SaveBrowserData = (data, type) => {
    if (type === 'value')
        data.forEach(element => {
            localStorage.setItem(element.name, element.value);
        });
    else if (type === 'json') {
        switch (data['title']) {
            case 'Login Success':
                const dataSplited = data['message'].split(' ');

                localStorage.setItem('token', dataSplited[0]);
                localStorage.setItem('access', dataSplited[1]);
                localStorage.setItem('permissions', dataSplited[2]);

                break;
            default:
                break;
        }
    }
}

const GetBrowserData = (name) =>
    localStorage.getItem(name)

const DeleteBrowserData = (keys) =>
    keys.forEach(key => {
        localStorage.removeItem(key);
    });

export {
    SaveBrowserData,
    GetBrowserData,
    DeleteBrowserData
}