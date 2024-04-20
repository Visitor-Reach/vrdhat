import multiprocessing
import time

# Worker function for the process
def worker():
    print("Worker process started")
    time.sleep(3)  # Simulating a time-consuming task
    print("Worker process completed")

# Create and start a new process
process = multiprocessing.Process(target=worker)
process.start()

# Continue with other tasks in the main process
print("Main process continues")