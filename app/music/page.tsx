export const metadata = {
  title: 'Music | Malhar Live',
  description: 'Original compositions and music by Malhar Live',
}

export default function MusicPage() {
  const tracks = [
    {
      id: '4eyKW8RTPKcDHIfx3eZbKx',
      title: 'Original Track 1',
      platform: 'Spotify',
    },
    {
      id: '2SfnaN396Y8dv7jN522JVv',
      title: 'Original Track 2',
      platform: 'Spotify',
    },
    {
      id: '18CZPRe60TkvepSP68Uo7t',
      title: 'Original Track 3',
      platform: 'Spotify',
    },
  ]

  return (
    <div className="min-h-screen">
      <div className="hero-gradient text-white py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white font-serif">
            Music & Compositions
          </h1>
          <p className="text-xl text-gray-100">
            Original acoustic compositions by Malhar
          </p>
        </div>
      </div>

      <div className="section-padding">
        <div className="section-container">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {tracks.map((track) => (
              <div key={track.id} className="service-card border-2 border-[#D4C5A9]">
                <div className="aspect-square mb-6 bg-gradient-to-br from-[#C9B892]/20 to-[#5A1B2C]/20 rounded-lg flex items-center justify-center">
                  <span className="text-6xl">🎵</span>
                </div>
                <h3 className="text-xl font-semibold text-[#5A1B2C] mb-4 font-serif">
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
                  Listen on {track.platform} →
                </a>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 p-12 rounded-lg text-center border-2 border-[#D4C5A9]">
            <h2 className="text-2xl font-bold text-[#5A1B2C] mb-4 font-serif">
              More Music Coming Soon
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              New original compositions and releases are regularly added.
              Follow @malharsings on Instagram for latest updates.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
