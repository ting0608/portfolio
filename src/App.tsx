import { GlassSidebar } from './components/GlassSidebar'
import { usePageAnalytics } from './hooks/usePageAnalytics'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import { HeroSection } from './sections/HeroSection'
import { QuotesSection } from './sections/QuotesSection'
import { RoadmapSection } from './sections/RoadmapSection'
import { WorkSection } from './sections/WorkSection'
import { ClosingSection } from './sections/ClosingSection'
import './App.css'

function App() {
  useSmoothScroll()
  usePageAnalytics()

  return (
    <>
      <GlassSidebar />
      <main className="app">
        <HeroSection />
        <QuotesSection />
        <RoadmapSection />
        <WorkSection />
        <ClosingSection />
      </main>
    </>
  )
}

export default App
