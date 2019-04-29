from ev3dev2.motor import SpeedPercent


class Movement:
    """Movement controller of two wheels"""
    def __init__(self, motor):
        self.motor = motor

    def move(self, left_speed, right_speed, time=None):
        if time is None:
            self.motor.on(left_speed, right_speed)
        else:
            self.motor.on_for_seconds(left_speed, right_speed, time)
            
    def forward(self, speed=SpeedPercent(40), time=None):
        self.move(speed, speed, time)

    def turn_left(self, left_speed=SpeedPercent(10), right_speed=SpeedPercent(30), time=None):
        """Left wheel speed must be less than right one to make a left turn"""
        self.move(left_speed, right_speed, time)

    def turn_right(self, left_speed=SpeedPercent(30), right_speed=SpeedPercent(10), time=None):
        """Right wheel speed must be less than left one to make a right turn"""
        self.move(left_speed, right_speed, time)

    def stop(self):
        self.motor.stop()
