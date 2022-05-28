import React from 'react'
import {signToken, isAuth} from "../../utils/auth";
require("dotenv").config();

describe("َAuth", () => {
    const user = {
        _id: "628bc068a292241a6526dbb5",
        name: "پریسا شهابی نژاد ادیت شده2",
        phoneNumber: "09367205062",
    }

    let req;
    let res;


    it("signToken should return a token",() => {
        expect(signToken(user)).toBeTruthy();
    });

    it("isAuth should decode token", async () => {
        const token = signToken(user);
        req = {
            headers: { authorization: `Bearer ${token}` },
            customer: jest.fn(),
        };

        res = {
            status: jest.fn(() => res),
            end: jest.fn(),
            next: jest.fn(),

        };
        const next = jest.fn();
        const response = await isAuth(req, res, next);
        expect(req.customer._id).toBe("628bc068a292241a6526dbb5");
    });

    it("Should return 401 if the token is invalid", async () => {
        const token = signToken(user);

        req = {
            headers: { authorization: `Bearer ${token}2` },
            customer: jest.fn(),
        };

        res = {
            status: jest.fn(() => res),
            end: jest.fn(),
            send: jest.fn(),
            next: jest.fn(),

        };
        const next = jest.fn();
        const response = await isAuth(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.send).toHaveBeenCalledTimes(1);
    });

    it("Should return 401 if the token is not supplied", async () => {

        req = {
            headers: { },
            customer: jest.fn(),
        };

        res = {
            status: jest.fn(() => res),
            end: jest.fn(),
            send: jest.fn(),
            next: jest.fn(),

        };
        const next = jest.fn();
        const response = await isAuth(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.send).toHaveBeenCalledTimes(1);
    });

});

