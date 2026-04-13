import {
  faEnvelope,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Meta, StoryObj } from "@storybook/react";
import { IconButton, TextInput } from "components";
import { State } from "components";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

const meta: Meta<typeof TextInput> = {
  title: "Components/Form/TextInput",
  component: TextInput,
  tags: ["autodocs"],
  argTypes: {
    state: {
      control: "inline-radio",
      options: [State.default, State.error, State.good],
    },
    label: { control: "text" },
    helperText: { control: "text" },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    required: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof TextInput>;

export const Default: Story = {
  args: {
    label: "Nombre",
    state: State.default,
  },
};

export const Placeholder: Story = {
  args: {
    label: "Nombre",
    placeholder: "Ingresa tu nombre",
    state: State.default,
  },
};

export const WithHelperText: Story = {
  args: {
    label: "Correo",
    placeholder: "nombre@dominio.com",
    helperText: "Nunca compartiremos tu correo.",
  },
};

export const ErrorState: Story = {
  args: {
    label: "Usuario",
    helperText: "Campo requerido",
    state: State.error,
    required: true,
  },
};

export const SuccessState: Story = {
  args: {
    label: "Usuario",
    state: State.good,
    required: true,
  },
};

export const WithController: Story = {
  render: () => {
    const WithControllerExample = () => {
      const { control, handleSubmit } = useForm<{ email: string }>({
        defaultValues: { email: "" },
      });

      const onSubmit = (data: { email: string }) => {
        alert(`Email: ${data.email}`);
      };

      return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm space-y-4">
          <Controller
            control={control}
            name="email"
            rules={{
              required: "El correo es requerido",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Ingresa un correo válido",
              },
            }}
            render={({ field, fieldState }) => (
              <TextInput
                {...field}
                type="email"
                id="email"
                label="Correo electrónico"
                required
                helperText={fieldState.error?.message}
                state={fieldState.error ? State.error : State.default}
              />
            )}
          />
          <button type="submit" className="btn-primary">
            Enviar
          </button>
        </form>
      );
    };
    return <WithControllerExample />;
  },
};

export const Date: Story = {
  args: {
    type: "date",
    label: "Date",
  },
};

export const ControlledDate: Story = {
  render: () => {
    const ControlledDateExample = () => {
      const { control, handleSubmit } = useForm<{ lastPaidAt: string }>({
        defaultValues: { lastPaidAt: "" },
      });

      const onSubmit = (data: { lastPaidAt: string }) => {
        alert(`Last Paid at: ${data.lastPaidAt}`);
      };

      return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm space-y-4">
          <Controller
            control={control}
            name="lastPaidAt"
            render={({ field: { value, ...rest } }) => (
              <TextInput
                type="range"
                value={value ?? ""}
                label="Last paid at"
                autoComplete="Last paid at"
                {...rest}
              />
            )}
          />
        </form>
      );
    };
    return <ControlledDateExample />;
  },
};

export const CustomLabel: Story = {
  args: {
    label: (
      <span className="flex items-center gap-2">
        <FontAwesomeIcon icon={faEnvelope} className="text-blue-500" />
        <span>
          Correo <span className="text-xs text-gray-400">(requerido)</span>
        </span>
      </span>
    ),
    placeholder: "nombre@dominio.com",
    state: State.default,
  },
};

export const Controlled: Story = {
  render: (args) => {
    const ControlledExample = () => {
      const [value, setValue] = useState("");
      return (
        <div className="max-w-sm">
          <TextInput
            {...args}
            value={value}
            onChange={(e) => setValue(e.currentTarget.value)}
            label={args.label ?? "Controlado"}
            placeholder={args.placeholder ?? "Escribe algo..."}
          />
          <p className="mt-2 text-sm text-gray-500">
            Valor: {value || "(vacío)"}
          </p>
        </div>
      );
    };
    return <ControlledExample />;
  },
  args: {
    state: State.default,
  },
};

export const PasswordWithIconError: Story = {
  render: () => {
    const PasswordWithIconErrorExample = () => {
      const [value, setValue] = useState("");
      const [showPassword, setShowPassword] = useState(false);

      return (
        <div className="max-w-sm">
          <TextInput
            id="password-error"
            label="Contraseña"
            type={showPassword ? "text" : "password"}
            placeholder="Ingresa tu contraseña"
            helperText="La contraseña debe tener al menos 8 caracteres."
            state={State.error}
            value={value}
            onChange={(e) => setValue(e.currentTarget.value)}
            inputClassName="pr-10"
          >
            <IconButton
              type="button"
              color="error"
              className="absolute right-1 top-1/2 -translate-y-1/2"
              icon={
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  className="w-3 h-3"
                />
              }
              aria-label={
                showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
              }
              onClick={() => setShowPassword((current) => !current)}
            />
          </TextInput>
        </div>
      );
    };

    return <PasswordWithIconErrorExample />;
  },
};
