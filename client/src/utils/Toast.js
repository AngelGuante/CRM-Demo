import toast from 'react-hot-toast';

const PromiseToast = async (myPromise, params) => {
    return await toast.promise(new Promise(async (resolve, reject) => {
        const promiseResponse = await myPromise;

        if (promiseResponse['status'] === 200)
            resolve(promiseResponse);
        else {
            params.error = promiseResponse['message'];
            reject();
        }
    }), {
        loading: params.loadingMessage ? params.loadingMessage : 'Loading',
        success: params.success,
        error: params.error
    });
}

export { PromiseToast }