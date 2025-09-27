import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { fetchMovieItem } from "../services/api";
import { useFetch } from "../services/useFetch";
import { useMovieStore } from "../stores/movieStore";

const MovieDetails = () => {
  const { id } = useLocalSearchParams();
  const { data, loading } = useFetch(() =>
    fetchMovieItem({ id: id as string })
  );
  const { isFavorite, toggleFavorite, isSaved, toggleSaved } = useMovieStore();

  const formatRuntime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  return (
    <ScrollView className="flex-1 bg-[#10021c]">
      {loading ? (
        <View className="flex-1 justify-center items-center mt-[100px]">
          <ActivityIndicator size="large" color="white" />
        </View>
      ) : data ? (
        <View className="pb-[100px]">
          {/* Movie Poster */}
          <Image
            source={{
              uri: data.primaryImage?.url || "https://placehold.co/600x400",
            }}
            className="w-full h-[400px]"
            resizeMode="cover"
          />

          {/* Movie Header */}
          <View className="p-4">
            <View className="flex-row justify-between items-start mb-2">
              <View className="flex-1">
                <Text className="text-white text-3xl font-bold mb-2">
                  {data.primaryTitle}
                </Text>
                {data.originalTitle !== data.primaryTitle && (
                  <Text className="text-gray-300 text-lg mb-4">
                    {data.originalTitle}
                  </Text>
                )}
              </View>
              <View className="flex-row gap-2 ml-4">
                <TouchableOpacity
                  onPress={() => toggleFavorite(data)}
                  className="bg-black/50 rounded-full p-2"
                >
                  <Ionicons
                    name={isFavorite(data.id) ? "heart" : "heart-outline"}
                    size={24}
                    color={isFavorite(data.id) ? "red" : "white"}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => toggleSaved(data)}
                  className="bg-black/50 rounded-full p-2"
                >
                  <Ionicons
                    name={isSaved(data.id) ? "bookmark" : "bookmark-outline"}
                    size={24}
                    color={isSaved(data.id) ? "blue" : "white"}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Basic Info */}
            <View className="flex-row flex-wrap gap-2 mb-4">
              <Text className="text-white bg-gray-700 px-3 py-1 rounded-full text-sm">
                {data.startYear}
                {data.endYear &&
                  data.endYear !== data.startYear &&
                  ` - ${data.endYear}`}
              </Text>
              {data.runtimeSeconds && (
                <Text className="text-white bg-gray-700 px-3 py-1 rounded-full text-sm">
                  {formatRuntime(data.runtimeSeconds)}
                </Text>
              )}
              {data.isAdult && (
                <Text className="text-white bg-red-600 px-3 py-1 rounded-full text-sm">
                  Adult
                </Text>
              )}
            </View>

            {/* Genres */}
            {data.genres && data.genres.length > 0 && (
              <View className="mb-4">
                <Text className="text-white text-lg font-semibold mb-2">
                  Genres
                </Text>
                <View className="flex-row flex-wrap gap-2">
                  {data.genres.map((genre, index) => (
                    <Text
                      key={index}
                      className="text-blue-300 bg-blue-900/30 px-3 py-1 rounded-full text-sm"
                    >
                      {genre}
                    </Text>
                  ))}
                </View>
              </View>
            )}

            {/* Plot */}
            {data.plot && (
              <View className="mb-6">
                <Text className="text-white text-lg font-semibold mb-2">
                  Plot
                </Text>
                <Text className="text-gray-300 text-base leading-6">
                  {data.plot}
                </Text>
              </View>
            )}

            {/* Ratings */}
            {(data.rating || data.metacritic) && (
              <View className="mb-6">
                <Text className="text-white text-lg font-semibold mb-3">
                  Ratings
                </Text>
                <View className="flex-row gap-4">
                  {data.rating && (
                    <View className="flex-1">
                      <Text className="text-gray-300 text-sm">IMDb Rating</Text>
                      <Text className="text-white text-2xl font-bold">
                        {data.rating.aggregateRating}/10
                      </Text>
                      <Text className="text-gray-400 text-sm">
                        {data.rating.voteCount.toLocaleString()} votes
                      </Text>
                    </View>
                  )}
                  {data.metacritic && (
                    <View className="flex-1">
                      <Text className="text-gray-300 text-sm">Metacritic</Text>
                      <Text className="text-white text-2xl font-bold">
                        {data.metacritic.score}/100
                      </Text>
                      <Text className="text-gray-400 text-sm">
                        {data.metacritic.reviewCount} reviews
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            )}

            {/* Cast & Crew */}
            {(data.directors?.length > 0 ||
              data.writers?.length > 0 ||
              data.stars?.length > 0) && (
              <View className="mb-6">
                <Text className="text-white text-lg font-semibold mb-3">
                  Cast & Crew
                </Text>

                {data.directors && data.directors.length > 0 && (
                  <View className="mb-3">
                    <Text className="text-gray-300 text-sm mb-1">
                      Directors
                    </Text>
                    <Text className="text-white">
                      {data.directors
                        .map((person) => person.displayName)
                        .join(", ")}
                    </Text>
                  </View>
                )}

                {data.writers && data.writers.length > 0 && (
                  <View className="mb-3">
                    <Text className="text-gray-300 text-sm mb-1">Writers</Text>
                    <Text className="text-white">
                      {data.writers
                        .map((person) => person.displayName)
                        .join(", ")}
                    </Text>
                  </View>
                )}

                {data.stars && data.stars.length > 0 && (
                  <View className="mb-3">
                    <Text className="text-gray-300 text-sm mb-1">Stars</Text>
                    <Text className="text-white">
                      {data.stars
                        .map((person) => person.displayName)
                        .join(", ")}
                    </Text>
                  </View>
                )}
              </View>
            )}

            {/* Technical Details */}
            {(data.originCountries?.length > 0 ||
              data.spokenLanguages?.length > 0) && (
              <View className="mb-6">
                <Text className="text-white text-lg font-semibold mb-3">
                  Technical Details
                </Text>

                {data.originCountries && data.originCountries.length > 0 && (
                  <View className="mb-3">
                    <Text className="text-gray-300 text-sm mb-1">
                      Countries
                    </Text>
                    <Text className="text-white">
                      {data.originCountries
                        .map((country) => country.name)
                        .join(", ")}
                    </Text>
                  </View>
                )}

                {data.spokenLanguages && data.spokenLanguages.length > 0 && (
                  <View className="mb-3">
                    <Text className="text-gray-300 text-sm mb-1">
                      Languages
                    </Text>
                    <Text className="text-white">
                      {data.spokenLanguages.map((lang) => lang.name).join(", ")}
                    </Text>
                  </View>
                )}
              </View>
            )}

            {/* Interests/Tags */}
            {data.interests && data.interests.length > 0 && (
              <View className="mb-6">
                <Text className="text-white text-lg font-semibold mb-3">
                  Tags
                </Text>
                <View className="flex-row flex-wrap gap-2">
                  {data.interests.map((interest, index) => (
                    <Text
                      key={index}
                      className="text-purple-300 bg-purple-900/30 px-3 py-1 rounded-full text-sm"
                    >
                      {interest.name}
                    </Text>
                  ))}
                </View>
              </View>
            )}
          </View>
        </View>
      ) : (
        <View className="flex-1 justify-center items-center mt-[100px]">
          <Text className="text-white text-lg">Movie not found</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default MovieDetails;
