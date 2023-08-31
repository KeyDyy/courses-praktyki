import React from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { useUser } from '@/app/context/user';

const Header: React.FC = () => {
  const pathname = usePathname();
  const isActive: (pathname: string) => boolean = (pathname) =>
    pathname === pathname;

  const { user, logout } = useUser();

  let left = (
    <div className="left">
      <Link href="/">
        <a className="bold" data-active={isActive("/")}>
          Feed
        </a>
      </Link>
      {/* Rest of the left navigation */}
    </div>
  );

  let right = null;


  if (status === 'loading') {
    left = (
      <div className="left">
        <Link href="/">
          <a className="bold" data-active={isActive("/")}>
            Feed
          </a>
        </Link>
        <style jsx>{`
          .bold {
            font-weight: bold;
          }

          a {
            text-decoration: none;
            color: #000;
            display: inline-block;
          }

          .left a[data-active="true"] {
            color: gray;
          }

          a + a {
            margin-left: 1rem;
          }
        `}</style>
      </div>
    );
    right = (
      <div className="right">
        <p>Validating session ...</p>
        <style jsx>{`
          .right {
            margin-left: auto;
          }
        `}</style>
      </div>
    );
  }

  if (!session) {
    right = (
      <div className="right">
        <Link href="/api/auth/signin">
          <a data-active={isActive("/signup")}>Log in</a>
        </Link>
        <style jsx>{`
          a {
            text-decoration: none;
            color: #000;
            display: inline-block;
          }

          a + a {
            margin-left: 1rem;
          }

          .right {
            margin-left: auto;
          }

          .right a {
            border: 1px solid black;
            padding: 0.5rem 1rem;
            border-radius: 3px;
          }
        `}</style>
      </div>
    );
  }

  if (session) {
    left = (
      <div className="left">
        <Link href="/">
          <a className="bold" data-active={isActive("/")}>
            Feed
          </a>
        </Link>
        <Link href="/drafts">
          <a data-active={isActive("/drafts")}>My drafts</a>
        </Link>
        {/* Rest of the left navigation */}
      </div>
    );
    right = (
      <div className="right">
        {session.user ? ( // Check if session.user is defined before rendering
          <p>
            {session.user.name} ({session.user.email})
          </p>
        ) : null}
        <Link href="/create">
          <button>
            <a>New post</a>
          </button>
        </Link>
        <button onClick={() => signOut()}>
          <a>Log out</a>
        </button>
        {/* Rest of the right navigation */}
      </div>
    );
  }

  return (
    <nav>
      {left}
      {right}
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
