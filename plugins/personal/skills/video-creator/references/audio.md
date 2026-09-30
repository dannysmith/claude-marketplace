# Audio Reference

You can't hear anything you make or find. Tell Danny that, check everything numerically and visually, and give him a choice where taste matters.

## Found music and sound effects

Check the licence on each item's own page before using it, and record the source URL and licence of every file in `LICENSES.txt` next to the output.

| Source | Licence | Attribution | Downloads with curl? | Good for |
| --- | --- | --- | --- | --- |
| [Mixkit](https://mixkit.co/free-stock-music/) | Mixkit free licence (commercial use in videos) | No | Yes: pages link `assets.mixkit.co/...mp3` directly | Polished music beds and SFX |
| [Incompetech](https://incompetech.com/music/) | CC BY 4.0 | Yes | Yes | Huge catalogue, a bit dated |
| [Kenney](https://kenney.nl/assets/category:Audio) | CC0 | No | Yes: direct `.zip` per pack | UI clicks, pops, impacts, jingles |
| [Freesound](https://freesound.org) | Varies. Filter to CC0 | If not CC0 | Needs a free API key; HQ MP3 previews are fine for SFX | The widest SFX variety |
| [ccMixter](https://ccmixter.org) | Varies per track | Yes | Yes, via its JSON API (filter `lic=by`) | Uneven. Many tracks are non-commercial |

Avoid:

- **Pixabay**: blocks scripted downloads, and some tracks are registered with YouTube Content ID, so uploads get claimed.
- **BBC Sound Effects**: non-commercial only.
- **YouTube Audio Library**: needs a login.

When music matters, shortlist 2–3 tracks with their length, BPM and a line on the feel, and let Danny pick.

## Fitting a track to the video

For beat analysis, a small librosa script run through uv (`uv run --with librosa python analyse.py track.mp3`) works well. Have it print BPM, beat times, downbeats (every 4th beat from the first strong one) and loudness per second.

- **Move the cuts, not the music.** You control the timeline, so it's usually easier to put scene changes on downbeats than to bend the track.
- **Trim on bar boundaries**, then fade: `afade=t=in:d=0.3,afade=t=out:st=<end-2>:d=2`. Ending on a bar and fading sounds deliberate; stopping mid-phrase doesn't.
- **Extend** with `aloop` and an `acrossfade` at a bar boundary. Only stretch tempo slightly (`atempo` within about ±5%).
- **Shift** a track so a downbeat lands on a cut with `adelay` or `atrim=start=`.
- **Duck** music under sound effects or voice: `[music][sfx]sidechaincompress=threshold=0.05:ratio=8:attack=5:release=250`.
- **Master** for web with `loudnorm=I=-16:TP=-1.5:LRA=11`.

## Synthesised audio

Best when sound should follow on-screen events precisely: key clicks from typing times, pops when things land, a hit on the reveal. Export event times from the page (e.g. `window.__keyTimes`) so the audio can't drift out of sync.

Bare oscillators and home-made reverb sound cheap. To do better:

- Render offline in the same headless Chromium with the Web Audio API (`OfflineAudioContext`, or Tone.js `Tone.Offline`), using **sampled instruments** instead of sine waves: [smplr](https://github.com/danigb/smplr) (piano, electric piano, drum machines, mallets) or Tone.js `Sampler` with the Salamander piano.
- Write actual music: a chord progression with smooth voice leading, a bass line on the roots, a simple beat. Humanise velocity (±10%) and timing (a few ms).
- Pick a tempo that puts bars on scene changes: BPM = 60 × beats ÷ scene length in seconds.
- Use convolution reverb with a real impulse response (`ConvolverNode`, or ffmpeg `afir`).

## Sound effects

Subtle and synced. One sound per meaningful event, not one per motion. Keep them quieter than you think, and duck the music under them.

## Checking what you can't hear

- Loudness and clipping: `ffmpeg -i mix.wav -af ebur128 -f null -` and `-af astats`.
- Gaps: `-af silencedetect=noise=-50dB:d=0.5`.
- Pictures you can read: `-filter_complex showwavespic=s=1600x300` for a waveform, `showspectrumpic=s=1600x400:legend=1` for a spectrogram. Mark the scene-cut times on the waveform image to see whether hits line up with cuts.

## Generated music

Worth knowing about, but unheard and unproven, so never the default:

- **ACE-Step 1.5**: MIT licence, runs locally on a Mac, can make instrumental tracks.
- **ElevenLabs Music / SFX**: needs an API key and a paid plan for commercial rights.
- **MusicGen**: weights are non-commercial. Don't use.
