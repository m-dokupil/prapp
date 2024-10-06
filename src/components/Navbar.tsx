import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import styled from 'styled-components';
import { MenuItem } from 'primereact/menuitem';
import { logout } from '../app/slices/authSlice';

const NavbarWrapper = styled.div`
  .p-menubar {
   justify-content: flex-end;
  }

  .p-menubar-root-list > li > .p-menuitem-link {
    color: #fff;
    font-weight: bold;
    text-decoration: none;
  }

  .p-menubar-root-list > li > .p-menuitem-link:hover {
    background-color: #45a049;
  }

  .p-button {
    background-color: #fff;
    color: #248428;
    border: none;
    font-weight: bold;
  }

  .p-button:hover {
    background-color: #ddd;
    color: #248428;
  }
`;

const Navbar: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const items = [
    { label: 'Dashboard', icon: 'pi pi-home', command: () => window.location.href = '/' },
    isAuthenticated ? { label: 'Profile', icon: 'pi pi-user', command: () => window.location.href = '/profile' } : null,
    isAuthenticated ? { 
      label: 'Logout', 
      icon: 'pi pi-sign-out', 
      template: () => <Button label="Logout" className="p-button" onClick={handleLogout} /> 
    } : { label: 'Login', icon: 'pi pi-sign-in', command: () => window.location.href = '/login' }
  ].filter(Boolean) as MenuItem[];

  return (
    <NavbarWrapper>
      <Menubar model={items} />
    </NavbarWrapper>
  );
};

export default Navbar;
