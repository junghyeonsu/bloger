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

  async summarizeNews({ content, summary }: { content: string; summary?: string }): Promise<string> {
    let request = "";

    if (summary) {
      request = dedent(`
        뉴스를 약 150자로 한글로 요약해주세요.
        요약은 해당 뉴스의 핵심으로, 뉴스 요약할 때 참고하시면 좋습니다.
        뉴스: ${content}
        요약: ${summary}
      `);
    }

    request = dedent(`
      뉴스를 약 150자로 한글로 요약해주세요.
      뉴스: ${content}
    `);

    const res = await this._api.sendMessage(request);

    return res.text;
  }
}

export { SummarizeClient };
