import { EnquiryModal, EnquiryModalProps } from "@/components/EnquiryModal";
import { getWebviewUrl } from "@/utils/getWebviewUrl";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import WebView from "react-native-webview";

type EnquiryEvent = {
  event: string;
  resource: EnquiryModalProps["resource"] & {
    title: string;
  };
};

export default function University() {
  const { university, "#": hash } = useLocalSearchParams();
  let uri = getWebviewUrl(university as string);
  const [openEnquiryModal, setOpenEnquiryModal] = useState<
    EnquiryEvent["resource"] | null
  >(null);

  if (hash) {
    uri += `#${hash}`;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        source={{
          uri,
        }}
        renderLoading={() => <SkeletonLoader />}
        startInLoadingState
        onMessage={(event) => {
          const data = JSON.parse(event.nativeEvent.data) as EnquiryEvent;
          setOpenEnquiryModal(data.resource);
        }}
      />
      <EnquiryModal
        closeModal={() => setOpenEnquiryModal(null)}
        isVisible={!!openEnquiryModal}
        resource={
          openEnquiryModal?.type === "general"
            ? { type: "general" }
            : {
                type: openEnquiryModal?.type || "university",
                resourceId: openEnquiryModal?.resourceId || "",
              }
        }
        title={openEnquiryModal?.title || "Enquiry"}
      />
    </SafeAreaView>
  );
}

const SkeletonLoader = () => {
  return (
    <View style={styles.container}>
      {/* Header/University Name Section */}
      <View style={styles.headerSection}>
        <View style={styles.headerTextLine1}></View>
        <View style={styles.headerTextLine2}></View>
      </View>

      {/* Basic Information Section */}
      <View style={styles.basicInfoSection}>
        <View style={styles.basicInfoHeaderContainer}>
          <View style={styles.basicInfoHeaderText}></View>
          <View style={styles.basicInfoHeaderIcon}></View>
        </View>
        <View style={styles.basicInfoGrid}>
          <View>
            <View style={styles.basicInfoLabel1}></View>
            <View style={styles.basicInfoValue1}></View>
          </View>
          <View>
            <View style={styles.basicInfoLabel2}></View>
            <View style={styles.basicInfoValue2}></View>
          </View>
          <View>
            <View style={styles.basicInfoLabel3}></View>
            <View style={styles.basicInfoValue3}></View>
          </View>
          <View>
            <View style={styles.basicInfoLabel4}></View>
            <View style={styles.basicInfoValue4}></View>
          </View>
        </View>
        <View style={styles.basicInfoButton}></View>
      </View>

      {/* About Section */}
      <View style={styles.aboutSection}>
        <View style={styles.aboutHeaderContainer}>
          <View style={styles.aboutHeaderText}></View>
          <View style={styles.aboutHeaderIcon}></View>
        </View>
        <View style={styles.aboutSubheading}></View>
        <View style={styles.aboutTextLine1}></View>
        <View style={styles.aboutTextLine2}></View>
        <View style={styles.aboutTextLine3}></View>
        <View style={styles.aboutTextLine4}></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    padding: 20,
    // React Native doesn't have a direct equivalent for font-family on the root View
    // It's usually applied to Text components.
  },
  headerSection: {
    backgroundColor: "#d0d0d0",
    height: 180,
    borderRadius: 8,
    marginBottom: 20,
    position: "relative",
    overflow: "hidden",
  },
  headerTextLine1: {
    position: "absolute",
    bottom: 20,
    left: 20,
    width: "70%",
    height: 25,
    backgroundColor: "#a0a0a0",
    borderRadius: 4,
  },
  headerTextLine2: {
    position: "absolute",
    bottom: 50,
    left: 20,
    width: "50%",
    height: 18,
    backgroundColor: "#a0a0a0",
    borderRadius: 4,
  },
  basicInfoSection: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
  },
  basicInfoHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  basicInfoHeaderText: {
    width: 150,
    height: 25,
    backgroundColor: "#d0d0d0",
    borderRadius: 4,
  },
  basicInfoHeaderIcon: {
    width: 20,
    height: 15,
    backgroundColor: "#d0d0d0",
    borderRadius: 4,
  },
  basicInfoGrid: {
    flexDirection: "row",
    flexWrap: "wrap", // Allows items to wrap to the next line
    justifyContent: "space-between", // Distributes items evenly
    gap: 20, // This is a React Native specific property for gap between items
  },
  basicInfoLabel1: {
    width: 80,
    height: 15,
    backgroundColor: "#d0d0d0",
    borderRadius: 4,
    marginBottom: 8,
  },
  basicInfoValue1: {
    width: 40,
    height: 20,
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
  },
  basicInfoLabel2: {
    width: 120,
    height: 15,
    backgroundColor: "#d0d0d0",
    borderRadius: 4,
    marginBottom: 8,
  },
  basicInfoValue2: {
    width: 90,
    height: 20,
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
  },
  basicInfoLabel3: {
    width: 100,
    height: 15,
    backgroundColor: "#d0d0d0",
    borderRadius: 4,
    marginBottom: 8,
  },
  basicInfoValue3: {
    width: 50,
    height: 20,
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
  },
  basicInfoLabel4: {
    width: 80,
    height: 15,
    backgroundColor: "#d0d0d0",
    borderRadius: 4,
    marginBottom: 8,
  },
  basicInfoValue4: {
    width: 30,
    height: 20,
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
  },
  basicInfoButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#e0e0e0",
    borderRadius: 25,
    marginTop: 20,
  },
  aboutSection: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 20,
  },
  aboutHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  aboutHeaderText: {
    width: 100,
    height: 25,
    backgroundColor: "#d0d0d0",
    borderRadius: 4,
  },
  aboutHeaderIcon: {
    width: 20,
    height: 15,
    backgroundColor: "#d0d0d0",
    borderRadius: 4,
  },
  aboutSubheading: {
    width: 180,
    height: 15,
    backgroundColor: "#d0d0d0",
    borderRadius: 4,
    marginBottom: 15,
  },
  aboutTextLine1: {
    width: "100%",
    height: 15,
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
    marginBottom: 8,
  },
  aboutTextLine2: {
    width: "95%",
    height: 15,
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
    marginBottom: 8,
  },
  aboutTextLine3: {
    width: "98%",
    height: 15,
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
    marginBottom: 8,
  },
  aboutTextLine4: {
    width: "90%",
    height: 15,
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
  },
});
