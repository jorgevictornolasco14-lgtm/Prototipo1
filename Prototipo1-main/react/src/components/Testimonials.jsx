const testimonials = [
  {
    initials: 'CM',
    text: 'A Arche Consulting foi fundamental para estruturar nossa área de pessoas. A abordagem é profunda, humana e orientada a resultado real.',
    name: 'Carlos Mendes',
    role: 'CEO · Empresa de Tecnologia',
  },
  {
    initials: 'AF',
    text: 'Clareza, estratégia e sensibilidade. A consultoria transformou nossa cultura organizacional de forma consistente e duradoura.',
    name: 'Ana Ferreira',
    role: 'Diretora de RH · Grupo Industrial',
  },
  {
    initials: 'RL',
    text: 'O diagnóstico organizacional que fizeram abriu nossos olhos para pontos cegos críticos. Um trabalho técnico e, ao mesmo tempo, muito humano.',
    name: 'Rafael Lima',
    role: 'Fundador · Empresa de Serviços',
  },
]

export default function Testimonials() {
  return (
    <section id="depoimentos" className="testimonials">
      <div className="section-header">
        <span className="section-tag">Depoimentos</span>
        <h2>O que nossos clientes dizem</h2>
      </div>
      <div className="grid-testimonials">
        {testimonials.map((t) => (
          <div key={t.name} className="testimonial-card">
            <div className="quote-icon">&#10077;</div>
            <p className="testimonial-text">{t.text}</p>
            <div className="testimonial-author">
              <div className="author-initials">{t.initials}</div>
              <div className="author-info">
                <strong>{t.name}</strong>
                <span>{t.role}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
