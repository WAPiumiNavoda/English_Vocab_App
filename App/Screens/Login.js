import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { initializeApp } from '@firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from '@firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from '../Navigations/TabNavigation';
import { useAuth } from '../../Auth/AuthProvider';
import Colors from '../Shared/Colors';

const firebaseConfig = {
  apiKey: "AIzaSyD1s4ysOtSxX0O76kDJ2W1tulhUg27IYdE",
  authDomain: "vocabapp-fdcda.firebaseapp.com",
  projectId: "vocabapp-fdcda",
  storageBucket: "vocabapp-fdcda.appspot.com",
  messagingSenderId: "257140734394",
  appId: "1:257140734394:web:837cf3e229aafdaac1c583",
  measurementId: "G-KDBRCH7T3C"
};

const app = initializeApp(firebaseConfig);

const AuthScreen = ({ email, setEmail, password, setPassword, isLogin, setIsLogin, handleAuthentication }) => {
  return (
    <View style={styles.authContainer}>
       {/* <Text style={styles.title}>{isLogin ? 'Sign In' : 'Sign Up'}</Text> */}

       <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />
      <View style={styles.buttonContainer}>
        <Button title={isLogin ? 'Sign In' : 'Sign Up'} onPress={handleAuthentication} color="#7469B6"  />
      </View>

      <View style={styles.bottomContainer}>
        <Text style={styles.toggleText} onPress={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
        </Text>
      </View>
    </View>
  );
}


const AuthenticatedScreen = ({ user, handleAuthentication }) => {
  return (
    <SafeAreaView style={styles.container1}>
       <View style={styles.header}>
        <Text style={styles.headerText}>Welcome, {user.email}</Text>
        <TouchableOpacity onPress={handleAuthentication} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
      <NavigationContainer >
      <TabNavigation />
      </NavigationContainer>
  </SafeAreaView>
  );
};
export default Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null); 
  const [isLogin, setIsLogin] = useState(true);
  const { setUserId } = useAuth();

  const auth = getAuth(app);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [auth]);

  
  const handleAuthentication = async () => {
    try {
      if (user) {
        // If user is already authenticated, log out
        console.log('User logged out successfully!');
        await signOut(auth);
      } else {
        // Sign in or sign up
        let loggedInUser;
        if (isLogin) {
          // Sign in
          loggedInUser = await signInWithEmailAndPassword(auth, email, password);
          console.log('User signed in successfully!');
          
          // Print the user ID
          console.log('User ID: ' + loggedInUser.user.uid);
          setUserId(loggedInUser.user.uid);
        } else {
          // Sign up
          loggedInUser = await createUserWithEmailAndPassword(auth, email, password);
          console.log('User created successfully!');
          
          // Save user data to Firestore
          if (loggedInUser) {
            // Save the user ID to a variable
            const userId = loggedInUser.user.uid;
            // Save user data to Firestore
            saveUserDataToFirestore(userId, email); 
          }
        }
      }
    } catch (error) {
      console.error('Authentication error:', error.message);
    }
  };
  
  
  
  
  const saveUserDataToFirestore = (uid, email) => {
    try {
      // Get a reference to the users collection
      const usersRef = db.collection('users');
  
      // Add user data to Firestore
      usersRef.doc(uid).set({
        email: email,
        // Add more user data fields as needed
      })
      .then(() => {
        console.log('User data saved to Firestore successfully!');
      })
      .catch(error => {
        console.error('Error saving user data to Firestore:', error);
      });
    } catch (error) {
      console.error('Error saving user data to Firestore:', error);
    }
  };
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {user ? (
        // Show user's email if user is authenticated
        <AuthenticatedScreen user={user} handleAuthentication={handleAuthentication} />
      ) : (
        // Show sign-in or sign-up form if user is not authenticated
        <AuthScreen
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          handleAuthentication={handleAuthentication}
        />
      )}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container1: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    
  },
  
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  authContainer: {
    width: '100%',
    justifyContent: 'center',
    maxWidth: 400,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
    fontFamily: 'outfit-bold'
  },
  input: {
    height: 40,
    borderColor: Colors.primary,
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    borderRadius: 4,
  },
  buttonContainer: {
    marginBottom: 16,
    color: Colors.primary
  },
  toggleText: {
    color: Colors.primary,
    textAlign: 'center',
  },
  bottomContainer: {
    marginTop: 20,
  },
  emailText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: Colors.primary,
    
  },
  headerText: {
    fontSize: 18,
    color: '#fff',
  },
  logoutButton: {
    backgroundColor: '#fff',
    paddingBottom: 10,
    padding: 8,
    borderRadius: 4,
  },
  logoutText: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
});