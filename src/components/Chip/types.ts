export enum ChipVariant {
  empty = "empty",
  outlined = "outlined",
  default = "default",
}

export type ChipPropsType = {
  variant?: ChipVariant;
  label?: string;
  onDelete?: () => void;
  className?: string;
  spanClassName?: string;
};
