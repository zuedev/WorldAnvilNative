import React from "react";
import { Button, TextInput, View, SafeAreaView, StatusBar } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import secrets from "./secrets";
import WA from "./lib/WA";
import WorldSelect from "./components/WorldSelect";
import World from "./components/World";

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authed: false,
      application_key: secrets.application_key,
    };
    this.setAppState = this.setAppState.bind(this);
  }

  setAppState(obj) {
    this.setState(obj);
  }

  async componentDidMount() {
    const apikeyStore = await AsyncStorage.getItem("apikey");

    if (apikeyStore) {
      this.setState({ apikey: apikeyStore });
    }
  }

  async componentDidUpdate() {
    if (this.state.apikey && !this.state.authed) {
      const user = await WA({
        apikey: this.state.apikey,
        application_key: this.state.application_key,
        method: "GET",
        url: "/user",
      });

      this.setState({ authed: true, user });
    }
  }

  render() {
    const InitView = () => {
      if (this.state.world) {
        return <World state={this.state} setAppState={this.setAppState} />;
      }

      if (this.state.authed && this.state.user) {
        return (
          <View>
            <Button
              title="LOGOUT"
              onPress={async () => {
                console.log("logging out");
                await AsyncStorage.removeItem("apikey");
                this.setState({ authed: false, apikey: null, user: null });
              }}
            />
            <WorldSelect state={this.state} setAppState={this.setAppState} />
          </View>
        );
      }

      return (
        <View>
          <TextInput
            style={{ height: 40, margin: 12, borderWidth: 1, padding: 10 }}
            onChangeText={(value) => {
              this._apikeyInput = value;
            }}
            placeholder="Enter API Key"
          />
          <Button
            title={"AUTHENTICATE"}
            onPress={async () => {
              if (this._apikeyInput) {
                await AsyncStorage.setItem("apikey", this._apikeyInput);
                this.setState({ apikey: this._apikeyInput });
              }
            }}
          />
          <Button
            title={"DEVLOGIN"}
            onPress={async () => {
              await AsyncStorage.setItem("apikey", secrets.apikey);
              this.setState({ apikey: secrets.apikey });
            }}
          />
        </View>
      );
    };

    return (
      <SafeAreaView
        style={{
          marginTop: StatusBar.currentHeight || 0,
        }}
      >
        <InitView />
      </SafeAreaView>
    );
  }
}
