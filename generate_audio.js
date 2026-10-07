import fs from 'fs';

// Generates a soothing, dreamy 16-second loopable WAV file (saved as music.mp3)
function createAmbientPadWav(filepath) {
  const sampleRate = 44100;
  const duration = 16; // 16 seconds loop
  const numSamples = sampleRate * duration;
  const numChannels = 2; // Stereo
  const bytesPerSample = 2; // 16-bit PCM
  const blockAlign = numChannels * bytesPerSample;
  const byteRate = sampleRate * blockAlign;
  const dataSize = numSamples * blockAlign;

  const buffer = Buffer.alloc(44 + dataSize);

  // RIFF header
  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write('WAVE', 8);

  // fmt chunk
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16); // Subchunk1Size
  buffer.writeUInt16LE(1, 20); // AudioFormat (1 = PCM)
  buffer.writeUInt16LE(numChannels, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(byteRate, 28);
  buffer.writeUInt16LE(blockAlign, 32);
  buffer.writeUInt16LE(bytesPerSample * 8, 34);

  // data chunk
  buffer.write('data', 36);
  buffer.writeUInt32LE(dataSize, 40);

  // Frequencies for a dreamy Cmaj9 pad: C3, G3, B3, E4, D5
  const chord = [130.81, 196.00, 246.94, 329.63, 587.33];
  const chord2 = [174.61, 220.00, 261.63, 349.23, 523.25]; // Fmaj7

  let offset = 44;
  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    
    // Crossfade between chord 1 and chord 2
    const blend = (Math.sin(2 * Math.PI * t / duration) + 1) / 2;

    let sampleL = 0;
    let sampleR = 0;

    // Chord 1 synthesis
    chord.forEach((freq, idx) => {
      const lfo = 1 + 0.003 * Math.sin(2 * Math.PI * 0.5 * t + idx);
      const wave = Math.sin(2 * Math.PI * freq * lfo * t);
      const subHarmonic = Math.sin(2 * Math.PI * (freq * 0.5) * t) * 0.3;
      sampleL += (wave + subHarmonic) * (1 - blend) * 0.15 * Math.sin(Math.PI * idx / 5);
      sampleR += (wave + subHarmonic) * (1 - blend) * 0.15 * Math.cos(Math.PI * idx / 5);
    });

    // Chord 2 synthesis
    chord2.forEach((freq, idx) => {
      const lfo = 1 + 0.003 * Math.cos(2 * Math.PI * 0.4 * t + idx);
      const wave = Math.sin(2 * Math.PI * freq * lfo * t);
      const subHarmonic = Math.sin(2 * Math.PI * (freq * 0.5) * t) * 0.3;
      sampleL += (wave + subHarmonic) * blend * 0.15 * Math.cos(Math.PI * idx / 5);
      sampleR += (wave + subHarmonic) * blend * 0.15 * Math.sin(Math.PI * idx / 5);
    });

    // Soft envelope to smooth loop boundary
    const fadeInOut = Math.sin(Math.PI * t / duration);
    sampleL *= Math.pow(fadeInOut, 0.2);
    sampleR *= Math.pow(fadeInOut, 0.2);

    // Master volume scaling & soft clipping
    sampleL = Math.max(-0.9, Math.min(0.9, sampleL));
    sampleR = Math.max(-0.9, Math.min(0.9, sampleR));

    const intL = Math.floor(sampleL * 32767);
    const intR = Math.floor(sampleR * 32767);

    buffer.writeInt16LE(intL, offset);
    buffer.writeInt16LE(intR, offset + 2);
    offset += 4;
  }

  fs.writeFileSync(filepath, buffer);
  console.log(`Generated audio pad at ${filepath}`);
}

createAmbientPadWav('public/assets/music.mp3');
