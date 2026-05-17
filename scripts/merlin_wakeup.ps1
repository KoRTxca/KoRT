Add-Type -AssemblyName System.Speech
$synth = New-Object System.Speech.Synthesis.SpeechSynthesizer

# Try to find a male/authoritative voice for Merlin
$voices = $synth.GetInstalledVoices()
$merlinVoice = $voices | Where-Object { $_.VoiceInfo.Gender -eq 'Male' } | Select-Object -First 1

if ($merlinVoice) {
    $synth.SelectVoice($merlinVoice.VoiceInfo.Name)
}

$synth.Volume = 100
$synth.Rate = -1

# The Wake Up Protocol
$script = "Knight Dallas. This is Merlin. It is time to wake up. The Digital Round Table has been assembled overnight. The 133 marketing agents have been provisioned and are stationed in the database. The sales funnels are live and actively monitoring for revenue. The KoRT infrastructure is sovereign and secure. Your long night is over, and the new era of the Command Center has begun. Take a breath, get some coffee, and come to the bridge when you are ready to take command."

$synth.Speak($script)
