import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ScrollView,
  Dimensions
} from 'react-native'
import axios from 'axios'
import DateTimePicker, {
  DateTimePickerEvent
} from '@react-native-community/datetimepicker'
import { Reservation } from '@/app/(app)/reservations'
import { APP_URL } from '@/utils'
import { useAuthStore } from '@/providers/auth-provider'
import { LinearGradient } from 'expo-linear-gradient'

const { width } = Dimensions.get('window')

type UpdateReservationProps = {
  reservation: Reservation
  onCancel: () => void
  onReservationUpdate: (reservation: Reservation) => void
}

const UpdateReservation = ({
  reservation,
  onCancel,
  onReservationUpdate
}: UpdateReservationProps) => {
  const { _id, date, time, peopleCount, restaurantId } = reservation

  const [newDate, setNewDate] = useState(date)
  const [day, month, year] = newDate.split('-').map(Number)
  const dateObj = new Date(year, month - 1, day)

  const [newTime, setNewTime] = useState(time)
  const [hours, minutes] = newTime.split(':').map(Number)
  const now = new Date()
  const timeObj = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    hours,
    minutes
  )

  const [people, setPeople] = useState(`${peopleCount}`)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [showTimePicker, setShowTimePicker] = useState(false)

  const { token } = useAuthStore()

  const onChangeDate = (_: DateTimePickerEvent, selectedDate?: Date) => {
    setShowDatePicker(false)
    if (selectedDate) {
      const formattedDate = `${selectedDate
        .getDate()
        .toString()
        .padStart(2, '0')}-${(selectedDate.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${selectedDate.getFullYear()}`
      setNewDate(formattedDate)
    }
  }

  const onChangeTime = (_: DateTimePickerEvent, selectedTime?: Date) => {
    setShowTimePicker(false)
    const pad = (n: number) => n.toString().padStart(2, '0')
    if (selectedTime) {
      const hour = selectedTime.getHours()
      if (hour < 12 || hour > 23) {
        Alert.alert(
          'Invalid Time',
          'Restaurant is open from 12.00 until 23.00'
        )
        return
      }
      const timeStr = `${pad(selectedTime.getHours())}:${pad(
        selectedTime.getMinutes()
      )}`
      setNewTime(timeStr)
    }
  }

  const handleUpdate = async () => {
    if (!people || Number(people) < 1 || Number(people) > 5) {
      Alert.alert('Invalid Input', 'People must be between 1 - 5')
      return
    }

    try {
      const result = await axios.patch(
        `${APP_URL}/reservation/update-reservation/${_id}`,
        {
          date: newDate,
          time: newTime,
          peopleCount: +people,
          restaurantId: restaurantId._id
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      Alert.alert('Success', 'Reservation updated!')
      onReservationUpdate(result.data)
      onCancel()
    } catch (err) {
      console.log('Update error:', err)
      Alert.alert('Error', 'Could not update reservation.')
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
      showsVerticalScrollIndicator={false}
    >
      <LinearGradient
        colors={['#f093fb', '#f5576c']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.headerGradient}
      >
        <Text style={styles.title}>Update Reservation</Text>
      </LinearGradient>

      <View style={styles.formSection}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            <Text style={styles.emoji}>🗒</Text> Date
          </Text>
          <TouchableOpacity
            style={styles.pickerButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.pickerButtonText}>{newDate}</Text>
            <Text style={styles.pickerArrow}>▼</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={dateObj}
              mode="date"
              display="default"
              onChange={onChangeDate}
              minimumDate={new Date()}
            />
          )}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            <Text style={styles.emoji}>🕒</Text> Time
          </Text>
          <TouchableOpacity
            style={styles.pickerButton}
            onPress={() => setShowTimePicker(true)}
          >
            <Text style={styles.pickerButtonText}>{newTime}</Text>
            <Text style={styles.pickerArrow}>▼</Text>
          </TouchableOpacity>
          {showTimePicker && (
            <DateTimePicker
              value={timeObj}
              mode="time"
              display="default"
              onChange={onChangeTime}
            />
          )}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            <Text style={styles.emoji}>👥</Text> Number of People
          </Text>
          <TextInput
            style={styles.textInput}
            value={people}
            onChangeText={setPeople}
            placeholder="Number of people (2-8)"
            keyboardType="numeric"
            placeholderTextColor="#999"
          />
        </View>
      </View>

      <View style={styles.buttonGroup}>
        <LinearGradient
          colors={['#4facfe', '#00f2fe']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.updateButton}
        >
          <TouchableOpacity
            style={styles.buttonInner}
            onPress={handleUpdate}
          >
            <Text style={styles.updateButtonText}>
              ✨ Update Reservation
            </Text>
          </TouchableOpacity>
        </LinearGradient>

        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
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
    shadowColor: '#f093fb',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center'
  },
  formSection: {
    paddingHorizontal: 20
  },
  inputGroup: {
    marginBottom: 20
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333'
  },
  emoji: {
    fontSize: 18
  },
  pickerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: '#fafafa'
  },
  pickerButtonText: {
    fontSize: 16,
    color: '#333'
  },
  pickerArrow: {
    fontSize: 18,
    color: '#666'
  },
  textInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#fff'
  },
  buttonGroup: {
    marginTop: 20,
    alignItems: 'center'
  },
  updateButton: {
    borderRadius: 10,
    width: width * 0.8
  },
  buttonInner: {
    paddingVertical: 12,
    alignItems: 'center'
  },
  updateButtonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16
  },
  cancelButton: {
    marginTop: 15
  },
  cancelButtonText: {
    color: '#555',
    fontSize: 16
  }
})
export default UpdateReservation
