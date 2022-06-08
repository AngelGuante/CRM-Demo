const SaveBrowserData = (data, type) => {
    if (type === 'value')
        data.forEach(element => {
            localStorage.setItem(element.name, element.value);
        });
    else if (type === 'json') {
        switch (data['title']) {
            case 'Login Success':
                const dataSplited = data['message'].split(' ');

                localStorage.setItem('token', `Bearer ${dataSplited[0]}`);
                localStorage.setItem('access', dataSplited[1]);
                localStorage.setItem('permissions', dataSplited[2]);
                localStorage.setItem('Job', (dataSplited[3]).replaceAll('_', ' '));

                break;
            default:
                break;
        }
    }
}

const GetBrowserData = (name) =>
    localStorage.getItem(name)

const DeleteBrowserData = (keys, type) => {
    if (type) {
        switch (type) {
            case 'Login':
                localStorage.removeItem('token');
                localStorage.removeItem('access');
                localStorage.removeItem('permissions');
                localStorage.removeItem('Job');
                break;
            default:
                break;
        }
    }
    else
        keys.forEach(key => {
            localStorage.removeItem(key);
        });
}

export {
    SaveBrowserData,
    GetBrowserData,
    DeleteBrowserData
}