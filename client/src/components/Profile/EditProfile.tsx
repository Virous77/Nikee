import React from "react";
import ModalHeader from "../Modal/ModalHeader";
import EditProfileForm from "./EditProfileForm";

type EditProfileType = {
  onClose: () => void;
};

const EditProfile: React.FC<EditProfileType> = ({ onClose }) => {
  return (
    <section>
      <ModalHeader name="Update Profile" onClose={onClose} />
      <EditProfileForm />
    </section>
  );
};

export default EditProfile;
