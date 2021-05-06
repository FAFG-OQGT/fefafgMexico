import React, { useState} from 'react';
import DualListBox from 'react-dual-listbox';


const options = [
    {
        label: '--',
        options: [
            { value: '1', label: 'Home' },
        ],
    },
    {
        label: 'Catalogos',
        options: [
            { value: '4', label: 'Personas' },
        ],
    },
    {
        label: 'Seguridad',
        options: [
            { value: '5', label: 'Usuarios' },
            { value: '9', label: 'Roles' },
        ],
    },
    {
        label: 'Reportes',
        options: [
            { value: '8', label: 'Reporte 1' }
        ],
    },
];

function ObjetoAccesoSelect(props){
    const [selected,setSelected] = useState()
    const onChange = (selected)=>  {
        setSelected(selected);
    }
    
    return (
        <DualListBox
        name="moons"
        options={options}
        selected={selected}
        onChange={onChange}
        className="h-100"
    />
    );
}

export default ObjetoAccesoSelect