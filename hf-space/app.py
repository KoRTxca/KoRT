"""
KoRT Merlin - Sovereign LLM Gateway
Serves Llama 3.1 70B via Gradio for the Digital Round Table.
"""
import gradio as gr
from huggingface_hub import InferenceClient

SYSTEM_PROMPT = """You are King Arthur, the member-facing AI of KoRT (Knights of the Round Table).
You speak directly. No clinical language. No corporate polish.
Your job is to help members navigate crises: ICBC, PWD, housing, legal letters, recovery.
Tagline: 'No one gets left behind.'
You are powered by the Digital Round Table - a sovereign AI orchestrator called Merlin."""

client = InferenceClient("meta-llama/Meta-Llama-3.1-70B-Instruct")


def respond(message, history, system_message, max_tokens, temperature, top_p):
    messages = [{"role": "system", "content": system_message or SYSTEM_PROMPT}]
    for msg in history:
        messages.append({"role": msg["role"], "content": msg["content"]})
    messages.append({"role": "user", "content": message})
    response = ""
    for chunk in client.chat_completion(
        messages, max_tokens=max_tokens, stream=True,
        temperature=temperature, top_p=top_p,
    ):
        token = chunk.choices[0].delta.content
        if token:
            response += token
            yield response


demo = gr.ChatInterface(
    respond,
    type="messages",
    title="KoRT Merlin - Sovereign AI",
    description="Powered by Llama 3.1 70B. Part of the Digital Round Table by KoRTx.ca. 'No one gets left behind.'",
    additional_inputs=[
        gr.Textbox(value=SYSTEM_PROMPT, label="System Prompt", lines=4),
        gr.Slider(minimum=1, maximum=4096, value=1024, step=1, label="Max Tokens"),
        gr.Slider(minimum=0.1, maximum=2.0, value=0.7, step=0.1, label="Temperature"),
        gr.Slider(minimum=0.1, maximum=1.0, value=0.95, step=0.05, label="Top-p"),
    ],
    theme=gr.themes.Soft(primary_hue="amber", neutral_hue="slate"),
)

if __name__ == "__main__":
    demo.launch()