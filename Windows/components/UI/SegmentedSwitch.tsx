import { Styles } from "@/utils/Styles";
import { useRef, useState } from "react";
import { Animated, Pressable, Text, View } from "react-native";

type Option = { label: string | React.ReactNode; value: string };

type SegmentedSwitchProps = {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
};

export function SegmentedSwitch({
  options,
  value,
  onChange,
}: SegmentedSwitchProps) {
  const [widths, setWidths] = useState<number[]>([]);
  const pillX = useRef(new Animated.Value(0)).current;
  const pillW = useRef(new Animated.Value(0)).current;

  const selectedIdx = options.findIndex((o) => o.value === value);

  function select(idx: number) {
    if (widths.length < options.length) return;
    const x = widths.slice(0, idx).reduce((a, b) => a + b, 0);
    Animated.parallel([
      Animated.spring(pillX, {
        toValue: x,
        useNativeDriver: false,
        damping: 18,
        stiffness: 200,
      }),
      Animated.spring(pillW, {
        toValue: widths[idx],
        useNativeDriver: false,
        damping: 18,
        stiffness: 200,
      }),
    ]).start();
    onChange(options[idx].value);
  }

  // Init pill on first layout
  function onFirstLayout(idx: number, w: number) {
    setWidths((prev) => {
      const next = [...prev];
      next[idx] = w;
      if (
        next.filter(Boolean).length === options.length &&
        idx === selectedIdx
      ) {
        const x = next.slice(0, selectedIdx).reduce((a, b) => a + b, 0);
        pillX.setValue(x);
        pillW.setValue(next[selectedIdx]);
      }
      return next;
    });
  }

  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "#dee8ff",
        borderRadius: 12,
        padding: 3,
        alignSelf: "stretch",
        position: "relative",
      }}
    >
      <Animated.View
        style={{
          position: "absolute",
          top: 3,
          left: pillX,
          width: pillW,
          bottom: 3,
          backgroundColor: "#87A2FF",
          borderRadius: 9,
        }}
      />
      {options.map((opt, idx) => (
        <Pressable
          key={opt.value}
          onLayout={(e) => onFirstLayout(idx, e.nativeEvent.layout.width)}
          onPress={() => select(idx)}
          style={{
            flex: 1,
            alignItems: "center",
            paddingVertical: 6,
            borderRadius: 9,
          }}
        >
          {typeof opt.label === "string" ? (
            <Text
              style={{
                fontSize: 20,
                ...Styles.subtitle,
                fontWeight: idx === selectedIdx ? "500" : "400",
                color: idx === selectedIdx ? "#fff" : "#7881ff",
              }}
            >
              {opt.label}
            </Text>
          ) : (
            opt.label
          )}
        </Pressable>
      ))}
    </View>
  );
}
