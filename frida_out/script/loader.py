# original source: https://book.hacktricks.xyz/mobile-pentesting/android-app-pentesting/frida-tutorial/frida-tutorial-2
# Spawns the target app and injects the script

import frida
import time
from adbutils import adb

download_count = 0

def on_message(message, data):
    if(message['type'] == 'send'):
        print("[+] Received: ")
        print(message['payload'])
        download_file(message['payload'])

def download_file(file):
    global download_count
    device = adb.device()

    print("[+] Pulling file: " + file)
    device.sync.pull(file, "outputs/" + "dynamic_code_" + str(download_count) + ".dump")
    download_count = download_count + 1

device = frida.get_usb_device()
pid = device.spawn(["com.example.dynamiccodeloadingexample"])
device.resume(pid)
time.sleep(1) #Without it Java.perform silently fails
session = device.attach(pid)
script = session.create_script(open("s2.js").read())
script.on('message', on_message)
script.load()

#prevent the python script from terminating
input()