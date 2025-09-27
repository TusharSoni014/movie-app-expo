import MovieItem from "@/components/MovieItem";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { FlatList, ScrollView, Text, View } from "react-native";
import { useMovieStore } from "../stores/movieStore";

const Saved = () => {
  const { favoriteMovies, savedMovies } = useMovieStore();

  return (
    <View className="flex-1 bg-[#10021c] text-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="min-h-[100%] pb-[10px] gap-3"
      >
        <View className="w-full h-[200px]">
          <LinearGradient
            colors={["#33055b", "#10021c"]}
            className="h-full w-full flex flex-row gap-3 justify-center items-center"
          >
            <Ionicons className=" h-fit" name="heart" size={32} color="white" />
            <Text className="text-white font-bold text-3xl">My Movies</Text>
          </LinearGradient>
        </View>

        {/* Favorites Section */}
        <View className="px-4">
          <Text className="text-white text-xl font-bold mb-3">
            Favorites ({favoriteMovies.length})
          </Text>
          {favoriteMovies.length > 0 ? (
            <FlatList
              data={favoriteMovies}
              renderItem={({ item }) => <MovieItem movie={item} />}
              keyExtractor={(item) => item.id}
              numColumns={2}
              columnWrapperStyle={{ gap: 8 }}
              contentContainerStyle={{ gap: 12 }}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
            />
          ) : (
            <View className="flex-1 justify-center items-center py-8">
              <Ionicons name="heart-outline" size={48} color="gray" />
              <Text className="text-gray-400 text-lg mt-2">
                No favorite movies yet
              </Text>
              <Text className="text-gray-500 text-sm">
                Tap the heart icon on movies to add them to favorites
              </Text>
            </View>
          )}
        </View>

        {/* Saved Movies Section */}
        <View className="px-4 mt-6">
          <Text className="text-white text-xl font-bold mb-3">
            Saved Movies ({savedMovies.length})
          </Text>
          {savedMovies.length > 0 ? (
            <FlatList
              data={savedMovies}
              renderItem={({ item }) => <MovieItem movie={item} />}
              keyExtractor={(item) => item.id}
              numColumns={2}
              columnWrapperStyle={{ gap: 8 }}
              contentContainerStyle={{ gap: 12 }}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
            />
          ) : (
            <View className="flex-1 justify-center items-center py-8">
              <Ionicons name="bookmark-outline" size={48} color="gray" />
              <Text className="text-gray-400 text-lg mt-2">
                No saved movies yet
              </Text>
              <Text className="text-gray-500 text-sm">
                Save movies to watch later
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Saved;
