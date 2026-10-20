export const metadata = {
  title: 'About Malhar | Malhar Live',
  description: 'Learn about Malhar, an acclaimed acoustic musician influenced by Lucky Ali',
}

export default function About() {
  return (
    <div className="min-h-screen">
      <div className="hero-gradient text-white py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white font-serif">
            About Malhar
          </h1>
          <p className="text-xl text-gray-100">
            Acoustic Artist | Original Composer | Live Performer
          </p>
        </div>
      </div>

      <div className="section-padding">
        <div className="section-container max-w-4xl">
          <div className="grid md:grid-cols-3 gap-12 mb-16">
            <div className="md:col-span-2">
              <h2 className="text-3xl font-bold text-[#5A1B2C] mb-6 font-serif">
                The Artist
              </h2>
              <p className="text-gray-700 mb-4">
                Malhar is an accomplished acoustic musician and composer dedicated to creating intimate, soulful
                musical experiences. Drawing inspiration from legendary artists like Lucky Ali, Malhar blends
                classical Indian vocal traditions with contemporary acoustic arrangements.
              </p>
              <p className="text-gray-700 mb-4">
                With performances across India and internationally, Malhar has touched the hearts of audiences
                at weddings, corporate events, intimate gatherings, and exclusive venues. Each performance is
                a unique blend of technical mastery and emotional authenticity.
              </p>
              <p className="text-gray-700">
                Malhar's commitment to original compositions and live performance sets a new standard for
                acoustic music in India.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#C9B892] to-[#5A1B2C] rounded-lg p-8 h-80 flex items-center justify-center text-white border-4 border-[#C9B892]">
              <p className="text-4xl text-center">🎸</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-gray-50 p-8 rounded-lg border-2 border-[#D4C5A9]">
              <h3 className="text-xl font-bold text-[#5A1B2C] mb-4 font-serif">Musical Journey</h3>
              <p className="text-gray-700">
                Years of dedicated practice, evolution as an artist, and performances that have shaped
                a unique musical identity.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg border-2 border-[#D4C5A9]">
              <h3 className="text-xl font-bold text-[#5A1B2C] mb-4 font-serif">Original Compositions</h3>
              <p className="text-gray-700">
                Malhar creates original music that blends traditional and contemporary elements,
                resulting in timeless acoustic pieces.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg border-2 border-[#D4C5A9]">
              <h3 className="text-xl font-bold text-[#5A1B2C] mb-4 font-serif">Live Performance</h3>
              <p className="text-gray-700">
                Every performance is a unique experience, connecting deeply with the audience and
                creating memorable moments.
              </p>
            </div>
          </div>

          <div className="text-center py-12 border-t-2 border-gray-200">
            <h3 className="text-2xl font-bold text-[#5A1B2C] mb-6 font-serif">Influences</h3>
            <p className="text-gray-700 max-w-2xl mx-auto mb-8">
              Malhar draws inspiration from legends like Lucky Ali, combining classical vocal techniques
              with modern acoustic arrangements to create a distinctive sound.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
