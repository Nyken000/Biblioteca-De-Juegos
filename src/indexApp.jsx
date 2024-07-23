import { useEffect, useState } from "react";
import { Formulario } from "./componentes/formApp";
import { Tabla } from "./componentes/tableApp";
import "./index.css";

// Función para inicializar los datos desde localStorage o usar un array vacío si no hay datos
const inicial = () => {
  return JSON.parse(localStorage.getItem("Biblioteca")) || [];
};

// Función para inicializar los géneros desde localStorage o usar géneros populares si no hay géneros guardados
const inicialGeneros = () => {
  const generosPopulares = [
    "Acción",
    "Aventura",
    "RPG",
    "Simulación",
    "Estrategia",
  ];
  const generosGuardados = JSON.parse(localStorage.getItem("Generos")) || [];
  return [...new Set([...generosPopulares, ...generosGuardados])];
};

export const IndexApp = () => {
  // Estado para almacenar los datos de la biblioteca
  const [data, setData] = useState(inicial);
  // Estado para almacenar el ítem actualmente en edición
  const [editItem, setEditItem] = useState(null);
  // Estado para almacenar la lista de géneros
  const [generos, setGeneros] = useState(inicialGeneros);
  // Estado para manejar el mensaje de error de ID ya existente
  const [showAlertaIdExistente, setShowAlertaIdExistente] = useState(false);

  // Función para agregar un nuevo ítem a la biblioteca
  const addData = (valores) => {
    if (data.some((item) => item.Id === valores.Id)) {
      setShowAlertaIdExistente(true); // Muestra la alerta en lugar de alert
      return;
    }
    setShowAlertaIdExistente(false); // Oculta la alerta si el ID es único
    setData([...data, valores]);

    // Actualiza la lista de géneros
    const nuevosGeneros = [
      ...new Set([
        ...generos,
        ...valores.Generos.split(",").map((g) => g.trim()),
      ]),
    ];
    setGeneros(nuevosGeneros);
    localStorage.setItem("Generos", JSON.stringify(nuevosGeneros));
  };

  // Función para actualizar un ítem existente en la biblioteca
  const updateData = (valores) => {
    const updatedData = data.map((item) =>
      item.Id === valores.Id ? valores : item
    );
    setData(updatedData);
    setEditItem(null); // Restablece el ítem en edición
  };

  // Función para eliminar un ítem de la biblioteca
  const deleteData = (item) => {
    setData(data.filter((i) => i.Id !== item.Id));
  };

  // Efecto para guardar los datos en localStorage cada vez que se actualiza el estado `data`
  useEffect(() => {
    localStorage.setItem("Biblioteca", JSON.stringify(data));
  }, [data]);

  // Función para agregar un nuevo género a la lista
  const addGenero = (nuevoGenero) => {
    if (!generos.includes(nuevoGenero)) {
      const nuevosGeneros = [...generos, nuevoGenero];
      setGeneros(nuevosGeneros);
      localStorage.setItem("Generos", JSON.stringify(nuevosGeneros));
    } else {
      alert("El género ya existe.");
    }
  };

  return (
    <>
      <div className="page-title-container">
        <h1 className="page-title">Biblioteca de Juegos</h1>
      </div>
      <div className="ripple-background">
        {/* Elementos de fondo para el efecto de onda */}
        <div className="circle xxlarge shade1"></div>
        <div className="circle xlarge shade2"></div>
        <div className="circle large shade3"></div>
        <div className="circle medium shade4"></div>
        <div className="circle small shade5"></div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="mt-3 col-4">
            {/* Componente para el formulario de entrada de datos */}
            <Formulario
              addNew={addData}
              updateData={updateData}
              editItem={editItem}
              generos={generos}
              addGenero={addGenero}
              showAlertaIdExistente={showAlertaIdExistente} // Pasar el estado de la alerta al Formulario
            />
          </div>
          <div className="mt-3 col-8">
            {/* Componente para mostrar la tabla de datos */}
            <Tabla info={data} delData={deleteData} setEditItem={setEditItem} />
          </div>
        </div>
      </div>
    </>
  );
};
