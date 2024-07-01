package com.base.app

import android.content.Context
import android.graphics.BitmapFactory
import android.print.PrintAttributes
import android.print.PrintManager
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
    fun print(filePath: String, fileType: String) {
        Log.d("PrintManagerModule", "Print method called with filePath: $filePath")

        // Kiểm tra nếu currentActivity không null
        val activity = currentActivity
        if (activity == null) {
            Log.e("PrintManagerModule", "Cannot get current activity")
            return
        }

        val file = File(filePath)
        if (file.exists()) {
            if(fileType == "pdf"){
                try {
                    val printManager = activity.getSystemService(Context.PRINT_SERVICE) as PrintManager
                    val printDocumentAdapter = PdfDocumentAdapter(activity, filePath)
                    printManager.print("Document", printDocumentAdapter, PrintAttributes.Builder().build())
                } catch (e: Exception) {
                    // Xử lý lỗi in (nếu cần)
                }
            }else {
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
            }

        } else {
            Log.e("PrintManagerModule", "File does not exist")
        }
    }

    @ReactMethod
    fun printPdf(filePath: String, fileType: String) {
        val activity = currentActivity
            ?: // Không thể in nếu không có activity
            return

        val file = File(filePath)
        if (!file.exists()) {
            // Không thể in nếu file không tồn tại
            return
        }

        try {
            val printManager = activity.getSystemService(Context.PRINT_SERVICE) as PrintManager
            val printDocumentAdapter = PdfDocumentAdapter(activity, filePath)
            printManager.print("Document", printDocumentAdapter, PrintAttributes.Builder().build())
        } catch (e: Exception) {
            // Xử lý lỗi in (nếu cần)
        }
    }
}
