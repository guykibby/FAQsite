import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="header">
      <Link to="/" className="header-btn">
        Home
      </Link>
      <Link to="/dashboard" className="header-btn dashboard">
        Dashboard
      </Link>
      <Link to="/login" className="header-btn dashboard">
        Sign Out
      </Link>
    </header>
  )
}

export default Header