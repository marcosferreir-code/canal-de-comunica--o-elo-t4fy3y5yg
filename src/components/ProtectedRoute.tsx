import { useEffect, useState } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { pb } from '@/services/auth'

export function ProtectedRoute() {
  const location = useLocation()
  const [authenticated, setAuthenticated] = useState(pb.authStore.isValid)

  useEffect(() => {
    return pb.authStore.onChange(() => {
      setAuthenticated(pb.authStore.isValid)
    }, true)
  }, [])

  if (!authenticated) {
    return <Navigate to="/entrar" replace state={{ from: location.pathname }} />
  }

  return <Outlet />
}
