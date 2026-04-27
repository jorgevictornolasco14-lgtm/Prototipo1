// App.jsx
import React, { useState } from 'react';
import './App.css';

const ServiceCard = ({ title, description }) => (
  <div className="card">
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

function App() {
  const [formData, setFormData] = useState({ nome: '', email: '', mensagem: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Aqui conectamos com o Back-end
    const response = await fetch('http://localhost:5000/api/contato', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    if (response.ok) alert("Mensagem enviada!");
  };

  return (
    <div className="container">
      <nav className="navbar">
        <div className="logo">ARCHE<span>CORE</span></div>
        <ul className="nav-links">
          <li><a href="#home">Início</a></li>
          <li><a href="#servicos">Serviços</a></li>
          <li><button className="btn-contato">Fale Conosco</button></li>
        </ul>
      </nav>

      <header className="hero">
        <h1>Arquitetura Digital de <span>Alta Performance</span>.</h1>
        <p>Construímos ecossistemas robustos para empresas líderes.</p>
      </header>

      <section id="servicos" className="services">
        <ServiceCard title="Estratégia" description="Planejamento focado em conversão." />
        <ServiceCard title="Fullstack" description="Sistemas escaláveis com Node e React." />
        <ServiceCard title="Design" description="Interfaces que encantam e funcionam." />
      </section>

      <section className="contact-form">
        <h2>Inicie seu projeto</h2>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Seu Nome" 
            onChange={(e) => setFormData({...formData, nome: e.target.value})} 
          />
          <input 
            type="email" 
            placeholder="Seu E-mail" 
            onChange={(e) => setFormData({...formData, email: e.target.value})} 
          />
          <textarea 
            placeholder="Sua Mensagem" 
            onChange={(e) => setFormData({...formData, mensagem: e.target.value})}
          ></textarea>
          <button type="submit">Enviar Proposta</button>
        </form>
      </section>
    </div>
  );
}

export default App;