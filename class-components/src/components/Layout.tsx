import { Link, Outlet } from 'react-router';
import { Details } from '@/components/Details.tsx';

export const Layout = () => {
  return (
    <>
      <header>
        <Link to='/about'>About</Link>
      </header>
      <div className='split-layout'>
        <Outlet />
        <Details />
      </div>
    </>
  );
};
