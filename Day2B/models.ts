export interface Password {
  password: string;
  policy: Policy;
}

interface Policy {
  min: number;
  max: number;
  char: string;
}
