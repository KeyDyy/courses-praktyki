import { FC } from 'react';
import Navbar from './Navbar'; // Załóżmy, że masz komponent Navbar

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
    return (
        <div>
            <Navbar />
            <main>{children}</main>
            <footer>
                {/* Tutaj umieść stopkę lub inne elementy globalne */}
            </footer>
        </div>
    );
};

export default Layout;
