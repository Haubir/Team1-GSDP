#!/usr/bin/env python3
import socketio
from robot import Robot

# standard Python
sio = socketio.Client()

robot = Robot()


@sio.on('connect')
def on_connect():
    print('I\'m connected!')


@sio.on('message')
def on_message(data):
    print('I received a message!')


@sio.on('forward')
def forward(data):
    print('forward')
    robot.forward()

@sio.on('backward')
def backward(data):
    print('backward')
    robot.backward()


@sio.on('left')
def left(data):
    print('left')
    robot.turn_left()


@sio.on('right')
def right(data):
    print('right')
    robot.turn_right()


@sio.on('drop')
def drop(data):
    print('drop')
    robot.drop()


@sio.on('lift')
def lift(data):
    print('lift')
    robot.lift()


@sio.on('stop')
def test(data):
    print('stop')
    robot.stop()


try:
    sio.connect('https://server-robot.herokuapp.com')
    sio.wait()
except KeyboardInterrupt:
    print("Disconnect to server")
    sio.disconnect()
    robot.stop()
except Exception:
    print("Disconnect to server")
    sio.disconnect()
    robot.stop()
