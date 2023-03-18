/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect} from 'react';
import {
  NativeModules,
  NativeEventEmitter,
  Button,
  StyleSheet,
  View,
  Alert,
} from 'react-native';

const useCalendarModule = () => {
  const {CalendarModule} = NativeModules;
  const eventEmitter = new NativeEventEmitter(CalendarModule);

  useEffect(() => {
    eventEmitter.addListener(
      'onSuccessEventRegister',
      (res: {event: string}) => {
        handleShowAlert(res.event);
      },
    );

    eventEmitter.addListener('onErrorEventRegister', (err: {error: string}) => {
      handleShowAlert(err.error);
    });

    return () => {
      eventEmitter.removeAllListeners('onSuccessEventRegister');
      eventEmitter.removeAllListeners('onErrorEventRegister');
    };
  }, []);

  const handleShowAlert = useCallback((message: string) => {
    Alert.alert('', message);
  }, []);

  const handleCreateCalendarEventWithCallback = () => {
    CalendarModule.createCalendarEventWithCallback(
      'Create Calendar',
      'Location',
      (error, event) => {
        if (error) {
          return handleShowAlert(error);
        }
        handleShowAlert(event);
      },
    );
  };

  const handleCreateCalendarEventWithPromise = async () => {
    try {
      const event = await CalendarModule.createCalendarEventWithPromise(
        'Create Calendar',
        'Location',
      );
      handleShowAlert(event);
    } catch (err: unknown) {
      const error = err as {message: string};
      const message = error.message as string;
      handleShowAlert(message);
    }
  };

  const handleCreateCalendarEventWithListener = async () => {
    CalendarModule.createCalendarEventWithListenerEvent(
      'Create Calendar',
      'Location',
    );
  };

  return {
    handleCreateCalendarEventWithCallback,
    handleCreateCalendarEventWithPromise,
    handleCreateCalendarEventWithListener,
  };
};

const Main: React.FC = () => {
  const {
    handleCreateCalendarEventWithCallback,
    handleCreateCalendarEventWithPromise,
    handleCreateCalendarEventWithListener,
  } = useCalendarModule();

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          title="Create Calendar Event With Callback"
          onPress={handleCreateCalendarEventWithCallback}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Create Calendar Event With Promise"
          onPress={handleCreateCalendarEventWithPromise}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Create Calendar Event With Listener"
          onPress={handleCreateCalendarEventWithListener}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    marginBottom: '2%',
  },
});

export default Main;
