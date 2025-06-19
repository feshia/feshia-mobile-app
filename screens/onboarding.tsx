import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Image, ImageBackground, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import onboarding1 from "@/assets/images/onboarding/onboarding_1.png";
import { LinearGradient } from "expo-linear-gradient";
import Logo from "@/assets/images/feshiaLogo.png";
import { HStack } from "@/components/ui/hstack";
import { Button, ButtonText } from "@/components/ui/button";
import { FlatList } from "react-native-gesture-handler";
import { useRouter } from "expo-router";

const onboardingData = [
  {
    position: 1,
    title: "Explore Universities That Match Your Career Aspirations",
    description:
      "We stand as a linkage between potential international students and their choice global Universities/Colleges.",
  },
  {
    position: 2,
    title: "Explore Courses That Match Your Career Aspirations",
    description:
      "We stand as a linkage between potential international students and their choice global Universities/Colleges.",
  },
];

export const Onboarding = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={onboardingData}
        renderItem={({ item }) => <OnboardingItem {...item} />}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
      />
    </SafeAreaView>
  );
};

const OnboardingItem = ({
  title,
  description,
  position,
}: (typeof onboardingData)[number]) => {
  const { width } = useWindowDimensions();
  const router = useRouter();
  return (
    <ImageBackground
      source={onboarding1}
      resizeMode="cover"
      style={{ flex: 1, width }}
    >
      <LinearGradient
        style={{
          flex: 1,
          position: "absolute",
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
        }}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0.73 }}
        locations={[0.73, 1]}
        colors={["rgba(15, 23, 42, 0)", "rgba(15, 23, 42, 1)"]}
      />
      <Box style={{ marginTop: 50, flex: 1, alignItems: "center" }}>
        <Box>
          <Image source={Logo} />
        </Box>
        <Box
          style={{
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "flex-start",
            width: "100%",
            paddingLeft: 20,
            paddingRight: 20,
          }}
        >
          <Box>
            <Text
              style={{
                color: "white",
                fontSize: 44,
                lineHeight: 50,
              }}
            >
              {title}
            </Text>
          </Box>
          <Box style={{ marginTop: 8 }}>
            <Text style={{ color: "#fff", fontSize: 18, fontWeight: "300" }}>
              {description}
            </Text>
          </Box>
          <Box style={{ width: "100%" }}>
            <HStack style={{ marginTop: 48 }}>
              {onboardingData.map((_, index) => (
                <Box
                  key={index}
                  style={{
                    height: 5,
                    width: "15%",
                    marginRight: 8,
                    backgroundColor:
                      position === index + 1
                        ? "#ffffff"
                        : "rgba(255, 255, 255, 0.5)",
                  }}
                ></Box>
              ))}
            </HStack>
          </Box>
          <Box style={{ width: "100%", paddingBottom: 36 }}>
            <HStack style={{ marginTop: 48 }} space="md">
              <Box>
                <Button
                  variant="outline"
                  className="border-typography-white"
                  onPress={() => router.navigate("/(tabs)")}
                >
                  <ButtonText className="text-typography-white">
                    Skip
                  </ButtonText>
                </Button>
              </Box>
              <Box>
                <Button onPress={() => router.navigate("/(tabs)")}>
                  <ButtonText>Get Started</ButtonText>
                </Button>
              </Box>
            </HStack>
          </Box>
        </Box>
      </Box>
    </ImageBackground>
  );
};
