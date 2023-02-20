from ppadb.client import Client as AdbClient
client = AdbClient(host="127.0.0.1", port=5037)
device = client.device("emulator-5554")

dir = "/data/user/0/com.example.dynamiccodeloadingexample/dumps/."
device.pull(dir, "./outputs/", recurse=True)
