export interface Make extends Option {}

export interface Model extends Option {
  years: string[];
}

export interface Option {
  id: string;
  name: string;
}
