import 'react-native';

type CalendarModuleConstants = Record<'DEFAULT_EVENT_NAME', string>;

type CalendarModuleType = {
  getConstants: () => CalendarModuleConstants;
  createCalendarEvent: (name: string, location: string) => void;
  createCalendarEventWithCallback: (
    name: string,
    location: string,
    callback: (error: string | null, event: string) => void,
  ) => void;
  createCalendarEventWithPromise: (
    name: string,
    location: string,
  ) => Promise<string>;
  createCalendarEventWithListenerEvent: (
    name: string,
    location: string,
  ) => void;
  addListener: (eventName: string) => void;
  removeListeners: (count: int) => void;
};

declare module 'react-native' {
  interface NativeModulesStatic {
    CalendarModule: CalendarModuleType;
  }
}
