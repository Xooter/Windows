import { Styles } from "@/utils/Styles";
import {
  Text,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

interface AddModalProps {
  isVisible: boolean;
  onClose: () => void;
  onNew: () => void;
  children?: React.ReactNode;
}

export const AddModal = ({
  isVisible,
  onClose,
  onNew,
  children,
}: AddModalProps) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View className="h-full flex items-center justify-center">
        <TouchableWithoutFeedback onPress={onClose}>
          <View
            className="h-screen w-full bg-dark-100/20 absolute"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.5)",
            }}
          />
        </TouchableWithoutFeedback>

        <View
          className="rounded-t-xl justify-start items-center w-full px-3 py-3 absolute bottom-0"
          style={[
            Styles.shadow,
            {
              backgroundColor: "#f8faff",
            },
          ]}
        >
          {children}

          <TouchableOpacity
            activeOpacity={0.95}
            onPress={onNew}
            style={{ ...Styles.shadow, backgroundColor: "#222" }}
            className="p-5 rounded-xl mx-3 flex-row justify-center items-center h-15 mt-5 w-full"
          >
            <Text style={{ ...Styles.subtitle, fontSize: 25, color: "#fff" }}>
              New
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
