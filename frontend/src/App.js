import './App.css';
import React from 'react';
import Navbar from './components/Navbar';
import portada from './images/portada.jpg';
import CountdownTimer from './components/CountdownTimer';
import vestimenta from './images/vestimenta.png';
import InputText from './components/InputText';
import InputSelect from './components/InputSelect';
import InputButton from './components/InputButton';
import InputNumber from './components/InputNumber';
import DividedSection from './components/DividedSection';
import alojamiento from './images/alojamiento.avif'
import regalo from './images/regalo.png'
import logo from './images/logo.png';
import foto1 from './images/foto1.jpg'
import exterior1 from './images/exterior1.jpg';
import exterior2  from './images/exterior2.jpg';
import exterior3 from './images/exterior3.jpg';
import hotelroyal from './images/hotelroyal.jpg';
import laescondida from './images/laescondida.jpg';
import marinasdelriachuelo from './images/marinasdelriachuelo.jpg';
import casadelsol from './images/casadelsol.jpg';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login'; // Importa el componente de login
import Dashboard from './components/Dashboard';

import MapaConEnlace from './components/MapaConEnlace';
import fiesta from './images/fiesta.png'

import { useState } from 'react';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;


function App(){
  return(
    <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    </Router>
  )
}
function Home() {
  const [restriccionVisible, setRestriccionVisible] = useState(false);
  const [cantidadReservasAdicionales, setCantidadReservasAdicionales] = useState(0);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [restriccion, setRestriccion] = useState('No');
  const [detallesRestriccion, setDetallesRestriccion] = useState('');
  const [reservasAdicionales, setReservasAdicionales] = useState([]);
  const [cancion, setCancion] = useState('');
  const changeRestriccion = (value) => {
    setRestriccion(value);
    setRestriccionVisible(value === 'Si');
  };

  const changeCantidadReservas = (value) => {
    const cantidad = parseInt(value) || 0;
    setCantidadReservasAdicionales(cantidad);
  
    if (cantidad < reservasAdicionales.length) {
      // Si el número de reservas adicionales disminuye, recorta el array
      setReservasAdicionales((prev) => prev.slice(0, cantidad));
    } else {
      // Si aumenta, agrega reservas adicionales vacías
      setReservasAdicionales((prev) => [
        ...prev,
        ...Array.from({ length: cantidad - prev.length }, () => ({ nombre: '', apellido: '', restriccion: '' }))
      ]);
    }
  };

  const handleReservaAdicionalChange = (index, field, value) => {
    const nuevasReservas = [...reservasAdicionales];
    nuevasReservas[index] = { ...nuevasReservas[index], [field]: value };
    setReservasAdicionales(nuevasReservas);
  };

  const handleConfirmar = async () => {
    const todasReservas = [
      {
        nombre,
        apellido,
        restriccion: restriccion === 'Si' ? detallesRestriccion : '',
      },
      ...reservasAdicionales,
    ];

    try {
      const response = await fetch(API_BASE_URL+'/reservas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todasReservas),
      });
  
      if (response.ok) {
        alert('Reservas confirmadas con éxito');
      } else {
        const error = await response.json();
        alert(`Error al confirmar reservas: ${error.message}`);
      }
    } catch (error) {
      console.error('Error al enviar las reservas:', error);
      alert('Ocurrió un error al enviar las reservas');
    }

    console.log(todasReservas)
  };

  const enviarCancion = async () =>{
    try {
      console.log(cancion)
      const response = await fetch(API_BASE_URL+'/canciones', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({"cancion": cancion}),
      });
  
      if (response.ok) {
        alert('Canción enviada con éxito');
      } else {
        const error = await response.json();
        alert(`Error al enviar la canción: ${error.message}`);
      }
    } catch (error) {
      console.error('Error al enviar la canción:', error);
      alert('Ocurrió un error al enviar la canción');
    }
  }

  return (
    <div className="App">
      <Navbar />
      <img id="portada" src={portada} alt="Portada" />
      <div className='DatosHome'>
        <h1>Sábado 15 de marzo</h1>
        <h1>2025</h1>
        <h2 style={{ marginTop: '10px' }}>Granja Arenas, Colonia del Sacramento</h2>
        <h2>Ruta 1 Km 167</h2>
      </div>

      <CountdownTimer targetDate={'2025-03-15T00:00:00-03:00'} />
      <MapaConEnlace />

      <div className='DatosHome' style={{backgroundColor:'#2e266d', paddingTop: '3vh', paddingBottom: '3vh', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
        <h2 style={{  color: '#989fa1' }}>¡Cumplo 15 años!</h2>
        <h2 style={{ color: '#989fa1' }}>Y me encantaría que formaras</h2>
        <h2 style={{ color: '#989fa1' }}>parte de mi noche soñada</h2>
      </div>

      <div style={{ textAlign: 'center' }} id="vestimenta">
        <img style={{ margin: 'auto', marginTop: '40px', width: '80%', maxWidth: '600px' }} src={vestimenta} alt="Vestimenta" />
        <h1 style={{ marginTop: '10px', color: '#2e266d' }}>FORMAL</h1>
      </div>

      <div className='DatosHome' id="confirmar-asistencia">
        <h1 style={{ marginTop: '7vh', color: '#989fa1' }}>Ingresa tus datos para confirmar asistencia</h1>
        <br />
        <h2 style={{ color: '#989fa1' }}>En caso de confirmar más de una persona se aclara en el siguiente paso</h2>
      </div>

      <div className='Rsvp1'>
        <InputText 
          placeholder="Nombre" 
          value={nombre} 
          onChange={(e) => setNombre(e.target.value)} 
        />
        <InputText 
          placeholder="Apellido" 
          value={apellido} 
          onChange={(e) => setApellido(e.target.value)} 
        />
        <InputSelect 
          labelSelect="Restricción alimenticia" 
          items={['Si', 'No']} 
          onChange={changeRestriccion} 
        />
        <InputText 
          visible={restriccionVisible} 
          placeholder="Ingrese restricción" 
          value={detallesRestriccion} 
          onChange={(e) => setDetallesRestriccion(e.target.value)} 
        />
        <InputNumber 
          label="Reservas adicionales" 
          onChange={changeCantidadReservas} 
        />
      </div>

      {reservasAdicionales.map((reserva, index) => (
        <div key={index} className="ReservaAdicional">
          <h3>Reserva Adicional {index + 1}</h3>
          <InputText
            placeholder="Nombre"
            value={reserva.nombre}
            onChange={(e) => handleReservaAdicionalChange(index, 'nombre', e.target.value)}
          />
          <InputText
            placeholder="Apellido"
            value={reserva.apellido}
            onChange={(e) => handleReservaAdicionalChange(index, 'apellido', e.target.value)}
          />
          <InputText
            placeholder="Restricción alimenticia (si corresponde)"
            value={reserva.restriccion}
            onChange={(e) => handleReservaAdicionalChange(index, 'restriccion', e.target.value)}
          />
        </div>
      ))}

      <InputButton value="Confirmar" onClick={handleConfirmar} />

      <div className='DatosHome' id="fotos">
        <h1 style={{ marginTop: '20px', color: '#989fa1' }}>Fotos</h1>
        <img style={{ marginTop: '20px', width: '100%', maxWidth: '1000px' }} src={foto1} alt="Portada" />
        
        <h1 style={{ marginTop: '20px', color: '#989fa1' }}>Exteriores</h1>
        <div className="ImageSplitter">
          <img src={exterior1} alt="Exteriores" />
          <img src={exterior2} alt="Exteriores" />
          <img src={exterior3} alt="Exteriores" />
        </div>

        {/* <h1 style={{ marginTop: '20px', color: '#989fa1' }}>Fiesta</h1>
        <div className="ImageSplitter">
          <img src={fiesta} alt="Fiesta" />
          <img src={fiesta} alt="Fiesta" />
          <img src={fiesta} alt="Fiesta" />
          <img src={fiesta} alt="Fiesta" />
        </div> */}
      </div>

      <div className='DatosHome' id="sugerencia-canciones" style={{backgroundColor: '#2e266d', paddingBottom: '4vh', paddingTop: '4vh',  marginTop: '7vh'}}>
        <h1 style={{ marginTop: '20px', color: '#989fa1' }}>Queremos que sea una noche super divertida</h1>
        <h2 style={{ marginTop: '5px', color: '#989fa1' }}>Dinos que canción no puede faltar</h2>
        <InputText
            placeholder="Canción"
            value={cancion}
            onChange={(e) => setCancion(e.target.value)}
          />
        <InputButton value="Enviar" onClick={enviarCancion} />
      </div>
      <div className='DatosHome' id="reserva-alojamiento" style={{marginTop: '5vh'}}>
        <h1 style={{ color: '#989fa1' }}>Reserva tu alojamiento</h1>
      </div>

      <div className='DatosHome' style={{ marginTop: '0px', textAlign: 'center' }}>
        <h2 style={{ margin: '20px 0 3vh 0', color: '#989fa1'}}>Opción 1</h2>
        <DividedSection 
            image={marinasdelriachuelo}
            titulo={"Marinas del Riachuelo" }
            text={
              "Habitación doble $2600\n Habitación triple $3000\n Habitación cuadruple $3600\n Duplex 1 $4200\n Duplex 2 $4600"
                .split('\n')
                .map((line, index) => (
                  <React.Fragment key={index}>
                    {line}
                    <br />
                  </React.Fragment>
                ))
            }
            enlace={"https://wa.me/59891084176"}
          />
      </div>
      <div className='DatosHome' style={{ marginTop: '0px', textAlign: 'center' }}>
        <h2 style={{ margin: '20px 0 3vh 0', color: '#989fa1'}}>Opción 2</h2>
        <DividedSection 
            image={laescondida}
            titulo={"Chacra La escondida" }
            text={
              "Habitación doble USD 70 \n Habitación triple USD 95 \n Habitación para 4 personas USD 120 \n Habitación para 5 personas USD 135"
                .split('\n')
                .map((line, index) => (
                  <React.Fragment key={index}>
                    {line}
                    <br />
                  </React.Fragment>
                ))
            }
            enlace={"https://wa.me/59892872298"}

          />      </div>
      <div className='DatosHome' style={{ marginTop: '0px', textAlign: 'center' }}>
        <h2 style={{ margin: '20px 0 3vh 0', color: '#989fa1'}}>Opción 3</h2>
        <DividedSection 
            image={casadelsol}
            titulo={"Hotel casa del sol" }
            text={"Matrimonial Superior USD 90+IVA \n Matrimonial Deluxe USD 130+IVA \n "
                .split('\n')
                .map((line, index) => (
                  <React.Fragment key={index}>
                    {line}
                    <br />
                  </React.Fragment>
                ))
            }
            enlace={"https://wa.me/59892250625"}

          />   
          </div>
          <div className='DatosHome' style={{ marginTop: '0px', textAlign: 'center' }}>
        <h2 style={{ margin: '20px 0 3vh 0', color: '#989fa1'}}>Opción 4</h2>
        <DividedSection 
            image={hotelroyal}
            titulo={"Hotel Royal" }
            text={"Habitación doble USD 70+IVA"
                .split('\n')
                .map((line, index) => (
                  <React.Fragment key={index}>
                    {line}
                    <br />
                  </React.Fragment>
                ))
            }
            enlace={"https://wa.me/59899670218"}

          />   
          </div>



      <div className='DatosHome' id="regalos" style={{backgroundColor: '#2e266d', paddingBottom: '20px', paddingTop: '20px', marginBottom: '20px'}}>
        <h1 style={{ color: '#989fa1' }}>Regalo</h1>
        <h2 style={{ color: '#989fa1' }}>Brou 110024237-00001 $</h2>
        <h2 style={{ color: '#989fa1' }}>110024237-00002 USD</h2>
        <h2 style={{ margin: '20px 0 0px 0', color: '#989fa1', backgroundColor: '#2e266d'}}>Sandra Amarillo        </h2>
      </div>
      <img style={{ marginTop: '10px', width: '100%', maxWidth: '800px' }} src={regalo} alt="Regalo" />

      <div className='Footer'>
        <img src={logo} alt='Logo' />
        <h1>+598 99 2000 95</h1>
      </div>
    </div>
  );
}

export default App;
