'use client'

export default function Gallery() {
  const photos = Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    title: `Performance ${i + 1}`,
    category: i % 3 === 0 ? 'Wedding' : i % 3 === 1 ? 'Corporate' : 'Intimate',
  }))

  return (
    <section className="section-padding bg-gray-50">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#5A1B2C] mb-4 font-serif">
            Performance Gallery
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Glimpses from memorable performances across cities
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="aspect-square bg-gradient-to-br from-[#C9B892] to-[#5A1B2C] rounded-lg overflow-hidden group cursor-pointer card-hover flex items-center justify-center border-4 border-[#C9B892]"
            >
              <div className="text-center text-white">
                <p className="text-6xl mb-4">🎵</p>
                <h3 className="text-xl font-semibold font-serif">{photo.title}</h3>
                <p className="text-sm mt-2 opacity-90">{photo.category}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">
            40+ high-resolution performance photos coming soon.
            <br />
            Contact for custom photo galleries.
          </p>
        </div>
      </div>
    </section>
  )
}
