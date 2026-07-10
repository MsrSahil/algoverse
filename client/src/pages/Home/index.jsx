import HeroSection from './HeroSection.jsx'
import FeaturesSection from './FeaturesSection.jsx'
import CategoriesSection from './CategoriesSection.jsx'
import HowItWorksSection from './HowItWorksSection.jsx'
import PopularAlgorithmsSection from './PopularAlgorithmsSection.jsx'
import StatisticsSection from './StatisticsSection.jsx'
import WhyChooseUsSection from './WhyChooseUsSection.jsx'
import CTASection from './CTASection.jsx'

const Home = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <CategoriesSection />
      <HowItWorksSection />
      <PopularAlgorithmsSection />
      <StatisticsSection />
      <WhyChooseUsSection />
      <CTASection />
    </div>
  )
}

export default Home
