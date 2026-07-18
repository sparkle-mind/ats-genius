"use client";

import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { User, Mail, Phone, MapPin, Briefcase, Globe } from "lucide-react";

import CardWrp from "./CardWrp";
import PrimaryButton from "./atoms/buttons/PrimaryButton";
import SecondaryButton from "./atoms/buttons/SecondaryButton";
import Input from "./atoms/input/Input";
import Textarea from "./atoms/textarea/Textarea";
import LoadingWrp from "./common/LoadingWrp";

import { useMe } from "@/services/useMe";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "@/services/userService";
import toast from "react-hot-toast";
import ProfileAvatar from "./ProfileAvatar";

const PersonalInfo = () => {
  const [isEditable, setIsEditable] = useState(false);

  const [existingProfileInfo, setExistingProfileInfo] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    location: "",
    jobTitle: "",
    website: "",
    bio: "",
    avatar: "",
  });
  const { data: myProfile, isError, isLoading } = useMe();
  const [profileAvatar, setProfileAvatar] = useState(myProfile?.profile?.avatar);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (myProfile) {
      setExistingProfileInfo({
        fullName: myProfile.fullName || "",
        email: myProfile.email || "",
        phoneNumber: myProfile.profile?.phoneNumber || "",
        location: myProfile.profile?.location || "",
        jobTitle: myProfile.profile?.jobTitle || "",
        website: myProfile.profile?.website || "",
        bio: myProfile.profile?.bio || "",
        avatar: myProfile.profile?.avatar || "",
      });
    }
  }, [myProfile]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setExistingProfileInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { mutate: updateProfile, isPending: isProfileUpdating } = useMutation({
    mutationFn: () =>
      updateUser({
        fullName: existingProfileInfo.fullName,
        email: existingProfileInfo.email,
        profile: {
          phoneNumber: existingProfileInfo.phoneNumber,
          location: existingProfileInfo.location,
          jobTitle: existingProfileInfo.jobTitle,
          website: existingProfileInfo.website,
          bio: existingProfileInfo.bio,
          avatar: profileAvatar,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["me"],
      });

      toast.success("Profile updated successfully");
      setIsEditable(false);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleEdit = () => {
    if (!isEditable) {
      setIsEditable(true);
      return;
    }

    updateProfile();
  };

  const handleCancel = () => {
    if (myProfile) {
      setExistingProfileInfo({
        fullName: myProfile.fullName || "",
        email: myProfile.email || "",
        phoneNumber: myProfile.profile?.phoneNumber || "",
        location: myProfile.profile?.location || "",
        jobTitle: myProfile.profile?.jobTitle || "",
        website: myProfile.profile?.website || "",
        bio: myProfile.profile?.bio || "",
      });
    }

    setIsEditable(false);
  };
  const fields = [
    {
      key: "fullName",
      label: "Full Name",
      icon: User,
    },
    {
      key: "email",
      label: "Email Address",
      icon: Mail,
    },
    {
      key: "phoneNumber",
      label: "Phone Number",
      icon: Phone,
    },
    {
      key: "location",
      label: "Location",
      icon: MapPin,
    },
    {
      key: "jobTitle",
      label: "Job Title",
      icon: Briefcase,
    },
    {
      key: "website",
      label: "Website",
      icon: Globe,
    },
  ];
  if (isLoading) {
    return (
      <LoadingWrp
        title="Loading Profile"
        text="Please wait while we fetch your information..."
      />
    );
  }

  if (isError) {
    return (
      <div className="text-red-500 text-center text-lg">
        Error loading profile
      </div>
    );
  }
  console.log("profileAvatar from child >>>> ", profileAvatar);
  return (
    <>
      <CardWrp className="mt-0">
        <ProfileAvatar
          myProfile={myProfile}
          isEditable={isEditable}
          setProfileAvatar={setProfileAvatar}
        />

        <h2 className="text-base font-bold text-white my-5">
          Personal Information
        </h2>

        <Grid container spacing={3}>
          {fields.map((field) => {
            const Icon = field.icon;

            return (
              <Grid key={field.key} size={{ xs: 12, sm: 6 }}>
                <label className="flex flex-col gap-1.5">
                  <span className="text-zinc-400 text-xs font-semibold uppercase tracking-wider">
                    {field.label}
                  </span>

                  <Input
                    type="text"
                    name={field.key}
                    value={existingProfileInfo[field.key]}
                    onChange={handleOnChange}
                    placeholder={field.label}
                    icon={<Icon size={16} />}
                    readOnly={!isEditable}
                    disabled={!isEditable}
                    className={!isEditable ? "cursor-not-allowed" : ""}
                  />
                </label>
              </Grid>
            );
          })}

          <Grid size={{ xs: 12 }}>
            <label className="flex flex-col gap-1.5">
              <span className="text-zinc-400 text-xs font-semibold uppercase tracking-wider">
                Bio
              </span>

              <Textarea
                name="bio"
                rows={4}
                value={existingProfileInfo.bio}
                onChange={handleOnChange}
                placeholder="Tell about yourself..."
                readOnly={!isEditable}
                disabled={!isEditable}
                className={!isEditable ? "cursor-not-allowed" : ""}
              />
            </label>
          </Grid>
        </Grid>

        <div className="flex justify-end gap-3 mt-5">
          {isEditable && (
            <SecondaryButton onClick={handleCancel}>Cancel</SecondaryButton>
          )}

          <PrimaryButton onClick={handleEdit} disabled={isProfileUpdating}>
            {isEditable ? "Save Changes" : "Edit"}
          </PrimaryButton>
        </div>
      </CardWrp>
    </>
  );
};

export default PersonalInfo;
