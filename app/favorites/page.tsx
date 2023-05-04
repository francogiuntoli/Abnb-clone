import EmptyState from "../components/EmptyState"

import getFavoriteListing from "../actions/getFavoriteListing"
import getCurrentUser from "../actions/getCurrentUser"
import FavoriteClient from "./FavoriteClient"

export default async function ListingPage() {
  const listings = await getFavoriteListing()
  const currentUser = await getCurrentUser()

  if (listings.length === 0) {
    return (
      <EmptyState
        title="No favorites found"
        subtitle="Looks like you have no favorite listings"
      />
    )
  }
  return <FavoriteClient listings={listings} currentUser={currentUser} />
}
