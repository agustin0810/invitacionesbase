import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';

const Dashboard = () => {
  const [reservas, setReservas] = useState([]);
  const [canciones, setCanciones] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  // Función para cargar TODAS las reservas (sin paginación visible para el usuario)
  const fetchAllReservas = async () => {
    let allReservas = [];
    let currentPage = 1;
    let hasMore = true;

    while (hasMore) {
      try {
        const response = await fetch(`${API_BASE_URL}/reservas?page=${currentPage}&limit=20`);
        if (!response.ok) {
          throw new Error('Error al cargar reservas');
        }
        const data = await response.json();
        // Si vienen reservas, las acumulamos; sino, paramos
        if (data.reservas.length > 0) {
          allReservas = [...allReservas, ...data.reservas];
          currentPage++;
        } else {
          hasMore = false;
        }
      } catch (error) {
        console.error(error);
        hasMore = false;
      }
    }

    setReservas(allReservas);
  };

  // useEffect único para llamar tanto a reservas como a canciones
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // 1) Cargar TODAS las reservas
        await fetchAllReservas();

        // 2) Cargar canciones
        const cancionesResponse = await fetch(`${API_BASE_URL}/canciones`);
        if (!cancionesResponse.ok) {
          throw new Error('Error al cargar canciones');
        }
        const cancionesData = await cancionesResponse.json();
        setCanciones(cancionesData.canciones || []);
      } catch (error) {
        console.error('Error al conectar con la API:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Función para exportar en PDF todas las reservas
  const exportPDF = () => {
    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.height; // Altura de la página
    const margin = 10; // Margen
    const columnWidths = [40, 50, 60, 40]; // Ancho de las columnas

    // Título del PDF
    doc.setFontSize(18);
    doc.text('Reservas', margin, 20);

    // Cabecera de la tabla
    const header = ['Nombre', 'Apellido', 'Restricción', 'Acción'];
    doc.setFontSize(12);
    header.forEach((text, index) => {
      doc.text(text, margin + columnWidths.slice(0, index).reduce((acc, w) => acc + w, 0), 30);
    });

    let yPosition = 40; // Empieza justo debajo de la cabecera

    // Agregar las reservas a la tabla
    reservas.forEach((reserva, index) => {
      const row = [
        reserva.nombre,
        reserva.apellido,
        reserva.restriccion || 'Ninguna',
        `Reserva ${index + 1}`
      ];

      row.forEach((cell, colIndex) => {
        doc.text(cell, margin + columnWidths.slice(0, colIndex).reduce((acc, w) => acc + w, 0), yPosition);
      });

      yPosition += 10; // Espacio entre filas

      // Si llega al final de la página, agrega una nueva página
      if (yPosition + 10 > pageHeight - margin) {
        doc.addPage();
        yPosition = 20; // Reiniciar la posición Y en la nueva página
      }
    });

    // Guardar el PDF
    doc.save('reservas.pdf');
  };

  if (loading) {
    return <p style={{ textAlign: 'center' }}>Cargando datos...</p>;
  }

  return (
    <div style={styles.container}>
      {/* Sección de Reservas */}
      <div style={styles.section}>
        <h2 style={styles.title}>Reservas</h2>
        <button onClick={exportPDF} style={styles.exportButton}>
          Exportar a PDF
        </button>
        {reservas.length > 0 ? (
          <div style={styles.grid}>
            {reservas.map((reserva, index) => (
              <div key={index} style={styles.card}>
                <p><strong>Nombre:</strong> {reserva.nombre}</p>
                <p><strong>Apellido:</strong> {reserva.apellido}</p>
                <p><strong>Restricción:</strong> {reserva.restriccion || 'Ninguna'}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No hay reservas disponibles.</p>
        )}
      </div>

      {/* Sección de Canciones */}
      <div style={styles.section}>
        <h2 style={styles.title}>Canciones</h2>
        {canciones.length > 0 ? (
          <div style={styles.grid}>
            {canciones.map((cancion, index) => (
              <div key={index} style={styles.card}>
                <p><strong>Canción:</strong> {cancion.cancion}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No hay canciones disponibles.</p>
        )}
      </div>
    </div>
  );
};

// Estilos en línea
const styles = {
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  section: {
    marginBottom: '40px',
    textAlign: 'center'
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
    textAlign: 'center',
  },
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    width: '250px',
    textAlign: 'center',
  },
  exportButton: {
    marginBottom: '20px',
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Dashboard;
