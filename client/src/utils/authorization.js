import { GetBrowserData } from '../utils/BrowserData'

const GetAccess = (access) => {
    let accesId;

    switch (access) {
        case 'seller':
            accesId = '4';
            break;
        default:
            break;
    }

    return (GetBrowserData('access').split(',')).includes(accesId);
}

export { GetAccess }