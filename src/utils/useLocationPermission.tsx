import { useCallback, useRef, useState } from 'react'
import toast from 'react-hot-toast'

export type Coordinates = {
  latitude: number
  longitude: number
}

export const useLocationPermission = () => {
  const [isPermitted, setIsPermitted] = useState(false)
  const [coordinates, setCoordinates] = useState<Coordinates>()
  const [isWaitingForPermission, setIsWaitingForPermission] = useState(false)
  const handlePermissionListener: { current: void | null } = useRef(null)

  const setAll = (value: boolean) => {
    setIsWaitingForPermission(false)
    setIsPermitted(value)
    toast.remove()
    !value && toast.error('Please allow your location from browser settings')
  }

  const handleLocation = useCallback(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        if (!(pos.coords.latitude || pos.coords.longitude)) return setAll(false)

        const coords = {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        }
        setCoordinates(coords)
        setAll(true)
      },
      () => {
        setAll(false)
      },
      { enableHighAccuracy: true }
    )
  }, [])

  const handleGetDeviceLocation = useCallback(() => {
    setIsWaitingForPermission(true)
    if (typeof window !== 'undefined' && 'geolocation' in navigator) {
      void navigator.permissions
        .query({ name: 'geolocation' })
        .then((response) => {
          handleLocation()
          handlePermissionListener.current = response.addEventListener(
            'change',
            () => {
              if (response.state === 'granted' || response.state === 'prompt')
                handleLocation()
              else setAll(false)
            }
          )
        })
    } else setAll(false)
  }, [handleLocation])

  return {
    isPermitted,
    coordinates,
    isWaitingForPermission,
    handleLocation,
    handleGetDeviceLocation,
    clearCoordinates: () => setCoordinates(undefined),
  }
}
