import {ComponentClass} from "react";

export interface VisibilitySensorProps {
  onChange(isVisible: boolean): void;
  active?: boolean;
  partialVisibility?: boolean | 'top' | 'right' | 'bottom' | 'left';
  delay?: number;
  delayedCall?: boolean;
  containment?: Element;
  minTopValue?: number;

}

declare const VisibilitySensor: ComponentClass<VisibilitySensorProps>;

export default VisibilitySensor;
