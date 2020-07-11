# fourier_decomp
a fourier transform for almost non static signal

A prototype fourier transform library built from scratch. Before using please read the footnotes mentioned below.

footnotes:
-> The amount of computing time is ridiculously high
-> The fourier analysis works best for static signals but might not give reliable results for a non static signal at low sampling rate
-> You can tweak the sampling time or analysis coefficients to get a better result but there is a inverse correlation between sampling time and frequency resolution

Possible improvements:
-> Computation time
-> Analysis

How to use:
-> The fourier_transform file is a library which consists of fourier transform and analysis
-> The audio_processing file is the main file which can be run in terminal along with a single argument which is the file you want to analyze

This project is originally meant to be a fourier compression filter however that can only happen ater maxing out all the performances in the fourier transform and smapling algorithm
