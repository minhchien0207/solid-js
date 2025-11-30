import { Area } from "./models";

type AreaProps = {
  areas: Area[];
  value?: string;
  activeHintId?: string;
  onSelect?: (value: string) => void;
  onSelectHint?: (value: string) => void;
};

export type { AreaProps };
