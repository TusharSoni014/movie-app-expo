import React from "react";
import { TextInput, View } from "react-native";
import { useMovieStore } from "../app/stores/movieStore";

const SearchBar = () => {
  const { searchQuery, setSearchQuery } = useMovieStore();

  return (
    <View className="w-full">
      <TextInput
        className="border border-purple-700 py-3 px-3 bg-white/5 text-white placeholder:text-white/50 rounded-full mx-4"
        placeholder="Search for a movie"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
    </View>
  );
};

export default SearchBar;
