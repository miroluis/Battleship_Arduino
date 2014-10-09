#!/usr/bin/python

import sys
import smbus

bus = smbus.SMBus(1)
address = 0x03

led = int(sys.argv[1])
rgb = [int(i) for i in sys.argv[2:5]]
try:
	bus.write_block_data(address, led, rgb)
except IOError:
	print 'Controlador WS2812B desligado'

print 'led: ', led, 'rgb: ', rgb
