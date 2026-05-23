import { GlassSidebar } from './components/GlassSidebar'
import { HeroSection } from './sections/HeroSection'
import { QuotesSection } from './sections/QuotesSection'
import { WorkSection } from './sections/WorkSection'
import './App.css'

function App() {
  return (
    <>
      <GlassSidebar />
      <main className="app">
        <HeroSection />
        <QuotesSection />
        <WorkSection />
      </main>
    </>
  )
}

export default App
