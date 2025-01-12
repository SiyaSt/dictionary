export interface Word{
  word: string;
  type: string;
  definition: string;
  pronunciation: string;
  checked: boolean;
}

export interface Options {
  value: string;
  label: string;
}