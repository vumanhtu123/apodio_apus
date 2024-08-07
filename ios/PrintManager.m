#import "PrintManager.h"
#import <React/RCTLog.h>
#import <UIKit/UIKit.h>

@implementation PrintManager

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(print:(NSString *)filePath fileType:(NSString *)fileType resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  NSURL *fileURL = [NSURL fileURLWithPath:filePath];
  if (!fileURL) {
    reject(@"Error", @"Invalid file path", nil);
    return;
  }

  UIPrintInteractionController *printController = [UIPrintInteractionController sharedPrintController];
  UIPrintInfo *printInfo = [UIPrintInfo printInfo];
  printInfo.outputType = [fileType isEqualToString:@"pdf"] ? UIPrintInfoOutputGeneral : UIPrintInfoOutputPhoto;
  printController.printInfo = printInfo;

  if ([fileType isEqualToString:@"pdf"]) {
    printController.printingItem = fileURL;
  } else {
    NSData *imageData = [NSData dataWithContentsOfFile:filePath];
    UIImage *image = [UIImage imageWithData:imageData];
    if (!image) {
      reject(@"Error", @"Could not load image", nil);
      return;
    }
    printController.printingItem = image;
  }

  dispatch_async(dispatch_get_main_queue(), ^{
    [printController presentAnimated:YES completionHandler:^(UIPrintInteractionController *printInteractionController, BOOL completed, NSError *error) {
      if (completed) {
        resolve(@"Print job started");
      } else {
        reject(@"Error", error.localizedDescription, error);
      }
    }];
  });
}

@end
