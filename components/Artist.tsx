import Reveal from './Reveal'
import { site } from '@/lib/site'

export default function Artist() {
  return (
    <section id="artist" className="section">
      <div className="container">
        <Reveal>
          <p className="eyebrow">The artist behind the music</p>
          <h2 className="h2" style={{ maxWidth: 820 }}>
            A voice shaped by Lucky Ali, with a sound of his own.
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <div className="prose">
            <p>
              {site.artist} is a singer-songwriter based in {site.city}. Inspired by the effortless, soulful storytelling
              of Lucky Ali, he writes and performs original songs that feel honest, warm and close.
            </p>
            <p>
              Malhar Live is where those songs meet the room. More than 2250 shows have taken him from Pune&rsquo;s
              listening rooms to stages in Kuwait and West Africa, and the set has stayed the same at heart: his own
              songs, sung live, with nothing hiding behind them.
            </p>
            <p>
              Some nights it is a voice and a guitar. Others it is a full band. Either way the evening is built around
              the people in front of him, not a setlist on paper.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
