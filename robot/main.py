#!/usr/bin/env python3
from ev3dev2.motor import OUTPUT_C, OUTPUT_B, OUTPUT_D, MoveSteering, MoveTank, MediumMotor, SpeedPercent, LargeMotor
from ev3dev2.sensor.lego import ColorSensor

from movement import Movement
from arm import Arm
from constants import Direction

mv = Movement(LargeMotor(OUTPUT_B), LargeMotor(OUTPUT_C))

arm = Arm(MediumMotor(OUTPUT_D))
speed = SpeedPercent(40)


def run():
    color_sensor = ColorSensor()
    color_sensor.mode = ColorSensor.MODE_COL_COLOR
    stop = False
    previous = Direction.FORWARD
    while not stop:
        print(color_sensor.color_name, previous)
        if color_sensor.color == ColorSensor.COLOR_RED:
            print("Turn right")
            mv.turn_right()
            previous = Direction.RIGHT
        elif color_sensor.color == ColorSensor.COLOR_GREEN:
            print("Turn left")
            mv.turn_left()
            previous = Direction.LEFT
        elif color_sensor.color in (ColorSensor.COLOR_BLACK, ColorSensor.COLOR_NOCOLOR):
            print("Forward")
            mv.forward()
            previous = Direction.FORWARD
        elif color_sensor.color == ColorSensor.COLOR_YELLOW:
            mv.stop()
            # arm.lift()
            mv.forward()
        elif color_sensor.color == ColorSensor.COLOR_BLUE:
            mv.stop()
            # arm.drop()
            mv.forward(time=3)
            mv.stop()
        else:
            if previous == Direction.LEFT:
                while color_sensor.color != ColorSensor.COLOR_BLACK:
                    mv.turn_right()
                mv.stop()
                mv.turn_left(SpeedPercent(0), SpeedPercent(50))
                mv.forward()
            elif previous == Direction.RIGHT:
                while color_sensor.color != ColorSensor.COLOR_BLACK:
                    mv.turn_left()
                mv.stop()
                mv.turn_right(SpeedPercent(50), SpeedPercent(0))
                mv.forward()

def run_pid():
    cs = ColorSensor()
    Kp = 40   # proportional gain
    Ki = 0   # integral gain
    Kd = 1    # derivative gain
    
    integral = 0
    previous_error = 0
    derivative = 0
    base_speed = 150
    max_speed = 900
    # initial measurment
    target_value = 130
    while True:
        red = cs.rgb[0]
        print("Red = {}".format(red))
        error = red - target_value
        integral += error
        derivative = error - previous_error

        turn = (Kp * error) + (Ki * integral) + (Kd * derivative)
        turn = turn / 100
        correction = int(turn)
        lspeed = min(max_speed, base_speed + correction)
        rspeed = min(max_speed, base_speed - correction)
        mv.move(lspeed, rspeed)
        previous_error = error


if __name__ == "__main__":
    try:
        run_pid()
    except KeyboardInterrupt:
        arm.stop()
        mv.stop()
        print("\nShut down the robot\n")
    except Exception:
        arm.stop()
        mv.stop()
