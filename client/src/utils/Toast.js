import toast from 'react-hot-toast';

const PromiseToast = async (myPromise, params) => {
    await toast.promise(new Promise(async (resolve, reject) => {
        const promiseResponse = await myPromise;

        if (promiseResponse['status'] === 200)
            resolve();
        else {
            params.error = promiseResponse['message'];
            reject();
        }
    }), {
        loading: params.loadingMessage ? params.loadingMessage : 'Cargando',
        success: params.success,
        error: params.error
    });
}

export { PromiseToast }