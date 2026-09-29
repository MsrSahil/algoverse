import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import DashboardPage from '../src/pages/Dashboard/DashboardPage.jsx'
import { useAuth } from '../src/context/AuthContext.jsx'
import { progressService } from '../src/services/progressService.js'
import { favoriteService } from '../src/services/favoriteService.js'

vi.mock('../src/context/AuthContext.jsx', () => ({
  useAuth: vi.fn()
}))

vi.mock('../src/services/progressService.js', () => ({
  progressService: {
    getAll: vi.fn()
  }
}))

vi.mock('../src/services/favoriteService.js', () => ({
  favoriteService: {
    getAll: vi.fn()
  }
}))

describe('dashboard favorites', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    useAuth.mockReturnValue({
      user: { fullName: 'Test Learner' },
      authLoading: false,
      isAuthenticated: true
    })
    progressService.getAll.mockResolvedValue({ data: { progress: [] } })
    favoriteService.getAll.mockResolvedValue({ data: { favorites: [] } })
  })

  it('renders the authenticated user favorites instead of dashboard mock favorites', async () => {
    favoriteService.getAll.mockResolvedValue({
      data: { favorites: ['selection-sort'] }
    })

    render(
      <MemoryRouter>
        <DashboardPage />
      </MemoryRouter>
    )

    const favoritesRegion = await screen.findByRole('region', { name: 'Your Favorites' })
    expect(within(favoritesRegion).getByText('Selection Sort')).toBeInTheDocument()
    expect(within(favoritesRegion).queryByText('Binary Search')).not.toBeInTheDocument()
    expect(within(favoritesRegion).getByRole('link', { name: 'Open' })).toHaveAttribute(
      'href',
      '/algorithm/selection-sort'
    )
  })

  it('shows the clean empty state when the API returns no favorites', async () => {
    render(
      <MemoryRouter>
        <DashboardPage />
      </MemoryRouter>
    )

    const favoritesRegion = await screen.findByRole('region', { name: 'Your Favorites' })
    expect(within(favoritesRegion).getByText('No favorites yet.')).toBeInTheDocument()
  })

  it('shows a stable loading state while favorites are being fetched', async () => {
    favoriteService.getAll.mockReturnValue(new Promise(() => {}))

    render(
      <MemoryRouter>
        <DashboardPage />
      </MemoryRouter>
    )

    const favoritesRegion = await screen.findByRole('region', { name: 'Your Favorites' })
    expect(within(favoritesRegion).getByText('Loading favorites...')).toBeInTheDocument()
  })

  it('shows an error state when favorites cannot be loaded', async () => {
    favoriteService.getAll.mockRejectedValue(new Error('Network failure'))

    render(
      <MemoryRouter>
        <DashboardPage />
      </MemoryRouter>
    )

    const favoritesRegion = await screen.findByRole('region', { name: 'Your Favorites' })
    expect(await within(favoritesRegion).findByRole('alert')).toHaveTextContent(
      'Unable to load favorites. Please try again.'
    )
  })
})
