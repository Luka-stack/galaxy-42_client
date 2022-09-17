import { useLazyQuery, useQuery } from '@apollo/client';
import React, {
  createContext,
  FunctionComponent,
  useContext,
  useReducer,
} from 'react';
import { boolean } from 'yup';
import {
  GET_NOTIFICATIONS,
  Notification,
  NOTIFICATION_CREATED,
} from '../lib/graphql/notifications';
import { GET_REQUESTS, Request } from '../lib/graphql/requests';
import { ME, User } from '../lib/graphql/users';
import { UserData } from './user-data';

interface State {
  authenticated: boolean;
  user: User | null;
  myRequests: Request[];
  planetsRequests: Request[];
  notifications: Notification[];
}

interface Action {
  type: string;
  payload: any;
}

const initialState: State = {
  authenticated: false,
  user: null,
  myRequests: [],
  planetsRequests: [],
  notifications: [],
};

const StateContext = createContext<State>({
  authenticated: false,
  user: null,
  myRequests: [],
  planetsRequests: [],
  notifications: [],
});

const DispatchContext = createContext<any>(null);

const reducer = (state: State, { type, payload }: Action) => {
  switch (type) {
    case 'LOGIN':
      return {
        ...state,
        user: payload,
        authenticated: true,
      };

    case 'UPDATE_PLANETSREQUESTS': {
      const newPlanetsRequests = [];
      const uuids = payload as string[];

      for (let request of state.myRequests) {
        if (uuids.includes(request.uuid)) {
          newPlanetsRequests.push({ ...request, viewed: true });
        } else {
          newPlanetsRequests.push(request);
        }
      }

      return {
        ...state,
        planetsRequests: newPlanetsRequests,
      };
    }

    case 'DELETE_PLANETSREQUEST':
      return {
        ...state,
        planetsRequests: state.planetsRequests.filter(
          (req) => req.uuid !== payload
        ),
      };

    case 'REQUESTS':
      return {
        ...state,
        myRequests: payload.users,
        planetsRequests: payload.planets,
      };

    case 'UPDATE_NOTIFICATIONS': {
      const newNotifications = [];
      const uuids = payload as string[];

      for (let notification of state.notifications) {
        if (uuids.includes(notification.uuid)) {
          newNotifications.push({ ...notification, viewed: true });
        } else {
          newNotifications.push(notification);
        }
      }

      return {
        ...state,
        notifications: newNotifications,
      };
    }

    case 'DELETE_NOTIFICATIONS':
      return {
        ...state,
        notifications: state.notifications.filter(
          (req) => !payload.includes(req.uuid)
        ),
      };

    case 'NEW_NOTIFICATION':
      return {
        ...state,
        notifications: [payload, ...state.notifications],
      };

    case 'NOTIFICATIONS':
      return {
        ...state,
        notifications: payload,
      };

    case 'LOGOUT':
      return {
        user: null,
        myRequests: [],
        planetsRequests: [],
        notifications: [],
        authenticated: false,
      };

    default:
      return state;
  }
};

type Props = {
  children: React.ReactNode;
};

export const AuthProvider: FunctionComponent<Props> = ({ children }) => {
  const [state, defaultDispatch] = useReducer(reducer, initialState);

  const dispatch = (type: string, payload?: any) => {
    defaultDispatch({ type, payload });
  };

  useQuery(ME, {
    onCompleted: ({ me }) => {
      dispatch('LOGIN', me);
    },
  });

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        {state.user && <UserData />}
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export const useAuthState = () => useContext(StateContext);
export const useAuthDispatch = () => useContext(DispatchContext);
