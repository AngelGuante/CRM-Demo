import toast from 'react-hot-toast';
import { GetBrowserData, DeleteBrowserData } from '../utils/BrowserData';

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
    switch (type) {
        case 'userInfo':
            let toastCreated = toast.custom(
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
                                        <a className="btn btn-app bg-danger" onClick={(event) => {
                                            DeleteBrowserData(null, 'Login');
                                            window.location.href = '/Login';
                                        }}>
                                            <i className="fas fa-door-open" /> Cerrar Sección
                                        </a>
                                    </div>
                                    <div className="col-sm">
                                        <a className="btn btn-app" onClick={() => toast.dismiss(toastCreated.id)}>
                                            <i className="fas fa-times" /> Quitar
                                        </a>
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