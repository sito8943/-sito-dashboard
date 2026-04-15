import {
  faCamera,
  faCloudArrowUp,
  faSpinner,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Meta, StoryObj } from "@storybook/react";
import { FileInput, IconButton, State } from "components";
import { ChangeEvent, KeyboardEvent, useCallback, useState } from "react";

const meta: Meta<typeof FileInput> = {
  title: "Components/Form/FileInput",
  component: FileInput,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    helperText: { control: "text" },
    accept: { control: "text" },
    multiple: { control: "boolean" },
    unstyled: { control: "boolean" },
    hiddenContainer: { control: "boolean" },
    disabled: { control: "boolean" },
    state: {
      control: "inline-radio",
      options: [State.default, State.error, State.good],
    },
  },
};

export default meta;
type Story = StoryObj<typeof FileInput>;

export const Default: Story = {
  args: {
    label: "Selecciona archivo",
    helperText: "Formatos admitidos: PDF, PNG, JPG",
    accept: ".pdf,.png,.jpg,.jpeg,application/pdf,image/png,image/jpeg",
    multiple: false,
  },
};

export const CustomLabel: Story = {
  args: {
    label: (
      <span className="flex items-center gap-2">
        <FontAwesomeIcon icon={faCloudArrowUp} className="text-sky-500" />
        <span>
          Subir documento{" "}
          <span className="text-xs text-gray-400">(máx. 5MB)</span>
        </span>
      </span>
    ),
    accept: ".pdf,.png,.jpg,.jpeg",
    helperText: "Formatos admitidos: PDF, PNG, JPG",
  },
};

export const MultipleFiles: Story = {
  args: {
    label: "Sube tus archivos",
    multiple: true,
  },
};

type ProfileType = {
  name: string;
  photo: string | null;
};

type ProfilePhotoPropsType = {
  profile: ProfileType;
  isUploading: boolean;
  onUpload: (file: File) => void;
  onDelete: () => void;
};

function PhotoFallback() {
  return (
    <span
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1.5rem",
        fontWeight: 700,
        color: "#7a7a7a",
      }}
    >
      SP
    </span>
  );
}

function ProfilePhoto({
  profile,
  isUploading,
  onUpload,
  onDelete,
}: ProfilePhotoPropsType) {
  const handleFileSelect = useCallback(() => {
    const fileInput = document.getElementById("profile-photo-file-input");
    if (fileInput instanceof HTMLInputElement) fileInput.click();
  }, []);

  const handleFileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        onUpload(file);
        e.target.value = "";
      }
    },
    [onUpload],
  );

  const hasPhoto = !!profile.photo;
  const handleContainerKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (!hasPhoto) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleFileSelect();
      }
    },
    [handleFileSelect, hasPhoto],
  );

  return (
    <div className="flex flex-col items-start justify-start gap-3">
      <div className="relative">
        <div
          className={`w-28 h-28 rounded-2xl overflow-hidden bg-base border-2 border-border flex items-center justify-center${hasPhoto ? " cursor-pointer" : ""}`}
          onClick={hasPhoto ? handleFileSelect : undefined}
          onKeyDown={handleContainerKeyDown}
          role={hasPhoto ? "button" : undefined}
          tabIndex={hasPhoto ? 0 : undefined}
          title={hasPhoto ? "Subir nueva foto" : undefined}
        >
          {hasPhoto ? (
            <img
              src={profile.photo ?? ""}
              className="w-full h-full object-cover"
              alt={profile.name}
            />
          ) : (
            <PhotoFallback />
          )}
          {isUploading && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <FontAwesomeIcon
                icon={faSpinner}
                className="text-2xl text-white animate-spin"
              />
            </div>
          )}
        </div>

        {!hasPhoto && (
          <IconButton
            icon={<FontAwesomeIcon icon={faCamera} />}
            onClick={handleFileSelect}
            disabled={isUploading}
            color="primary"
            className="top-1 right-1 absolute"
            aria-label="Subir foto"
          />
        )}

        {hasPhoto && (
          <IconButton
            icon={<FontAwesomeIcon icon={faTrash} />}
            onClick={onDelete}
            disabled={isUploading}
            color="error"
            className="top-1 right-1 absolute"
            aria-label="Borrar foto"
          />
        )}
      </div>

      <FileInput
        id="profile-photo-file-input"
        unstyled
        accept="image/jpeg,image/png,image/webp"
        inputClassName="hidden"
        disabled={isUploading}
        onChange={handleFileChange}
      />
    </div>
  );
}

export const AsProfilePhoto: Story = {
  render: () => {
    const ProfilePhotoStory = () => {
      const [profile, setProfile] = useState<ProfileType>({
        name: "Sito User",
        photo: null,
      });
      const [isUploading, setIsUploading] = useState(false);

      const onUpload = useCallback((file: File) => {
        setIsUploading(true);

        const reader = new FileReader();
        reader.onload = () => {
          setTimeout(() => {
            const result =
              typeof reader.result === "string" ? reader.result : null;
            setProfile((prev) => ({ ...prev, photo: result }));
            setIsUploading(false);
          }, 650);
        };
        reader.onerror = () => setIsUploading(false);

        reader.readAsDataURL(file);
      }, []);

      const onDelete = useCallback(() => {
        setProfile((prev) => ({ ...prev, photo: null }));
      }, []);

      return (
        <div className="p-4">
          <ProfilePhoto
            profile={profile}
            isUploading={isUploading}
            onUpload={onUpload}
            onDelete={onDelete}
          />
        </div>
      );
    };

    return <ProfilePhotoStory />;
  },
};
