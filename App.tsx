import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

import * as Yup from 'yup'
import { Formik } from 'formik'
import BouncyCheckbox from 'react-native-bouncy-checkbox'

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
      result += characterList.charAt(characterIndex)
      }
      return result
  }

  const restPasswordState = () => {
    setPassword('')
    setIsPasswordGenerated(false)
    setIsLowerCase(true)
    setIsUpperCase(false)
    setIsDigit(false)
    setIsSymbol(false)
  }

  return (
      <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer}>
        <Text style={styles.title}>Password Generator</Text>
        <Formik
       initialValues={{ passwordLength: '' }}
       validationSchema={passwordSchema}
       onSubmit={ values => {
        generateCharacterString(+values.passwordLength)
       }}
     >
       {({
         values,
         errors,
         touched,
         isValid,
         handleChange,
         handleSubmit,
         handleReset
         /* and other goodies */
       }) => (
         <>
         <View style={styles.inputWrapper}>
          <View style={styles.inputColumn}>
            <Text style={styles.heading}>Password Length</Text>
            {touched.passwordLength && errors.passwordLength && (
              <Text style={styles.errorText}>{errors.passwordLength}</Text>
            )}
          </View>
          <TextInput 
          style={styles.inputStyle}
          value={values.passwordLength}
          onChangeText={handleChange('passwordLength')}
          placeholder="Ex. 8"
          keyboardType='numeric'
          />
         </View>

         <View style={styles.inputWrapper}>
          <Text style={styles.heading}>Include lowercase</Text>
          <BouncyCheckbox 
          disableBuiltInState
          isChecked={isLowerCase}
          onPress={ () => setIsLowerCase(!isLowerCase)}
          />
         </View>

         <View style={styles.inputWrapper}>
          <Text style={styles.heading}>Include uppercase</Text>
          <BouncyCheckbox 
          disableBuiltInState
          isChecked={isUpperCase}
          onPress={ () => setIsUpperCase(!isUpperCase)}
          />
         </View>

         <View style={styles.inputWrapper}>
          <Text style={styles.heading}>Include Digits</Text>
          <BouncyCheckbox 
          disableBuiltInState
          isChecked={isDigit}
          onPress={ () => setIsDigit(!isDigit)}
          />
         </View>

         <View style={styles.inputWrapper}>
          <Text style={styles.heading}>Include Special Characters</Text>
          <BouncyCheckbox 
          disableBuiltInState
          isChecked={isSymbol}
          onPress={ () => setIsSymbol(!isSymbol)}
          />
         </View>

       

         <View style={styles.formActions}>
          <TouchableOpacity
          style={styles.primaryBtn}
          disabled={!isValid}
          onPress={handleSubmit}>
            <Text style={styles.primaryBtnTxt}>Generate Password</Text>
          </TouchableOpacity>

          <TouchableOpacity
          style={styles.secondaryBtn}
          onPress={ () => {
            handleReset()
            restPasswordState()
          }}>
            <Text style={styles.secondaryBtnTxt}>Reset</Text>
          </TouchableOpacity>

         </View>
         </>
       )}
       
     </Formik>
        </View>
        {isPasswordGenerated ? (
          <View style={[styles.card, styles.cardElevated]}>
            <Text style={styles.subTitle}>Result:</Text>
            <Text style={styles.description}>Long Press to copy</Text>
            <Text selectable={true} style={styles.generatedPassword}>{password}</Text>
          </View>
        ) : null}
        <View>
          
        </View>

      </SafeAreaView>
      </ScrollView>
  )
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  formContainer: {
    margin: 8,
    padding: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 15,
  },
  subTitle: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 2,
  },
  description: {
    color: '#758283',
    marginBottom: 8,
  },
  heading: {
    fontSize: 15,
  },
  inputWrapper: {
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  inputColumn: {
    flexDirection: 'column',
  },
  inputStyle: {
    padding: 8,
    width: '30%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#16213e',
  },
  errorText: {
    fontSize: 12,
    color: '#ff0d10',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  primaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#5DA3FA',
  },
  primaryBtnTxt: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  secondaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#CAD5E2',
  },
  secondaryBtnTxt: {
    textAlign: 'center',
  },
  card: {
    padding: 12,
    borderRadius: 6,
    marginHorizontal: 12,
  },
  cardElevated: {
    backgroundColor: '#ffffff',
    elevation: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  generatedPassword: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 12,
    color:'#000'
  },
});