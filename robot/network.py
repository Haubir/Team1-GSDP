#!/usr/bin/env python3
import socketio

from config import config
from robot import Robot
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


@sio.on('auto')
def auto_run(data):
    print('auto run')
    robot.mode = OperationMode.AUTONOMOUS
    robot.run()


@sio.on('stop')
def stop(data):
    print('stop')
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
    except Exception:
        print("Disconnect to server")
        sio.disconnect()
