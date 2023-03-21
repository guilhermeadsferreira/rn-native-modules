// RCTCalendarModule.m
#import "RCTCalendarModule.h"
#import <React/RCTLog.h>

@implementation RCTCalendarModule
{
  bool hasListeners;
}

- (NSDictionary *)constantsToExport
{
 return @{ @"DEFAULT_EVENT_NAME": @"New Event" };
}

- (NSArray<NSString *> *)supportedEvents {
    return @[@"onSuccessEventRegister", @"onErrorEventRegister"];
}

+ (BOOL)requiresMainQueueSetup
{
    return YES;
}

RCT_EXPORT_METHOD(createCalendarEvent:(NSString *)title location:(NSString *)location)
{
 RCTLogInfo(@"Pretending to create an event %@ at %@", title, location);
}

RCT_EXPORT_METHOD(createCalendarEventWithCallback:(NSString *)title location:(NSString *)location callback: (RCTResponseSenderBlock)callback)
{
  @try {
    if ([title length] == 0) {
      @throw [NSException exceptionWithName:@"Without Title" reason:@"Título deve ser preenchido!" userInfo:nil];
    }
    
    if ([location length] == 0) {
      @throw [NSException exceptionWithName:@"Without Location" reason:@"Localização deve ser preenchida!" userInfo:nil];
    }
    
    NSString *myString;
    myString = [NSString stringWithFormat:@"Create event called with name:%@ and location: %@", title, location];
    callback(@[[NSNull null], myString]);
  }
  @catch ( NSException *e ) {
    callback(@[e.reason,[NSNull null]]);
  }
}

RCT_EXPORT_METHOD(createCalendarEventWithPromise:(NSString *)title
                 location:(NSString *)location
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
  @try {
    if ([title length] == 0) {
      @throw [NSException exceptionWithName:@"Without Title" reason:@"Título deve ser preenchido!" userInfo:nil];
    }
    
    if ([location length] == 0) {
      @throw [NSException exceptionWithName:@"Without Location" reason:@"Localização deve ser preenchida!" userInfo:nil];
    }
  
    NSString *myString;
    myString = [NSString stringWithFormat:@"Create event called with name:%@ and location: %@", title, location];

    resolve(myString);
  }
  @catch ( NSException *e ) {
    reject(@"event_failure", e.reason, nil);
  }
}

// Will be called when this module's first listener is added.
-(void)startObserving {
    hasListeners = YES;
    // Set up any upstream listeners or background tasks as necessary
}

// Will be called when this module's last listener is removed, or on dealloc.
-(void)stopObserving {
    hasListeners = NO;
    // Remove upstream listeners, stop unnecessary background tasks
}


RCT_EXPORT_METHOD(createCalendarEventWithListenerEvent:(NSString *)title location:(NSString *)location)
{
  @try {
    if ([title length] == 0) {
      @throw [NSException exceptionWithName:@"Without Title" reason:@"Título deve ser preenchido!" userInfo:nil];
    }
    
    if ([location length] == 0) {
      @throw [NSException exceptionWithName:@"Without Location" reason:@"Localização deve ser preenchida!" userInfo:nil];
    }
  
    NSString *myString;
    myString = [NSString stringWithFormat:@"Create event called with name:%@ and location: %@", title, location];

    if(hasListeners) {
      [self sendEventWithName:@"onSuccessEventRegister" body:@{@"event": myString}];
    }
  }
  @catch ( NSException *e ) {
    if(hasListeners) {
      [self sendEventWithName:@"onErrorEventRegister" body:@{@"error": e.reason}];
    }
  }
}

// To export a module named RCTCalendarModule
RCT_EXPORT_MODULE();

@end
