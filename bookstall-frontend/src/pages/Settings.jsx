import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Settings() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    profileImage: "",
  });

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (savedUser) {
      setUser({
        name: savedUser.name || "",
        email: savedUser.email || "",
        password: savedUser.password || "",
        profileImage: savedUser.profileImage || "",
      });
    }
  }, []);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setUser((prev) => ({
        ...prev,
        profileImage: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  const removePhoto = () => {
    setUser((prev) => ({
      ...prev,
      profileImage: "",
    }));
  };

  const saveChanges = () => {
    localStorage.setItem("user", JSON.stringify(user));

    alert("Profile updated successfully!");

    navigate("/profile");
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="card shadow-lg p-4">

        <h2 className="text-center mb-4">
          ⚙ Account Settings
        </h2>

        <hr />

        <div className="text-center mb-4">

          <img
            src={
              user.profileImage ||
              "https://cdn-icons-png.flaticon.com/512/847/847969.png"
            }
            alt="Profile"
            width="140"
            height="140"
            className="rounded-circle border border-3 shadow"
            style={{ objectFit: "cover" }}
          />

          <div className="mt-3">

            <input
              type="file"
              accept="image/*"
              className="form-control"
              onChange={handleImageChange}
            />

            <button
              className="btn btn-outline-danger mt-3"
              onClick={removePhoto}
            >
              Remove Photo
            </button>

          </div>

        </div>

        <div className="mb-3">
          <label className="form-label">
            Name
          </label>

          <input
            type="text"
            name="name"
            className="form-control"
            value={user.name}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">
            Email
          </label>

          <input
            type="email"
            name="email"
            className="form-control"
            value={user.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="form-label">
            Password
          </label>

          <input
            type="password"
            name="password"
            className="form-control"
            value={user.password}
            onChange={handleChange}
          />
        </div>

        <div className="d-flex justify-content-between">

          <button
            className="btn btn-secondary"
            onClick={() => navigate("/profile")}
          >
            Cancel
          </button>

          <button
            className="btn btn-primary"
            onClick={saveChanges}
          >
            Save Changes
          </button>

        </div>

      </div>
    </div>
  );
}

export default Settings;