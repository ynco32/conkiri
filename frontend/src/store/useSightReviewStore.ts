import { create } from 'zustand';
import {
  CreateSightReviewRequest,
  SightReviewFormData,
  STATUS_MAPPINGS,
} from '@/types/sightReviews';

export type ValidFields =
  | 'concertId'
  | 'photo'
  | 'viewScore'
  | 'seat'
  | 'seatDistance'
  | 'content';

interface ValidationState {
  concertId: boolean;
  photo: boolean;
  viewScore: boolean;
  seat: boolean;
  seatDistance: boolean;
  content: boolean;
}

interface TouchedState {
  concertId: boolean;
  photo: boolean;
  viewScore: boolean;
  seat: boolean;
  seatDistance: boolean;
  content: boolean;
}

interface SightReviewState {
  formData: SightReviewFormData;
  errors: Record<string, string | undefined>;
  isSubmitting: boolean;
  validation: ValidationState;
  touched: TouchedState;
  setFormField: <K extends keyof SightReviewFormData>(
    field: K,
    value: SightReviewFormData[K]
  ) => void;
  setFormData: (data: SightReviewFormData) => void;
  setError: (field: string, error: string | undefined) => void;
  setValidation: (field: keyof ValidationState, isValid: boolean) => void;
  setTouched: (field: ValidFields) => void;
  clearErrors: () => void;
  setIsSubmitting: (isSubmitting: boolean) => void;
  isFormValid: () => boolean;
  reset: () => void;
  initialize: (initialData?: Partial<SightReviewFormData>) => void;
  getAPIRequestData: () => CreateSightReviewRequest;
}

export const DEFAULT_FORM_DATA: SightReviewFormData = {
  concertId: 0,
  sectionNumber: 0,
  rowLine: 0,
  columnLine: 0,
  photo: null,
  viewScore: 0,
  seatDistance: '평범해요',
  sound: '평범해요',
  content: '',
};

const DEFAULT_VALIDATION: ValidationState = {
  concertId: false,
  photo: false,
  viewScore: false,
  seat: false,
  seatDistance: false,
  content: false,
};

const DEFAULT_TOUCHED: TouchedState = {
  concertId: false,
  photo: false,
  viewScore: false,
  seat: false,
  seatDistance: false,
  content: false,
};

export const useSightReviewStore = create<SightReviewState>((set, get) => ({
  formData: DEFAULT_FORM_DATA,
  errors: {},
  isSubmitting: false,
  validation: DEFAULT_VALIDATION,
  touched: DEFAULT_TOUCHED,

  setFormField: (field, value) =>
    set((state) => ({
      formData: {
        ...state.formData,
        [field]: value,
      },
    })),

  setFormData: (data) => {
    const initialValidationState = {
      concertId: data.concertId > 0,
      photo: data.photo instanceof File || typeof data.photo === 'string',
      viewScore: data.viewScore > 0,
      seat: data.sectionNumber > 0 && data.rowLine > 0 && data.columnLine > 0,
      seatDistance: data.seatDistance.length > 0,
      content: data.content.length >= 10,
    };

    set({
      formData: data,
      validation: initialValidationState,
      touched: DEFAULT_TOUCHED,
      errors: {},
    });
  },

  initialize: (initialData = {}) => {
    const mergedData = {
      ...DEFAULT_FORM_DATA,
      ...initialData,
    };

    const initialValidationState = {
      concertId: mergedData.concertId > 0,
      photo:
        mergedData.photo instanceof File ||
        typeof mergedData.photo === 'string',
      viewScore: mergedData.viewScore > 0,
      seat:
        mergedData.sectionNumber > 0 &&
        mergedData.rowLine > 0 &&
        mergedData.columnLine > 0,
      seatDistance: mergedData.seatDistance.length > 0,
      content: mergedData.content.length >= 10,
    };

    set({
      formData: mergedData,
      validation: initialValidationState,
      touched: DEFAULT_TOUCHED,
      errors: {},
      isSubmitting: false,
    });
  },

  reset: () => {
    set({
      formData: DEFAULT_FORM_DATA,
      errors: {},
      isSubmitting: false,
      validation: DEFAULT_VALIDATION,
      touched: DEFAULT_TOUCHED,
    });
  },

  setError: (field, error) =>
    set((state) => ({
      errors: {
        ...state.errors,
        [field]: error,
      },
    })),

  setValidation: (field, isValid) => {
    set((state) => ({
      validation: {
        ...state.validation,
        [field]: isValid,
      },
    }));
  },

  setTouched: (field) =>
    set((state) => ({
      touched: {
        ...state.touched,
        [field]: true,
      },
    })),

  clearErrors: () => set({ errors: {} }),

  setIsSubmitting: (isSubmitting) => set({ isSubmitting }),

  isFormValid: () => {
    const validationState = get().validation;
    return Object.values(validationState).every((isValid) => isValid);
  },

  getAPIRequestData: (): CreateSightReviewRequest => {
    const formData = get().formData;
    return {
      concertId: formData.concertId,
      sectionNumber: formData.sectionNumber,
      rowLine: formData.rowLine,
      columnLine: formData.columnLine,
      content: formData.content,
      viewScore: formData.viewScore,
      seatDistance: STATUS_MAPPINGS.seatDistance[formData.seatDistance],
      sound: STATUS_MAPPINGS.sound[formData.sound],
    };
  },
}));
