import os


class ProductionConfig:
    SERVER_URL = 'https://server-robot.herokuapp.com'


class DevelopmentConfig:
    SERVER_URL = 'http://192.168.100.7:5000'


configs = {
    'production': ProductionConfig,
    'development': DevelopmentConfig
}

config = configs.get(os.getenv('ENV', 'production'))()
