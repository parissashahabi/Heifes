import React from "react";
import Landing from "../page-components/landing";
import { render } from "@testing-library/react";
import { useRouter } from "next/router";

jest.mock("next/router");

describe("Landing", () => {
    it("Landing Page matches snapshot", () => {
        useRouter.mockReturnValue({
            push: () => {},
        });
        const component = render(
            <Landing/>
        );
        expect(component.container).toMatchSnapshot();
    });
});



