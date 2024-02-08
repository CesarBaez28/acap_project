import { useState, useEffect, useContext } from "react"
import { API } from "../constants"
import { processedUserData } from "../utils/processedUserData"
import { UserContext } from "../contexts/userContext"

export function useGetUsers(state) {
  const { user } = useContext(UserContext)
  const [isLoading, setIsLoading] = useState(true)
  const [usersData, setUsersData] = useState(null)

  const loadUserData = async () => {
    try {
      setIsLoading(true)

      const response = await fetch(API + `/users/find/${state}/${user.id}`, { method: 'GET', });
      const data = await response.json()
      const processedData = processedUserData(data)
      setUsersData(processedData)
    } catch (error) {
      throw new Error(error)
    } finally {
      setIsLoading(false)
    }
  };

  useEffect(() => {
    if (user && Object.keys(user).length > 0) {
      loadUserData()
    }
  }, [user])

  return [usersData, setUsersData, isLoading, setIsLoading]
}
