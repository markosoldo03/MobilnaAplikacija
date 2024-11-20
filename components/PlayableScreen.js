import React, { useState, useEffect } from 'react';
import { View, Button, Text, Modal, StyleSheet, TextInput, Alert } from 'react-native';

const PlayableScreen = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [randomNumbers, setRandomNumbers] = useState([]);
  const [currentNumberIndex, setCurrentNumberIndex] = useState(0);
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const [userInputs, setUserInputs] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);

  const handlePlayGame = () => {
    // Generate 10 random numbers
    const numbers = Array.from({ length: 10 }, () => Math.floor(Math.random() * 10));
    setRandomNumbers(numbers);
    setIsModalVisible(true);
    setIsButtonVisible(false);
    setUserInputs([]); // Clear previous user inputs

    // Start the automatic number display
    const intervalId = setInterval(() => {
      setCurrentNumberIndex((prevIndex) => (prevIndex + 1) % numbers.length);
    }, 800);

    // Clear the interval after 10 seconds and show the input field
    setTimeout(() => {
      clearInterval(intervalId);
      setIsInputVisible(true);
    }, 10000);
  };

  const handleInputChange = (text) => {
    setUserInput(text);
  };

  const handleSubmit = () => {
    userInputs.push(parseInt(userInput));
    if (userInputs.length === 10) {
      const correctSum = randomNumbers.reduce((acc, num) => acc + num, 0);
      const userSum = userInputs.reduce((acc, num) => acc + num, 0);
      setIsCorrect(userSum === correctSum);
    } else {
      setUserInput('');
    }
  };

  const handleRestart = () => {
    handlePlayGame();
  };

  return (
    <View style={styles.container}>
      <Button title="Play Game" onPress={handlePlayGame} />
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => {}}
      >
        <View style={styles.modalContainer}>
          {!isInputVisible ? (
            <Text style={styles.modalText}>{randomNumbers[currentNumberIndex]}</Text>
          ) : (
            <>
              {!isCorrect ? (
                <>
                  <Text style={styles.modalText}>Enter the sum of the numbers:</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={handleInputChange}
                    value={userInput}
                    keyboardType="numeric"
                  />
                  <Button title="Submit" onPress={handleSubmit} />
                  {isInputVisible && !isCorrect && (
                    <Text style={styles.modalText}>Incorrect. Please try again.</Text>
                  )}
                </>
              ) : (
                <Text style={styles.modalText}>Correct! You win!</Text>
              )}
              {!isCorrect && (
                <Button title="Restart" onPress={handleRestart} />
              )}
            </>
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
  modalText: {
    fontSize: 60,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
  },
});

export default PlayableScreen;