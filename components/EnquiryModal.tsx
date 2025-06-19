import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import {
  Drawer,
  DrawerBackdrop,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
} from "@/components/ui/drawer";
import { X } from "lucide-react-native";

type EnquiryResource =
  | {
      type: "university";
      resourceId: string;
    }
  | {
      type: "program";
      resourceId: string;
    }
  | {
      type: "general";
    };

export type EnquiryModalProps = {
  closeModal: () => void;
  isVisible: boolean;
  resource: EnquiryResource;
  title: string;
};

export const EnquiryModal = ({
  title,
  resource,
  isVisible,
  closeModal,
}: EnquiryModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.message
    ) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const fData = new FormData();
      fData.append("name", formData.name);
      fData.append("email", formData.email);
      fData.append("phone", formData.phone);
      fData.append("message", formData.message);
      fData.append("title", title);
      fData.append("resource", resource.type);
      fData.append(
        "resourceId",
        resource.type === "general" ? "" : resource.resourceId
      );
      const response = await fetch("https://feshia.com/enquiry", {
        method: "POST",

        body: fData,
      });
      console.log("Enquiry response:", response);
      if (response.ok) {
        Alert.alert(
          "Success",
          "Your enquiry has been received. One of our experienced consultants will be in touch with you shortly."
        );
        closeModal();
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        Alert.alert("Error", "Please try again later");
      }
    } catch (error) {
      console.log("Enquiry submission error:", error);
      Alert.alert("Error", "Please try again later");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Drawer isOpen={isVisible} onClose={closeModal} size="full" anchor="bottom">
      <DrawerBackdrop />
      <DrawerContent style={styles.drawerContent}>
        <DrawerHeader style={styles.drawerHeader}>
          <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
            <X size={24} color="#666" />
          </TouchableOpacity>
        </DrawerHeader>
        <DrawerBody style={styles.drawerBody}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>
              One of our experienced consultants will be in touch with you
              shortly.
            </Text>

            <View style={styles.form}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Name</Text>
                <TextInput
                  style={styles.input}
                  value={formData.name}
                  onChangeText={(value) => handleInputChange("name", value)}
                  placeholder="Enter your name"
                  placeholderTextColor="#999"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={styles.input}
                  value={formData.email}
                  onChangeText={(value) => handleInputChange("email", value)}
                  placeholder="Enter your email"
                  placeholderTextColor="#999"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Phone</Text>
                <TextInput
                  style={styles.input}
                  value={formData.phone}
                  onChangeText={(value) => handleInputChange("phone", value)}
                  placeholder="Enter your phone number"
                  placeholderTextColor="#999"
                  keyboardType="phone-pad"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Message</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  value={formData.message}
                  onChangeText={(value) => handleInputChange("message", value)}
                  placeholder="Enter your message"
                  placeholderTextColor="#999"
                  multiline={true}
                  numberOfLines={4}
                  textAlignVertical="top"
                />
              </View>

              <TouchableOpacity
                style={[
                  styles.submitButton,
                  isSubmitting && styles.submitButtonDisabled,
                ]}
                onPress={handleSubmit}
                disabled={isSubmitting}
              >
                <Text style={styles.submitButtonText}>
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: "95%",
  },
  drawerHeader: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 16,
    paddingBottom: 0,
  },
  drawerBody: {
    padding: 24,
    paddingTop: 12,
  },
  closeButton: {
    padding: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 24,
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 24,
  },
  form: {
    gap: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: "#666",
    fontWeight: "300",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: "#333",
    height: 40,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  submitButtonDisabled: {
    backgroundColor: "#ccc",
  },
  submitButtonText: {
    color: "#f5f5f5",
    fontWeight: "bold",
    fontSize: 16,
  },
});
