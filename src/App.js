import React,{useState} from 'react';
import Header from './components/Header';

import styled from '@emotion/styled'
import Formulario from './components/Formulario';
import Resumen from './components/Resumen';
import Resultado from './components/Resultado';
import Spinner from './components/Spinner';

const Contenedor = styled.div`
  max-width:600px;
  margin: 0 auto;
`;

const ContenedorFormulario = styled.div`
  background-color: #FFF;
  padding:3rem
`;


function App() {

  const [resumen, setGuardarResumen] = useState({
    cotizacion:0,
    datos:{
      marca:'',
      year:'',
      plan:''
    }
  })

  // State Spinner
  const [cargando, setGuardarCargando] = useState(false);

  // Extraer datos
  const {cotizacion, datos} = resumen;


  return (
    <Contenedor >
      
      <Header
         titulo="Cotizador de Seguros"
      />

    <ContenedorFormulario>
      <Formulario
        setGuardarResumen={setGuardarResumen}
        setGuardarCargando={setGuardarCargando}
      />
      {
        cargando ? <Spinner/> : null
      }
      

      <Resumen
        datos={datos}
      />
      {!cargando ? 
        <Resultado
          cotizacion={cotizacion}
        /> : null}
      
    </ContenedorFormulario>


    </Contenedor>
  );
}


export default App;
