import { ChatGPTAPI } from "chatgpt";

import dedent from "dedent";

class SummarizeClient {
  private _api: ChatGPTAPI;
  private _apiKey: string;

  /**
   * Creates a new client wrapper around OpenAI's chat completion API, mimicing the official ChatGPT webapp's functionality as closely as possible.
   *
   * @param apiKey - OpenAI API key (required).
   */
  constructor(options: { apiKey: string }) {
    this._api = new ChatGPTAPI(options);
    this._apiKey = options.apiKey;

    if (!this._apiKey) {
      throw new Error("[Summarizer] apiKey is not defined");
    }
  }

  async summarizeNews({ content }: { content: string }): Promise<string> {
    let request = "";

    request = dedent(`
      뉴스를 약 150자로 한글로 요약해주세요.
      뉴스: ${content}
    `);

    const res = await this._api.sendMessage(request);

    return res.text;
  }
}

export { SummarizeClient };
