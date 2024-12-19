import React, { useState, useEffect } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(window.matchMedia(query).matches);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const listener = (event) => setMatches(event.matches);

    mediaQueryList.addEventListener("change", listener);
    return () => mediaQueryList.removeEventListener("change", listener);
  }, [query]);

  return matches;
};

const CountdownTimer = ({ targetDate }) => {
  const isLargeScreen = useMediaQuery("(min-width: 768px)");

  const calculateRemainingTime = () => {
    const now = new Date();
    const target = new Date(targetDate);
    const difference = target - now;

    return difference > 0 ? Math.floor(difference / 1000) : 0; // Diferencia en segundos
  };

  const [remainingTime, setRemainingTime] = useState(calculateRemainingTime());

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime(calculateRemainingTime());
    }, 1000);

    return () => clearInterval(timer); // Limpia el intervalo al desmontar
  }, [targetDate]);

  const days = Math.floor(remainingTime / (3600 * 24));
  const hours = Math.floor((remainingTime % (3600 * 24)) / 3600);
  const minutes = Math.floor((remainingTime % 3600) / 60);

  const circleSize = isLargeScreen ? 200 : 100; // Ajusta el tamaño de los círculos

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "1.5em",
        marginTop: "30px",
        flexWrap: "wrap", // Adaptable en pantallas pequeñas
        maxWidth: "100%",
      }}
    >
      {/* Círculo para Días */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <CountdownCircleTimer
          isPlaying
          duration={365}
          initialRemainingTime={days}
          colors={["#cbe3eb"]}
          size={circleSize}
          strokeWidth={6}
          trailColor="#cbe3eb"
        >
          {() => <div style={{ fontSize: "16px" }}>{days}d</div>}
        </CountdownCircleTimer>
        <div style={{ fontSize: "12px", marginTop: "5px" }}>Días</div>
      </div>

      {/* Círculo para Horas */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <CountdownCircleTimer
          isPlaying
          duration={24}
          initialRemainingTime={hours}
          colors={["#cbe3eb"]}
          size={circleSize}
          strokeWidth={6}
          trailColor="#cbe3eb"
        >
          {() => <div style={{ fontSize: "16px" }}>{hours}h</div>}
        </CountdownCircleTimer>
        <div style={{ fontSize: "12px", marginTop: "5px" }}>Horas</div>
      </div>

      {/* Círculo para Minutos */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <CountdownCircleTimer
          isPlaying
          duration={60}
          initialRemainingTime={minutes}
          colors={["#cbe3eb"]}
          size={circleSize}
          strokeWidth={6}
          trailColor="#cbe3eb"
        >
          {() => <div style={{ fontSize: "16px" }}>{minutes}m</div>}
        </CountdownCircleTimer>
        <div style={{ fontSize: "12px", marginTop: "5px" }}>Minutos</div>
      </div>
    </div>
  );
};

export default CountdownTimer;
