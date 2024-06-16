package com.base.app

import android.graphics.BitmapFactory
import androidx.print.PrintHelper
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.UiThreadUtil
import java.io.File
import android.util.Log

class PrintManagerModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "PrintManager"
    }

    @ReactMethod
    fun print(filePath: String) {
        Log.d("PrintManagerModule", "Print method called with filePath: $filePath")

        // Kiểm tra nếu currentActivity không null
        val activity = currentActivity
        if (activity == null) {
            Log.e("PrintManagerModule", "Cannot get current activity")
            return
        }

        val file = File(filePath)
        if (file.exists()) {
            val bitmap = BitmapFactory.decodeFile(file.absolutePath)
            if (bitmap != null) {
                UiThreadUtil.runOnUiThread {
                    val printHelper = PrintHelper(activity)
                    printHelper.scaleMode = PrintHelper.SCALE_MODE_FIT
                    printHelper.printBitmap("Print Document", bitmap)
                    Log.d("PrintManagerModule", "Print job started")
                }
            } else {
                Log.e("PrintManagerModule", "Failed to decode bitmap")
            }
        } else {
            Log.e("PrintManagerModule", "File does not exist")
        }
    }
}
