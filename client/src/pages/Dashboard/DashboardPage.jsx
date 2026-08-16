import { useAuth } from '../../context/AuthContext'
import { dashboardData } from '../../constants/dashboardData'
import DashboardHeader from '../../components/dashboard/DashboardHeader'
import LearningOverview from '../../components/dashboard/LearningOverview'
import ProgressCard from '../../components/dashboard/ProgressCard'
import ContinueLearningCard from '../../components/dashboard/ContinueLearningCard'
import CategoryGrid from '../../components/dashboard/CategoryGrid'
import RecommendedAlgorithms from '../../components/dashboard/RecommendedAlgorithms'
import RecentActivity from '../../components/dashboard/RecentActivity'
import FavoritesList from '../../components/dashboard/FavoritesList'
import LearningJourney from '../../components/dashboard/LearningJourney'
import DashboardCTA from '../../components/dashboard/DashboardCTA'

const DashboardPage = () => {
  const { user, authLoading } = useAuth()

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-gray-800 border-t-indigo-500 rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <section className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <DashboardHeader user={user} />

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
          <div className="xl:col-span-8">
            <LearningOverview items={dashboardData.overview} />
          </div>
          <div className="xl:col-span-4">
            <ProgressCard progress={dashboardData.progress} />
          </div>
        </div>

        <ContinueLearningCard current={dashboardData.continueLearning} />

        <CategoryGrid categories={dashboardData.categories} />

        <RecommendedAlgorithms algorithms={dashboardData.recommendedAlgorithms} />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <RecentActivity activity={dashboardData.recentActivity} />
          <FavoritesList favorites={dashboardData.favorites} />
        </div>

        <LearningJourney journey={dashboardData.learningJourney} />

        <DashboardCTA continueSlug={dashboardData.continueLearning?.slug} />
      </div>
    </section>
  )
}

export default DashboardPage
