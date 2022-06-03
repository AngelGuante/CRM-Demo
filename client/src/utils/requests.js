import { SaveBrowserData, GetBrowserData } from './BrowserData';

const URL = 'http://localhost:3000/Api/';

const Post = async (serverMethod, data) =>
    await (await fetch(`${URL}${serverMethod}`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })).json();

const Get = async (serverMethod) => {
    const response = await (await fetch(`${URL}${serverMethod}`, {
        headers: {
            'Authorization': `${GetBrowserData('token')}`
        }
    })).json();

    if (response['status'] === 401) {
        SaveBrowserData([{'name': 'reazonRedirect', 'value': response['message']}], 'value')
        window.location.href = 'Login';
    }

    return response;
}

export {
    Post,
    Get
};