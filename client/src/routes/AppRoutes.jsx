import { Route, Routes } from 'react-router-dom'
import AppLayout from '../components/layout/AppLayout.jsx'
import PagePlaceholder from '../components/common/PagePlaceholder.jsx'

const routeCopy = {
  home: {
    eyebrow: 'DSA Visualizer',
    title: 'Home',
    description:
      'Landing page content will be added in the next step with the full layout and sections for the MVP.'
  },
  login: {
    eyebrow: 'Authentication',
    title: 'Login',
    description:
      'Login UI will live here with the frontend-only form and forgot-password button placeholder.'
  },
  register: {
    eyebrow: 'Authentication',
    title: 'Register',
    description:
      'Register UI will live here with the frontend-only form for the MVP.'
  },
  dashboard: {
    eyebrow: 'Student Space',
    title: 'Dashboard',
    description:
      'Dashboard cards and learning summaries will be added in the next page implementation step.'
  },
  algorithms: {
    eyebrow: 'Learn',
    title: 'Algorithms',
    description:
      'Algorithms listing and category browsing will be wired into this route during the page build step.'
  },
  details: {
    eyebrow: 'Learn',
    title: 'Algorithm Details',
    description:
      'The details page will later show explanation, visualization, code, complexity, and practice questions.'
  },
  profile: {
    eyebrow: 'Account',
    title: 'Profile',
    description:
      'Profile content will be introduced as a frontend-only placeholder first, then expanded later.'
  },
  notFound: {
    eyebrow: '404',
    title: 'Page Not Found',
    description:
      'This route does not exist. The final version will include a custom not-found page shell.'
  }
}

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route
          path="/"
          element={
            <PagePlaceholder
              eyebrow={routeCopy.home.eyebrow}
              title={routeCopy.home.title}
              description={routeCopy.home.description}
            />
          }
        />
        <Route
          path="/login"
          element={
            <PagePlaceholder
              eyebrow={routeCopy.login.eyebrow}
              title={routeCopy.login.title}
              description={routeCopy.login.description}
            />
          }
        />
        <Route
          path="/register"
          element={
            <PagePlaceholder
              eyebrow={routeCopy.register.eyebrow}
              title={routeCopy.register.title}
              description={routeCopy.register.description}
            />
          }
        />
        <Route
          path="/dashboard"
          element={
            <PagePlaceholder
              eyebrow={routeCopy.dashboard.eyebrow}
              title={routeCopy.dashboard.title}
              description={routeCopy.dashboard.description}
            />
          }
        />
        <Route
          path="/algorithms"
          element={
            <PagePlaceholder
              eyebrow={routeCopy.algorithms.eyebrow}
              title={routeCopy.algorithms.title}
              description={routeCopy.algorithms.description}
            />
          }
        />
        <Route
          path="/algorithm/:slug"
          element={
            <PagePlaceholder
              eyebrow={routeCopy.details.eyebrow}
              title={routeCopy.details.title}
              description={routeCopy.details.description}
            />
          }
        />
        <Route
          path="/profile"
          element={
            <PagePlaceholder
              eyebrow={routeCopy.profile.eyebrow}
              title={routeCopy.profile.title}
              description={routeCopy.profile.description}
            />
          }
        />
        <Route
          path="*"
          element={
            <PagePlaceholder
              eyebrow={routeCopy.notFound.eyebrow}
              title={routeCopy.notFound.title}
              description={routeCopy.notFound.description}
            />
          }
        />
      </Route>
    </Routes>
  )
}

export default AppRoutes