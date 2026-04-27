const items = [
  {
    num: '01',
    text: 'Desenvolvemos líderes, avaliamos profissionais e fortalecemos culturas organizacionais, conectando desempenho, bem-estar e resultado sustentável.',
  },
  {
    num: '02',
    text: 'Transformamos cenários de crescimento e mudança em modelos de gestão mais maduros, eficientes e alinhados à realidade do negócio.',
  },
  {
    num: '03',
    text: 'Estudos de mercado laboral são realizados para identificar tendências e oportunidades de crescimento profissional.',
  },
]

export default function Services() {
  return (
    <section id="servicos" className="services">
      <div className="services-inner">
        <div className="services-image" />
        <div className="services-list">
          {items.map((item) => (
            <div key={item.num} className="service-item">
              <span className="service-num">{item.num}</span>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
