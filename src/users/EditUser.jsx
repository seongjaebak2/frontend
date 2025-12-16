import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditUser() {
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
  });

  const { name, username, email } = user;
  let navigate = useNavigate();
  const { id } = useParams();

  const loadUsers = async () => {
    const result = await axios.get(`http://localhost:8080/users/${id}`);
    setUser(result.data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/users/${id}`, user);
    navigate("/");
  };

  const onInputChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">유저 수정</h2>
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                이름
              </label>
              <input
                required
                type="text"
                id="name"
                className="form-control"
                placeholder="이름 입력"
                name="name"
                onChange={onInputChange}
              />
              <label htmlFor="name" className="form-label">
                유저네임
              </label>
              <input
                required
                type="text"
                id="username"
                className="form-control"
                placeholder="유저네임 입력"
                name="username"
                onChange={onInputChange}
              />
              <label htmlFor="name" className="form-label">
                이메일
              </label>
              <input
                required
                type="text"
                id="email"
                className="form-control"
                placeholder="이메일 입력"
                name="email"
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3 text-center">
              <button
                type="submit"
                className="btn btn-outline-primary px-3 mx-2"
              >
                수정
              </button>
              <button
                type="submit"
                className="btn btn-outline-danger px-3 mx-2"
              >
                취소
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
