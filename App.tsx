import React, { useRef, useState, useMemo } from 'react';
import { SafeAreaView, StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList, Keyboard, TouchableWithoutFeedback, Platform, KeyboardAvoidingView, useWindowDimensions ,Linking } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [inputText, setInputText] = useState('');
  const [submittedTexts, setSubmittedTexts] = useState<string[]>([]);
  const [error, setError] = useState('');
  const snapPoints = useMemo(() => ["65%"], []);
  const [showClearButton, setShowClearButton] = useState(false); 
  const handleEmailPress = () => {
      Linking.openURL('mailto:support@example.com');
  };

  const handleSubmit = () => {
    if (inputText.trim()) {
      setSubmittedTexts(prevTexts => {
        const newTexts = [...prevTexts, inputText];
        setShowClearButton(newTexts.length > 0); 
        return newTexts;
      });
      setInputText('');
      setError('');
      Keyboard.dismiss(); 
      bottomSheetRef.current?.close(); 
    } else {
      setError('Validation: Cannot save empty input');
    }
  };

  const handleCancel = () => {
    setInputText('');
    setError('');
    Keyboard.dismiss(); 
    bottomSheetRef.current?.close(); 
  };

  const handleClear = () => {
    setSubmittedTexts([]);
    setShowClearButton(false); 
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome to Bottom Sheet Modal Project! Easily manage and view your keynotes.</Text>
          <Text style={styles.instructions}>1. Tap 'Open Bottom Sheet' to add new keynotes.</Text>
          <Text style={styles.instructions}>2. Save your notes to have them listed here.</Text>
        </View>
        <FlatList
          data={submittedTexts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <Text style={styles.bulletItem}>{`\u2022 ${item}`}</Text>}
          style={styles.bulletList}
        />
        {showClearButton && (
          <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
          <Text style={styles.clearButtonText}>Clear All</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.openBottomSheetButton} onPress={() => bottomSheetRef.current?.expand()}>
          <Text style={styles.openBottomSheetButtonText}>Add Keynote</Text>
        </TouchableOpacity>
      
        <BottomSheet
          ref={bottomSheetRef}
          index={-1} 
          snapPoints={snapPoints} 
          enablePanDownToClose={true}
          handleIndicatorStyle={styles.handleIndicator}
          backgroundStyle={styles.bottomSheetBackground}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={styles.keyboardAvoidingView}>
              <View style={styles.bottomSheetContent}>
                <TextInput
                  style={[styles.input, error ? styles.inputError : null]}
                  placeholder="Keynotes"
                  value={inputText}
                  onChangeText={setInputText}
                  placeholderTextColor="#888"
                />
                {error ? <Text style={styles.errorText}>{error}</Text> : null}
                <View style={styles.bottomSheetButtons}>
                  <TouchableOpacity style={[styles.bottomSheetButton, styles.cancelButton]} onPress={handleCancel}>
                    <Text style={styles.cancelbuttonText}>Close</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.bottomSheetButton, styles.saveButton]} onPress={handleSubmit}>
                    <Text style={styles.savebuttonText}>Save</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </BottomSheet>
      </SafeAreaView>
      <View>
      <Text style={styles.instructions}>
        Have suggestions or issues? 
        <Text style={styles.emailLink} onPress={handleEmailPress}>
          {' Contact us through the email.'}
        </Text>
        </Text>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6966ad',
    padding: 15,
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    marginTop:30,
  },
  instructions: {
    fontSize: 16,
    color: '#fff',
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: "100%",
  },
  bulletList: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  bulletItem: {
    fontSize: 18,
    color: '#e6e6f2',
    marginBottom: 5,
    paddingVertical: 5,
  },
  openBottomSheetButton: {
    backgroundColor: '#83cfd6',
    padding: 15,
    alignItems: 'center',
    borderRadius: 10,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  openBottomSheetButtonText: {
    color: '#4b666b',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bottomSheetBackground: {
    backgroundColor: '#c7edd0',
    
  },
  handleIndicator: {
    backgroundColor: '#ccc',
    height: 5,
    borderRadius: 2.5,
  },
  bottomSheetContent: {
    flex: 1,
    padding: 20,
    borderRadius: 20,
    backgroundColor: '#c7edd0',
    justifyContent: 'center',
    alignContent: 'center',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
  bottomSheetButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottomSheetButton: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelButton: {
    marginRight: 5,
    borderRadius: 10,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#4b666b',
  },
  cancelbuttonText: {
    color: '#4b666b',
    fontSize: 16,
    fontWeight: 'bold', 
  },
  saveButton: {
    backgroundColor: '#83cfd6',
    marginLeft: 5,
  },
  savebuttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  clearButton: {
    borderRadius: 10,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#fff',
    padding: 15,
    alignItems: 'center',
    position: 'absolute',
    bottom: 70, 
    width: '100%',
    color: '#4b666b',
    fontSize: 16,
    fontWeight: 'bold', 
  },
  clearButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  emailLink: {
    color: '#ebf0fa', 
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
});

export default App;