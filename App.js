import React, { Component } from 'react';
import {
    View
} from 'react-native';
import firebase from 'firebase';
import {
    Header,
    Button,
    Spinner
} from './src/components/common';
import LoginForm from './src/components/LoginForm';


class App extends Component {

    state = { loggedIn: null };

    componentWillMount() {
        firebase.initializeApp({
            apiKey: "AIzaSyC0GD7Fx_hkpR2RMMAka6fg_zhv6cO_cWg",
            authDomain: "auth-ec6ee.firebaseapp.com",
            databaseURL: "https://auth-ec6ee.firebaseio.com",
            projectId: "auth-ec6ee",
            storageBucket: "auth-ec6ee.appspot.com",
            messagingSenderId: "104287160720"
        });

        firebase.auth().onAuthStateChanged((user) => {
            if (user){
                this.setState({ loggedIn: true });
            } else {
                this.setState({ loggedIn: false });
            }
        });

    }

    renderContent () {

        switch (this.state.loggedIn){
            case true:
                return (
                    <Button onPress={() => firebase.auth().signOut()}>
                        Log Out
                    </Button>
                );
                break;
            case false:
                return <LoginForm />;
                break;
            default:
                return <Spinner size="large"/>
                break;
        }

    }

    render() {
        return(
            <View>
                <Header headerText="Authentication" />
                {this.renderContent()}
            </View>
        );
    }
}

export default App;