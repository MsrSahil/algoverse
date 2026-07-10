import FeaturePanel from './FeaturePanel.jsx'
import RegisterForm from './RegisterForm.jsx'

const Register = () => {
  return (
    <section className="min-h-[calc(100vh-var(--navbar-height))] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          <FeaturePanel />
          <RegisterForm />
        </div>
      </div>
    </section>
  )
}

export default Register
