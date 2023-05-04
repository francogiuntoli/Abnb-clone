import EmptyState from "../components/EmptyState"

import getCurrentUser from "../actions/getCurrentUser"
import getReservations from "../actions/getReservations"
import TripsClient from "./TripsClient"

export default async function TripsPage() {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />
  }

  const reservations = await getReservations({ userId: currentUser.id })

  if (reservations.length === 0) {
    ;<EmptyState
      title="No trips found"
      subtitle="Looks like you haven't reserved any trips."
    />
  }

  return <TripsClient reservations={reservations} currentUser={currentUser} />
}
