import './App.css';
import Navbar from './components/Navbar';
import portada from './images/portada.png';
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
import { useState } from 'react';

function App() {
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
      const response = await fetch('http://44.202.99.189:5000/reservas', {
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
      const response = await fetch('http://44.202.99.189:5000/canciones', {
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
      console.log(error)
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

      <div className='DatosHome'>
        <h2 style={{ marginTop: '30px', color: '#989fa1' }}>Cumplo 15 años!</h2>
        <h2 style={{ color: '#989fa1' }}>Y me encantaría que formaras</h2>
        <h2 style={{ color: '#989fa1' }}>parte de mi noche soñada</h2>
      </div>

      <div style={{ textAlign: 'center' }} id="vestimenta">
        <img style={{ margin: 'auto', marginTop: '40px', width: '80%', maxWidth: '600px' }} src={vestimenta} alt="Vestimenta" />
        <h1 style={{ marginTop: '10px', color: '#9acad8' }}>FORMAL</h1>
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
        <img style={{ marginTop: '20px', width: '100%', maxWidth: '1000px' }} src={portada} alt="Portada" />
        
        <h1 style={{ marginTop: '20px', color: '#989fa1' }}>Exteriores</h1>
        <div className="ImageSplitter">
          <img src={portada} alt="Portada" />
          <img src={portada} alt="Portada" />
          <img src={portada} alt="Portada" />
          <img src={portada} alt="Portada" />
        </div>

        <h1 style={{ marginTop: '20px', color: '#989fa1' }}>Fiesta</h1>
        <div className="ImageSplitter">
          <img src={portada} alt="Portada" />
          <img src={portada} alt="Portada" />
          <img src={portada} alt="Portada" />
          <img src={portada} alt="Portada" />
        </div>
      </div>

      <div className='DatosHome' id="sugerencia-canciones">
        <h1 style={{ marginTop: '20px', color: '#989fa1' }}>Queremos que sea una noche super divertida</h1>
        <h2 style={{ marginTop: '5px', color: '#989fa1' }}>Dinos que canción no puede faltar</h2>
        <InputText
            placeholder="Canción"
            value={cancion}
            onChange={(e) => setCancion(e.target.value)}
          />
        <InputButton value="Enviar" onClick={enviarCancion} />
      </div>
      <div className='DatosHome' id="reserva-alojamiento">
        <h1 style={{ marginTop: '20px', color: '#989fa1' }}>Reserva tu alojamiento</h1>
      </div>

      <div className='DatosHome' style={{ marginTop: '20px', textAlign: 'center' }}>
        <h2 style={{ margin: '20px 0 0px 0', color: '#989fa1'}}>Opción 1</h2>
        <DividedSection image={alojamiento} text={"Información del alojamiento, precios, contacto"} />
      </div>
      <div className='DatosHome' style={{ marginTop: '20px', textAlign: 'center' }}>
        <h2 style={{ margin: '20px 0 0px 0', color: '#989fa1'}}>Opción 2</h2>
        <DividedSection image={alojamiento} text={"Información del alojamiento, precios, contacto"} />
      </div>
      <div className='DatosHome' style={{ marginTop: '20px', textAlign: 'center' }}>
        <h2 style={{ margin: '20px 0 0px 0', color: '#989fa1'}}>Opción 3</h2>
        <DividedSection image={alojamiento} text={"Información del alojamiento, precios, contacto"} />
      </div>



      <div className='DatosHome' id="regalos">
        <h1 style={{ marginTop: '20px', color: '#989fa1' }}>Regalo</h1>
        <h2 style={{ margin: '20px 0 0px 0', color: '#989fa1'}}>Número de cuenta</h2>
        <img style={{ marginTop: '20px', width: '100%', maxWidth: '800px' }} src={regalo} alt="Regalo" />
      </div>

      <div className='Footer'>
        <img src={logo} alt='Logo' />
        <h1>+598 99 2000 95</h1>
      </div>
    </div>
  );
}

export default App;
