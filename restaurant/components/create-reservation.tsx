import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableOpacity
} from 'react-native'
import axios from 'axios'
import DateTimePicker, {
  DateTimePickerEvent
} from '@react-native-community/datetimepicker'
import { APP_URL } from '@/utils'
import { Restaurant } from '@/app/(app)/restaurants'
import { useAuthStore } from '@/providers/auth-provider'
import { useRouter } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'

type CreateReservationProps = {
  restaurant: Restaurant
  onCancel: () => void
}

export const CreateReservation = ({
  restaurant,
  onCancel
}: CreateReservationProps) => {
  const [date, setDate] = useState(new Date())
  const [time, setTime] = useState(new Date())
  const [people, setPeople] = useState('')
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [showTimePicker, setShowTimePicker] = useState(false)

  const { token } = useAuthStore()
  const router = useRouter()

  const onChangeDate = (_: DateTimePickerEvent, selectedDate?: Date) => {
    setShowDatePicker(false)
    if (selectedDate) setDate(selectedDate)
  }

  const onChangeTime = (_: DateTimePickerEvent, selectedTime?: Date) => {
    setShowTimePicker(false)
    if (selectedTime) {
      const hours = selectedTime.getHours()
      if (hours < 12 || hours > 23) {
        Alert.alert(
          'Invalid Time',
          'Restaurant is open from 12.00 until 23.00'
        )
        return
      }
      setTime(selectedTime)
    }
  }

  const pad = (n: number) => n.toString().padStart(2, '0')
  const getFormattedDate = () =>
    `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${date.getFullYear()}`
  const getFormattedTime = () =>
    `${pad(time.getHours())}:${pad(time.getMinutes())}`

  const handleCreateReservation = async () => {
    if (!people || Number(people) < 1 || Number(people) > 5) {
      Alert.alert('Invalid People Count', 'People must be between 1 - 5')
      return
    }

    const formattedDate = getFormattedDate()
    const timeStr = getFormattedTime()

    try {
      await axios.post(
        `${APP_URL}/reservation/create-reservation`,
        {
          restaurantId: restaurant?._id,
          date: formattedDate,
          time: timeStr,
          peopleCount: people
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      Alert.alert('Success', 'Reservation created!')
      onCancel()
      router.push('/reservations')
    } catch (err) {
      console.log('Create error:', err)
      Alert.alert('Error', 'Could not create reservation.')
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
      showsVerticalScrollIndicator={false}
    >
      <LinearGradient
        colors={['#4facfe', '#00f2fe']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.headerGradient}
      >
        <Text style={styles.title}>Reservation</Text>
      </LinearGradient>

      <View style={styles.card}>
        <View style={styles.restaurantSection}>
          <Text style={styles.sectionIcon}>🍔</Text>
          <View style={styles.restaurantInfo}>
            <Text style={styles.restaurantLabel}>Restaurant</Text>
            <Text style={styles.restaurantName}>{restaurant?.name}</Text>
          </View>
        </View>
      </View>

      <View style={styles.formSection}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            <Text style={styles.emoji}>🗒</Text> Date of reservation
          </Text>
          <TouchableOpacity
            style={styles.pickerButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.pickerButtonText}>
              {getFormattedDate()}
            </Text>
            <Text style={styles.pickerArrow}>▼</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="inline"
              minimumDate={new Date()}
              onChange={onChangeDate}
            />
          )}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            <Text style={styles.emoji}>🕛</Text> Time of reservation
          </Text>
          <TouchableOpacity
            style={styles.pickerButton}
            onPress={() => setShowTimePicker(true)}
          >
            <Text style={styles.pickerButtonText}>
              {getFormattedTime()}
            </Text>
            <Text style={styles.pickerArrow}>▼</Text>
          </TouchableOpacity>
          {showTimePicker && (
            <DateTimePicker
              value={time}
              mode="time"
              display="default"
              onChange={onChangeTime}
            />
          )}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            <Text style={styles.emoji}>👥</Text> People
          </Text>
          <TextInput
            style={styles.textInput}
            placeholder="People must be between 1 - 5"
            value={people}
            onChangeText={setPeople}
            keyboardType="numeric"
            placeholderTextColor="#999"
          />
        </View>
      </View>

      <LinearGradient
        colors={['#56ab2f', '#a8e6cf']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.reserveButton}
      >
        <TouchableOpacity
          style={styles.reserveButtonInner}
          onPress={handleCreateReservation}
        >
          <Text style={styles.reserveButtonText}>Complete</Text>
        </TouchableOpacity>
      </LinearGradient>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20
  },
  headerGradient: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#4facfe',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5
  },
  restaurantSection: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  sectionIcon: {
    fontSize: 32,
    marginRight: 15
  },
  restaurantInfo: {
    flex: 1
  },
  restaurantLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
    marginBottom: 4
  },
  restaurantName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333'
  },
  formSection: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5
  },
  inputGroup: {
    marginBottom: 20
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8
  },
  emoji: {
    fontSize: 18
  },
  pickerButton: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e9ecef'
  },
  pickerButtonText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500'
  },
  pickerArrow: {
    fontSize: 12,
    color: '#666'
  },
  textInput: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#e9ecef'
  },
  reserveButton: {
    borderRadius: 15,
    shadowColor: '#56ab2f',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8
  },
  reserveButtonInner: {
    paddingVertical: 18,
    paddingHorizontal: 20,
    alignItems: 'center'
  },
  reserveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2
  }
})
