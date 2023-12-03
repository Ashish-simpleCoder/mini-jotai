import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { atom, useAtom, useAtomDispatch, useAtomValue } from "../../src";


describe("use-atom", () => {
    it("should get the updated state after dispatch", () => {
        const UserAtom = atom({ name: "ashish", isCoder: true })

        const { rerender, result } = renderHook(() => useAtom(UserAtom))


        expect(result.current[0]).toEqual({ name: "ashish", isCoder: true })


        // dispatch update and rerender
        act(() => {
            result.current[1]({ name: "dan", isCoder: true })
        })
        rerender()


        expect(result.current[0]).toEqual({ name: "dan", isCoder: true })
    })
})

describe("use-atom-value & use-atom-dispatch", () => {
    it("should get the state with subscription", () => {
        const UserAtom = atom({ name: "ashish", isCoder: true })

        const { rerender, result } = renderHook(() => useAtomValue(UserAtom))
        const { rerender: _, result: dispatch } = renderHook(() => useAtomDispatch(UserAtom))



        expect(result.current).toEqual({ name: "ashish", isCoder: true })


        // dispatch update and rerender
        act(() => {
            dispatch.current({ name: "dan", isCoder: true })
        })
        rerender()


        expect(result.current).toEqual({ name: "dan", isCoder: true })
    })
})