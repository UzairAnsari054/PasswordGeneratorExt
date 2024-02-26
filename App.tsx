import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

import * as Yup from 'yup'
const passwordSchema = Yup.object().shape({
  passwordLength: Yup.number()
  .min(4, 'Password length should be atleast 4 characters')
  .max(16, 'Password length should be atmost 16 characters')
  .required('Password length is required')
})


export default function App() {

  const [password, setPassword] = useState('')
  const [isPasswordGenerated, setIsPasswordGenerated] = useState(false)
  const [isLowerCase, setIsLowerCase] = useState(true)
  const [isUpperCase, setIsUpperCase] = useState(false)
  const [isDigit, setIsDigit] = useState(false)
  const [isSymbol, setIsSymbol] = useState(false)

  const generateCharacterString = (passwordLength: number) => {
    let characterList = ''

    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const digitChars = '0123456789';
    const specialChars = '!@#$%^&*()_+';

    if(isUpperCase){
      characterList += upperCaseChars 
    }

    if(isLowerCase){
      characterList += lowerCaseChars
    }

    if(isDigit){
      characterList += digitChars
    }

    if(isSymbol){
      characterList += specialChars
    }

    const password = generatePassword(characterList, passwordLength)
    setPassword(password)
    setIsPasswordGenerated(true)
  }

  const generatePassword = (characterList: string, passwordLength: number) => {
    let result = ''
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characterList.length)
      result += characterList.charAt(2)
      }
      return result
  }

  const restPassword = () => {
    setPassword('')
    setIsPasswordGenerated(false)
    setIsLowerCase(true)
    setIsUpperCase(false)
    setIsDigit(false)
    setIsSymbol(false)
  }

  return (
    <View>
      <Text>App</Text>
    </View>
  )
}

const styles = StyleSheet.create({})