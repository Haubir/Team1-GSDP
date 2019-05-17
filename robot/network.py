#!/usr/bin/env python3
import socketio

from config import config
from constants import OperationMode


sio = socketio.Client()
robot = None


@sio.on('connect')
def on_connect():
    print('I\'m connected to server')
    sio.emit('join', {'from': 'robot'})


@sio.on('message')
def on_message(data):
    print('I received a message!: {}'.format(data))


@sio.on('forward')
def forward(data):
    print('forward')
    robot.mode = OperationMode.REMOTE
    robot.forward()


@sio.on('backward')
def backward(data):
    print('backward')
    robot.mode = OperationMode.REMOTE
    robot.backward()


@sio.on('left')
def left(data):
    print('left')
    robot.mode = OperationMode.REMOTE
    robot.turn_left()


@sio.on('right')
def right(data):
    print('right')
    robot.mode = OperationMode.REMOTE
    robot.turn_right()


@sio.on('drop')
def drop(data):
    print('drop')
    robot.mode = OperationMode.REMOTE
    robot.drop()


@sio.on('lift')
def lift(data):
    print('lift')
    robot.mode = OperationMode.REMOTE
    robot.lift()


@sio.on('auto')
def auto_run(data):
    print('auto run')
    robot.mode = OperationMode.AUTO
    robot.run()


@sio.on('stop')
def stop(data):
    print('stop')
    robot.mode = OperationMode.REMOTE
    robot.stop()


def connect(robot_instance):
    try:
        global robot
        robot = robot_instance
        sio.connect(config.SERVER_URL)
        sio.wait()
    except KeyboardInterrupt:
        print("Disconnect to server")
        sio.disconnect()
        robot.stop()
    except Exception:
        print("Disconnect to server")
        sio.disconnect()
        robot.stop()
