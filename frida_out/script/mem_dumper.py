# original source: https://book.hacktricks.xyz/mobile-pentesting/android-app-pentesting/frida-tutorial/frida-tutorial-2
# Spawns the target app and injects the script

import frida
import time
from adbutils import adb

device = frida.get_usb_device()
pid = device.spawn(["com.example.dynamiccodeloadingexample"])
device.resume(pid)
time.sleep(1) #Without it Java.perform silently fails
session = device.attach(pid)
script = session.create_script(open("script.js").read())
script.load()

#prevent the python script from terminating
input()