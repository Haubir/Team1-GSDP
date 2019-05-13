#!/usr/bin/env python3
from time import sleep

from robot import Robot
                

if __name__ == "__main__":
    try:
        robot = Robot()
        robot.run()
    except KeyboardInterrupt:
        robot.stop()
        print("\nShut down the robot\n")
    except Exception as ex:
        print(ex)
        robot.stop()
