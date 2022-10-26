import {nonEmpty, phoneValidate} from '../util/validation';

interface IAction {
  type?: string;
  val?: string;
}

interface IState {
  isValid?: boolean | null;
  value?: string;
}

export const nameReducer = (state: IState, action: IAction) => {
  if (action.type === 'USER_INPUT') {
    return {
      value: action.val,
      isValid: nonEmpty(action.val),
    };
  }
  if (action.type === 'INPUT_BLUR') {
    return {
      value: state.value,
      isValid: nonEmpty(state.value),
    };
  }
  return {value: '', isValid: false};
};

export const phoneReducer = (state: IState, action: IAction) => {
  if (action.type === 'USER_INPUT') {
    return {
      value: action.val,
      isValid: phoneValidate(action.val),
    };
  }
  if (action.type === 'INPUT_BLUR') {
    return {
      value: state.value,
      isValid: phoneValidate(state.value),
    };
  }
  return {value: '', isValid: false};
};
