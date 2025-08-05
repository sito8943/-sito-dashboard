export type RangeChipPropsType<T> = {
  start: T;
  end: T;
  label: string;
  onClearFilter: (key: string) => void;
};
