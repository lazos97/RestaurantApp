import React, { useState, useCallback } from 'react'
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity
} from 'react-native'
import axios from 'axios'
import { useFocusEffect } from '@react-navigation/native'
import AppBackground from '../../components/app-background'
import { APP_URL } from '@/utils'
import { useAuthStore } from '@/providers/auth-provider'
import { useRouter } from 'expo-router'
import { UpdateReservationModal } from '@/components/update-reservation-modal'

export interface Reservation {
  _id: string
  date: string
  time: string
  peopleCount: number
  userId: UserId
  restaurantId: RestaurantId
}

interface RestaurantId {
  _id: string
  name: string
  location: string
}

interface UserId {
  _id: string
  name: string
}

const ReservationsScreen = () => {
  const [loading, setLoading] = useState(true)
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [selectedReservation, setSelectedReservation] =
    useState<Reservation | null>(null)

  const router = useRouter()
  const { token } = useAuthStore()

  const fetchReservations = useCallback(async () => {
    try {
      const res = await axios.get(`${APP_URL}/reservation/get-by-user`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      setReservations(res.data.reservations)
    } catch (err) {
      console.log('Error fetching reservations:', err)
    } finally {
      setLoading(false)
    }
  }, [token])

  useFocusEffect(
    useCallback(() => {
      setLoading(true)
      fetchReservations()
    }, [fetchReservations])
  )

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(
        `${APP_URL}/reservation/delete-reservation/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      setReservations(prev => prev.filter(r => r._id !== id))
    } catch (err) {
      console.log('Error deleting reservation:', err)
      Alert.alert('Error', 'Could not delete reservation.')
    }
  }

  const handleUpdate = (reservation: Reservation) => {
    setSelectedReservation(reservation)
  }

  const handleUpdateReservationResult = (newReservation: Reservation) => {
    setReservations(old =>
      old.map(reservation => {
        return reservation._id === reservation._id
          ? newReservation
          : reservation
      })
    )
  }

  const handleReservationHandler = () => setSelectedReservation(null)

  if (loading) {
    return (
      <AppBackground>
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      </AppBackground>
    )
  }

  return (
    <AppBackground>
      <View style={styles.container}>
        <Text style={styles.title}>Reservations</Text>

        {reservations.length === 0 ? (
          <View style={styles.center}>
            <Text style={styles.emptyText}>
              You dont have any reservations yet.
            </Text>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => router.push('/restaurants')}
            >
              <Text style={styles.buttonText}>
                Create your first reservation
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={reservations}
            keyExtractor={item => item._id.toString()}
            contentContainerStyle={{ paddingBottom: 40 }}
            renderItem={({ item }) => {
              return (
                <View style={styles.card}>
                  <Text style={styles.restaurant}>
                    {item.restaurantId.name}
                  </Text>
                  <Text style={styles.detail}>🗒 {item.date}</Text>
                  <Text style={styles.detail}>🕒 {item.time}</Text>
                  <Text style={styles.detail}>
                    👥 {item.peopleCount} people
                  </Text>

                  <View style={styles.buttonRow}>
                    <TouchableOpacity onPress={() => handleUpdate(item)}>
                      <Text style={styles.update}>✍️ Update</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleDelete(item._id)}
                    >
                      <Text style={styles.delete}>❌ Delete</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )
            }}
          />
        )}
      </View>
      <UpdateReservationModal
        reservation={selectedReservation}
        onReservationUpdate={handleUpdateReservationResult}
        onCancel={handleReservationHandler}
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
    marginBottom: 30
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 20,
    borderRadius: 5,
    marginBottom: 15
  },
  restaurant: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 10
  },
  detail: {
    fontSize: 20,
    color: 'black',
    marginVertical: 2
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  },
  update: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 20
  },
  delete: {
    color: '#ff4d4d',
    fontWeight: 'bold',
    fontSize: 20
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyText: {
    color: '#ccc',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16
  },
  primaryButton: {
    backgroundColor: '#1e90ff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15
  }
})

export default ReservationsScreen
