import { Link, Outlet } from 'react-router';
import { Details } from '@/components/Details.tsx';
import {ThemeToggle} from "@/components/ThemeToggle.tsx";

export const Layout = () => {
  return (
    <>
      <header>
        <Link to='/about'>About</Link>
        <ThemeToggle/>
      </header>
      <div className='split-layout'>
        <Outlet />
        <Details />
      </div>
    </>
  );
};
