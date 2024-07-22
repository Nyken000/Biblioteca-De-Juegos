export const Tabla = ({ info, delData, setEditItem }) => {
    const eliminar = (item) => {
        delData(info.filter((i) => i.Id !== item.Id))
    }

    return (
        <div className="table-responsive">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre Videojuego</th>
                        <th>Compañía</th>
                        <th>Géneros</th>
                        <th>Año de Lanzamiento</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {info.map((item, index) => (
                        <tr key={index}>
                            <td>{item.Id}</td>
                            <td>{item.Nombre_Videojuego}</td>
                            <td>{item.Compañia}</td>
                            <td>{item.Generos}</td>
                            <td>{item.Año_Lanzamiento}</td>
                            <td>
                                <button
                                    type="button"
                                    className="btn btn-warning me-2"
                                    onClick={() => setEditItem(item)}
                                >
                                    Editar
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() => eliminar(item)}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
