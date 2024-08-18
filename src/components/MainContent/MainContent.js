import React, { useState } from "react";
import "./MainContent.scss";

const MainContent = () => {
  const [formData, setFormData] = useState({
    field1: "",
    field2: "",
    field3: "",
  });

  const [submittedData, setSubmittedData] = useState(null);
  const [modeButton, setModeButton] = useState("send");
  const [dateNow, setDateNow] = useState("");
  const [error, setError] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.field1 || !formData.field2 || !formData.field3) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    setSubmittedData(formData);
    const now = new Date();
    const formattedDate = now.toLocaleString();
    setDateNow(formattedDate);
    setModeButton("clean");
    setIsDisabled(true);
  };

  const cleanSubmit = (e) => {
    e.preventDefault();
    setSubmittedData(null);
    setFormData({
      field1: "",
      field2: "",
      field3: "",
    });
    setModeButton("send");
    setError("");
    setIsDisabled(false);
  };

  return (
    <div className="main-content">
      <h1>Formulario de inscripción</h1>
      <div className="content-wrapper">
        <form className="form-container">
          <div className="form-group">
            <label htmlFor="field1">Nombre:</label>
            <input
              type="text"
              id="field1"
              name="field1"
              value={formData.field1}
              onChange={handleChange}
              disabled={isDisabled}
            />
          </div>
          <div className="form-group">
            <label htmlFor="field2">Correo:</label>
            <input
              type="text"
              id="field2"
              name="field2"
              value={formData.field2}
              onChange={handleChange}
              disabled={isDisabled}
            />
          </div>
          <div className="form-group">
            <label htmlFor="field3">Dirección de envío:</label>
            <input
              type="text"
              id="field3"
              name="field3"
              value={formData.field3}
              onChange={handleChange}
              disabled={isDisabled}
            />
          </div>

          <div className="form-group">
            {error && <p className="error-message">{error}</p>}
            <button
              type="submit"
              onClick={modeButton === "send" ? handleSubmit : cleanSubmit}
            >
              {modeButton === "send" ? "Enviar" : "Limpiar"}
            </button>
          </div>
        </form>

        {submittedData && (
          <div className="result-card">
            <h2>Inscripción finalizada</h2>
            <p>
              <strong>Nombre:</strong> {submittedData.field1}
            </p>
            <p>
              <strong>Correo:</strong> {submittedData.field2}
            </p>
            <p>
              <strong>Dirección de envío:</strong> {submittedData.field3}
            </p>

            <p>
              <strong>Fecha y hora de inscripción:</strong> {dateNow}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainContent;
