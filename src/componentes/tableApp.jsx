import React, { useState } from "react";
import { FaExclamationTriangle } from "react-icons/fa";

export const Tabla = ({ info, delData, setEditItem }) => {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const eliminar = (item) => {
    setShowConfirmDelete(true);
    setItemToDelete(item);
  };

  const confirmDelete = () => {
    delData(itemToDelete);
    setShowConfirmDelete(false);
    setItemToDelete(null);
  };

  const cancelDelete = () => {
    setShowConfirmDelete(false);
    setItemToDelete(null);
  };

  const handleEdit = (item) => {
    setEditItem(item);
  };

  return (
    <>
      <table className="table table-dark table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre Video Juego</th>
            <th>Compañia</th>
            <th>Generos</th>
            <th>Fecha de Lanzamiento</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {info.length > 0 ? (
            info.map((item, index) => (
              <tr key={index}>
                <td>{item.Id}</td>
                <td>{item.Nombre_Videojuego}</td>
                <td>{item.Compañia}</td>
                <td>{item.Generos}</td>
                <td>{item.Año_Lanzamiento}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-warning btn-sm"
                    onClick={() => handleEdit(item)}
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => eliminar(item)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No hay datos para mostrar</td>
            </tr>
          )}
        </tbody>
      </table>

      {showConfirmDelete && (
        <div className="alert-custom show" role="alert">
          <FaExclamationTriangle className="me-2" style={{ fontSize: '1.5rem' }} />
          <div>
            <p>¿Estás seguro de que deseas eliminar el ítem con ID {itemToDelete?.Id}?</p>
            <button className="btn btn-danger me-2" onClick={confirmDelete}>Sí</button>
            <button className="btn btn-secondary" onClick={cancelDelete}>No</button>
          </div>
        </div>
      )}
    </>
  );
};
