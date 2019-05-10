from ev3dev2.motor import SpeedPercent


class Arm:
    def __init__(self, arm_motor):
        self.arm = arm_motor

    def move(self, speed, deg):
        self.arm.on_for_degrees(speed, deg)

    def lift(self, speed=SpeedPercent(7), deg=60):
        self.move(speed, deg)

    def drop(self, speed=SpeedPercent(7), deg=-60):
        self.move(speed, deg)

    def stop(self):
        self.arm.stop()
