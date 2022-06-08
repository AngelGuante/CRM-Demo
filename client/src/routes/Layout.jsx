import { Outlet } from 'react-router-dom'
import { Header } from '../containers/header'
import { Aside } from '../containers/asidebar'
import { Footer } from '../containers/footer'

const Layout = () => {
    return (
        <div className='wrapper'>
            <Header />
            <Aside />
            <Footer />

            <div className='content-wrapper'>
                <Outlet />
            </div>
        </div>
    );
}

export { Layout }