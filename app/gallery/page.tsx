export const metadata = {
  title: 'Gallery | Malhar Live',
  description: 'Performance gallery and photo collection from Malhar Live',
}

export default function GalleryPage() {
  return (
    <div className="min-h-screen">
      <div className="hero-gradient text-white py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white font-serif">
            Performance Gallery
          </h1>
        </div>
      </div>

      <div className="section-padding">
        <div className="section-container">
          <p className="text-center text-gray-600 text-lg mb-12">
            High-resolution photos from 40+ performances coming soon.
            <br />
            Cloudinary integration ready for image optimization.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square bg-gradient-to-br from-[#C9B892]/20 to-[#5A1B2C]/20 rounded-lg border-4 border-[#C9B892] flex items-center justify-center"
              >
                <p className="text-gray-600 text-center">
                  <span className="text-3xl">📸</span>
                  <br />Photo {i + 1}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
