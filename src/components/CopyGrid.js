import React from 'react'

export const CopyGrid = ({copy}) => {

    console.log('copygrid'+copy);
    
    return (
        <>
            <table className='table table-dark'>
                <thead className="thead-dark">
                    <tr>
                        <th>Nivel</th>
                        <th>Nombre de variable</th>
                        <th>Tipo de variable</th>
                        <th>Información</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </>
    )
}
