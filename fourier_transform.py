import math

time_step = 1 / 100000



def fourier_weight(function, T, f):
    k = 0
    fourier_sum = 0
    while k < T:
        fourier_sum = fourier_sum + function[k]*math.sin((2*math.pi*f) * k * time_step)*time_step
        k = k + 1
    return fourier_sum

def fourier_transform(function, rate):
    fourier_func = []
    f = 100
    while f <= 10000:
        if f != 0:
            fourier_func.append(fourier_weight(function, rate, f))
        f = f + 10
    return fourier_func

def fourier_analysis(fourier_func):
    frequency = []
    j = 0
    for i in range(len(fourier_func)):
        if(fourier_func[i] >= 1):
            frequency.append(100 + 10*i)

    '''while j < len(fourier_func):
        if(fourier_func[j] != 0):
            while (fourier_func[j] != 0):
                temp_f = []
                temp = 0
                temp_f.append(j)
                temp = temp + j*10
                j = j + 1
            frequency.append(temp/len(temp_f))
            temp_f.clear()
        else:
            j = j + 1'''

    return frequency

def fourier_decomp(function, rate):
    return fourier_analysis(fourier_transform(function, rate))




