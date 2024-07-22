import React, { useEffect, useState } from "react";
import { Formulario } from "./componentes/formApp";
import { Tabla } from "./componentes/tableApp";
import { initNeonCursor } from './neonCursor';

const inicial = () => {
    return JSON.parse(localStorage.getItem('Biblioteca')) || [];
}

export const IndexApp = () => {
    const [data, setData] = useState(inicial);
    const [editItem, setEditItem] = useState(null);

    useEffect(() => {
        initNeonCursor();
    }, []);

    const addData = (valores) => {
        if (data.some(item => item.Id === valores.Id)) {
            alert('El ID ya existe. Por favor, ingrese un ID único.');
            return;
        }
        setData([...data, valores]);
    }

    const updateData = (valores) => {
        const updatedData = data.map(item => item.Id === valores.Id ? valores : item);
        setData(updatedData);
        setEditItem(null);
    }

    useEffect(() => {
        localStorage.setItem('Biblioteca', JSON.stringify(data));
    }, [data]);

    const deleteData = (valor) => {
        setData(valor);
    }

    return (
        <>
            <div id="app"></div>
            <div id="main-content">
                <div className="bg-success p-5 text-center text-white">
                    <h1>Datos</h1>
                </div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="mt-3 col-4">
                            <Formulario addNew={addData} updateData={updateData} editItem={editItem} />
                        </div>
                        <div className="mt-3 col-8">
                            <Tabla info={data} delData={deleteData} setEditItem={setEditItem} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
