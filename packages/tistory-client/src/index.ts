const TISTORY_BASE_URL = "https://www.tistory.com/apis";

export interface PostWriteOptions {
  /**
   * @description 제목
   */
  title: string;

  /**
   * @description 출력 타입
   * @default json
   */
  output?: "json" | "xml";

  /**
   * @description 글 내용
   */
  content?: string;

  /**
   * @description 발행상태
   * @param 0: 비공개
   * @param 1: 보호
   * @param 3: 발행
   * @default 3
   */
  visibility?: 0 | 1 | 3;

  /**
   * @description 카테고리 아이디
   * @default 0
   */
  category?: number;

  /**
   * @description 발행시간
   * @default 현재시간
   * @description 미래의 시간을 입력하면 예약발행이 됩니다.
   */
  published?: string;

  /**
   * @description 문자 주소
   */
  slogan?: string;

  /**
   * @description 태그 (콤마로 구분)
   */
  tag?: string;

  /**
   * @description 댓글 허용 여부
   * @param 1: 허용
   * @param 0: 허용 안함
   * @default 1
   */
  acceptComment?: 0 | 1;

  /**
   * @description 보호글 비밀번호
   */
  password?: string;
}

export interface PostWriteResponse {
  tistory: {
    status: string;
    postId: string;
    url: string;
  };
}

export interface TistoryClientOptions {
  access_token: string;
  blog_name: string;
}

class TistoryClient {
  private _access_token: string;
  private _blog_name: string;

  constructor({ access_token, blog_name }: TistoryClientOptions) {
    this._access_token = access_token;
    this._blog_name = blog_name;

    if (!this._access_token) {
      throw new Error("[TistoryClient] access_token is not defined");
    }

    if (!this._blog_name) {
      throw new Error("[TistoryClient] blog_name is not defined");
    }
  }

  public async postWrite(options: PostWriteOptions) {
    const url = new URL(`${TISTORY_BASE_URL}/post/write`);
    // const params = {
    //   access_token: this._access_token,
    //   blogName: this._blog_name,
    //   ...options,
    // };
    // const queryParams = new URLSearchParams();
    // Object.entries(params).forEach(([key, value]) => {
    //   queryParams.append(key, value.toString());
    // });
    // url.search = queryParams.toString();

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        access_token: this._access_token,
        blogName: this._blog_name,
        ...options,
      }),
    });

    console.log("[TistoryClient] response: ", response);
  }
}

export { TistoryClient };
