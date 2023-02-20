# original source: https://book.hacktricks.xyz/mobile-pentesting/android-app-pentesting/frida-tutorial/frida-tutorial-2
# Waits for the process to start and then attaches to it

import frida
import time
from adbutils import adb
import os

# Global variables
package = "com.example.dynamiccodeloadingexample"

# Functions
def on_message(message, data):
    if(message['type'] == 'send'):
        print("[+] Received: ")
        print(message['payload'])
        download(message['payload'])

def download(item):
    device = adb.device()

    print("[+] Pulling " + item)
    file_name = os.path.basename(item)
    device.sync.pull(item, "outputs/" + file_name)

# Main
print("[+] Waiting for process to start...")
device = frida.get_usb_device()

while True:
    try:
        process = device.get_process(package)
        break
    except frida.ProcessNotFoundError:
        
        time.sleep(0.01)

# time.sleep(1) #Without it Java.perform silently fails
session = device.attach(process.pid)
script = session.create_script(open("script.js").read())
script.on('message', on_message)
script.load()

# prevent the python script from terminating
input()
