import { DeleteBrowserData, SaveBrowserData, GetBrowserData } from './BrowserData';
import { ErrorToast } from '../utils/Toast'

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
    const response = await fetch(`${URL}${serverMethod}`, {
        headers: {
            'Authorization': `${GetBrowserData('token')}`
        }
    });

    if (response['status'] === 204) {
        ErrorToast('No Content');
        return {};
    }

    const json = await response.json();


    if (json['status'] === 401) {
        DeleteBrowserData(['token']);
        SaveBrowserData([{ 'name': 'reazonRedirect', 'value': json['message'] }], 'value');
        window.location.href = 'Login';
    }

    return json;
}

export {
    Post,
    Get
};