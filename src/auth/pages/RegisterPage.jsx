import Swal from "sweetalert2";
import { useAuthStore, useForm } from "../../hooks";
import "./LoginPage.css";
import { useEffect } from "react";

const registerFormFields = {
  registerName: "",
  registerEmail: "",
  registerPassword: "",
  registerPassword2: "",
};

export const RegisterPage = () => {
  const { startRegister, errorMessage } = useAuthStore();

  const {
    registerEmail,
    registerName,
    registerPassword,
    registerPassword2,
    onInputChange: onRegisterInputChange,
  } = useForm(registerFormFields);

  const registerSubmit = (event) => {
    event.preventDefault();
    if (registerPassword !== registerPassword2) {
      Swal.fire(
        "Error en el registro",
        "Las passwords no son iguales",
        "error"
      );
      return;
    }

    startRegister({
      name: registerName,
      email: registerEmail,
      password: registerPassword,
    });
  };
  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire("Error en la autentificacion", errorMessage, "error");
    }
  }, [errorMessage]);

  return (
    <div className="container">
      <div className="row min-vh-100 align-items-center justify-content-center">
        <div className="login-form-2">
          <div>
            <h3>Registro</h3>
            <form onSubmit={registerSubmit}>
              <div className="form-group mb-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre"
                  name="registerName"
                  value={registerName}
                  onChange={onRegisterInputChange}
                />
              </div>
              <div className="form-group mb-2">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Correo"
                  name="registerEmail"
                  value={registerEmail}
                  onChange={onRegisterInputChange}
                />
              </div>
              <div className="form-group mb-2">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Contraseña"
                  name="registerPassword"
                  value={registerPassword}
                  onChange={onRegisterInputChange}
                />
              </div>
              <div className="form-group mb-2">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Repita la contraseña"
                  name="registerPassword2"
                  value={registerPassword2}
                  onChange={onRegisterInputChange}
                />
              </div>
              <div className="mt-4">
                <input
                  type="submit"
                  className=" btn btn-light w-100 center"
                  value="Crear cuenta"
                />
              </div>
            </form>
          </div>
          <div className="mt-2">
            <h5>
              Ya tienes una cuenta? <a href="/auth/login">Logearse</a>
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};
