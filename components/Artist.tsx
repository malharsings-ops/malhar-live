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
              Malhar Live is where those songs meet the room. Whether it is a quiet evening with just a voice and a
              guitar, or a full band night, every performance is shaped around the people listening.
            </p>
            <p>
              For weddings, private celebrations and venues, Malhar brings an evening that guests remember, built on
              songs he wrote himself.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
