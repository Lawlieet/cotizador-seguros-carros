import React, { useState } from 'react'
import styled from '@emotion/styled'
import {obtenerDiferenciaYear, calcularMarca, obtenerPlan} from '../healper'
import PropTypes from 'prop-types'

const Campo = styled.div`
    display:flex;
    margin-bottom: 1rem;
    align-items:center;
`;

const Label = styled.label`
    flex: 0 0 100px;
`;

const Select = styled.select`
    display:block;
    width: 100%;
    padding: 1rem;
    border: 1px solid #e1e1e1;
    -webkit-appearance: none;
`;

const InputRadio = styled.input`
    margin : 0 1rem;
`;

const Button = styled.button`
    background-color: #00838f;
    font-size: 16px;
    width:100%;
    padding: 1rem;
    color: #FFF;
    text-transform: uppercase;
    font-weight: bold;
    border: none;
    transition: background-color .3s ease;
    margin-top: 2rem;

    &:hover{
        background-color: #26c6da;
        cursor: pointer;
    }
`;

const Error = styled.div`
    background-color: red;
    color: white;
    padding: 1rem;
    width: 100%;
    text-align: center;
    margin-bottom: 2rem;
`;

const Formulario = ({setGuardarResumen, setGuardarCargando}) => {

    const [ datos, setGuardarDatos] = useState({
        marca:'',
        year:'',
        plan:''
    });

    const [ error, setGuardarError] = useState(false);

    // Extraer valores del state
    const {marca,year,plan} = datos;

    // Leer datos del formulario
    // HandleChange
    const obtenerInformacion = e => {
        setGuardarDatos({
            ...datos,
            [e.target.name] : e.target.value
        })
    }

    // HandleSubmit
    const cotizarSeguro = e => {
        e.preventDefault();
        //Validar los datos
        if(marca.trim() ==='' || plan.trim() === '' || year.trim() === ''){
            setGuardarError(true);
            return
        }
        setGuardarError(false);

        // Base 2000
        let resultado = 2000;

        // Obtener dif de años
        const diferencia = obtenerDiferenciaYear(year);
        // por caño restar 3%
        resultado -= ((diferencia * 3)* resultado) / 100;
        // Americano 15% - Asiatico 5% - Europeo 30%
        resultado = calcularMarca(marca) * resultado;
        // Plan Basico 20% - Completo 50%
        const incrementoPlan = obtenerPlan(plan);
        resultado = parseFloat(incrementoPlan * resultado).toFixed(2);
        
        setGuardarCargando(true)

        setTimeout(()=>{
            // Eliminar spinner
            setGuardarCargando(false)
             // Se encarga de pasar los datos o informacion al componente principal
            setGuardarResumen({
                cotizacion : Number(resultado),
                datos
            })
        }, 3000)

       
        
        
    }
    return (
        <form
            onSubmit={cotizarSeguro}
        >
            {error ? 
                <Error>Todos los Campos son Obligatorios</Error>
                : null
            }

            <Campo>
                <Label > Marca </Label>
                <Select
                    name="marca"
                    value={marca}
                    onChange={obtenerInformacion}
                >
                    <option value="">-- Seleccione --</option>
                    <option value="americano">Americano</option>
                    <option value="europeo">Europeo</option>
                    <option value="asiatico">Asiatico</option>
                </Select>
            </Campo>

            <Campo>
                <Label > Año </Label>
                <Select
                    name="year"
                    value={year}
                    onChange={obtenerInformacion}

                >
                    <option value="">-- Seleccione --</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                    <option value="2017">2017</option>
                    <option value="2016">2016</option>
                    <option value="2015">2015</option>
                    <option value="2014">2014</option>
                    <option value="2013">2013</option>
                    <option value="2012">2012</option>
                </Select>
            </Campo>
            
            <Campo>
                <Label>Plan</Label>
                <InputRadio
                    type="radio"
                    name="plan"
                    value="basico"
                    checked={plan === 'basico'}
                    onChange={obtenerInformacion}

                />Básico
                <InputRadio
                    type="radio"
                    name="plan"
                    value="completo"
                    checked={plan === 'completo'}
                    onChange={obtenerInformacion}


                />Completo
                
            </Campo>
            <Button type="submit">Cotizar</Button>
        </form>
    )
}

Formulario.propTypes = {
    setGuardarResumen: PropTypes.func.isRequired,
    setGuardarCargando: PropTypes.func.isRequired
}

export default Formulario
