import { Link } from "react-router-dom";

export default function NavBar({ isLoggedIn, handleLogout }) {
    return (
        <nav className="nav">
            <Link to="/" className="nav-title">
                User Account Management
            </Link>

            <ul>
                {isLoggedIn ? (
                    <>
                        <li>
                            <Link to="/profile">Profile</Link>
                        </li>
                        <li>
                            <Link to="/edit-profile">Update Profile</Link>
                        </li>
                        <li>
                            <Link to="/verify-me">Verify Me</Link>
                        </li>
                        <li>
                            <Link to="/profile-photo">Profile Photo</Link>
                        </li>
                        <li>
                            <Link to="/login" onClick={handleLogout}>
                                Logout
                            </Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/sign-up">Sign up</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
}
