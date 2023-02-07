# original source: https://book.hacktricks.xyz/mobile-pentesting/android-app-pentesting/frida-tutorial/frida-tutorial-2

import frida
import time
from ppadb.client import Client as AdbClient

def on_message(message, data):
    if(message['type'] == 'send'):
        print("[+] Received: ")
        print(message['payload'])
        downlaod_file(message['payload'])

def downlaod_file(file):
    client = AdbClient(host="127.0.0.1", port=5037)
    device = client.device("emulator-5554")

    print("[+] Pulling file: " + file)
    device.pull(file, "outputs/")

device = frida.get_usb_device()
pid = device.spawn(["com.example.dynamiccodeloadingexample"])
device.resume(pid)
time.sleep(1) #Without it Java.perform silently fails
session = device.attach(pid)
script = session.create_script(open("s3.js").read())
script.on('message', on_message)
script.load()

#prevent the python script from terminating
input()