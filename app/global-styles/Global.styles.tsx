import { Dimensions, PixelRatio } from "react-native";
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

// Use whichever is smaller, width or height
const SCALE = SCREEN_WIDTH > SCREEN_HEIGHT ? SCREEN_HEIGHT : SCREEN_WIDTH;

// Base width for scaling calculations
const BASE_WIDTH = 375;
export const width = Dimensions.get("screen").width;
export const height = Dimensions.get("screen").height;
const images = {
  "quizball-logo": require("../../assets/images/quizball-logo.png"),
};

const fontConfig = {
  phone: {
    small: { min: 0.8, max: 1 },
    medium: { min: 0.9, max: 1.1 },
    large: { min: 1, max: 1.2 },
  },
  tablet: {
    small: { min: 1.3, max: 1.4 },
    medium: { min: 1.4, max: 1.5 },
    large: { min: 1.5, max: 1.7 },
  },
};

// Helper function to get device type
const getDeviceType = (): "phone" | "tablet" => {
  const pixelDensity = PixelRatio.get();
  const adjustedWidth = SCREEN_WIDTH * pixelDensity;
  const adjustedHeight = SCREEN_HEIGHT * pixelDensity;

  if (pixelDensity < 2 && (adjustedWidth >= 1000 || adjustedHeight >= 1000)) {
    return "tablet";
  } else if (
    pixelDensity === 2 &&
    (adjustedWidth >= 1920 || adjustedHeight >= 1920)
  ) {
    return "tablet";
  } else {
    return "phone";
  }
};

// Helper function to determine screen size category
const getScreenSizeCategory = (): "small" | "medium" | "large" => {
  if (SCALE < 350) return "small";
  if (SCALE > 500) return "large";
  return "medium";
};
export const getFontSize = (size: number): number => {
  const deviceType = getDeviceType();
  const screenCategory = getScreenSizeCategory();
  const config = fontConfig[deviceType][screenCategory];

  // Calculate the scale factor
  const scaleFactor = SCALE / BASE_WIDTH;

  // Clamp the scale factor between the configured min and max
  const clampedScaleFactor = Math.min(
    Math.max(scaleFactor, config.min),
    config.max
  );

  // Calculate the new size
  let newSize = size * clampedScaleFactor;

  // Additional scaling for tablets to ensure text isn't too small
  if (deviceType === "tablet") {
    newSize *= 1.1; // Increase tablet font sizes by an additional 10%
  }

  // Round the size and adjust for the device's font scale
  return (
    Math.round(PixelRatio.roundToNearestPixel(newSize)) /
    PixelRatio.getFontScale()
  );
};

export default images;
