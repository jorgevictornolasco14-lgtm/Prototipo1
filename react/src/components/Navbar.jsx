export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">ARCHE CONSULTORIA E DESENVOLVIMENTO</div>
      <ul className="nav-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#servicos">Serviços</a></li>
        <li><a href="#sobre">Sobre nós</a></li>
        <li><a href="#depoimentos">Depoimentos</a></li>
        <li><a href="#contato" className="nav-cta">Contato</a></li>
      </ul>
    </nav>
  )
}
