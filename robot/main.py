#!/usr/bin/env python3
import network
from robot import Robot


if __name__ == "__main__":
    try:
        robot = Robot()
        network.connect(robot)
    except KeyboardInterrupt:
        robot.stop()
        print("\nShut down the robot\n")
    except Exception as ex:
        print(ex)
        robot.stop()
