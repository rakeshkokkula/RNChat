import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// import SignIn from "../components/join";
// import Chat from "../components/chat";
import Users from "../components/chat2/users";
import Join from "../components/chat2/join";
import Chat from "../components/chat2/chat";

const Stack = createStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <StackScreen />
    </NavigationContainer>
  );
};
export default Navigator;

// function StackScreen() {
//     return (
//       <Stack.Navigator>
//       <Stack.Screen
//         name="join"
//         component={SignIn}
//         options={{
//           title: 'Join Chat',
//           headerStyle: {
//             backgroundColor: '#f4511e',
//           },
//           headerTintColor: '#fff',
//           headerTitleStyle: {
//             fontWeight: 'bold',
//           },
//         }}
//       />
//        <Stack.Screen
//         name="chat"
//         component={Chat}
//         options={{
//           title: 'Chat',
//           headerStyle: {
//             backgroundColor: '#f4511e',
//           },
//           headerTintColor: '#fff',
//           headerTitleStyle: {
//             fontWeight: 'bold',
//           },
//         }}
//       />
//       </Stack.Navigator>
//     );
//   }

function StackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="join"
        component={Join}
        options={{
          title: "Join Chat",
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="users"
        component={Users}
        // options={{
        //   title: "Users",
        //   headerStyle: {
        //     backgroundColor: "#f4511e",
        //   },
        //   headerTintColor: "#fff",
        //   headerTitleStyle: {
        //     fontWeight: "bold",
        //   },
        // }}
      />
      <Stack.Screen
        name="chat"
        component={Chat}
        options={{
          title: "Chat",
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
    </Stack.Navigator>
  );
}
