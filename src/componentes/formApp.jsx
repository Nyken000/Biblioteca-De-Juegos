import React, { useState, useEffect } from "react";
import Select from "react-select";
import { FaExclamationTriangle } from "react-icons/fa";

export const Formulario = ({
  addNew,
  updateData,
  editItem,
  generos,
  addGenero,
  data,
  showAlertaIdExistente // Recibir el estado de la alerta desde IndexApp
}) => {
  // Valores iniciales para el formulario
  const valoresIniciales = {
    Id: "",
    Nombre_Videojuego: "",
    Compañia: "",
    Generos: [],
    Año_Lanzamiento: "",
  };

  // Estados del formulario
  const [valores, setValores] = useState(valoresIniciales);
  const [selectedGeneros, setSelectedGeneros] = useState([]);
  const [nuevoGenero, setNuevoGenero] = useState("");
  const [errores, setErrores] = useState({});
  const [touched, setTouched] = useState({});
  const { Id, Nombre_Videojuego, Compañia, Año_Lanzamiento } = valores;

  // Efecto para cargar datos en el formulario cuando se edita un ítem
  useEffect(() => {
    if (editItem) {
      setValores(editItem);
      setSelectedGeneros(
        editItem.Generos.split(",").map((g) => ({
          label: g.trim(),
          value: g.trim(),
        }))
      );
    } else {
      setValores(valoresIniciales);
      setSelectedGeneros([]);
    }
  }, [editItem]);

  // Maneja el cambio en los campos del formulario
  const cambioInput = (e) => {
    const { name, value } = e.target;

    // Restricción para solo números en el campo ID
    if (name === "Id" && !/^\d*$/.test(value)) {
      return;
    }

    setValores({
      ...valores,
      [name]: value,
    });

    // Marcar el campo como tocado cuando el usuario comienza a interactuar con él
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  // Maneja el cambio en el selector de géneros
  const handleGenerosChange = (selectedOptions) => {
    setSelectedGeneros(selectedOptions);
    setValores({
      ...valores,
      Generos: selectedOptions.map((option) => option.value).join(", "),
    });
    setTouched({
      ...touched,
      Generos: true,
    });
  };

  // Maneja el cambio en el input para un nuevo género
  const handleNuevoGeneroChange = (e) => {
    setNuevoGenero(e.target.value);
  };

  // Maneja la adición de un nuevo género
  const handleAddGenero = () => {
    if (nuevoGenero.trim() !== "" && !generos.includes(nuevoGenero.trim())) {
      addGenero(nuevoGenero.trim());
      setNuevoGenero("");
    } else if (generos.includes(nuevoGenero.trim())) {
      alert("El género ya existe.");
    }
  };

  // Valida el formulario y muestra errores si los hay
  const validarFormulario = () => {
    const nuevosErrores = {};
    if (!Id) {
      nuevosErrores.Id = "Debe ingresar un ID válido.";
    }
    if (!Nombre_Videojuego) {
      nuevosErrores.Nombre_Videojuego = "Debe ingresar un nombre.";
    }
    if (!Compañia) {
      nuevosErrores.Compañia = "Debe ingresar una compañía.";
    }
    if (!selectedGeneros.length) {
      nuevosErrores.Generos = "Debe seleccionar al menos un género.";
    }
    if (!Año_Lanzamiento) {
      nuevosErrores.Año_Lanzamiento = "Debe ingresar un año de lanzamiento.";
    } else if (new Date(Año_Lanzamiento) > new Date()) {
      nuevosErrores.Año_Lanzamiento =
        "La fecha de lanzamiento no puede ser en el futuro.";
    }
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  // Guarda los datos del formulario y resetea los valores
  const handleSubmit = (e) => {
    e.preventDefault();

    // Marcar todos los campos como tocados cuando se intenta guardar
    setTouched({
      Id: true,
      Nombre_Videojuego: true,
      Compañia: true,
      Generos: true,
      Año_Lanzamiento: true,
    });

    // Solo verificar si el ID ya existe cuando estamos agregando un nuevo ítem
    if (!editItem && data && data.some((item) => item.Id === valores.Id)) {
      // No hacer nada si se muestra la alerta desde IndexApp
      return;
    }

    if (validarFormulario()) {
      if (editItem) {
        updateData(valores);
      } else {
        addNew(valores);
      }

      // Resetea el formulario y estados de error/tocado
      setValores(valoresIniciales);
      setSelectedGeneros([]);
      setErrores({});
      setTouched({});
    }
  };

  // Obtiene la clase para el campo en función del estado de errores y si ha sido tocado
  const getClassName = (field) => {
    if (!touched[field]) {
      return "form-control";
    }
    return errores[field] ? "form-control is-invalid" : "form-control is-valid";
  };

  return (
    <>
      {showAlertaIdExistente && !editItem && (
        <div className="alert alert-warning d-flex align-items-center alert-custom show" role="alert">
          <FaExclamationTriangle className="me-2" style={{ fontSize: '1.5rem' }} />
          <div>
            El ID ya existe. Por favor, ingrese un ID único.
          </div>
        </div>
      )}
      <form className="card" onSubmit={handleSubmit}>
        <div className="card-body">
          <div>
            <label>ID</label>
            <input
              type="text"
              name="Id"
              value={Id}
              onChange={cambioInput}
              className={getClassName("Id")}
              readOnly={!!editItem}
            />
            {errores.Id && <div className="invalid-feedback">{errores.Id}</div>}
          </div>
          <div>
            <label>Nombre</label>
            <input
              type="text"
              name="Nombre_Videojuego"
              value={Nombre_Videojuego}
              onChange={cambioInput}
              className={getClassName("Nombre_Videojuego")}
            />
            {errores.Nombre_Videojuego && (
              <div className="invalid-feedback">
                {errores.Nombre_Videojuego}
              </div>
            )}
          </div>
          <div>
            <label>Compañia</label>
            <input
              type="text"
              name="Compañia"
              value={Compañia}
              onChange={cambioInput}
              className={getClassName("Compañia")}
            />
            {errores.Compañia && (
              <div className="invalid-feedback">{errores.Compañia}</div>
            )}
          </div>
          <div>
            <label>Fecha de Lanzamiento</label>
            <input
              type="date"
              name="Año_Lanzamiento"
              value={Año_Lanzamiento}
              onChange={cambioInput}
              className={getClassName("Año_Lanzamiento")}
            />
            {errores.Año_Lanzamiento && (
              <div className="invalid-feedback">{errores.Año_Lanzamiento}</div>
            )}
          </div>
          <div>
            <label>Géneros</label>
            <Select
              isMulti
              value={selectedGeneros}
              onChange={handleGenerosChange}
              options={generos.map((g) => ({ label: g, value: g }))}
              className={`basic-multi-select ${
                errores.Generos && touched.Generos ? "is-invalid" : "is-valid"
              }`}
              classNamePrefix="select"
            />
            {errores.Generos && (
              <div className="invalid-feedback d-block">{errores.Generos}</div>
            )}
          </div>
          <div>
            <label>Nuevo Género</label>
            <input
              type="text"
              value={nuevoGenero}
              onChange={handleNuevoGeneroChange}
              className="form-control"
            />
            <button
              type="button"
              onClick={handleAddGenero}
              className="btn btn-primary mt-2"
            >
              Agregar Género
            </button>
          </div>
          <button type="submit" className="btn btn-success mt-3">
            {editItem ? "Actualizar" : "Guardar"}
          </button>
        </div>
      </form>
    </>
  );
};
