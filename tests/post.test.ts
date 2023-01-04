import { Observable } from "rxjs";
import { RxFetch } from "../src";

jest.mock("rxjs/fetch", () => {
  return {
    fromFetch: (url: string, config: any) => {
      return new Observable((subscriber) => {
        subscriber.next({ url, config });
      });
    },
  };
});

describe("RxFetch Post method", () => {
  it("Post Json Data", function (done) {
    const rxFetch = RxFetch.of();
    const apiUrl = "/api/login";
    const postData = {
      username: "username",
      password: "password",
    };
    const fetch = rxFetch.post(apiUrl, {
      data: postData,
    });
    fetch.subscribe({
      next(v: any) {
        const { url, config } = v;
        expect(url).toBe(apiUrl);
        expect(config.method).toBe("POST");
        expect(config.body).toBe(JSON.stringify(postData));
        done();
      },
    });
  });
});
