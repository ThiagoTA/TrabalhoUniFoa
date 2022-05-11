import { useState, useEffect, useCallback } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { Button } from '../../components/Button';
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { Container } from "./styles";
import { Alert, FlatList } from 'react-native';
import { ListCard } from '../../components/ListCard';

interface SearchUsersProps {
  id: string;
  name: string;
  email: string;
  cpf: string;
  city: string;
}

export function SearchUsers() {
  const [user, setUser] = useState('')
  const [users, setUsers] = useState<SearchUsersProps[]>([])

  const [city, setCity] = useState('')
  const [cities, setCities] = useState<SearchUsersProps[]>([])

  const [fitlerUser, setFilterUser] = useState<SearchUsersProps[]>([])

  async function getFilters() {
    if (user == '' && city =='') {
      
        setUser('')
        setCity('')
        return (
          Alert.alert('Por favor, insira o usuário ou cidade'),
          setFilterUser([]))

    } else if (user.length > 0 && city == '') {
        let data = users.filter(userData => userData.name.includes(user))

        setUser('')
        if(data.length == 0) return (
          Alert.alert('Usuario não encontrado'), 
          setFilterUser([])
        )

        setFilterUser(data)

    } else if (user == '' && city.length > 0) {
        let data = cities.filter(userData => userData.city.includes(city))

        setCity('')
        if(data.length == 0) return (
          Alert.alert('Usuario não encontrado'), 
          setFilterUser([])
        )

        setFilterUser(data)

    } else {
        let dataCities = cities.filter(userData => userData.city.includes(city))
        let dataUsers = users.filter(userData => userData.name.includes(user))

        setUser('')
        setCity('')
        if ((dataCities.length == 0) && (dataUsers.length == 0)) return (
          Alert.alert('Usuario ou cidade não encontrado'), 
          setFilterUser([])
        )

        setFilterUser(dataCities && dataUsers)
    }
}

  async function loadFilter() {
    const storageUsers = await AsyncStorage.getItem
    ('@si7op:users')
    if (storageUsers) {
      setUsers(JSON.parse(storageUsers))
      setCities(JSON.parse(storageUsers))
      setUser('')
      setCity('')
      setFilterUser([])
    } 
  }

  useEffect(() => {
    loadFilter()
  }, [])

  useFocusEffect(useCallback(() => {
    loadFilter()
  }, []))

  return (
    <Container>
      <Header title='Pesquisa de Usuários' />
      <Input
        placeholder='Digite o usuário'
        value={user}
        onChangeText={value => setUser(value)}
      />
      <Input
        placeholder='Digite a cidade'
        value={city}
        onChangeText={value => setCity(value)}
      />    
      <Button 
        title='Pesquisar' 
        handleUser={getFilters}
        />
      {fitlerUser &&
      <FlatList
        showsVerticalScrollIndicator={false}
        data={fitlerUser}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ListCard
            item={item}
          />
        )}
      />
    }
    </Container>
  )
}