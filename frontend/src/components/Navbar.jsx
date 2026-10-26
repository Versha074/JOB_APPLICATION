
function Navbar() {
  return (
    <nav className="navbar">
      <a href="/" className="brand">
        <span className="brand-logo">J</span>
        <span>JobTrack</span>
      </a>

      <div className="nav-links">
        <a href="#applications" className="active">
          My Applications
        </a>
        <a href="#search">Find Jobs</a>
        <a href="#add-job">Add Application</a>
      </div>

      <div className="nav-profile">
        <span className="profile-avatar">J</span>
      </div>
    </nav>
  );
}

export default Navbar;
