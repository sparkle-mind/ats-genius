import { Camera } from "lucide-react";
import CardWrp from "./CardWrp";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import SecondaryButton from "./atoms/buttons/SecondaryButton";
import { useMutation } from "@tanstack/react-query";
import { uploadAvatar } from "@/services/upload";
import {
  ALLOWED_TYPES,
  formatFileSize,
  MAX_FILE_SIZE,
} from "@/utils/constants";

const ProfileAvatar = ({ myProfile, isEditable, setProfileAvatar }) => {
  const [avatar, setAvatar] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [error, setError] = useState("");

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (myProfile?.profile?.avatar) {
      setAvatar(myProfile.profile.avatar);
    }
  }, [myProfile]);

  // Cleanup blob URL on unmount
  useEffect(() => {
    return () => {
      if (avatar?.startsWith("blob:")) {
        URL.revokeObjectURL(avatar);
      }
    };
  }, [avatar]);

  const handleAvatarUpload = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setError("");

    if (!ALLOWED_TYPES.includes(file.type)) {
      setError("Invalid file type. Please upload JPG, PNG, GIF or WEBP image.");
      e.target.value = "";
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError("File size must not exceed 2 MB.");
      e.target.value = "";
      return;
    }

    // Revoke old preview URL
    if (avatar?.startsWith("blob:")) {
      URL.revokeObjectURL(avatar);
    }

    const previewUrl = URL.createObjectURL(file);

    setAvatar(previewUrl);
    setAvatarFile(file);
  };

  const mutation = useMutation({
    mutationFn: uploadAvatar,

    onSuccess: (data) => {
      setProfileAvatar(data?.url);

      // Replace blob preview with uploaded URL
      if (data?.url) {
        setAvatar(data.url);
      }

      setAvatarFile(null);
      console.log("Cloudinary Response:", data);
    },

    onError: (error) => {
      setError(error?.message || "Failed to upload avatar.");
    },
  });

  const handleSubmit = () => {
    if (!avatarFile) return;
    mutation.mutate(avatarFile);
  };

  return (
    <CardWrp className="mt-0 relative overflow-hidden">
      <h2 className="text-base font-bold text-white mb-5">Profile picture</h2>

      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
        <div className="relative shrink-0">
          <div
            className="w-25 h-25 rounded-2xl border flex items-center justify-center overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,87,34,0.35), rgba(255,112,67,0.25))",
              borderColor: "rgba(255,87,34,0.25)",
            }}
          >
            <Image
              src={avatar || "/images/profile-defualt.jpg"}
              alt="Profile"
              width={100}
              height={100}
              className="w-full h-full object-cover"
              unoptimized={avatar?.startsWith("blob:")}
            />
          </div>

          <button
            type="button"
            disabled={!isEditable}
            onClick={() => fileInputRef.current?.click()}
            className={`absolute -bottom-1.5 -right-1.5 w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
              !isEditable ? "opacity-50 cursor-not-allowed" : "hover:opacity-80"
            }`}
            style={{ background: "var(--color-orange)" }}
          >
            <Camera className="w-3.5 h-3.5 text-white" />
          </button>
        </div>

        <div className="flex-1">
          <p className="text-white font-semibold text-sm">
            {myProfile?.fullName}
          </p>

          <p className="text-[var(--color-text-secondary)] text-xs mt-1">
            JPG, PNG, GIF, WEBP • Max 2 MB
          </p>

          {avatarFile && (
            <div className="mt-3 text-xs">
              <p className="text-white break-all">
                <span className="font-medium">File:</span> {avatarFile.name}
              </p>

              <p className="text-[var(--color-text-secondary)] mt-1">
                Size: {formatFileSize(avatarFile.size)}
              </p>

              <p className="text-[var(--color-text-secondary)]">
                Type: {avatarFile.type}
              </p>
            </div>
          )}

          {error && (
            <p className="mt-3 !text-red-500 text-xs font-medium">{error}</p>
          )}

          <div className="flex gap-2 mt-4">
            <input
              ref={fileInputRef}
              id="avatar-upload"
              type="file"
              accept="image/jpeg,image/png,image/gif,image/webp"
              onChange={handleAvatarUpload}
              disabled={!isEditable}
              className="hidden"
            />

            <label
              htmlFor={isEditable ? "avatar-upload" : undefined}
              className={`inline-flex items-center justify-center ${
                isEditable
                  ? "bg-orange-500 cursor-pointer hover:bg-orange-600"
                  : "bg-orange-500 opacity-50 cursor-not-allowed"
              } text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors`}
            >
              Choose Photo
            </label>

            {avatarFile && (
              <SecondaryButton
                onClick={handleSubmit}
                disabled={mutation.isPending || !isEditable || error}
              >
                {mutation.isPending ? "Uploading..." : "Upload"}
              </SecondaryButton>
            )}
          </div>
        </div>
      </div>
      <div className="absolute md:top-[90px] bottom-[-20px] right-8  tracking-tighter font-[900]  md:text-[6rem] text-[4rem] leading-[110%] scale-[1.7] opacity-[0.1] shrink-0">
        {myProfile?.fullName}
      </div>
    </CardWrp>
  );
};

export default ProfileAvatar;
