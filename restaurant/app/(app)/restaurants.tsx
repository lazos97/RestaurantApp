import AppBackground from '@/components/app-background'
import { CreateReservationModal } from '@/components/create-reservation-modal'
import LoadingSpinner from '@/components/loading-spinner'
import { useAuthStore } from '@/providers/auth-provider'
import { APP_URL } from '@/utils'
import React, { useCallback, useEffect, useState } from 'react'
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity
} from 'react-native'

export interface Restaurant {
  _id: string
  name: string
  location: string
  description: string
  __v: number
  createdAt: string
  updatedAt: string
}

export default function RestaurantScreen() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<any>(null)

  const [selectedRestaurant, setSelectedRestaurant] =
    useState<Restaurant | null>(null)

  const { token } = useAuthStore()

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch(
          `${APP_URL}/restaurant/get-all-restaurant`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        if (response.status !== 200)
          throw new Error('Error fetching restaurants')

        const data = await response.json()
        setRestaurants(data.restaurants as Restaurant[])
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchRestaurants()
  }, [token])

  const onResetSelectedRestaurant = useCallback(() => {
    setSelectedRestaurant(null)
  }, [])

  if (loading) {
    return <LoadingSpinner />
  }

  if (error) return <Text style={styles.error}>404</Text>

  return (
    <AppBackground>
      <View style={styles.container}>
        <Text style={styles.title}>Restaurants</Text>
        <FlatList
          data={restaurants}
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.location}>╰┈➤ {item.location}</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setSelectedRestaurant(item)}
              >
                <Text style={styles.buttonText}>Make a reservation</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
      <CreateReservationModal
        onCancel={onResetSelectedRestaurant}
        restaurant={selectedRestaurant}
      />
    </AppBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 25
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    padding: 20,
    borderRadius: 5,
    marginBottom: 20,
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 4
  },
  name: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#black',
    marginBottom: 10
  },
  description: {
    fontSize: 15,
    color: 'black',
    marginBottom: 15
  },
  button: {
    backgroundColor: 'darkblue',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 15
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  location: {
    fontSize: 15,
    color: '#666',
    marginBottom: 15
  },
  error: { color: 'red', textAlign: 'center', marginTop: 50 }
})
