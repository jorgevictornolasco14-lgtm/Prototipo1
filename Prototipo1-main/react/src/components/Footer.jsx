export default function Footer() {
  return (
    <footer id="contato" className="footer">
      <div className="footer-inner">
        <div className="footer-brand-col">
          <strong className="footer-name">ARCHE DESENVOLVIMENTO</strong>
        </div>
        <div className="footer-col">
          <h4>Sobre nós</h4>
          <ul>
            <li><a href="#">Nossa história</a></li>
            <li><a href="#">Nossos valores</a></li>
            <li><a href="#contato">Contato</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Contact</h4>
          <address>
            Rua Expedicionário Elias Saade, 17, Eymard<br />
            Belo Horizonte &ndash; CEP 31.910-620<br />
            <a href="tel:+5531982929008">(31) 98292-9008</a><br />
            <a href="mailto:comercial@archedesenvolvimento.com.br">
              comercial@archedesenvolvimento.com.br
            </a>
          </address>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 Arche Desenvolvimento. Todos os direitos reservados.</p>
      </div>
    </footer>
  )
}
