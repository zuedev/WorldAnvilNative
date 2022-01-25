import { useState, useEffect } from "react";
import { Button, Text, View } from "react-native";
import WA from "../lib/WA";

export default (props) => {
  const [worlds, setWorlds] = useState([]);

  useEffect(async () => {
    const worlds = await WA({
      apikey: props.state.apikey,
      application_key: props.state.application_key,
      method: "GET",
      url: `/user/${props.state.user.id}/worlds`,
    });

    setWorlds(worlds.worlds);
  }, []);

  if (worlds.length > 0) {
    return (
      <View>
        {worlds.map((world) => (
          <Button
            key={world.id}
            title={world.name}
            onPress={() => {
              //props.setWorld(world);
              console.log(world);
            }}
          />
        ))}
      </View>
    );
  }

  if (worlds.length === 0) return <Text>You have no worlds. :(</Text>;

  return <Text>Loading...</Text>;
};
