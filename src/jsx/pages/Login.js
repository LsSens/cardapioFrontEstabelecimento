import React, { useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import {
  loadingToggleAction,
  loginAction,
} from "../../store/actions/AuthActions";

//

import logo from "../../images/logo-full.png";
import bgimage from "../../images/login-img/pic-5.jpg";

function Login(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("admin@company.com");
  const [password, setPassword] = useState("senha123");
  const [showPassword, setShowPassword] = useState(false);

  const loading = useSelector((state) => state.auth.showLoading);

  let errorsObj = { email: "", password: "" };
  const [errors, setErrors] = useState(errorsObj);

  async function onLogin(e) {
    e.preventDefault();
    let error = false;
    const errorObj = { ...errorsObj };
    if (email === "") {
      errorObj.email = "Email é obrigatório";
      error = true;
    }
    if (password === "") {
      errorObj.password = "Senha é obrigatório";
      error = true;
    }
    setErrors(errorObj);
    if (error) {
      return;
    }

    dispatch(loadingToggleAction(true));

    dispatch(loginAction(email, password, navigate));
  }

  return (
    <div className="container mt-0">
      <div className="row  align-items-center justify-contain-center bg-login">
        <div className="col-xl-12 mt-5">
          <div className="card border-0">
            <div className="card-body login-bx">
              <div className="row mt-5">
                <div className="col-xl-8 col-md-6  text-center">
                  <img src={bgimage} className="food-img" alt="" />
                </div>
                <div className="col-xl-4 col-md-6 pe-0">
                  <div className="sign-in-your">
                    <div className="text-center mb-3">
                      <img src={logo} className="mb-3" alt="" />
                      <h4 className="fs-20 font-w800 text-black">
                        Bem vindo de volta
                      </h4>
                      <span className="dlab-sign-up">Entrar</span>
                    </div>
                    {props.errorMessage && (
                      <div className="bg-red-300 text-red-900 border border-red-900 p-1 my-2">
                        {props.errorMessage}
                      </div>
                    )}
                    {props.successMessage && (
                      <div className="bg-green-300 text-green-900 border border-green-900 p-1 my-2">
                        {props.successMessage}
                      </div>
                    )}
                    <form onSubmit={onLogin}>
                      <div className="mb-3">
                        <label className="mb-1">
                          <strong>Email</strong>
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="admin@lucassens.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && (
                          <div className="text-danger fs-12">
                            {errors.email}
                          </div>
                        )}
                      </div>
                      <div className="input-group">
                        <input
                          type={showPassword ? "text" : "password"}
                          className="form-control"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <span
                          className="input-group-text"
                          role="button"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title={
                            showPassword ? "Ocultar senha" : "Exibir senha"
                          }
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          <i
                            className={`bi ${
                              showPassword ? "bi-eye-slash" : "bi-eye"
                            }`}
                          ></i>
                        </span>
                      </div>
                      <div className="row d-flex justify-content-between mt-2">
                        <div className="mb-4 d-flex justify-content-between align-items-center">
                          <div className="form-check custom-checkbox ms-1">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="basic_checkbox_1"
                            />
                            <label
                              className="form-check-label mb-0"
                              htmlFor="basic_checkbox_1"
                            >
                              Lembrar de mim
                            </label>
                          </div>
                          <div>
                            <NavLink
                              to="/forgot-password"
                              className="text-primary text-decoration-none"
                            >
                              Esqueceu sua senha?
                            </NavLink>
                          </div>
                        </div>
                      </div>
                      <div className="text-center">
                        <button
                          type="submit"
                          disabled={loading}
                          className="btn btn-primary btn-block"
                        >
                          Entrar
                        </button>
                      </div>
                    </form>
                    <div className="text-center mt-1">
                      <span>
                        Não tem conta?{" "}
                        <NavLink to="/register" className="text-primary">
                          Cadastrar
                        </NavLink>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    errorMessage: state.auth.errorMessage,
    successMessage: state.auth.successMessage,
    showLoading: state.auth.showLoading,
  };
};

export default connect(mapStateToProps)(Login);
