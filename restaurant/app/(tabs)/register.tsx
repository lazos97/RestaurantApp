import React, { useState } from 'react'
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import axios, { isAxiosError } from 'axios'
import { Link, useRouter } from 'expo-router'
import { APP_URL } from '@/utils'
import { useAuthStore } from '@/providers/auth-provider'
import { Auth } from '@/hooks/use-auth-token'
import { LinearGradient } from 'expo-linear-gradient'

const RegisterScreen = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('') // Νέο state για error

  const router = useRouter()
  const { setAuthState } = useAuthStore()

  const handleRegister = async () => {
    try {
      setErrorMessage('') // Καθαρισμός παλιών errors
      const response = await axios.post(`${APP_URL}/auth/register`, {
        name,
        email,
        password
      })
      const result = response.data as Auth
      if (result?.token) {
        await setAuthState(result)
        router.push('/restaurants')
      }
    } catch (err: any) {
      // Ελέγχουμε αν axios error έχει μήνυμα από backend
      if (isAxiosError(err) && err.response?.data?.message) {
        setErrorMessage(err.response.data.message)
      } else {
        setErrorMessage('An unexpected error occurred.')
      }
      console.log('Register error:', err)
    }
  }

  return (
    <LinearGradient
      colors={['#a1c4fd', '#c2e9fb', '#d4fc79']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Register</Text>

        <Text style={styles.label}>Name</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          style={styles.input}
          placeholderTextColor="#777"
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
          placeholderTextColor="#777"
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
          placeholderTextColor="#777"
        />

        {/* Εμφάνιση μηνύματος λάθους */}
        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}

        <TouchableOpacity
          style={styles.registerButton}
          onPress={handleRegister}
        >
          <Text style={styles.registerButtonText}>Submit</Text>
        </TouchableOpacity>

        <Text style={styles.link}>
          You already have a valid account?{' '}
          <Link href="/" style={styles.linkText}>
            Sign In
          </Link>
        </Text>
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20
  },
  card: {
    backgroundColor: 'rgba(195, 218, 198, 0.95)',
    borderRadius: 5,
    padding: 24,
    elevation: 4
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333'
  },
  label: {
    color: '#333',
    fontWeight: '600',
    marginBottom: 6,
    marginLeft: 4,
    fontSize: 14
  },
  input: {
    backgroundColor: 'white',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 5,
    fontSize: 15,
    marginBottom: 15,
    borderColor: '#ccc',
    borderWidth: 1,
    color: 'black'
  },
  registerButton: {
    backgroundColor: '#28a745',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10
  },
  registerButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold'
  },
  link: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 14,
    color: 'black'
  },
  linkText: {
    color: 'darkblue',
    fontWeight: 'bold'
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center'
  }
})

export default RegisterScreen
