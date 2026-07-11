import FeaturePanel from '../Register/FeaturePanel.jsx'
import LoginForm from './LoginForm.jsx'

const Login = () => {
  return (
    <section className="min-h-[calc(100vh-var(--navbar-height))] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          
          {/* Reusing the FeaturePanel with custom props for the Login page context */}
          <FeaturePanel 
            badgeText="Welcome Back"
            titlePre="Welcome Back to Smarter DSA"
            titleHighlight="Learning"
            description="Continue learning Data Structures and Algorithms through interactive visualizations and step-by-step explanations."
          />
          
          <LoginForm />
          
        </div>
      </div>
    </section>
  )
}

export default Login