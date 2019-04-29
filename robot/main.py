#!/usr/bin/env python3
from ev3dev2.motor import OUTPUT_C, OUTPUT_B, OUTPUT_D, MoveSteering, MoveTank, MediumMotor, SpeedPercent
from ev3dev2.sensor.lego import ColorSensor

from movement import Movement
from arm import Arm
from constants import Direction

mv = Movement(MoveTank(OUTPUT_B, OUTPUT_C))

steering_drive = MoveSteering(OUTPUT_B, OUTPUT_C)
tank_drive = MoveTank(OUTPUT_B, OUTPUT_C)
arm = Arm(MediumMotor(OUTPUT_D))
speed = SpeedPercent(40)


def run():
    color_sensor = ColorSensor()
    color_sensor.mode = ColorSensor.MODE_COL_COLOR
    stop = False
    previous = Direction.FORWARD
    while not stop:
        print(color_sensor.color_name)
        if color_sensor.color == ColorSensor.COLOR_RED:
            mv.turn_right()
            previous = Direction.RIGHT
        elif color_sensor.color == ColorSensor.COLOR_GREEN:
            mv.turn_left()
            previous = Direction.LEFT
        elif color_sensor.color == ColorSensor.COLOR_BLACK:
            mv.forward()
            previous = Direction.FORWARD
        elif color_sensor.color == ColorSensor.COLOR_YELLOW:
            mv.stop()
            arm.lift()
            mv.forward()
        elif color_sensor.color == ColorSensor.COLOR_BLUE:
            mv.stop()
            arm.drop()
            mv.forward(time=3)
            mv.stop()
        else:
            if previous == Direction.LEFT:
                mv.turn_right()
            elif previous == Direction.RIGHT:
                mv.turn_left()


if __name__ == "__main__":
    try:
        run()

    except KeyboardInterrupt:
        arm.stop()
        mv.stop()
        print("\nShut down the robot\n")
