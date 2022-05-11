import { useState, useEffect, useCallback } from 'react'
import { FlatList, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native'
import { Header } from '../../components/Header'
import { Container } from './styles'
import { ListCard } from '../../components/ListCard';

interface LisUsersProps {
  id: string;
  name: string;
  cpf: string;
  email: string;
  city: string;
}

export function ListUsers() {
  const [users, setUsers] = useState<LisUsersProps[]>([])

  async function loadUsers() {
    const storagedUsers = await AsyncStorage.getItem('@si7op:users')
    if (storagedUsers) {
      setUsers(JSON.parse(storagedUsers))
    }
  }

  function handleDeleteUser(id: string) {
    Alert.alert('Exclusão', 'Tem certeza?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed')
      },
      {
        text: 'OK',
        onPress: () => setUsers(users => users.filter(user => user.id !== id))
      }
    ])
  }

  useEffect(() => {
    loadUsers()
  }, [])

  useFocusEffect(useCallback(() => {
    loadUsers()
  }, []))

  useEffect(() => {
    async function saveUsers() {
      await AsyncStorage.setItem('@si7op:users', JSON.stringify(users))
    }
    saveUsers()
  }, [users])

  return (
    <Container>
      <Header title='Listagem de Usuários' />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={users}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ListCard
            item={item}
            onPress={() => handleDeleteUser(item.id)}
          />
        )}
      />
    </Container>
  )
}
