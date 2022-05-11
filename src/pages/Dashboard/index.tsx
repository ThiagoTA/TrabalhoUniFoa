import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert, Keyboard } from 'react-native'
import { Button } from '../../components/Button'
import { Header } from '../../components/Header'
import { Input } from '../../components/Input'
import { Container } from './styles'
export function Dashboard() {
  const [name, setName] = useState('')
  const [cpf, setCpf] = useState('')
  const [email, setEmail] = useState('')
  const [city, setCity] = useState('')

  async function handleAddUser() {
    const user = {
      id: String(new Date().getTime()),
      name,
      cpf,
      email,
      city
    }
    try {
      const data = await AsyncStorage.getItem('@si7op:users')
      const currentData = data ? JSON.parse(data) : []
      const dataFormatted = [
        ...currentData,
        user
      ]
      await AsyncStorage.setItem('@si7op:users', JSON.stringify(dataFormatted))
    } catch (err) {
      console.log(err)
      Alert.alert('Não foi possível gravar o usuário')
    }
    setName('')
    setCpf('')
    setEmail('')
    setCity('')
  }

  async function loadDataUser() {
    const data = await AsyncStorage.getItem('@si7op:users')
    const currentData = data ? JSON.parse(data) : []
    console.log(currentData)
  }

  // limpar o AsyncStorage
  async function clearDataUser() {
    await AsyncStorage.clear()
  }

  useEffect(() => {
    //loadDataUser()
    clearDataUser()
  }, [])

  return (
    <Container
    // keyboardShouldPersistTaps='handled'
    // onPress={Keyboard.dismiss}
    // accessible={false}
    //TouchableWithoutFeedback
    >
      <Header title='Cadastro de Usuários' />

      <Input
        placeholder='Nome'
        value={name}
        onChangeText={value => setName(value)}
      />

      <Input
        placeholder='CPF'
        value={cpf}
        onChangeText={value => setCpf(value)}
      />

      <Input
        placeholder='E-mail'
        value={email}
        onChangeText={value => setEmail(value)}
      />

      <Input
        placeholder='Cidade'
        value={city}
        onChangeText={value => setCity(value)}
      />

      <Button
        title='Adicionar'
        handleUser={handleAddUser}
      />

    </Container>
  )
}