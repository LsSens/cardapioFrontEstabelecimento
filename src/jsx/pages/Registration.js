import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  loadingToggleAction,
  signupAction,
} from "../../store/actions/AuthActions";
import logo from "../../images/logo-full.png";
import Stepper from "../components/bootstrap/Stepper";
import OpenCageAutocomplete from "../components/Forms/Address/OpenCageAutocomplete";
import InputMask from "react-input-mask";
import {
  isValidCellPhone,
  isValidCNPJ,
  isValidEmail,
} from "../utils/checksForm";

function Register(props) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    phone: "",
    company: {
      name: "",
      cnpj: "",
      address: {
        cep: "",
        street: "",
        number: "",
        city: "",
        state: "",
        lat: "",
        lng: "",
      },
    },
  });

  const [errors, setErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  const loading = useSelector((state) => state.auth.showLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const steps = [
    "Informações pessoais",
    "Detalhes da empresa",
    "Endereço da empresa",
  ];

  function handleChange(e) {
    const { name, value } = e.target;

    if (name === "company.address.cep") {
      if (isNaN(value)) return;
      if (value.length > 8) return;
    }

    if (name === "company.address.number") {
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

  const handleAddressSelect = (address) => {
    setErrors({});
    const { components, geometry } = address;

    const cep = components.postcode;
    const neighborhood = components.suburb;
    const city = components.city;
    const state = components.state;
    const lat = geometry.lat;
    const lng = geometry.lng;

    setFormData((prevFormData) => ({
      ...prevFormData,
      company: {
        ...prevFormData.company,
        address: {
          ...prevFormData.company.address,
          cep: cep || "",
          neighborhood: neighborhood || "",
          city: city || "",
          state: state || "",
          lat: lat || "",
          lng: lng || "",
        },
      },
    }));
  };

  function validateStep() {
    const errorsObj = {};
    if (currentStep === 1) {
      if (!formData.email) {
        errorsObj.email = "Email é obrigatório";
      } else if (!isValidEmail(formData.email)) {
        errorsObj.email = "Email inválido";
      }
      if (!formData.password) {
        errorsObj.password = "Senha é obrigatório";
      } else if (formData.password.length < 8) {
        errorsObj.password = "Senha deve conter no minimo 8 caracteres";
      } else if (formData.password !== formData.confirmPassword) {
        errorsObj.confirmPassword = "As senhas não são iguais";
      }
      if (!formData.name) {
        errorsObj.name = "Nome é obrigatório";
      } else if (formData.name.length < 5) {
        errorsObj.name = "Nome muito curto";
      } else if (!/^[a-zA-ZÀ-ÿ]+(?:\s+[a-zA-ZÀ-ÿ]+)+$/.test(formData.name)) {
        errorsObj.name = "Informe o nome completo";
      }
      if (!formData.phone) {
        errorsObj.phone = "Telefone é obrigatório";
      } else if (!isValidCellPhone(formData.phone)) {
        errorsObj.phone = "Telefone inválido";
      }
    } else if (currentStep === 2) {
      if (!formData.company.name) {
        errorsObj["company.name"] = "Nome da empresa é obrigatório";
      } else if (formData.company.name.length < 6) {
        errorsObj["company.name"] = "Nome da empresa é muito curto";
      }
      if (!formData.company.cnpj) {
        errorsObj["company.cnpj"] = "CNPJ é obrigatório";
      } else if (!isValidCNPJ(formData.company.cnpj)) {
        errorsObj["company.cnpj"] = "CNPJ inválido";
      }
    } else if (currentStep === 3) {
      if (!formData.company.address.street)
        errorsObj["company.address.street"] = "Rua é obrigatório";
      if (!formData.company.address.number)
        errorsObj["company.address.number"] = "Número é obrigatório";
      if (!formData.company.address.city)
        errorsObj["company.address.city"] = "Cep inválido";
      if (!formData.company.address.state)
        errorsObj["company.address.state"] = "Cep inválido";
      if (!formData.company.address.cep)
        errorsObj["company.address.cep"] = "Cep é obrigatório";
    }
    setErrors(errorsObj);
    return Object.keys(errorsObj).length === 0;
  }

  function handleNext(e) {
    e.preventDefault();
    const isValid = validateStep();
    if (isValid) {
      setErrors({});
      setCurrentStep(currentStep + 1);
    }
  }

  function handleBack() {
    setErrors({});
    setCurrentStep(currentStep - 1);
  }

  function onSignUp(e) {
    e.preventDefault();

    const isValid = validateStep();
    if (isValid) {
      setErrors({});
      dispatch(loadingToggleAction(true));
      dispatch(signupAction(formData, navigate));
    }
  }

  return (
    <div className="authincation p-meddle">
      <div className="container">
        <div className="row justify-content-center h-100 align-items-center">
          <div className="col-md-6">
            <div className="authincation-content">
              <div className="auth-form">
                <div className="text-center mb-3">
                  <Link to="/login">
                    <img src={logo} alt="Logo" />
                  </Link>
                </div>
                <Stepper steps={steps} currentStep={currentStep} />
                <h4 className="text-center mb-4">{steps[currentStep - 1]}</h4>
                <form onSubmit={onSignUp}>
                  {currentStep === 1 && (
                    <>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group mb-3">
                            <label>
                              <strong>Nome completo</strong>
                            </label>
                            <input
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              className="form-control"
                              placeholder="Seu nome"
                              style={{
                                textTransform: "capitalize",
                              }}
                            />
                            {errors.name && (
                              <div className="text-danger">{errors.name}</div>
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
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
                              <div className="text-danger">{errors.email}</div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="form-group mb-3">
                        <label>
                          <strong>Telefone</strong>
                        </label>
                        <InputMask
                          mask="(99) 99999-9999"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="form-control"
                          placeholder="(00) 00000-0000"
                        />
                        {errors.phone && (
                          <div className="text-danger">{errors.phone}</div>
                        )}
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
                  {currentStep === 2 && (
                    <>
                      <div className="form-group mb-3">
                        <label>
                          <strong>Nome da empresa</strong>
                        </label>
                        <input
                          name="company.name"
                          value={formData.company.name}
                          onChange={handleChange}
                          className="form-control"
                          placeholder="Minha empresa"
                          style={{
                            textTransform: "capitalize",
                          }}
                        />
                        {errors["company.name"] && (
                          <div className="text-danger">
                            {errors["company.name"]}
                          </div>
                        )}
                      </div>
                      <div className="form-group mb-3">
                        <label>
                          <strong>CNPJ</strong>
                        </label>
                        <InputMask
                          mask="99.999.999/9999-99"
                          name="company.cnpj"
                          value={formData.company.cnpj}
                          onChange={handleChange}
                          className="form-control"
                          placeholder="00.000.000/0000-00"
                        />
                        {errors["company.cnpj"] && (
                          <div className="text-danger">
                            {errors["company.cnpj"]}
                          </div>
                        )}
                      </div>
                    </>
                  )}
                  {currentStep === 3 && (
                    <>
                      <div className="form-group mb-3">
                        <OpenCageAutocomplete
                          label="Digite o CEP"
                          onSelect={handleAddressSelect}
                          onChange={handleChange}
                          value={formData.company.address.cep}
                        />
                        {(errors["company.address.cep"] ||
                          errors["company.address.city"] ||
                          errors["company.address.state"]) && (
                          <div className="text-danger">
                            {errors["company.address.cep"] ||
                              errors["company.address.city"] ||
                              errors["company.address.state"]}
                          </div>
                        )}
                      </div>

                      {formData.company.address.city ? (
                        <div>
                          <div className="form-group mb-3">
                            <label>
                              <strong>Nome da rua</strong>
                            </label>
                            <input
                              name="company.address.street"
                              value={formData.company.address.street}
                              onChange={handleChange}
                              className="form-control"
                              placeholder="Nome da rua"
                              style={{
                                textTransform: "capitalize",
                              }}
                            />
                            {errors["company.address.street"] && (
                              <div className="text-danger">
                                {errors["company.address.street"]}
                              </div>
                            )}
                          </div>

                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group mb-3">
                                <label>
                                  <strong>Número</strong>
                                </label>
                                <input
                                  name="company.address.number"
                                  value={formData.company.address.number}
                                  onChange={handleChange}
                                  className="form-control"
                                  placeholder="Número"
                                />
                                {errors["company.address.number"] && (
                                  <div className="text-danger">
                                    {errors["company.address.number"]}
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="col-md-6">
                              <div className="form-group mb-3">
                                <label>
                                  <strong>Complemento (opcional)</strong>
                                </label>
                                <input
                                  name="company.address.complement"
                                  value={formData.company.address.complement}
                                  onChange={handleChange}
                                  className="form-control"
                                  placeholder="Complemento"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : null}
                    </>
                  )}
                  <div className="d-flex justify-content-between mt-4">
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
                      >
                        Proximo
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="btn btn-success"
                        disabled={loading}
                      >
                        Cadastrar
                      </button>
                    )}
                  </div>
                </form>
                <div className="new-account mt-3">
                  <p>
                    Já tenho conta{" "}
                    <Link className="text-primary" to="/login">
                      Entrar
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  errorMessage: state.auth.errorMessage,
  successMessage: state.auth.successMessage,
  showLoading: state.auth.showLoading,
});

export default connect(mapStateToProps)(Register);
