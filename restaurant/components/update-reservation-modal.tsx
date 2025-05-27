import {
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  Text
} from 'react-native'
import { Reservation } from '@/app/(app)/reservations'
import UpdateReservation from './update-reservation'
import { BlurView } from 'expo-blur'

type CustomModalProps = {
  reservation: Reservation | null
  onCancel: () => void
  onReservationUpdate: (reservation: Reservation) => void
}

export const UpdateReservationModal = ({
  reservation,
  onReservationUpdate,
  onCancel
}: CustomModalProps) => {
  if (!reservation) return null

  return (
    <Modal
      visible={!!reservation}
      animationType="slide"
      transparent={true}
    >
      <BlurView intensity={20} style={styles.backdrop}>
        <View style={styles.modalContainer}>
          <View style={styles.handle} />
          <View style={styles.content}>
            <UpdateReservation
              onReservationUpdate={onReservationUpdate}
              reservation={reservation}
              onCancel={onCancel}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={onCancel}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>
        </View>
      </BlurView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end'
  },
  modalContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    minHeight: '70%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -10
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 20
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#ddd',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 20
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 20,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  closeButtonText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600'
  }
})
