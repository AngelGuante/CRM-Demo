import { useState } from "react";
import { Post } from "../utils/Requests";
import { FormInput } from '../componets/form_imputs'
import { Loading } from '../componets/loading'
import { PromiseToast } from '../utils/Toast'
import { GetBrowserData, SaveBrowserData, DeleteBrowserData } from '../utils/BrowserData';
import { Toaster } from 'react-hot-toast';

//---------
//- TO DO -
//---------
//*Corregir el try catch del metodo Login ya que cuando da un 401 explota. buscar la forma de que no explote para quitar el try Catch

const LoginContainer = () => {

    // Login form
    const [form, setForm] = useState({
        companyNumber: GetBrowserData('rememberLoginForm') === 'true' ? Number(GetBrowserData('companyNumber')) : '',
        user: GetBrowserData('rememberLoginForm') === 'true' ? GetBrowserData('user') : '',
        pass: GetBrowserData('rememberLoginForm') === 'true' ? GetBrowserData('pass') : ''
    });

    const handleLoginIputsChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        });
    }

    // Login Form Loading
    const [loading, setLoading] = useState(false);

    // Remember Login Form
    const [rememberLoginForm, setRememberLoginForm] = useState(GetBrowserData('rememberLoginForm') === 'true');

    const handlerememberLoginForm = (event) => {
        setRememberLoginForm(event.target.checked)
        if (event.target.checked)
            SaveBrowserData([
                { name: 'rememberLoginForm', value: event.target.checked },
                { name: 'companyNumber', value: form['companyNumber'] },
                { name: 'user', value: form['user'] },
                { name: 'pass', value: form['pass'] }
            ], 'value');
        else
            DeleteBrowserData([
                'rememberLoginForm',
                'companyNumber',
                'user',
                'pass'
            ]);
    }

    // METHODS
    const Login = async (event) => {
        setLoading(true);
        event.preventDefault();

        try {
            const response = await PromiseToast(Post(form), {
                'loadingMessage': 'Accediendo',
                'success': `Welcome ${form['user']}!`,
                'error': 'Credenciales Incorrectos'
            });

            if (response['status'] === 200)
                SaveBrowserData(response, 'json');
        } catch (Exception) { }

        setLoading(false);
    }

    return (
        <div className="login-page">
            <div className="login-box">
                <div className="login-logo">
                    <b>CRM</b>
                </div>
                <div className="card">

                    {loading && <Loading />}
                    <Toaster />

                    <div className="card-body login-card-body">
                        <p className="login-box-msg">Iniciar Sección</p>
                        <form onSubmit={Login}>
                            <FormInput
                                value={form.companyNumber}
                                name='companyNumber'
                                placeholder='Company Number'
                                maxLength='6'
                                onChange={handleLoginIputsChange}
                                type='Number'
                                icon="fas fa-hashtag" />
                            <FormInput
                                value={form.user}
                                name='user'
                                placeholder='Username'
                                maxLength='15'
                                onChange={handleLoginIputsChange}
                                icon="fas fa-user" />
                            <FormInput
                                value={form.pass}
                                name='pass'
                                placeholder='Password'
                                maxLength='30'
                                onChange={handleLoginIputsChange}
                                type='Password'
                                icon="fas fa-lock" />
                            <div className="row">
                                <div className="col-8">
                                    <div className="icheck-primary">
                                        <input
                                            checked={rememberLoginForm}
                                            type="checkbox"
                                            id="remember"
                                            onChange={handlerememberLoginForm} />
                                        <label htmlFor="remember">
                                            Recordar Datos
                                        </label>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <button type="submit" className="btn btn-primary btn-block">Acceder</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export { LoginContainer }