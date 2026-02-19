import type { Meta, StoryObj } from "@storybook/react";
import {
  ArrayChip as SArrayChip,
  Chip,
  Option,
  RangeChip as SRangeChip,
} from "components";
import { useState } from "react";

const meta: Meta<typeof Chip> = {
  title: "Components/Chip",
  component: Chip,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Default: Story = {
  args: { text: "Etiqueta" },
};

export const Deletable: Story = {
  render: (args) => {
    const Example = () => {
      const [count, setCount] = useState(0);
      return (
        <Chip
          {...args}
          text={`Borrar (${count})`}
          onDelete={() => setCount((c) => c + 1)}
        />
      );
    };
    return <Example />;
  },
};

export const RangeChip: Story = {
  render: (args) => {
    const Example = () => {
      const [date, setDate] = useState(String(new Date()));
      return (
        <SRangeChip
          id={"number"}
          text={"Date"}
          start={date}
          end={date}
          onClearFilter={() => setDate("")}
        />
      );
    };
    return <Example />;
  },
};

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

export const ArrayChip: Story = {
  render: (args) => {
    const Example = () => {
      const [tags, setTags] = useState(options);
      return (
        <SArrayChip
          id={"Tags"}
          text={"Tags"}
          items={tags}
          onClearFilter={() => setTags([])}
        />
      );
    };
    return <Example />;
  },
};
