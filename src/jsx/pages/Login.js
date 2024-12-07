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

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let errorsObj = { email: "", password: "" };
  const [errors, setErrors] = useState(errorsObj);
  const loading = useSelector((state) => state.auth.showLoading);

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
                      <div className="mb-3">
                        <label className="mb-1">
                          <strong>Senha</strong>
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors.password && (
                          <div className="text-danger fs-12">
                            {errors.password}
                          </div>
                        )}
                      </div>
                      <div className="row d-flex justify-content-between mt-4 mb-2">
                        <div className="mb-3">
                          <div className="form-check custom-checkbox ms-1">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="basic_checkbox_1"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="basic_checkbox_1"
                            >
                              Lembrar de mim
                            </label>
                          </div>
                        </div>
                        {/* <div className="mb-3">
													<Link to="/page-register">Sign up</Link>
												</div> */}
                      </div>
                      <div className="text-center">
                        <button
                          type="submit"
                          disabled={loading}
                          className="btn btn-primary btn-block"
                        >
                          Cadastrar
                        </button>
                      </div>
                    </form>
                    <div className="text-center">
                      <span>
                        Não tem conta?{" "}
                        <NavLink to="/register" className="text-primary">
                          {" "}
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
