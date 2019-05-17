#!/usr/bin/env python3
import network
from robot import Robot


if __name__ == "__main__":
    try:
        robot = Robot()
        network.connect(robot)
    except KeyboardInterrupt:
        print("\nShut down the robot\n")
        robot.stop()
    except Exception as ex:
        print("\nShut down the robot\n")
        print(ex)
        robot.stop()
