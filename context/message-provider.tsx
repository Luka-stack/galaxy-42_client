import {
  createContext,
  FunctionComponent,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import { Message } from '../lib/graphql/messages';
import { useAuthState } from './auth-provider';

interface State {
  currentChat: string;
  messages: Message[];
}

interface Action {
  type: string;
  payload: any;
}

const initialState: State = {
  currentChat: '',
  messages: [],
};

const StateContext = createContext<State>(initialState);
const DispatchContext = createContext<any>(null);

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'SET_MESSAGES':
      return {
        ...state,
        currentChat: action.payload.chat,
        messages: action.payload.messages,
      };

    case 'NEW_MESSAGE':
      if (state.currentChat === action.payload.recipient) {
        console.log('NEW_MESSAGE', action.payload);

        return {
          ...state,
          messages: [...state.messages, action.payload],
        };
      }

      // Add notification about new message in new group

      return state;

    default:
      return state;
  }
};

type Props = {
  children: React.ReactNode;
};

export const MessageProvider: FunctionComponent<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export const useMessageState = () => useContext(StateContext);
export const useMessageDispatch = () => useContext(DispatchContext);
