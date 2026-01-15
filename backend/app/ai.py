import os
import torch
from transformers import AutoTokenizer, AutoModelForCausalLM

MODEL_ID = os.getenv("MODEL_ID", "Qwen/Qwen2.5-0.5B-Instruct")

DEFAULT_MAX_NEW_TOKENS = 220


class Summarizer:
    def __init__(self) -> None:
        self.tokenizer = AutoTokenizer.from_pretrained(MODEL_ID, use_fast=True)
        self.model = AutoModelForCausalLM.from_pretrained(
            MODEL_ID,
            torch_dtype=torch.float32,
            device_map="cpu",
        )
        self.model.eval()

    @torch.inference_mode()
    def summarize(self, text: str) -> str:
        prompt = (
            "You are a helpful assistant. Summarize the text in a clear, concise way.\n\n"
            "Requirements:\n"
            "- 5-10 bullet points\n"
            "- Include key entities, dates, and decisions if present\n"
            "- If the text is very short, produce a 2-3 sentence summary instead\n\n"
            f"TEXT:\n{text}\n\nSUMMARY:\n"
        )

        inputs = self.tokenizer(prompt, return_tensors="pt", truncation=True, max_length=4096)
        output_ids = self.model.generate(
            **inputs,
            max_new_tokens=DEFAULT_MAX_NEW_TOKENS,
            do_sample=False,
            temperature=0.0,
            repetition_penalty=1.05,
            eos_token_id=self.tokenizer.eos_token_id,
        )
        out = self.tokenizer.decode(output_ids[0], skip_special_tokens=True)

        marker = "SUMMARY:"
        if marker in out:
            out = out.split(marker, 1)[-1].strip()
        return out.strip()
