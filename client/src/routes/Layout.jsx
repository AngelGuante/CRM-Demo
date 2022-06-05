import { Outlet } from 'react-router-dom'
import { Header } from '../componets/header'
import { Aside } from '../componets/asidebar'
import { Footer } from '../componets/footer'

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