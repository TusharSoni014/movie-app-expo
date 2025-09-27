import MovieItem from "@/components/MovieItem";
import SearchBar from "@/components/SearchBar";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  Text,
  View,
} from "react-native";
import { fetchMovies } from "../services/api";
import { useFetch } from "../services/useFetch";
import { useMovieStore } from "../stores/movieStore";

export default function Index() {
  const { searchQuery, setSearchResults, setLoading, setError } =
    useMovieStore();
  const { data, loading, error } = useFetch(() =>
    fetchMovies({ title: searchQuery })
  );

  // Update store when data changes
  useEffect(() => {
    if (data) {
      setSearchResults(data);
    }
  }, [data, setSearchResults]);

  useEffect(() => {
    setLoading(loading);
  }, [loading, setLoading]);

  useEffect(() => {
    setError(error?.message || null);
  }, [error, setError]);
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
            <Ionicons
              className=" h-fit"
              name="videocam"
              size={32}
              color="white"
            />
            <Text className="text-white font-bold text-3xl">iMovies</Text>
          </LinearGradient>
        </View>
        <SearchBar />
        <View>
          {loading ? (
            <ActivityIndicator size="large" color="white" />
          ) : (
            <FlatList
              data={data || []}
              renderItem={({ item }) => <MovieItem movie={item} />}
              keyExtractor={(item) => item.id}
              numColumns={2}
              columnWrapperStyle={{ gap: 8 }}
              contentContainerStyle={{ gap: 12, paddingHorizontal: 8 }}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
              contentContainerClassName="pb-[100px]"
              ListEmptyComponent={() => <Text className="text-center text-white">No movies found</Text>}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
}
