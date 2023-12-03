import { describe, expect, it, vi } from "vitest";
import { atom } from "../../src";

describe("mini-jotai", () => {
    it("should create atom", () => {

        const CounterAtom = atom(1)
        const subscriber = vi.fn(() => { })
        CounterAtom.subscribe(subscriber)


        // initial state
        expect(CounterAtom.get()).toBe(1)
        expect(subscriber).toHaveBeenCalledTimes(0)


        // dispatch
        CounterAtom.set(3)
        expect(CounterAtom.get()).toBe(3)
        expect(subscriber).toHaveBeenCalledTimes(1)
        expect(subscriber).toHaveBeenNthCalledWith(1, 3)



        // dispatch
        CounterAtom.set(5)
        expect(CounterAtom.get()).toBe(5)
        expect(subscriber).toHaveBeenCalledTimes(2)
        expect(subscriber).toHaveBeenNthCalledWith(2, 5)
        expect(subscriber).toHaveBeenCalledTimes(2)
    })


    it("should work with use-atom", () =>{
        
    })
})