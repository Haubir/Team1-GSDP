#!/usr/bin/env python3
from ev3dev2.motor import OUTPUT_C, OUTPUT_B, OUTPUT_D
from ev3dev2.sensor.lego import ColorSensor, GyroSensor

from movement import Movement
from arm import Arm
from constants import OperationMode


class Robot:
    def __init__(self, mode=OperationMode.AUTONOMOUS):
        self.mode = mode
        self.mv = Movement(LargeMotor(OUTPUT_B), LargeMotor(OUTPUT_C))
        self.arm = Arm(MediumMotor(OUTPUT_D))
        self.speed = 150
        self.cs = ColorSensor()
        self.gs = GyroSensor()
        self.gs.mode = GyroSensor.MODE_GYRO_ANG

    def run(self):
        """Run robot based on PID control"""
        Kp = 40     # Proportional gain
        Ki = 0      # Integral gain
        Kd = 1      # Derivative gain
        
        integral = 0
        previous_error = 0
        derivative = 0
        base_speed = self.speed
        max_speed = 900
        target_value = 130
        while True:
            angle = self.gs.angle
            red = self.cs.rgb[0]
            green = self.cs.rgb[1]
            blue = self.cs.rgb[2]
            # print(cs.rgb)
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
            # In autonomous mode, different colors should be placed on robot path
            if self.mode == OperationMode.AUTONOMOUS:
                # Turn left if color sensor is green
                if (green > 230) and (red < 100) and (blue < 100):
                    self.turn_left(angle)
                # Turn right if color sensor is red
                if (red > 230) and (green < 100) and (blue < 100):
                    self.turn_right(angle)

    def turn_left(self, previous_angle=None):
        """Tun 90 degrees to the left"""
        if not previous_angle:
            previous_angle = self.gs.angle

        self.mv.turn_left(right_speed=120)
        while True:
            diff = abs(self.gs.angle - previous_angle) % 360
            if 80 < diff < 100:
                break

    def turn_right(self, previous_angle=None):
        """Turn 90 degrees to the right"""
        if not previous_angle:
            previous_angle = self.gs.angle

        self.mv.turn_right(left_speed=120)
        while True:
            diff = abs(self.gs.angle - previous_angle) % 360
            if 80 < diff < 100:
                break
