import { alfredTip } from '@kentcdodds/react-workshop-app/test-utils'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { mockNavigatorGeolocation } from 'test-utils'
import App from '../final/01'
// import App from '../exercise/01'

const { getCurrentPositionMock } = mockNavigatorGeolocation()

beforeEach(() => {
  getCurrentPositionMock.mockImplementation(async () => ({
    coords: {
      longitude: 321,
      latitude: 123,
    },
  }))
})

test('loads the globe component asynchronously', async () => {
  render(<App />)

  await userEvent.click(screen.getByLabelText(/show globe/))

  alfredTip(
    () => expect(screen.queryByTitle(/globe/i)).not.toBeInTheDocument(),
    'The globe component must be loaded asynchronously via React.lazy and React.Suspense',
  )

  expect(await screen.findByTitle(/globe/i)).toBeInTheDocument()
})
