import React from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { useUser } from '@/app/context/user';

const Header: React.FC = () => {
  const pathname = usePathname();
  const isActive: (pathname: string) => boolean = (path) =>
    pathname === path;

  const { user, logout } = useUser();

  return (
    <header className="header">
      <nav className="container">
        <div className="logo">
          <Link href="/">
            <p>Forum</p>
          </Link>
        </div>
        {user && (<p id="welcome" className="navbar-list-right">
          Witaj{user.email ? `, ${user.email}` : ""}!
        </p>
        )}
        <div className="navigation">
          <Link href="/">
            <p className={isActive("/") ? "active" : ""}>Feed</p>
          </Link>
          {user && (
            <>

              <Link href="/drafts">
                <p className={isActive("/drafts") ? "active" : ""}>My Drafts</p>
              </Link>
              <Link href="/create">
                <p>New Post</p>
              </Link>
              <button className="logout" onClick={logout}>
                Log Out
              </button>

            </>
          )}
          {!user && (
            <Link href="/auth">
              <p>Log In</p>
            </Link>
          )}
        </div>
      </nav>
      <style jsx>{`
        .header {
          background-color: #333;
          color: white;
        }
        .container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 2rem;
        }
        .logo a {
          font-size: 1.5rem;
          font-weight: bold;
          color: white;
          text-decoration: none;
        }
        .navigation a {
          margin-right: 1rem;
          color: white;
          text-decoration: none;
        }
        .navigation a.active {
          font-weight: bold;
        }
        .navigation button {
          border: none;
          background-color: transparent;
          color: white;
          cursor: pointer;
        }
        .navigation button.logout {
          font-weight: bold;
        }
      `}</style>
    </header>
  );
};

export default Header;