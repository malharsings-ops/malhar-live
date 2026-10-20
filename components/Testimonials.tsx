'use client'

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Priya & Rohit',
      event: 'Wedding Reception',
      text: 'Malhar\'s performance was the highlight of our wedding. The intimate connection with the audience was magical.',
      rating: 5,
    },
    {
      name: 'Arjun Mehta',
      event: 'Corporate Event',
      text: 'Professional, talented, and an absolute delight to work with. Our guests couldn\'t stop raving about the music.',
      rating: 5,
    },
    {
      name: 'Anjali & Team',
      event: 'Intimate Gathering',
      text: 'The perfect soundtrack for our evening. Malhar brought warmth and artistry that elevated the whole experience.',
      rating: 5,
    },
  ]

  return (
    <section className="section-padding">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#5A1B2C] mb-4 font-serif">
            What Clients Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hear from people who've experienced Malhar Live
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <div key={idx} className="service-card border-2 border-[#D4C5A9]">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <span key={i} className="text-[#C9B892] text-xl">★</span>
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">
                "{testimonial.text}"
              </p>
              <div className="border-t border-[#D4C5A9] pt-4">
                <p className="font-semibold text-[#5A1B2C]">{testimonial.name}</p>
                <p className="text-sm text-gray-600">{testimonial.event}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
