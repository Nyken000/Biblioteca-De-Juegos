//GeneroForm.jsx
import { useState } from "react";

export const GeneroForm = ({ addGenero }) => {
    //Estado local para almacenar el valor del campo de entrada
    const [genero, setGenero] = useState("");

    //Función para manejar los cambios en el campo de entrada
    const handleInputChange = (e) => {
        setGenero(e.target.value);
    };

    //Función para manejar la adición del nuevo género
    const handleAddGenero = () => {
        //Verifica que el campo de entrada no esté vacío antes de agregar el género
        if (genero.trim() !== "") {
            addGenero(genero.trim()); //Llama a la función para agregar el género
            setGenero(""); //Limpia el campo de entrada después de agregar el género
        }
    };

    return (
        <div className="card mt-3">
            <div className="card-body">
                <label>Agregar Género</label>
                <input
                    type="text"
                    value={genero} //El valor del campo de entrada está vinculado al estado local
                    onChange={handleInputChange} //Llama a la función de cambio al modificar el campo
                    className="form-control"
                />
                <button
                    type="button"
                    onClick={handleAddGenero} //Llama a la función de agregar al hacer clic en el botón
                    className="btn btn-primary mt-2"
                >
                    Agregar Género
                </button>
            </div>
        </div>
    );
};
