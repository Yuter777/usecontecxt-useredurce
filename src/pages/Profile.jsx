import { useAuth } from "../hooks/useAuth";

const Profile = () => {
  const { user, logout } = useAuth();

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 text-center">
          <h1 className="mb-4">Welcome, {user}!</h1>
          <button className="btn btn-outline-primary" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
