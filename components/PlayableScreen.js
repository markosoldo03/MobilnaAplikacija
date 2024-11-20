import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, Modal, StyleSheet } from 'react-native';

const PlayableScreen = () => {
  const [randomNumbers, setRandomNumbers] = useState([]);
  const [currentNumberIndex, setCurrentNumberIndex] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);

  const handlePlayGame = () => {
    const numbers = Array.from({ length: 10 }, () => Math.floor(Math.random() * 10));
    setRandomNumbers(numbers);
    setIsModalVisible(true);
    setIsInputVisible(false);
    setIsCorrect(null);
    const intervalId = setInterval(() => {
      setCurrentNumberIndex((prevIndex) => (prevIndex + 1) % numbers.length);
    }, 800);
    setTimeout(() => {
      clearInterval(intervalId);
      setIsInputVisible(true);
    }, 10000);
  };

  const handleSubmit = () => {
    const sumOfRandomNumbers = randomNumbers.reduce((acc, num) => acc + num, 0);
    const userInputSum = parseInt(userInput);
    if (sumOfRandomNumbers === userInputSum) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  const handleRestart = () => {
    setUserInput('');
    setRandomNumbers([]);
    setCurrentNumberIndex(0);
    setIsInputVisible(false);
    setIsCorrect(null);
    setIsModalVisible(false);
    handlePlayGame();
  };

  return (
    <View style={styles.container}>
      <Button title="Play Game" onPress={handlePlayGame} />
      <Modal visible={isModalVisible} transparent={true}>
        <View style={styles.modalContainer}>
          {isInputVisible ? (
            <View style={styles.inputContainer}>
              <Text style={styles.modalText}>Enter the sum of the numbers:</Text>
              <TextInput
                style={styles.input}
                value={userInput}
                onChangeText={(text) => setUserInput(text)}
                keyboardType="numeric"
              />
              <View style={styles.buttonContainer}>
                <View style={{ flex: 1, alignItems: 'flex-start' }}>
                  <Button title="Submit" onPress={handleSubmit} style={styles.submitButton} />
                </View>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                <Button title="Restart" onPress={handleRestart} style={styles.restartButton} />
                </View>
              </View>
              {isCorrect !== null && (
                <Text style={isCorrect ? styles.correctText : styles.incorrectText}>
                  {isCorrect ? 'Correct!' : 'Incorrect'}
                </Text>
              )}
            </View>
          ) : (
            <View style={styles.numberContainer}>
              <Text style={styles.numberText}>{randomNumbers[currentNumberIndex]}</Text>
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  inputContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: 250,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: 200,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
  },
  resultText: {
    fontSize: 24,
    color: 'black',
    marginTop: 20,
    fontWeight: 'bold',
    marginBottom: -2,
  },
  numberContainer: {
    padding: 20,
    borderRadius: 10,
  },
  numberText: {
    fontSize: 64,
    color: 'black',
    fontWeight: 'bold',
  },
  correctText: {
    fontSize: 24,
    color: 'green',
    fontWeight: 'bold',
  },
  incorrectText: {
    fontSize: 24,
    color: 'red',
    fontWeight: 'bold',
  },
  submitButton: {
    width: 100,
    height: 30,
    fontSize: 14,
    borderRadius: 5, // Add smooth edges // Move submit button a bit to the left
  },
  restartButton: {
    width: 100,
    height: 30,
    fontSize: 14,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
});

export default PlayableScreen;