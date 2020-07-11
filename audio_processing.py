import fourier_transform as ft
import scipy.io.wavfile as wav
import sys
import math

func = []
j = 0
rate, data = wav.read(sys.argv[1])

for i in range(math.ceil(rate/3.7)):
    func.append(data[i])

print(ft.fourier_decomp(func, len(func)))


