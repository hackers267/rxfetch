import { Observable } from "rxjs";
import { RxFetch } from "../src";

jest.mock("rxjs/fetch", () => {
  return {
    fromFetch(url: string) {
      return new Observable((subscriber) => {
        subscriber.next(url);
      });
    },
  };
});

describe("RxFetch Get Method", function () {
  it("Get method", function () {
    const rxFetch = RxFetch.of();
    const fetch = rxFetch.get("/api/login", {
      params: {
        username: "username",
      },
    });
    fetch.subscribe((url) => {
      expect(url).toEqual("/api/login?username=username");
    });
  });
});
