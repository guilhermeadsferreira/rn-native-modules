package com.rnnativemodules;
import android.util.Log;

import androidx.annotation.Nullable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.util.Map;
import java.util.HashMap;

public class CalendarModule extends ReactContextBaseJavaModule {
    CalendarModule(ReactApplicationContext context) {
        super(context);
    }

    // This method returns a string, which represents the name of the native module.
    // The native module can then be accessed in JS like this:
    // const { CalendarModule } = ReactNative.NativeModules;
    @Override
    public String getName() {
        return "CalendarModule";
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put("DEFAULT_EVENT_NAME", "New Event");
        return constants;
    }

    private void sendEvent(ReactContext reactContext,
                      String eventName,
                      @Nullable WritableMap params) {
        reactContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
            .emit(eventName, params);
    }

    private int listenerCount = 0;

    @ReactMethod
    public void addListener(String eventName) {
        if (listenerCount == 0) {
            // Set up any upstream listeners or background tasks as necessary
        }

        listenerCount += 1;
    }

    @ReactMethod
    public void removeListeners(Integer count) {
        listenerCount -= count;
        if (listenerCount == 0) {
            // Remove upstream listeners, stop unnecessary background tasks
        }
    }

    public String formatEvent(String name, String location) throws Exception {
        if (name == null || name.isEmpty()) {
            throw new Exception("Name deve ser preenchido!");
        }

        if (location == null || location.isEmpty()) {
            throw new Exception("Localização deve ser preenchida!");
        }

        String event = "Create event called with name: " + name + " and location: " + location;

        return event;
    }

    // All native module methods meant to be invoked from JavaScript must be annotated with @ReactMethod.
    @ReactMethod
    public void createCalendarEvent(String name, String location) {
        String event = "Create event called with name: " + name + " and location: " + location;
        Log.d("CalendarModule", event);
    }

    @ReactMethod
    public void createCalendarEventWithCallback(String name, String location, Callback callBack) {
        try {
            String event = formatEvent(name, location);
            callBack.invoke(null, event);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            callBack.invoke(e.getMessage());
        }
    }

    @ReactMethod
    public void createCalendarEventWithPromise(String name, String location, Promise promise) {
        try {
            String event = formatEvent(name, location);
            promise.resolve(event);
        } catch(Exception e) {
            promise.reject(e);
        }
    }

    @ReactMethod
    public void createCalendarEventWithListenerEvent(String name, String location) {
        try {
            String event = formatEvent(name, location);
            WritableMap params = Arguments.createMap();
            params.putString("event", event);
            sendEvent(this.getReactApplicationContext(), "onSuccessEventRegister", params);
        } catch(Exception e) {
            WritableMap params = Arguments.createMap();
            params.putString("error", e.getMessage());
            sendEvent(this.getReactApplicationContext(), "onErrorEventRegister", params);
        }
    }
}