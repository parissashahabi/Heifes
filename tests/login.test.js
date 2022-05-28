import assert from "assert";
import { createServer } from "http";
import nc from 'next-connect';

import handler from "../pages/api/customers/login";

describe("POST: /api/customer/login", () => {
    it("Should returns an object with `isAdmin` property", () => {
        const req = {
            body: JSON.stringify({
                phoneNumber: "09367205062", password: "111111"
            })
        };
        const json = jest.fn();
        const status = jest.fn(() => {
            return {
                json
            }
        })
        const res = {
            status
        }

       handler(req, res);
        console.log(json.mock);
        console.log(json.mock.calls);
    });
    // let req;
    // let res;
    //
    // beforeEach(() => {
    //     req = {
    //         method: "POST",
    //         body: { phoneNumber: "abc@abc.com", password: "abc123" },
    //     };
    //
    //     res = {
    //         status: jest.fn(() => res),
    //         end: jest.fn(),
    //     };
    // });
    // it("Should returns an object with `isAdmin` property", async () => {
    //     const app = createServer(handler);
    //     return request(app)
    //         .post("/api/customer/login",{ phoneNumber: "09367205062", password: "111111" })
    //         .expect((response) => {
    //             expect(response.body).toBeInstanceOf(Object);
    //             expect(response.body).toHaveProperty("_id");
    //         });
    // });
    //
    // // it("The message should be equals to `hello jon-snow`", async () => {
    // //     await testClient(handler)
    // //         .get("/jon-snow")
    // //         .expect((response) => {
    // //             expect(response.body.message).toBe("hello jon-snow");
    // //         });
    // // });
});