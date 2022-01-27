import { useState, useEffect } from "react";
import { Button, Text, View } from "react-native";
import WA from "../lib/WA";

export default (props) => {
  const [categories, setCategories] = useState([]);

  useEffect(async () => {
    const categoriesReturn = await WA({
      apikey: props.state.apikey,
      application_key: props.state.application_key,
      method: "GET",
      url: `/world/${props.state.world.id}/articles`,
    });

    console.log(categoriesReturn);

    // setCategories(worlds.worlds);
  }, []);

  //   if (categories.length > 0) {
  //     return (
  //       <View>
  //         {worlds.map((world) => (
  //           <Button
  //             key={world.id}
  //             title={world.name}
  //             onPress={() => {
  //               //   props.setAppState(world);
  //               console.log("owo");
  //             }}
  //           />
  //         ))}
  //       </View>
  //     );
  //   }

  //   if (categories.length === 0) return <Text>You have no categories.</Text>;

  return (
    <View>
      <Text>Loading...</Text>
      <Button
        title="BACK"
        onPress={() => {
          props.setAppState({ world: null });
        }}
      />
    </View>
  );
};
