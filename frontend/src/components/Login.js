import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Aquí podrías validar las credenciales contra el backend
        if (username === 'admin' && password === '1234') {
            alert('Login exitoso');
            navigate('/dashboard'); // Redirige al dashboard tras el login
        } else {
            alert('Credenciales inválidas');
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1 style={{marginBottom: '50px'}}>Login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        placeholder="Usuario"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={{ padding: '10px', marginBottom: '10px', width: '300px' }}
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ padding: '10px', marginBottom: '10px', width: '300px' }}
                    />
                </div>
                <button type="submit" style={{ padding: '10px 20px' }}>Iniciar sesión</button>
            </form>
        </div>
    );
};

export default Login;
