export const metadata = {
  title: 'Demo | Malhar Live',
  description: 'Deploy test page',
}

export default function DemoPage() {
  return (
    <div className="min-h-screen hero-gradient flex items-center justify-center px-4">
      <div className="text-center text-white">
        <h1 className="text-5xl font-bold font-serif mb-4">Push test works</h1>
        <p className="text-gray-100 mb-6">
          This page was pushed from Claude to GitHub and deployed by Vercel automatically.
        </p>
        <p className="text-[#C9B892]">Deployed: {new Date().getFullYear()}</p>
      </div>
    </div>
  )
}
