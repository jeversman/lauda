import "moment";

declare module "moment" {
  interface Moment {
    within (x: Range): boolean;
  }

  export function range(range: string): Range;
  export function range(range: Date[]): Range;
  export function range(range: Moment[]): Range;
  export function range(start: Date, end: Date): Range;
  export function range(start: Moment, end: Moment): Range;

  interface Range {
    start: Moment;
    end: Moment;

    contains (other: Date, exclusive?: boolean): boolean;
    contains (other: Moment, exclusive?: boolean): boolean;

    overlaps (range: Range): boolean;

    intersect (other: Range): Range;

    add (other: Range): Range;

    subtract (other: Range): Range[];

    by (range: string, hollaback: (current: Moment) => void, exclusive?: boolean): void;
    by (range: Range, hollaback: (current: Moment) => void, exclusive?: boolean): void;

    isSame (other: Range): boolean;

    diff (unit?: string): number;

    toDate (): Date;

    toString (): string;

    valueOf (): number;

    center (): number;

    clone (): Range;
  }
}