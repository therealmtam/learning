import time

import redis
from flask import Flask

app = Flask(__name__)

"""
Chatgpt explanation of `cache = redis.Redis(host='redis', port=6379)`
-----------------
import redis: This imports the Redis-py library, which provides a Python interface to interact with Redis.

cache = redis.Redis(host='redis', port=6379): This line creates a Redis client object named cache.

host='redis' specifies the hostname or IP address of the Redis server. In this case, it is set to 'redis', which is a common convention for referring to the Redis server running in a Docker container or a local machine.

port=6379 specifies the port number on which Redis is running. The default port for Redis is 6379, so this code connects to Redis on that port.

By executing this code, you establish a connection to the Redis server and create a Redis client object named cache. This client object can be used to interact with Redis and perform operations such as setting and getting values, publishing and subscribing to channels, and executing various Redis commands.
"""
cache = redis.Redis(host='redis', port=6379)

def get_hit_count():
    retries = 5
    while True:
        try:
            return cache.incr('hits')
        except redis.exceptions.ConnectionError as exc:
            if retries == 0:
                raise exc
            retries -= 1
            time.sleep(0.5)

@app.route('/')
def hello():
    count = get_hit_count()
    return 'Hello World! I have been seen {} times.\n'.format(count)