import { RevealText } from '../components/RevealText'

export function WorkSection() {
  return (
    <section id="work" className="section work-section">
      <div className="section-inner">
        <RevealText as="h2" delay={0}>
          What I have done / working on these days
        </RevealText>
        <div className="work-placeholder">
          <RevealText as="p" delay={100}>
            Portfolio page — temporary placeholder here.
          </RevealText>
          <RevealText as="p" className="work-hint" delay={200}>
            Add project cards, links, and tech tags when you are ready.
          </RevealText>
        </div>
      </div>
    </section>
  )
}
