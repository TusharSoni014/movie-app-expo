import { Movie } from "@/app/services/api";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useMovieStore } from "../app/stores/movieStore";

const MovieItem = ({ movie }: { movie: Movie }) => {
  const router = useRouter();
  const { isFavorite, toggleFavorite } = useMovieStore();

  const handlePress = () => {
    router.push(`/movie/${movie.id}`);
  };

  const handleFavoritePress = (e: any) => {
    e.stopPropagation();
    toggleFavorite(movie);
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      className="border border-purple-700/30 bg-white/5 flex-1 rounded-lg p-2 gap-2 mx-1"
      activeOpacity={0.7}
    >
      <View className="relative">
        <Image
          source={{
            uri: movie.primaryImage
              ? movie.primaryImage.url
              : "https://placehold.co/600x400",
          }}
          className="w-full h-40 rounded-lg"
          resizeMode="stretch"
        />
        <TouchableOpacity
          onPress={handleFavoritePress}
          className="absolute top-2 right-2 bg-black/50 rounded-full p-1"
        >
          <Ionicons
            name={isFavorite(movie.id) ? "heart" : "heart-outline"}
            size={20}
            color={isFavorite(movie.id) ? "red" : "white"}
          />
        </TouchableOpacity>
      </View>
      <Text numberOfLines={1} className="text-white text-sm">
        {movie.primaryTitle}
      </Text>
      <View className="flex-row items-center gap-1">
        <Ionicons name="star" size={16} color="yellow" />
        <Text className="text-white text-sm">
          {movie.rating ? movie.rating.aggregateRating : "N/A"}/10
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default MovieItem;
