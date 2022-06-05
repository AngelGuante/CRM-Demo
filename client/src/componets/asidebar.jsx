import { Toaster } from 'react-hot-toast';
import { CustomToast } from '../utils/Toast'

const Aside = () => {
    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            <Toaster />

            <a href="/Home" className="brand-link">
                <span className="brand-text font-weight-light">CRM</span>
            </a>
            <div className="sidebar">
                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="image">
                        <img src="dist/img/user.png" className="img-circle elevation-2" alt="User Default Image" />
                    </div>
                    <div className="info">
                        <a onClick={() => {CustomToast('userInfo')}} href="#" className="d-block">Usuario</a>
                    </div>
                </div>

                <nav className="mt-2">
                </nav>
            </div>
        </aside>
    )
}

export { Aside }