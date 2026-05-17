#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Voice interface — STT (speech-to-text) and TTS (text-to-speech) via Merlin AI."""

import json
import os
import urllib.request
import urllib.error
from koRT_claw.config import MERLIN_PROXY
from koRT_claw.integrations.merlin_ai import MerlinAI


class VoiceInterface:
    """Handles voice input (STT) and output (TTS) for KoRT Claw."""

    def __init__(self):
        self.merlin = MerlinAI()
        self.base_url = MERLIN_PROXY

    def listen(self, audio_path=None):
        """Transcribe audio file to text using Whisper STT."""
        if not audio_path:
            return "[No audio input — use CLI: claw voice listen <audio_file>]"
        try:
            with open(audio_path, "rb") as f:
                audio_data = f.read()
            req = urllib.request.Request(
                f"{self.base_url}/v1/audio/transcriptions",
                data=audio_data,
                headers={"Content-Type": "audio/wav"},
                method="POST",
            )
            with urllib.request.urlopen(req, timeout=60) as resp:
                result = json.loads(resp.read().decode("utf-8"))
            return result.get("text", "[No transcription]")
        except Exception as e:
            return f"[STT Error] {str(e)}"

    def speak(self, text, voice="alloy"):
        """Convert text to speech and play audio."""
        try:
            payload = json.dumps({"input": text, "voice": voice}).encode("utf-8")
            req = urllib.request.Request(
                f"{self.base_url}/v1/audio/speech",
                data=payload,
                headers={"Content-Type": "application/json"},
                method="POST",
            )
            with urllib.request.urlopen(req, timeout=60) as resp:
                audio_data = resp.read()
            output_path = os.path.join(os.getenv("TEMP", "/tmp"), "kort_tts_output.mp3")
            with open(output_path, "wb") as f:
                f.write(audio_data)
            self._play_audio(output_path)
            return output_path
        except Exception as e:
            return f"[TTS Error] {str(e)}"

    def converse_loop(self):
        """Interactive voice conversation loop."""
        print("=== KoRT Claw Voice Converse ===")
        print("Type your message (or 'quit' to exit). Merlin will respond via text + TTS.")
        print("For full voice: record audio and use 'claw voice listen <file>'")
        while True:
            try:
                user_input = input("\nYou: ").strip()
                if user_input.lower() in ("quit", "exit", "q"):
                    print("Merlin: Until next time, Knight.")
                    break
                if not user_input:
                    continue
                response = self.merlin.query(user_input)
                print(f"\nMerlin: {response}")
                self.speak(response)
            except KeyboardInterrupt:
                print("\nVoice session ended.")
                break

    def _play_audio(self, path):
        """Play audio file using OS-default player."""
        try:
            if os.name == "nt":
                os.startfile(path)
            else:
                os.system(f"afplay {path}" if os.uname().sysname == "Darwin" else f"mpv {path} --no-video 2>/dev/null || ffplay -nodisp -autoexit {path} 2>/dev/null")
        except Exception:
            pass
