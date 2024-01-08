// author Sheila Kirwan 7th January 2024
// This app allows the user to add and later delete a list of goals using React Native and expo go.



import { useState } from "react";
import { StyleSheet, View, FlatList, Button } from "react-native";
import{StatusBar } from 'expo-status-bar'
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

export default function App() {

  //state hooks
  const [modalIsVisable, setModalIsVisible] = useState(false);
  const [courseGoals, setCourseGoals] = useState([]);


  // Explanation:

  // Defining a State Variable:
  
  // modalIsVisible: This is like a special box where your React Native app can keep track of whether a modal (a pop-up or special area on the screen) is currently visible or not.
  // Setting an Initial Value:
  
  // useState(false): This part says, "Start with the modal not visible." So, when your app begins, the special box (modalIsVisible) is set to false, meaning the modal is initially hidden.
  // Creating a Function to Update the State:
  
  // setModalIsVisible: This is like a special tool that React Native gives you. When you want to make the modal visible or hidden, you use this tool.
  // Using the State Variable and Function:
  
  // The const [modalIsVisible, setModalIsVisible] part is like saying, "Create a special box called modalIsVisible and a tool called setModalIsVisible that I can use to open or close that box."





  function addGoalHandler(enteredGoalText) {
    setCourseGoals((currentCourseGoals) => [
      ...currentCourseGoals,
      { text: enteredGoalText, id: Math.random().toString() },
    ]);
    endAddGoalHandler();
  }

  function startAddGoalHandler() {
    setModalIsVisible(true);
  }

  function endAddGoalHandler() {
    setModalIsVisible(false);
  }

  function deleteGoalHandler(id) {
    setCourseGoals((currentCourseGoals) => {
      return currentCourseGoals.filter((goal) => goal.id !== id);
    });
  }




  // GoalInput is imported from another component file. This is like a custom component in your React Native app. 
  //It's a way of saying, "I've created a special area or tool for handling input related to goals."
  return (
    <>
    <StatusBar style="light" />
    <View style={styles.appContainer}>
      <Button
        title="Add New Goal"
        color="#5e0acc"
        onPress={startAddGoalHandler}
      />

      <GoalInput
        visible={modalIsVisable}
        onAddGoal={addGoalHandler}
        onCancel={endAddGoalHandler}
      />
      <View style={styles.goalsContainer}>
        <FlatList
          data={courseGoals}
          renderItem={(itemData) => {
            return (
              <GoalItem
                text={itemData.item.text}
                id={itemData.item.id}
                onDeleteItem={deleteGoalHandler}
              />
            );
          }}
          keyExtractor={(item, index) => {
            return item.id;
          }}
          alwaysBounceVertical={false}
        />
      </View>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: "#1e085a"
  },

  goalsContainer: {
    flex: 5,
  },
});
