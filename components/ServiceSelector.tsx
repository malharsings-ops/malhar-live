'use client'


export default function ServiceSelector() {
  const services = [
    {
      title: 'Solo',
      description: 'Singer + Acoustic Guitar',
      details: '2-3 hours of intimate live music',
      price: '₹15,000',
      icon: '🎸',
      link: 'https://live.malharLive.com/solo',
    },
    {
      title: 'Duo',
      description: 'Singer + Musician',
      details: '3-4 hours with harmonies & fuller sound',
      price: '₹25k-35k',
      icon: '🎵',
      link: 'https://live.malharLive.com/duo',
    },
    {
      title: 'Trio',
      description: 'Full Band Experience',
      details: '4-5 hours with drums, bass & harmony',
      price: 'Custom Quote',
      icon: '🎼',
      link: 'https://live.malharLive.com/trio',
    },
  ]

  return (
    <section className="section-padding">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#5A1B2C] mb-4 font-serif">
            Choose Your Experience
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Select the perfect performance format for your event
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <div key={idx} className="service-card hover:border-[#C9B892] hover:shadow-lg cursor-pointer transition-all border-2 border-[#D4C5A9]">
              <div className="text-6xl mb-4">{service.icon}</div>
              <h3 className="text-2xl font-bold text-[#5A1B2C] mb-2 font-serif">
                {service.title}
              </h3>
              <p className="text-[#C9B892] font-semibold mb-3">
                {service.description}
              </p>
              <p className="text-gray-600 mb-4">
                {service.details}
              </p>
              <div className="border-t border-[#D4C5A9] pt-4 mt-4">
                <p className="text-2xl font-bold text-[#5A1B2C] mb-4 font-serif">
                  {service.price}
                </p>
                <a
                  href={service.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary block text-center"
                >
                  Learn More
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="https://live.malharLive.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-block"
          >
            View All Services
          </a>
        </div>
      </div>
    </section>
  )
}
