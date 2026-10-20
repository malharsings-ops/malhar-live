'use client'

export default function FeaturedMusic() {
  const tracks = [
    {
      id: '4eyKW8RTPKcDHIfx3eZbKx',
      title: 'Featured Track 1',
    },
    {
      id: '2SfnaN396Y8dv7jN522JVv',
      title: 'Featured Track 2',
    },
    {
      id: '18CZPRe60TkvepSP68Uo7t',
      title: 'Featured Track 3',
    },
  ]

  return (
    <section className="section-padding bg-gray-50">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#5A1B2C] mb-4 font-serif">
            Featured Music
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Listen to selected tracks from Malhar's original compositions
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {tracks.map((track) => (
            <div key={track.id} className="service-card border-2 border-[#D4C5A9]">
              <div className="aspect-square mb-6 bg-gradient-to-br from-[#C9B892]/20 to-[#5A1B2C]/20 rounded-lg flex items-center justify-center">
                <span className="text-4xl">🎵</span>
              </div>
              <h3 className="text-xl font-semibold text-[#5A1B2C] mb-4">
                {track.title}
              </h3>
              <p className="text-gray-600 mb-4">
                Original composition by Malhar Live
              </p>
              <a
                href={`https://open.spotify.com/track/${track.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#C9B892] font-semibold hover:text-[#A89470] transition-colors"
              >
                Listen on Spotify →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
