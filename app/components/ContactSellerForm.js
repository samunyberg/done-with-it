import { Keyboard, Alert } from "react-native";
import * as Yup from "yup";
import * as Notifications from "expo-notifications";

import messagesApi from "../api/messages";
import { Form, FormField, SubmitButton } from "../components/forms";

const validationSchema = Yup.object().shape({
  message: Yup.string().required().min(3).max(500).label("Message"),
});

const ContactSellerForm = ({ listing }) => {
  const handleSubmit = async ({ message }, { resetForm }) => {
    Keyboard.dismiss();

    const result = await messagesApi.send(message, listing.id);

    if (!result.ok) {
      console.log("Error", result);
      return Alert.alert("Error", "Could not send the message to the seller.");
    }

    resetForm();

    Notifications.scheduleNotificationAsync({
      content: {
        title: "Awesome!",
        body: "Your message was successfully sent to the seller.",
      },
      trigger: null,
    });
  };

  return (
    <Form
      initialValues={{ message: "" }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <FormField
        autoCapitalize="none"
        autoCorrect={false}
        name="message"
        placeholder="Message..."
      />
      <SubmitButton title="Contact seller" />
    </Form>
  );
};

export default ContactSellerForm;
