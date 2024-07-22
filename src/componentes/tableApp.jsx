export const Tabla = ({ info, delData, setEditItem }) => {
    const eliminar = (item) => {
        delData(info.filter((i)=> i.Id !== item.Id))
    }

    return (
        <>
            <div className="row">
                {info.map((item, index) => (
                    <div className="col-3 mb-3" key={index}>
                        <div className="card">
                            <div className="card-header">
                                {item.Nombre_Videojuego}
                                <button type="button" className="btn-close" aria-label="Close"
                                    onClick={() => eliminar(item)}></button>
                            </div>
                            <div className="card-body">{item.error}</div>
                            <p>ID {item.Id}</p>
                            <p>Nombre Videojuego {item.Nombre_Videojuego}</p>
                            <p>Compañia {item.Compañia}</p>
                            <p>Generos {item.Generos}</p>
                            <p>Año Lanzamiento {item.Año_Lanzamiento}</p>
                            <button type="button" className="btn btn-warning" onClick={() => setEditItem(item)}>Editar</button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

