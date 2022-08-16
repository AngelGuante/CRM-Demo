import toast from 'react-hot-toast';
import { GetBrowserData, DeleteBrowserData } from '../utils/BrowserData';
import { OptionsButtons } from '../componets/buttons/optionsButtons'

const ErrorToast = (message) => toast.error(message)

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

const CustomToast = (type) => {
    let toastCreated;

    switch (type) {
        case 'userInfo':
            toastCreated = toast.custom(
                () => (
                    <div className="col-md-2">
                        <div className="card card-widget widget-user">
                            <div className="widget-user-header bg-secondary">
                                <h3 className="widget-user-username">Usuario</h3>
                                <h5 className="widget-user-desc">{GetBrowserData('Job')}</h5>
                            </div>
                            <div className="widget-user-image">
                                <img className="img-circle elevation-2" src="../dist/img/user.png" alt="User Default Avatar" />
                            </div>
                            <div className="card-footer">
                                <div className="row">
                                    <div className="col-sm border-right">
                                        <OptionsButtons
                                            className='btn btn-app bg-danger'
                                            onclick={() => {
                                                DeleteBrowserData(null, 'Login');
                                                window.location.href = '/Login';
                                            }}
                                            icon='fas fa-door-open'
                                            text='Cerrar Sección'
                                        />
                                    </div>
                                    <div className="col-sm">
                                        <OptionsButtons
                                            onclick={() => toast.dismiss(toastCreated.id)}
                                            icon='fas fa-times'
                                            text='Quitar'
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ),
                {
                    id: 'userInfo'
                });
            break;
        default:
            break;
    }
}

export {
    CustomToast,
    ErrorToast,
    PromiseToast
}