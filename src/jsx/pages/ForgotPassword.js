import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import logo from "../../images/logo-full.png";
import Stepper from "../components/bootstrap/Stepper";
import { isValidEmail } from "../utils/checksForm";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, resetPassword } from "../../services/AuthService";
import { loadingToggleAction } from "../../store/actions/AuthActions";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const loading = useSelector((state) => state.auth.showLoading);
  const [formData, setFormData] = useState({
    email: "",
    token: "",
    password: "",
    confirmPassword: "",
  });

  const steps = ["Seus dados", "Novos dados"];

  const resetForm = () => {
    setFormData({ email: "", token: "", password: "", confirmPassword: "" });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateStep();
    if (isValid) {
      setErrors({});
      dispatch(loadingToggleAction(true));
      try {
        await resetPassword(formData.token, formData.password);
        console.log("sucesso resetado");
        navigate("/login");
      } catch (error) {
        console.log("Não foi possível redefinir a senha.");
      } finally {
        dispatch(loadingToggleAction(false));
      }
    }
  };

  async function handleNext(e) {
    e.preventDefault();
    const isValid = validateStep();
    if (isValid) {
      dispatch(loadingToggleAction(true));
      setErrors({});
      try {
        await forgotPassword(formData.email);
        console.log("E-mail enviado com instruções de redefinição.");
      } catch (error) {
        console.log("Não foi possível enviar o e-mail.");
      } finally {
        dispatch(loadingToggleAction(false));
      }
    }
  }

  function handleBack() {
    resetForm();
    setErrors({});
    setCurrentStep(currentStep - 1);
  }

  function handleChange(e) {
    const { name, value } = e.target;

    if (name === "token") {
      if (isNaN(value)) return;
      if (value.length > 6) return;
    }

    setFormData((prevFormData) => {
      const keys = name.split(".");

      let nestedState = { ...prevFormData };

      let currentLevel = nestedState;
      for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        currentLevel[key] = { ...currentLevel[key] };
        currentLevel = currentLevel[key];
      }

      currentLevel[keys[keys.length - 1]] = value;

      return nestedState;
    });

    setErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors };
      delete updatedErrors[name];
      return updatedErrors;
    });
  }

  function validateStep() {
    const errorsObj = {};
    if (currentStep === 1) {
      if (!formData.email) {
        errorsObj.email = "Email é obrigatório";
      } else if (!isValidEmail(formData.email)) {
        errorsObj.email = "Email inválido";
      }
    }
    if (currentStep === 2) {
      if (!formData.token) {
        errorsObj.token = "Token é obrigatório";
      }
      if (!formData.password) {
        errorsObj.password = "Senha é obrigatório";
      } else if (formData.password.length < 8) {
        errorsObj.password = "Senha deve conter no minimo 8 caracteres";
      } else if (formData.password !== formData.confirmPassword) {
        errorsObj.confirmPassword = "As senhas não são iguais";
      }
    }
    setErrors(errorsObj);
    return Object.keys(errorsObj).length === 0;
  }

  // Verifica se existe um token na URL
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const urlToken = searchParams.get("token");
    const urlEmail = searchParams.get("email");

    if (urlToken) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        token: urlToken,
        email: urlEmail,
      }));
      setCurrentStep(2);
    }
  }, [location.search]);

  return (
    <div className="authincation h-100 p-meddle">
      <div className="container h-100">
        <div className="row justify-content-center h-100 align-items-center">
          <div className="col-md-6">
            <div className="authincation-content">
              <div className="row no-gutters">
                <div className="col-xl-12">
                  <div className="auth-form">
                    <div className="text-center mb-3">
                      <Link to="/dashboard">
                        <img src={logo} alt="" />
                      </Link>
                    </div>
                    <h4 className="text-center mb-1">Esqueci minha senha</h4>
                    <Stepper steps={steps} currentStep={currentStep} />
                    <form
                      className="d-flex flex-column"
                      onSubmit={(e) => onSubmit(e)}
                    >
                      {currentStep === 1 && (
                        <div className="row">
                          <div className="col-md-12">
                            <div className="form-group mb-3">
                              <label>
                                <strong>Email</strong>
                              </label>
                              <input
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="seuemail@email.com"
                              />
                              {errors.email && (
                                <div className="text-danger">
                                  {errors.email}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                      {currentStep === 2 && (
                        <>
                          <div className="row">
                            <div className="col-md-12">
                              <div className="form-group mb-3">
                                <label>
                                  <strong>Email</strong>
                                </label>
                                <input
                                  name="email"
                                  type="email"
                                  value={formData.email}
                                  onChange={handleChange}
                                  className="form-control"
                                  placeholder="seuemail@email.com"
                                  disabled
                                />
                                {errors.email && (
                                  <div className="text-danger">
                                    {errors.email}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group mb-3">
                                <label>
                                  <strong>Senha</strong>
                                </label>
                                <input
                                  name="password"
                                  type="password"
                                  value={formData.password}
                                  onChange={handleChange}
                                  className="form-control"
                                />
                                {errors.password && (
                                  <div className="text-danger">
                                    {errors.password}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group mb-3">
                                <label>
                                  <strong>Confirmar Senha</strong>
                                </label>
                                <input
                                  name="confirmPassword"
                                  type="password"
                                  value={formData.confirmPassword}
                                  onChange={handleChange}
                                  className="form-control"
                                />
                                {errors.confirmPassword && (
                                  <div className="text-danger">
                                    {errors.confirmPassword}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                      <div className="d-flex justify-content-between">
                        {currentStep > 1 && (
                          <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={handleBack}
                          >
                            Voltar
                          </button>
                        )}
                        {currentStep < steps.length ? (
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleNext}
                            disabled={loading}
                          >
                            Enviar email
                          </button>
                        ) : (
                          <button
                            type="submit"
                            className="btn btn-success"
                            disabled={loading}
                          >
                            Alterar senha
                          </button>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
