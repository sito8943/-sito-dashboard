import { faAppleWhole } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Meta, StoryObj } from "@storybook/react";
import type { Option } from "components";
import { AutocompleteInput, Button } from "components";
import { State } from "components";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

const meta: Meta<typeof AutocompleteInput> = {
  title: "Components/Form/AutocompleteInput",
  component: AutocompleteInput,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof AutocompleteInput>;

const options: Option[] = [
  { id: 6, name: "Kiwi" },
  { id: 7, name: "Fresa" },
  { id: 8, name: "Uva" },
  { id: 9, name: "Naranja" },
  { id: 10, name: "Mandarina" },
  { id: 11, name: "Piña" },
  { id: 12, name: "Cereza" },
  { id: 13, name: "Mango" },
  { id: 14, name: "Papaya" },
  { id: 15, name: "Durazno" },
  { id: 16, name: "Ciruela" },
  { id: 17, name: "Arándanos" },
  { id: 18, name: "Frambuesa" },
  { id: 19, name: "Coco" },
  { id: 20, name: "Guayaba" },
  { id: 21, name: "Lima" },
  { id: 22, name: "Limón" },
  { id: 23, name: "Maracuyá" },
  { id: 24, name: "Higo" },
  { id: 25, name: "Granada" },
];

export const Single: Story = {
  render: (args) => {
    const Example = () => {
      const [value, setValue] = useState<Option | Option[] | null>(null);
      return (
        <div className="max-w-sm">
          <AutocompleteInput
            {...args}
            label="Fruta"
            placeholder="Escribe para filtrar"
            options={options}
            value={value}
            onChange={setValue}
          />
          {!Array.isArray(value) && (
            <p className="mt-2 text-sm text-gray-500">
              Valor: {value ? String(value.name ?? value.value) : "(vacío)"}
            </p>
          )}
        </div>
      );
    };
    return <Example />;
  },
  args: { state: State.default },
};

export const Multiple: Story = {
  render: (args) => {
    const Example = () => {
      const [value, setValue] = useState<Option[] | null>(null);
      return (
        <div className="max-w-sm">
          <AutocompleteInput
            {...args}
            label="Frutas"
            placeholder="Selecciona varias"
            multiple
            options={options}
            value={value}
            onChange={(nextValue) =>
              setValue(Array.isArray(nextValue) ? nextValue : null)
            }
          />
          <p className="mt-2 text-sm text-gray-500">
            Valor:{" "}
            {Array.isArray(value)
              ? value.map((v) => v.name).join(", ")
              : "(vacío)"}
          </p>
        </div>
      );
    };
    return <Example />;
  },
  args: { state: State.default },
};

export const MultipleWithControllerRequired: Story = {
  render: () => {
    const Example = () => {
      const { control, handleSubmit } = useForm<{
        fruits: Option[] | null;
      }>({
        defaultValues: { fruits: null },
      });

      const onSubmit = (data: { fruits: Option[] | null }) => {
        const values = data.fruits?.map((fruit) => fruit.name).join(", ");
        alert(`Frutas seleccionadas: ${values}`);
      };

      return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm space-y-4">
          <Controller
            control={control}
            name="fruits"
            rules={{
              validate: (value) =>
                (Array.isArray(value) && value.length > 0) ||
                "Selecciona al menos una fruta",
            }}
            render={({ field, fieldState }) => (
              <AutocompleteInput
                label="Frutas favoritas"
                placeholder="Selecciona una o varias frutas"
                multiple
                required
                options={options}
                value={field.value}
                onChange={(nextValue) =>
                  field.onChange(Array.isArray(nextValue) ? nextValue : null)
                }
                helperText={fieldState.error?.message}
                state={fieldState.error ? State.error : State.default}
              />
            )}
          />
          <Button type="submit" variant="submit">
            Enviar
          </Button>
        </form>
      );
    };

    return <Example />;
  },
};

export const CustomLabel: Story = {
  render: (args) => {
    const Example = () => {
      const [value, setValue] = useState<Option | Option[] | null>(null);
      return (
        <div className="max-w-sm">
          <AutocompleteInput
            {...args}
            label={
              <span className="flex items-center gap-2">
                <FontAwesomeIcon icon={faAppleWhole} className="text-red-500" />
                <span>
                  Fruta favorita{" "}
                  <span className="text-xs text-gray-400">(opcional)</span>
                </span>
              </span>
            }
            placeholder="Escribe para filtrar"
            options={options}
            value={value}
            onChange={setValue}
          />
        </div>
      );
    };
    return <Example />;
  },
  args: { state: State.default },
};

export const Default: Story = {
  render: (args) => {
    const Example = () => {
      const [value, setValue] = useState<Option | Option[] | null>({
        name: "Default",
        id: 1,
      });

      return (
        <div className="max-w-sm flex flex-col gap-5">
          <Button
            variant="submit"
            onClick={() => setValue({ name: "another", id: 2 })}
          >
            Set another value
          </Button>
          <AutocompleteInput
            {...args}
            label="Fruta"
            placeholder="Escribe para filtrar"
            options={options}
            value={value}
            onChange={setValue}
          />
          {!Array.isArray(value) && (
            <p className="mt-2 text-sm text-gray-500">
              Valor: {value ? String(value.name ?? value.value) : "(vacío)"}
            </p>
          )}
        </div>
      );
    };
    return <Example />;
  },
  args: { state: State.default },
};
