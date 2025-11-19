
export enum SleepType {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
}

// FIX: Made QuestionOption readonly to match the type from QUIZ_QUESTIONS which is ReadonlyDeep.
export interface QuestionOption {
  readonly text: string;
  readonly types: readonly { readonly type: SleepType; readonly score: number }[];
}

// FIX: Made Question readonly to match the type from QUIZ_QUESTIONS which is ReadonlyDeep.
export interface Question {
  readonly text: string;
  readonly description?: string;
  readonly options: readonly QuestionOption[];
  readonly image: string;
  readonly background: readonly [string, string];
}

export interface ResultData {
  title: string;
  description: string;
  line: string;
  products: {
    name: string;
    image: string;
    description: string;
  }[];
  images: string[];
  characterImage: string;
  sensitivity: number;
  traits: readonly {
    readonly icon: 'medal' | 'search' | 'education' | 'sparkles' | 'moon' | 'heart' | 'leaf';
    readonly text: string;
  }[];
}
