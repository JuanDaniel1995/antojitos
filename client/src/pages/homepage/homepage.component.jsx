import React from "react";

import "./homepage.scss";

const HomePage = () => (
  <div className="home">
    <h1 className="title">Antojitos Locos</h1>
    <p className="paragraph">
      Somos un restaurante ubicado en Sucre de Ciudad Quesada
    </p>
    <p className="paragraph">Encuentranos en</p>
    <a
      target="_blank"
      rel="noopener noreferrer"
      className="paragraph"
      href="https://telegram.me/antojitos_bot"
    >
      Telegram
    </a>
  </div>
);

export default HomePage;
