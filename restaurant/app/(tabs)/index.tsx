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

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('') // Νέο state για το error
  const router = useRouter()
  const { setAuthState } = useAuthStore()

  const handleLogin = async () => {
    try {
      setErrorMessage('') // Καθαρισμός προηγούμενων errors
      const response = await axios.post(`${APP_URL}/auth/login`, {
        email,
        password
      })

      const result = response.data as Auth
      if (result?.token) {
        await setAuthState(result)
        router.push('/restaurants')
      }
    } catch (error: any) {
      // Έλεγχος αν το axios error έχει μήνυμα από backend
      if (isAxiosError(error) && error.response?.data?.message) {
        setErrorMessage(error.response.data.message)
      } else {
        setErrorMessage('An unexpected error occurred.')
      }
      console.log('Login error:', error)
    }
  }

  return (
    <LinearGradient
      colors={['#667eea', '#764ba2', '#f093fb']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Login</Text>

        <Text style={styles.label}>Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />

        {/* Εμφάνιση μηνύματος λάθους */}
        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <Text style={styles.link}>
          New member?{' '}
          <Link href="/register" style={styles.linkText}>
            Register
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
    backgroundColor: 'rgba(233, 242, 247, 0.95)',
    borderRadius: 5,
    padding: 20,
    elevation: 4
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
    color: '#333'
  },
  input: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 5,
    fontSize: 15,
    marginBottom: 15,
    borderColor: 'black',
    borderWidth: 1,
    color: 'black'
  },
  loginButton: {
    backgroundColor: 'darkblue',
    paddingVertical: 14,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold'
  },
  link: {
    marginTop: 25,
    textAlign: 'center',
    fontSize: 15,
    color: 'black'
  },
  linkText: {
    color: 'darkblue',
    fontWeight: 'bold'
  },
  label: {
    marginBottom: 6,
    fontSize: 15,
    fontWeight: '600',
    color: 'black'
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center'
  }
})

export default LoginScreen
