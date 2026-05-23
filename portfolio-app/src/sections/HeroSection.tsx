import { ImageCarousel } from '../components/ImageCarousel'
import { RevealText } from '../components/RevealText'
import { ScrollHint } from '../components/ScrollHint'
import { TypingAnimation } from '../components/TypingAnimation'

export function HeroSection() {
  return (
    <section id="hero" className="section hero-section">
      <div className="section-inner">
        <RevealText as="h1" delay={0}>
          Welcome to tingcccc&apos;s profile
        </RevealText>
        <RevealText delay={120}>
          <TypingAnimation />
        </RevealText>
        <ImageCarousel />
      </div>
      <ScrollHint targetId="quotes" />
    </section>
  )
}
