from ev3dev2.motor import SpeedPercent


class Movement:
    """Movement controller of two wheels"""
    def __init__(self, lmotor, rmotor):
        self.lmotor = lmotor
        self.rmotor = rmotor

    def move(self, left_speed, right_speed, time=None):
        if time is None:
            self.lmotor.run_forever(speed_sp=left_speed)
            self.rmotor.run_forever(speed_sp=right_speed)
        else:
            mili_secs = 1000 * time
            self.lmotor.run_timed(speed_sp=left_speed, time_sp=mili_secs)
            self.rmotor.run_timed(speed_sp=right_speed, time_sp=mili_secs)
            
    def forward(self, speed=100, time=None):
        self.move(speed, speed, time)

    def turn_left(self, left_speed=0, right_speed=300, time=None):
        """Left wheel speed must be less than right one to make a left turn"""
        self.move(left_speed, right_speed, time)

    def turn_right(self, left_speed=300, right_speed=0, time=None):
        """Right wheel speed must be less than left one to make a right turn"""
        self.move(left_speed, right_speed, time)

    def stop(self):
        self.lmotor.stop()
        self.rmotor.stop()
