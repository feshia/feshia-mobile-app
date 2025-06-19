import { View, Dimensions, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import WebView from "react-native-webview";

const ArticleScreen = () => {
  const { article, "#": hash } = useLocalSearchParams();

  let uri = `https://feshia.com/articles/${article}?webview=true`;

  if (hash) {
    uri += `#${hash}`;
  }
  return (
    <SafeAreaView style={{ flex: 1, padding: 16, backgroundColor: "#fff" }}>
      <WebView
        source={{
          uri,
        }}
        renderLoading={() => <SkeletonLoader />}
        startInLoadingState
      />
    </SafeAreaView>
  );
};

const { width } = Dimensions.get("window");

const SkeletonLoader = () => {
  return (
    <View style={styles.container}>
      {/* Image Placeholder */}
      <View style={styles.imagePlaceholder} />

      {/* Title Placeholder */}
      <View style={styles.titlePlaceholder} />

      {/* Text Content Placeholders */}
      <View style={styles.textLine} />
      <View style={[styles.textLine, { width: "95%" }]} />
      <View style={[styles.textLine, { width: "98%" }]} />
      <View style={[styles.textLine, { width: "90%" }]} />
      <View style={[styles.textLine, { width: "97%" }]} />
      <View style={[styles.textLine, { width: "85%" }]} />
      <View style={[styles.textLine, { width: "100%" }]} />
      <View style={[styles.textLine, { width: "92%" }]} />
      <View style={[styles.textLine, { width: "96%" }]} />
      <View style={[styles.textLine, { width: "88%" }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 16,
  },
  imagePlaceholder: {
    width: "100%",
    height: width * 0.5, // Maintain aspect ratio, assuming image is roughly 2:1 width:height
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
    marginBottom: 20,
  },
  titlePlaceholder: {
    width: "80%",
    height: 30,
    backgroundColor: "#d0d0d0",
    borderRadius: 4,
    marginBottom: 20,
  },
  textLine: {
    width: "100%",
    height: 16,
    backgroundColor: "#f0f0f0",
    borderRadius: 4,
    marginBottom: 8,
  },
});

export default ArticleScreen;
