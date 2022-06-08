import { Toaster } from 'react-hot-toast';
import { Link } from "react-router-dom";
import { CustomToast } from '../utils/Toast'
import { GetAccess } from '../utils/authorization'

const Aside = () => {
    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            <Toaster />

            <Link to="/Home" className="brand-link">
                <span className="brand-text font-weight-light">CRM</span>
            </Link>
            <div className="sidebar">
                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="image">
                        <img src="dist/img/user.png" className="img-circle elevation-2" alt="User Default Avatar" />
                    </div>
                    <div className="info">
                        <Link onClick={() => { CustomToast('userInfo') }} to="#" className="d-block">Usuario</Link>
                    </div>
                </div>

                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                        {
                            GetAccess('seller') &&
                            <li className="nav-item">
                                <Link to="/Seller" className="nav-link">
                                    <i className="nav-icon fas fa-user-tie"></i>
                                    <p>
                                        Distribuidores
                                    </p>
                                </Link>
                            </li>
                        }
                    </ul>
                </nav>
            </div>
        </aside>
    )
}

export { Aside }