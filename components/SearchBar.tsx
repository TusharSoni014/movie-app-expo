import React from "react";
import { TextInput, View } from "react-native";

const SearchBar = ({
  onChangeText,
}: {
  onChangeText: (text: string) => void;
}) => {
  return (
    <View className="w-full">
      <TextInput
        className="border border-purple-700 py-3 px-3 bg-white/5 text-white placeholder:text-white/50 rounded-full mx-4"
        placeholder="Search for a movie"
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default SearchBar;
