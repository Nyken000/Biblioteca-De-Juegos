import { useState, useEffect } from "react"

export const Formulario = ({ addNew, updateData, editItem, error }) => {
    const valoresIniciales = {
        Id: '',
        Nombre_Videojuego: '',
        Compañia: '',
        Generos: '',
        Año_Lanzamiento: ''
    }
    const [valores, setValores] = useState(valoresIniciales)
    const { Id, Nombre_Videojuego, Compañia, Generos, Año_Lanzamiento } = valores

    useEffect(() => {
        if (editItem) {
            setValores(editItem)
        }
    }, [editItem])

    const cambioInput = (e) => {
        setValores({
            ...valores,
            [e.target.name]: e.target.value
        })
    }

    const validarFormulario = () => {
        if (!Id || !Nombre_Videojuego || !Compañia || !Generos || !Año_Lanzamiento) {
            return 'Todos los campos son obligatorios.'
        }
        if (new Date(Año_Lanzamiento) > new Date()) {
            return 'La fecha de lanzamiento no puede ser en el futuro.'
        }
        return ''
    }

    const guardar = () => {
        const errorMensaje = validarFormulario()
        if (errorMensaje) {
            alert(errorMensaje)
            return
        }

        if (editItem) {
            updateData(valores)
        } else {
            addNew(valores)
        }

        setValores(valoresIniciales)
    }

    return (
        <>
            <form className="card">
                <div className="card-body">
                    {error && <div className="alert alert-danger">{error}</div>}
                    <div>
                        <label>ID</label>
                        <input
                            type="text"
                            name="Id"
                            value={Id}
                            onChange={cambioInput}
                            className="form-control"
                            readOnly={!!editItem} />
                    </div>
                    <div>
                        <label>Nombre</label>
                        <input type="text"
                            name="Nombre_Videojuego"
                            value={Nombre_Videojuego}
                            onChange={cambioInput}
                            className="form-control" />
                    </div>
                    <div>
                        <label>Compañia</label>
                        <input type="text"
                            name="Compañia"
                            value={Compañia}
                            onChange={cambioInput}
                            className="form-control" />
                    </div>
                    <div>
                        <label>Generos</label>
                        <input type="text"
                            name="Generos"
                            value={Generos}
                            onChange={cambioInput}
                            className="form-control" />
                    </div>
                    <div>
                        <label>Año de Lanzamiento</label>
                        <input type="date"
                            name="Año_Lanzamiento"
                            value={Año_Lanzamiento}
                            onChange={cambioInput}
                            className="form-control" />
                    </div>
                </div>
                <div className="card-footer text-end">
                    <input
                        type="button"
                        value={editItem ? 'Actualizar' : 'Agregar'}
                        onClick={guardar}
                        className="btn btn-primary" />
                </div>
            </form>
        </>
    )
}
